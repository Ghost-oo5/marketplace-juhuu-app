import React from 'react';
import "../assets/css/style.css";

function ModelViewer({ src }) {

  const styles = {
    mobile: {
      baseHeight: "250px",
      baseWidth: "300px",
    },
    tablet: {
      baseHeight: "300px",
      baseWidth: "500px",
    },
    pc: {
      baseHeight: "350px",
      baseWidth: "700px",
    },
  };

  const getWindowDimensions = () => {
    const { innerWidth: width } = window;
    if (width <= 576) {
      return styles.mobile;
    } else if (width <= 992) {
      return styles.tablet;
    } else {
      return styles.pc;
    }
  };

  const { baseHeight, baseWidth } = getWindowDimensions();

  return (
    <>
      <model-viewer
        className="mt-0 pt-0 container object-viewer d-flex justify-content-center"
        style={{
          height: baseHeight,
          width: baseWidth,
        }}
        src={src}
        alt="Product 3D Model"
        shadow-intensity="2"
        camera-controls 
        auto-rotate
        ar
        camera-orbit="0deg 0deg"
      ></model-viewer>
      
      <script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
      ></script>
      <script
        nomodule
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"
      ></script>
    </>
  );
}

export default ModelViewer;
