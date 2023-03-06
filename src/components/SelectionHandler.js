import React, { useEffect, useState } from "react";

const SelectionHandler = ({phrase, onSelectionChange}) => {
  const [cssProperties, setCssProperties] = useState({});
  // let position = {}

  useEffect(() => {
    document.addEventListener("selectstart", (e) => {
      // console.log(e);
      // console.log("selection starts");
      document.addEventListener("mouseup", selectPhrase);
    });

    const selectPhrase = (e) => {
      const selection = document.getSelection();
      if (selection.toString() !== "") {
        onSelectionChange(selection) 
        const oRange = selection.getRangeAt(0); //get the text range
        const oRect = oRange.getBoundingClientRect();
        setCssProperties({
          left: oRect.left,
          top: oRect.top,
          // height: oRect.height,
          // width: oRect.width,
        });
      }
      document.removeEventListener("mouseup", selectPhrase);
    };
  }, [phrase]);

  return (
    <></>
    // <div style={{ position: "absolute", ...cssProperties, zIndex: 10 }}>
    // <div aria-expanded="true" aria-haspopup="dialog" aria-controls="rpv-core__popver-body-77">
    //   <div
    //     aria-describedby="rpv-core__popover-body-inner-373"
    //     class="rpv-core__popover-body"
    //     id="rpv-core__popover-body-373"
    //     role="dialog"
    //     tabindex="-1"
    //     style={{...cssProperties}}
    //   >
    //     <div class="rpv-core__arrow rpv-core__arrow--bc rpv-core__popover-body-arrow"></div>
    //     <div id="rpv-core__popover-body-inner-373">
    //       <div style={{padding: "0.5rem", width: "12rem"}}>{phrase}</div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SelectionHandler;
