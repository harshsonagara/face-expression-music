import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const FaceExpressionDetector = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error('Error accessing webcam:', err);
      });
  };

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';

      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);

      startVideo();
    };

    loadModels();

    const handlePlay = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Ensure canvas size exactly matches video size
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const displaySize = {
        width: video.videoWidth,
        height: video.videoHeight,
      };

      faceapi.matchDimensions(canvas, displaySize);

      const interval = setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      }, 100);

      return () => clearInterval(interval);
    };

    videoRef.current?.addEventListener('play', handlePlay);

    return () => {
      videoRef.current?.removeEventListener('play', handlePlay);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{ width: '720px', height: '560px' }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </div>
  );
};

export default FaceExpressionDetector;
