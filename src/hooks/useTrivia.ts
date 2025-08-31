import { useQuery } from '@tanstack/react-query';
import { fetchTriviaQuestion } from '../api/triviaApi';

export const useTriviaQuestion = () => {
  return useQuery({
    queryKey: ['triviaQuestion'],
    queryFn: fetchTriviaQuestion,
    staleTime: 5 * 60 * 1000, // Los datos se consideran "frescos" por 5 minutos
  });
};