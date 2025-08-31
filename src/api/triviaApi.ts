import axios from 'axios';

const API_URL = 'https://opentdb.com/api.php?amount=1&type=multiple';

export const fetchTriviaQuestion = async () => {
  const { data } = await axios.get(API_URL);
  return data.results[0];
};