import React, { useState, useRef } from 'react'
import useUploadedImage from './../hooks/useUploadedImage';
import usePrediction from '../hooks/usePrediction';

const IMAGE_LOADED = 0;
const ANALYZING_IMAGE = 1;
const ANALYZING_ERROR = 2;
const ANALYZING_RESULT = 3;

const LoadImageButton = ({
  name,
  loadImage,
  enabled=true,
}) => {
  const imageInput = useRef(null);

  const onButtonClick = () => {
    imageInput.current.click();
  };
  const handleInputChange = (event) => {
    if (event.target.files.length) {
      loadImage(event);
    }
  };

  return (
    <>
      <input
        type='file'
        accept='image/*'
        style={{display: 'none'}}
        ref={imageInput}
        onChange={handleInputChange}/>
      <button
        onClick={onButtonClick}
        disabled={!enabled}>
          {name}
      </button>
    </>
  );
};

const Idle = ({loadImage, imageLoading}) => {
  return (
    <>
      <LoadImageButton name='Load' loadImage={loadImage}/>
      {imageLoading && <LoadingImage /> }
    </>
  );
};

const LoadingImage = ({setState}) => {
  return (
    <div>{'LoadingImage'}</div>
  );
};

const StateWithImage = ({
  imageFile,
  imageUrl,
  loadImage
}) => {
  const { prediction, analyzing, analyzingError, analyze, clear } = usePrediction();
  const analyzeButtonText = analyzing ? 'Analyzing...' : 'Analyze'
  const predictionText = prediction ? `${prediction.class_label}, confidence ${prediction.confidence}` : null;
  const errorText = analyzingError ? `Error: ${analyzingError.response.data.detail}`: null;

  const loadImageWrapper = (event) => {
    loadImage(event);
    clear();
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <img alt='Loaded' src={imageUrl} style={{maxHeight: 500, maxWidth: 500}} />
      {predictionText}
      {errorText}
      <LoadImageButton name='Another' loadImage={loadImageWrapper} enabled={!analyzing}/>
      <button disabled={analyzing} onClick={analyze}>{analyzeButtonText}</button>
    </div>
  );
};


const ImagePrediction = () => {
  const {
    loadImage,
    imageFile, imageUrl,
    imageLoading, imageLoaded
  } = useUploadedImage();


  return (
    <>
      {imageFile ? (
        <StateWithImage {...{imageFile, imageUrl, loadImage}} />
        ) : (
          <Idle loadImage={loadImage} {...{imageLoading}} />
        )}
    </>
  );
};

export default ImagePrediction;