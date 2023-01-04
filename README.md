In this code I am testing the react-pdf-highlighter library.

## Install

* Install the dependencies

```console
$ npm install
```

* Build

```console
$ npm run build
```

* Run locally

```console
$ npm run start
```

Visit http://localhost:3000 to see it in action.

## Todo
[-] add possibility of selecting text, then store it as new phrase with it's description


## Spotlights

[App.js](src/App.js):

``` javascript
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { searchPlugin } from '@react-pdf-viewer/search';

import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const data = ['should', 'States', 'Group', 'Opening', 'pdf', 'example', 'File', 'includes']

// defining renderHighlights

const defaultLayoutPluginInstance = defaultLayoutPlugin();
const searchPluginInstance = searchPlugin({
        keyword: [
            ...data.map(text => new RegExp(text)) 
        ],
        renderHighlights,
})

return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
        <div style={{ height: '750px' }}>
            <Viewer
                fileUrl={`${process.env.PUBLIC_URL}/pdf-open-parameters.pdf`}
                plugins={[
                    defaultLayoutPluginInstance,
                    searchPluginInstance,
                ]}
            />
        </div>
    </Worker>
);
```

<!-- <img alt="overview" src="https://user-images.githubusercontent.com/71042937/209880987-6d848ecb-e8b6-4535-a269-d661e29cf7d2.png"> -->
<img alt="overview" src="./public/overview.png">
