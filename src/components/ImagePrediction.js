import React, { useRef } from 'react'
import useUploadedImage from './../hooks/useUploadedImage';
import usePrediction from '../hooks/usePrediction';

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

const Idle = ({
  loadImage,
  imageLoading
}) => {
  return (
    <>
      <LoadImageButton name='Load' loadImage={loadImage}/>
      {imageLoading && <LoadingImage /> }
    </>
  );
};

const LoadingImage = () => {
  return (
    <div>{'LoadingImage'}</div>
  );
};

const StateWithImage = ({
  imageFile,
  imageUrl,
  loadImage
}) => {
  const {
    prediction,
    analyzing,
    analyzingError,
    analyze,
    clear
  } = usePrediction();
  const predictionToText = (prediction) => {
    if (prediction) {
      return `${prediction.class_label}, confidence ${prediction.confidence}`;
    }
    return null;
  };
  const errorToText = (error) => {
    if (error) {
      return `Error: ${analyzingError.response.data.detail}`;
    }
    return null;
  };
  const analyzeButtonText = analyzing ? 'Analyzing...' : 'Analyze'
  const predictionText = predictionToText(prediction);
  const errorText = errorToText(analyzingError);

  const loadImageWrapped = (event) => {
    loadImage(event);
    clear();
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <img
        alt='Loaded'
        src={imageUrl}
        style={{maxHeight: 500, maxWidth: 500}} />
      {predictionText}
      {errorText}
      <LoadImageButton
        name='Another'
        loadImage={loadImageWrapped}
        enabled={!analyzing}/>
      <button
        disabled={analyzing}
        onClick={analyze}>
          {analyzeButtonText}
      </button>
    </div>
  );
};

const ImagePrediction = () => {
  const {
    loadImage,
    imageFile,
    imageUrl,
    imageLoading
  } = useUploadedImage();

  return (
    <>
      {imageFile ? (
        <StateWithImage
          imageFile={imageFile}
          imageUrl={imageUrl}
          loadImage={loadImage} />
        ) : (
          <Idle
            loadImage={loadImage}
            imageLoading={imageLoading} />
        )}
    </>
  );
};

export default ImagePrediction;
