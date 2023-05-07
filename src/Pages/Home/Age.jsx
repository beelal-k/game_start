import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';

const WebcamComponent = () => <Webcam />
const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: 'user',
}

const detectAge = async () => {
    const input = document.getElementById('imageInput');
    const detections1 = await faceapi.detectAllFaces(input, new faceapi.SsdMobilenetv1Options())
    // const age = await faceapi.detectAllFaces(input).withFaceLandmarks().withAgeAndGender().withFaceDescriptors();

    console.log(detections1);
    // if (age) {
    //     const bestMatch = faceMatcher.findBestMatch(age.descriptor)
    //     console.log(bestMatch.toString())
    // }
    // else{
    //     console.log("nothing");

    // }

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
            {/* <main id="home">
                <div id="container" className="container">
                    <button className="">Verify Age</button>
                </div>
            </main> */}

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
