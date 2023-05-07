import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';

const WebcamComponent = () => <Webcam />
const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: 'user',
}
const MODEL_URL = '/models'

// faceapi.nets.ageGenderNet.loadFromUri('/models')
const detectAge = async () => {
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadAgeGenderModel(MODEL_URL);
    await faceapi.loadFaceExpressionModel(MODEL_URL);
    const input = document.getElementById('imageInput');
    const detections1 =  faceapi.detectAllFaces(input, new faceapi.TinyFaceDetectorOptions()).withAgeAndGender();

    console.log(detections1);

}

const Age = () => {
    const [picture, setPicture] = useState('')
    const webcamRef = React.useRef(null)
    const capture = React.useCallback(() => {
        const pictureSrc = webcamRef.current.getScreenshot()
        setPicture(pictureSrc)
    })


    return (
        <>
            <div>
                {picture == '' ? (
                    <Webcam
                        audio={false}
                        height={400}
                        ref={webcamRef}
                        width={400}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                ) : (
                    <img src={picture} onInput={detectAge} id="imageInput" />
                )}
            </div>
            <div>
                {picture != '' ? (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            setPicture()
                        }}
                        className="btn btn-primary"
                    >
                        Retake
                    </button>
                ) : (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            capture()
                        }}
                        className="btn btn-danger"
                    >
                        Capture
                    </button>
                )}
            </div>

        </>
    );
};

export default Age;
