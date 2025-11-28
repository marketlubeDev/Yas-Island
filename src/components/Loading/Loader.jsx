const loaderStyle = {
  width: "300px",
  height: "300px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
};

function Loader() {
  return (
    <div style={loaderStyle}>
      <img
        src="https://www.yasisland.com/dist/YasConnect_YasIsland/static/media/newLoader.135dab43.gif"
        alt="Loading..."
        style={imageStyle}
      />
    </div>
  );
}

export default Loader;
