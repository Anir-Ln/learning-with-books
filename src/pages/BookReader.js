import * as React from 'react';
import { useState, useEffect } from 'react'
import { Viewer, Worker, Position, Tooltip, SpecialZoomLevel, ScrollMode} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { searchPlugin } from '@react-pdf-viewer/search';
import SelectionHandler from '../components/SelectionHandler';
import PhraseForm from '../components/PhraseForm'


// api
import PhraseAPI from '../api/PhraseAPI'

import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useParams } from 'react-router-dom';

const BookReader = () => {
    // get the params from the url -> will be used to loaed the pdf.
    const {bookName, lang} = useParams()

    const [currentPage, setCurrentPage] = useState(0)

    // currPhrase is the current selected text -> will be displayed on form section
    const [currPhrase, setCurrPhrase] = useState({
        text: '',
        meaning: '',
        learning_level_id: '',
        phrase_type_id: ''
    })

    const [context, setContext] = useState('')

    // data is a big object where the keys are the phrases and the content is meaning, learning_level_id...
    const [data, setData] = useState({})
    // we get the data (phrases) using the PhraseApi, we use useMemo so that we don't request the data on every render, which
    // means we re-request the data only after the depenedencies change, in our case deps = [], no deps (only when reloading)
    React.useMemo(() => {
        PhraseAPI.getAll().then((phrases) => {
            setData(phrases)
            // return phrases;
        }).catch(err => {
            console.log("error getting phrases")
            console.error(err)
        })
    }, [])

    // ref references the div that contains the pdf viewer, we will use it to know if the selection is done in the viewer, and not outside
    const ref = React.useRef(null)
    // when selecting some text, we update currPhrase
    const onSelectionChange = (selection) => {
        if (!ref.current || !ref.current.contains(selection.anchorNode)) 
            return
        setContext(selection.anchorNode.data)
        setCurrPhrase({
            text: selection.toString(),
            meaning: '',
            learning_level_id: '',
            phrase_type_id: ''
        })
    }

    // when clicking save in phrase form.
    // @input {textToSave, meaning, level, type, context}
    const onSavePhrase = (phrase) => {
        const {text: textToSave, ...others} = phrase
        if (textToSave.trim() === '') {
            console.log("text is empty");
            return false
        }

        // save if not already phrase has an id, otherwise already saved, only update
        if (!phrase.id || phrase.id === '') {
            PhraseAPI.save(phrase).then((payload) => {
                setData({...data, [textToSave.replace(/\r?\n|\r/g, "")]: {id: payload?.lastInsertRowid, ...others}})
            }).catch(err => console.error(err))
            return true
        } 
        // update 
        if (JSON.stringify(data[textToSave]) !== JSON.stringify(others)) {
            PhraseAPI.update(phrase).then((payload) => {
                setData({...data, [textToSave]: phrase})
            }).catch(err => console.error(err))
            return true
        }

        return false
        // console.log(phrase.replace(/\r?\n|\r/g, ""));
        // setData([...data, input.phrase])
        // if (context.includes(phrase)) console.log("yes");
        // else console.log("no");
    }

    // this function is needed to describe how to render the highlights (how to highlight the saved phrases)
    const renderHighlights = React.useCallback(
        (renderProps) => {
            const colors = ['rgb(8 233 79 / 50%)', 'rgb(233 70 20 / 50%)', 'rgb(70 20 233 / 50%)']
            const color = (text) => {
                return colors[text.length%3]
            }
            return (
                <>
                    {renderProps.highlightAreas.map((area, index) => (
                        <div
                            key={`${area.pageIndex}-${index}`}
                            style={{
                                ...renderProps.getCssProperties(area),
                                position: 'absolute',
                            }}
                        >
                            <Tooltip
                                content={() => `${data[area.keywordStr.trim()]?.meaning}`}
                                offset={{ top: 8 + (area.height * area.pageHeight) / 100, left: 0 }}
                                position={Position.BottomCenter}
                                target={
                                    <div
                                        className="rpv-search__highlight"
                                        data-index={index}
                                        style={{
                                            left: 0,
                                            position: 'absolute',
                                            top: 0,
                                            height: '105%',
                                            width: '100%',
                                            backgroundColor: color(area.keywordStr.trim()),
                                            cursor: 'pointer',
                                        }}
                                        title={area.keywordStr.trim()}
                                        // when clicking the highlight, we show it in the phrase form if want to update it.
                                        onClick={() => {
                                            const nextPhrase = {text: area.keywordStr.trim(), ...data[area.keywordStr.trim()]}
                                            console.log(nextPhrase);
                                            setCurrPhrase(nextPhrase)
                                        }}
                                    />
                                }
                            />
                        </div>
                    ))}
                </>
            )
        }, [data]
    );

    const searchPluginInstance = searchPlugin({
        keyword: [
            ...Object.keys(data)?.map(text => text.replace(/\r?\n|\r/g, ""))
        ],
        renderHighlights,
    });


    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [viewerKey, setViewerKey] = useState(0)

    // this is required to make sure the pdf-viewer re-renders after the data changes, so that all the phrases will be highlighted.
    useEffect(() => {
        setViewerKey(viewerKey ? 0 : 1)
        console.log(data);
    }, [data])

    const styles = {
        splitScreen: {
            display: 'flex',
            flexDirection: 'row',
        },
        topPane: {
            width: '60%',
            position: 'fixed',
            // top: 0,
            // left: 0
        },
        bottomPane: {
            width: '40%',
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%'
        },
    }


    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
            <div style={styles.splitScreen}>
                <div style={styles.topPane} ref={ref}>
                    <div
                        style={{
                            height: '100vh',
                            // width: '900px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        <Viewer
                            fileUrl={`${process.env.PUBLIC_URL}/books/${lang}/${bookName}.pdf`}
                            plugins={[defaultLayoutPluginInstance, searchPluginInstance]}
                            key={viewerKey}
                            initialPage={currentPage}
                            onPageChange={(e) => setCurrentPage(e.currentPage)}
                            defaultScale={SpecialZoomLevel.PageFit}
                            // we can set scrollMode to vertical to read the book in the normal way
                            scrollMode={ScrollMode.Horizontal}
                        />
                        {/* the selectionHandler will detect selection of text */}
                        <SelectionHandler phrase={currPhrase?.text} onSelectionChange={onSelectionChange}/>
                    </div>
                </div>
                <div style={styles.bottomPane}>
                    <PhraseForm phrase={currPhrase} context={context} onSavePhrase={onSavePhrase}/> 
                    <iframe src={`https://dictionary.cambridge.org/dictionary/english/${currPhrase?.text}`} width="100%" height="100%" title='dictionary'/>
                </div>
            </div>
        </Worker>

    );
};

export default BookReader;
