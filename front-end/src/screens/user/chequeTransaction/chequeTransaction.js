import React, { useState } from "react";
// import WebcamCapture from "../../../components/user/chequeTransaction/webcam";
import UserTemplate from "../userTemplate";
import Webcam from "react-webcam";
import "./chequeTransaction.css";
import Loading from "../../../components/loading";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const videoConstraints = {
  width: 2048,
  height: 1080,
  facingMode: "user",
};

function ChequeTransaction() {
  const [showCameraBut, setShowCameraBut] = useState(false);
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState();
  const [picMessage, setPicMessage] = useState();
  const navigate = useNavigate();

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setPic(imageSrc);
  }, [webcamRef, setImage]);
  //   const loadFile = (event) => {
  //     var image = document.getElementById("output");
  //     image.src = URL.createObjectURL(event.target.files[0]);
  //   };

  const getText = async (img) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/users/chequeTransaction",
        { pic: img, type: "Withdraw" },
        config
      );
      sessionStorage.setItem("chequeTransaction", JSON.stringify(data));
      setLoading(false);
      console.log(data);
      if (data.message) {
        alert("Cheque already Used, please use new Cheque");
      } else {
        navigate("/chequeData");
      }
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  const postDetails = async () => {
    if (!pic || pic === "") {
      return setPicMessage("Please Select an image");
    }
    setLoading(true);
    setPicMessage(null);
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "userAuth");
    data.append("cloud_name", "dxrrifozh");
    await fetch("https://api.cloudinary.com/v1_1/dxrrifozh/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        getText(data.url.toString());
      })
      .catch((err) => {
        console.log("Error is: " + err);
      });
  };

  return (
    <UserTemplate>
      <div className="mainContainer row">
        <div className="col-md-3" > 
          <input
            type="file"
            accept="image/*"
            name="image"
            id="file"
            className="btn btn-outline-primary inputForImage"
            onChange={(e) => {
              setImage("");
              setPic("");
              setImage(URL.createObjectURL(e.target.files[0]));
              setPic(e.target.files[0]);
            }}
          />
        </div>
        <div className="col-md-9">
          {showCameraBut == false ? (
            <button
              className="btn btn-outline-primary cameraButton"
              onClick={() => setShowCameraBut(true)}
            >
              Open Camera
            </button>
          ) : (
            <div>
              <div>
                <Webcam
                  audio={false}
                  // height={300}
                  className="webCam"
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  screenshotQuality="1"
                  // width={600}
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
        {!loading ? (
          image && (
            <div>
              <p className="imageView">
                <img id="output" src={image} />
              </p>
              <div className="submitButton">
                <Button onClick={postDetails}>Upload Image</Button>
              </div>
            </div>
          )
        ) : (
          <Loading />
        )}
      </div>
    </UserTemplate>
  );
}

export default ChequeTransaction;
