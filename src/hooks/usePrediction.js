import { useState } from 'react';
import axios from 'axios';

const url = 'http://158.160.8.102/api/v1/predict';

const usePrediction = () => {
  const [prediction, setPrediction] = useState();
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzingError, setAnalyzingError] = useState();

  const analyze = (file) => {
    setAnalyzing(true);
    axios.post(
      url,
      {image: file},
      {headers: {'Content-Type': 'multipart/form-data'}}
    )
    .then(res => {
      setPrediction(res.data);
      setAnalyzingError(null);
    })
    .catch(e => {
      setPrediction(null)
      setAnalyzingError(e);
    })
    .finally(() => setAnalyzing(false))
  };
  const clear = () => {
    setPrediction(null);
    setAnalyzing(false);
    setAnalyzingError(null);
  };
  return { prediction, analyzing, analyzingError, analyze, clear };
};

export default usePrediction;
