import * as React from 'react';
import { useState, useEffect } from 'react'
import { Viewer, Worker, Popover, Position, Tooltip, SpecialZoomLevel, ScrollMode} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { searchPlugin } from '@react-pdf-viewer/search';
import SelectionHandler from '../components/SelectionHandler';
import PhraseForm from '../components/PhraseForm'

// api
import PhraseAPI from '../api/PhraseAPI'

// Import styles
import '@react-pdf-viewer/search/lib/styles/index.css';

// Import styles
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useParams } from 'react-router-dom';

const BookReader = () => {
    const {bookName, lang} = useParams();

    const [currentPage, setCurrentPage] = useState(0)

    // const setupData = ['Liberation', 'National Security', 'throughout', 'Cybersecurity was by then already a hot topic', 'conference', 'This project', 'should', 'States', 'Group', 'Opening', 'pdf', 'example', 'File', 'includes', 'content', 'could', 'new work', 'Parameters', 'agreement']
    const [text, setText] = useState('')
    const [context, setContext] = useState('')
    const [data, setData] = useState([])

    const memoizedPhrases = React.useMemo(() => {
        PhraseAPI.getAll().then((phrases) => {
            setData(phrases)
            // return phrases;
        }).catch(err => {
            console.log("error getting phrases")
            console.error(err)
        })
    }, [])


    const ref = React.useRef(null)

    const onSelectionChange = (selection) => {
        if (!ref.current || !ref.current.contains(selection.anchorNode)) 
            return
        setContext(selection.anchorNode.data)
        setText(selection.toString())
        // console.log(selection);
    }

    // @input {phrase, meaning, level, type, context}
    const onSavePhrase = (phrase) => {
        const {text: textToSave, ...others} = phrase
        if (textToSave.trim() === '') {
            console.log("text is empty");
            return
        }
        // @TODO check if already in data
        PhraseAPI.save(phrase).then((payload) => {
            console.log(payload);
            setData({...data, [textToSave.replace(/\r?\n|\r/g, "")]: {id: payload?.lastInsertRowid, ...others}})
        }).catch(err => console.error(err))
        // console.log(phrase.replace(/\r?\n|\r/g, ""));
        // setData([...data, input.phrase])
        // if (context.includes(phrase)) console.log("yes");
        // else console.log("no");
    }

    const renderHighlights = React.useCallback(
        (renderProps) => {
            const colors = ['rgb(8 233 79 / 50%)', 'rgb(233 70 20 / 50%)', 'rgb(70 20 233 / 50%)']
            const color = (text) => {
                return colors[text.length%3]
            }
            // renderProps.highlightAreas.forEach((area, index) => {
            //     let kw = area.keywordStr.trim()
            //     console.log(kw + ": " + data[kw]?.meaning);
            //     // console.log(index);
            // });
            // console.log(renderProps.highlightAreas.length);
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
                                        onClick={() => {
                                            setText(area.keywordStr.trim())
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
        // onHighlightKeyword: (highlightEle, keyword) => {
        //     console.log('keyword: ', keyword);
        //     console.log(highlightEle);
        //     // props.highlightEle.style.outline = '3px solid rgb(8 233 79 / 61%)';
        //     // props.highlightEle.style.backgroundColor = colors[props.keyword.source];
        // },
    });


    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [viewerKey, setViewerKey] = useState(0)

    useEffect(() => {
        setViewerKey(viewerKey ? 0 : 1)
        console.log(data);
    }, [data])


    // get data
    // useEffect(() => {
    //     PhraseAPI.getAll().then((phrases) => {
    //         setData(phrases)
    //     }).catch(err => {
    //         console.log("error getting phrases")
    //         console.error(err)
    //     })
    // })

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
                            scrollMode={ScrollMode.Horizontal}
                        />
                        <SelectionHandler phrase={text} onSelectionChange={onSelectionChange}/>
                    </div>
                </div>
                <div style={styles.bottomPane}>
                    <PhraseForm text={text} context={context} onSavePhrase={onSavePhrase}/> 
                    <iframe src={`https://dictionary.cambridge.org/dictionary/english/${text}`} width="100%" height="100%" title='dictionary'/>
                </div>
            </div>
        </Worker>

    );
};

export default BookReader;
