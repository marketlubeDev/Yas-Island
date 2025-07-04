import React from "react";




function Loader() {

    /* From Uiverse.io by xXJollyHAKERXx */ 
    const styles = {
        spinner: {
            backgroundImage: "linear-gradient(rgb(186, 66, 255) 35%,rgb(0, 225, 255))",
            width: "100px",
            height: "100px",
            animation: "spinning82341 1.7s linear infinite",
            textAlign: "center",
            borderRadius: "50px",
            filter: "blur(1px)",
            boxShadow: "0px -5px 20px 0px rgb(186, 66, 255), 0px 5px 20px 0px rgb(0, 225, 255)",
        },
        spinner1: {
            backgroundColor: "rgb(36, 36, 36)",
            width: "100px",
            height: "100px",
            borderRadius: "50px",
            filter: "blur(100px)",
        },
        "@keyframes spinning82341": {
            to: {
                transform: "rotate(360deg)",
            },
        },
    };
  


  return (
    <div style={styles.spinner}>
      <div style={styles.spinner1}></div>
    </div>
  );
}   

export default Loader;
