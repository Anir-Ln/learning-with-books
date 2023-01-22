import * as React from 'react';
import { useState, useEffect } from 'react'
import { Viewer, Worker, Popover, Position, Tooltip} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { searchPlugin } from '@react-pdf-viewer/search';
import SelectionHandler from './SelectionHandler';
import PhraseForm from './PhraseForm'

// Import styles
import '@react-pdf-viewer/search/lib/styles/index.css';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const App = () => {
    const [phrase, setPhrase] = useState('')
    const [context, setContext] = useState('')
    const [data, setData] = useState(['Liberation', 'National Security', 'throughout', 'Cybersecurity was by then already a hot topic', 'conference', 'This project', 'should', 'States', 'Group', 'Opening', 'pdf', 'example', 'File', 'includes', 'content', 'could', 'new work', 'Parameters', 'agreement'])

    const ref = React.useRef(null)

    const onSelectionChange = (selection) => {
        if (!ref.current || !ref.current.contains(selection.anchorNode)) 
            return
        setContext(selection.anchorNode.data)
        setPhrase(selection.toString())
        // console.log(selection);
    }

    const onSavePhrase = (phrase, context, meaning) => {
        if (phrase.trim() === '') return
        // @TODO check if already in data
        console.log("here: " + phrase);
        setData([...data, phrase])
        // setData([])
        console.log(data);
    }

    const renderHighlights = React.useCallback(
        (renderProps) => {
            const colors = ['rgb(8 233 79 / 50%)', 'rgb(233 70 20 / 50%)', 'rgb(70 20 233 / 50%)']
            const color = (text) => {
                return colors[text.length%3]
            }
            // renderProps.highlightAreas.forEach((area, index) => {
            //     console.log(area.keywordStr.trim()); 
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
                            <Popover
                                closeOnClickOutside={true}
                                closeOnEscape={true}
                                content={() => (
                                    <div style={{ padding: '0.5rem', width: '12rem' }}>More information go here</div>
                                )}
                                offset={{ top: 8 + (area.height * area.pageHeight) / 100, left: 0 }}
                                position={Position.BottomCenter}
                                target={(toggle, _) => (
                                    <Tooltip
                                        content={() => `phrase: ${area.keywordStr.trim()}`}
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
                                                onClick={() => toggle()}
                                            />
                                        }
                                    />
                                )}
                            />
                        </div>
                    ))}
                </>
            )
        }, []
    );

    
    
    const searchPluginInstance = searchPlugin({
        keyword: [
            ...data.map(text => new RegExp(text))
        ],
        renderHighlights,
        // onHighlightKeyword: (props) => {
        //     props.highlightEle.style.outline = '3px solid rgb(8 233 79 / 61%)';
        //     props.highlightEle.style.backgroundColor = colors[props.keyword.source];
        // },
    });


    const defaultLayoutPluginInstance = defaultLayoutPlugin();


    const [viewerKey, setViewerKey] = useState(0)

    useEffect(() => {
        setViewerKey(viewerKey + 1)
    }, [data])

    const styles = {
        splitScreen: {
            display: 'flex',
            flexDirection: 'row',
        },
        topPane: {
            width: '60%',
        },
        bottomPane: {
            width: '40%',
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
                            fileUrl={`${process.env.PUBLIC_URL}/pdf-open-parameters.pdf`}
                            plugins={[defaultLayoutPluginInstance, searchPluginInstance]}
                            key={viewerKey}
                        />
                        <SelectionHandler phrase={phrase} onSelectionChange={onSelectionChange}/>
                    </div>
                </div>
                <div style={styles.bottomPane}>
                    <PhraseForm phrase={phrase} context={context} onSavePhrase={onSavePhrase}/> 
                </div>
            </div>
        </Worker>

    );
};

export default App;
