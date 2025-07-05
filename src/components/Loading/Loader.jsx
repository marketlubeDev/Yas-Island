import React from "react";




function Loader() {

const styles = {  
  loader: {
  border: "4px solid yellow",
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  borderRightColor: "transparent",
  animation: "rot 1s linear infinite",
  boxShadow: "0px 0px 20px white inset",
},

rot: {
  "100%": {
    transform: "rotate(360deg)",
  },
},
}


  return (
    <div style={styles.loader}></div>
  );
}   

export default Loader;
