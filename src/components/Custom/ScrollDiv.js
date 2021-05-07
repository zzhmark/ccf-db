import React from "react";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

export default function ScrollDiv(props) {
  let ps;
  const cont = React.createRef();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(cont.current, {
        suppressScrollX: true,
        suppressScrollY: false,
        wheelPropagation: true,
      });
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  }, [cont]);
  return <div {...props} ref={cont}></div>;
}
