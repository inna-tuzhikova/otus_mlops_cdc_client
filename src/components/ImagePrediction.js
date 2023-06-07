import React, { useRef } from 'react'
import useUploadedImage from './../hooks/useUploadedImage';
import usePrediction from '../hooks/usePrediction';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
      <Button
        variant='contained'
        onClick={onButtonClick}
        disabled={!enabled}>
          {name}
      </Button>
    </>
  );
};

const AnalyzeButton = ({
  analyze,
  analyzing,
  imageFile
}) => {
  const text = analyzing ? 'Analyzing...' : 'Analyze'
  const onClick = () => {
    analyze(imageFile);
  };
  return (
    <Button
      disabled={analyzing}
      onClick={onClick}
      variant='outlined'>
        {text}
    </Button>
  );
};

const Idle = ({
  loadImage,
  imageLoading
}) => {
  const text = imageLoading ? 'Loading' : 'Load animal image';
  return (
    <Stack
      sx={{ pt: 4 }}
      direction='row'
      spacing={2}
      justifyContent='center'>
        <LoadImageButton
          name={text}
          loadImage={loadImage} />
    </Stack>
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
      const confidence = Math.round(prediction.confidence * 100);
      return `${prediction.class_label}, confidence ${confidence}%`;
    }
    return null;
  };
  const errorToText = (error) => {
    if (error) {
      try {
        return `Error: ${error.response.data.detail.toString()}`;
      } catch {
        return error.message || 'Cannot analyze image';
      }
    }  
    return null;
  };
  const predictionText = predictionToText(prediction);
  const errorText = errorToText(analyzingError);

  const loadImageWrapped = (event) => {
    loadImage(event);
    clear();
  };

  return (
    <Stack
      spacing={2}
      alignItems='center'>
        <img
          alt='Loaded'
          src={imageUrl}
          style={{
            maxHeight: 500,
            maxWidth: 500
          }} />
        <Typography
          variant='h5'
          align='center'
          color='text.secondary'
          paragraph
          style={{fontFamily: 'monospace'}} >
            {predictionText}
        </Typography>
        <Typography
          variant='h5'
          align='center'
          color='text.secondary'
          paragraph
          style={{fontFamily: 'monospace'}} >
            {errorText}
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction='row'
          spacing={2}
          justifyContent='center'>
            <LoadImageButton
              name='Another'
              loadImage={loadImageWrapped}
              enabled={!analyzing} />
            <AnalyzeButton
              analyze={analyze}
              imageFile={imageFile}
              analyzing={analyzing} />
        </Stack>
    </Stack>
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
