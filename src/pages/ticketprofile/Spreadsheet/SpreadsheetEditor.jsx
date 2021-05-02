import React, { useLayoutEffect } from "react";

export default function SpreadsheetEditor({
  readOnly,
  sheetState,
  loadsheet,
  block,
}) {
  // const [widthFixer, setWidthFixer] = useState(true);
  useLayoutEffect(() => {
    let bc = block.current;
    bc.innerHTML = "";
    loadsheet(sheetState);
    // sheetBlock.current // load data
    // let toolbarwidth = document.getElementsByClassName("x-spreadsheet-toolbar");
    // toolbarwidth.style.width = "100%";
    // document.getElementsByClassName("x-spreadsheet-sheet").style.width = "100%";
    return () => {
      bc.innerHTML = "";
    };
    // eslint-disable-next-line
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setWidthFixer(false);
  //   }, 2000);
  // }, []);
  return (
    // <div style={{ width: `${widthFixer ? "80%" : "auto"}` }}>
    <div>
      <div
        ref={block}
        className="my-2"
        style={{
          //   overflow: "auto",
          pointerEvents: `${readOnly ? "none" : ""}`,
          opacity: `${readOnly ? "0.7" : "1"}`,
        }}
      ></div>
    </div>
  );
}
