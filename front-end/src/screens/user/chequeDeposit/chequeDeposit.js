import React, { useState } from "react";
// import WebcamCapture from "../../../components/user/chequeTransaction/webcam";
import UserTemplate from "../userTemplate";
import Webcam from "react-webcam";
// import "./chequeDeposit.css";
import Loading from "../../../components/loading";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const videoConstraints = {
  width: 2048,
  height: 1080,
  facingMode: "user",
};

function ChequeDeposit() {
  const [showCameraBut, setShowCameraBut] = useState(false);
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState();
  const [picMessage, setPicMessage] = useState();
  const navigate = useNavigate();

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef, setImage]);
  //   const loadFile = (event) => {
  //     var image = document.getElementById("output");
  //     image.src = URL.createObjectURL(event.target.files[0]);
  //   };

  const postDetails = (pics) => {
    setLoading(true);
    if (!image) {
      return setPicMessage("Please Select an image");
    }
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "chequeImage");
    data.append("cloud_name", "dxrrifozh");
    fetch("https://api.cloudinary.com/v1_1/dxrrifozh/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        navigate("/chequeData");
      })
      .catch((err) => {
        console.log("Error is: ".error);
      });
  };

  return (
    <UserTemplate>
      <div className="mainContainer">
        <div>
          <p>
            <input
              type="file"
              accept="image/*"
              name="image"
              id="file"
              className="btn btn-outline-primary inputForImage"
              onChange={(e) => {
                setImage("");
                setImage(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </p>
        </div>
        <div>
          {showCameraBut == false ? (
            <button
              className="btn btn-outline-primary cameraButton"
              onClick={() => setShowCameraBut(true)}
            >
              Take Image from Camera
            </button>
          ) : (
            <div>
              <div>
                <Webcam
                  audio={false}
                  height={300}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  screenshotQuality="1"
                  width={600}
                  videoConstraints={videoConstraints}
                />
              </div>
              <button className="btn btn-outline-primary" onClick={capture}>
                Capture photo
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() => setShowCameraBut(false)}
              >
                Close Camera
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        {loading && <Loading />}
        {image && (
          <div>
            <p className="imageView">
              <img id="output" minwidth="300" src={image} />
            </p>
            <div className="submitButton">
              <Button onClick={postDetails}>Upload Image</Button>
            </div>
          </div>
        )}
      </div>
    </UserTemplate>
  );
}

export default ChequeDeposit;
