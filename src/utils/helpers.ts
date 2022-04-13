import { v4 as uuidv4 } from 'uuid';
import { TCard } from '../utils/prop-types';

export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generateCards = (
  numberRange: number,
  collectionCount: number
): TCard[] => {
  const arr = Array.from(new Array(numberRange), (_, index) => index + 1);
  const result = arr.map((item) => {
    const pairArr = [];
    for (let i = 0; i < collectionCount; i++) {
      pairArr.push({ id: uuidv4(), value: item, isFound: false });
    }
    return pairArr;
  });

  return shuffleArray<TCard>(result.flat(1));
};

export const declOfNum = (number: number, textForms: string[]): string => {
  const n = Math.abs(number) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return textForms[2];
  if (n1 > 1 && n1 < 5) return textForms[1];
  if (n1 === 1) return textForms[0];
  return textForms[2];
};
