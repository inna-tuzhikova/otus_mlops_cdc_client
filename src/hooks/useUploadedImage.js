import { useState } from 'react';

const useUploadedImage = () => {
  const [imageLoading, setImageLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [imageFile, setImageFile] = useState();

  const loadImage = (event) => {
    setImageLoading(true);
    setImageLoaded(false);
    const files = event.target.files;
    if (!files.length) {
      return;
    }
    try {
      const file = files[0];
      const url =  URL.createObjectURL(file);
      setImageFile(file);
      setImageUrl(url);

      setImageLoading(false);
      setImageLoaded(true);
    } catch (e) {
      console.log('Error', e, files);
    }
  };
  return { loadImage, imageFile, imageUrl, imageLoading, imageLoaded };
};

export default useUploadedImage;
