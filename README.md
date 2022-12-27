# learn-english-using-pdf-books

@Ideas
+ take a look on pdf.js (very interesting)
+ react-pdf-highlighter is the best option till now: https://github.com/agentcooper/react-pdf-highlighter
+ react-pdf-viewer is also interesting: https://react-pdf-viewer.dev/plugins/highlight/
+ react-pdf has a textRenderer attribute to Page Component (can use it for highlighting): https://github.com/wojtekmaj/react-pdf/wiki/Recipes#highlight-text-on-the-page
+ use some package like MuPDF (fiz) to convert a pdf page into html, render it. and then using Vanilla Js to highlight...

@TODO
+ write a library for pdf file processing
+ every word in the pdf is a single entity (with different level of learning)

@UseCase
+ can read while learning 
+ can check any word as known (select level of knowledge of that word)
+ can toggle a button to see all the already seen words (in different color) or see everything as it is

@BrainStorming
+ render the pdf book using pdf.js
+ highlight words in the front end


## Analizing react-pdf-highlighter:
looks like the most important part is:
```tsx
<PdfLoader url={url}>
	(pdfDocument) => (
		<PdfHighlighter
			pdfDocument={pdfDocument}
			...
			highlights={highlights}>
		</PdfHighlighter>
	)
</PdfLoader>
```
<details>
<summary>render prop function</summary>
The reason for passing a function inside the PdfLoader component is to provide a way for the PdfLoader component to pass the loaded PDF document to its children. The function that is being passed as a child to the PdfLoader component is known as a "render prop", because it is responsible for rendering something (in this case, the PdfHighlighter component).

By passing a function as a child to the PdfLoader component, we can access the pdfDocument object that is being passed to the function as an argument. This allows us to pass the pdfDocument object to the PdfHighlighter component, which can then use it to display the PDF or allow the user to highlight text within it.

The use of render props is a pattern that allows a component to share its state or behavior with its children, without the children being tightly coupled to the component. This can be a useful way to reuse code and make components more flexible and composable.
</details>


#### Highlight Component
This is the unit component, and has the following props:
```typescript
interface Props {
  position: {
    boundingRect: LTWHP;
    rects: Array<LTWHP>;
  };
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  comment: {
    emoji: string;
    text: string;
  };
  isScrolledTo: boolean;
}
```
// we highlight many parts (rects), as one highlight might take multiple lines
```tsx
<div className="Highlight__parts">
	{rects.map((rect, index) => (
		<div
		  onMouseOver={onMouseOver}
		  onMouseOut={onMouseOut}
		  onClick={onClick}
		  key={index}
		  style={rect}
		  className={`Highlight__part`}
		/>
	))}
</div>
```
The function responsible for triggering highlights is HighlightTransform which passed as a prop to the PdfHighlighter component:
```tsx
// in our case we're only intersted in <Highlight ...> Component
<PdfHighlighter
	pdfDocument={pdfDocument}
	//...
	highlightTransform={(
	  highlight,
	  index,
	  setTip,
	  hideTip,
	  viewportToScaled,
	  screenshot,
	  isScrolledTo
	) => {
	  const isTextHighlight = !Boolean(
		highlight.content && highlight.content.image
	  );

	  const component = (
		<Highlight
		  isScrolledTo={isScrolledTo}
		  position={highlight.position}
		  comment={highlight.comment}
		/>
	  )

	  return (
		<Popup
		  popupContent={<HighlightPopup {...highlight} />}
		  onMouseOver={(popupContent) =>
			setTip(highlight, (highlight) => popupContent)
		  }
		  onMouseOut={hideTip}
		  key={index}
		  children={component}
		/>
	  );
	}}
	//...
/>
```
