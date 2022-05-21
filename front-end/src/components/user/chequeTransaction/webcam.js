import React, { useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 2048,
  height: 1080,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState();

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef, setImage]);

  return (
    <>
      <div>
        <div>
          <Webcam
            audio={false}
            height={250}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            screenshotQuality="1"
            width={500}
            videoConstraints={videoConstraints}
          />

          <button onClick={capture}>Capture photo</button>
        </div>
        <div>{image && <image src={image}></image>}</div>
      </div>
    </>
  );
};

// export default WebcamCapture;
