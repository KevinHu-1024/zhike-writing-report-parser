import Mark from './Mark';

interface SlotChildren extends Mark {
  endFix: string,
  endText: string,
  id: string,
  index: number,
  isPositive: boolean,
  linkWord: string,
  processed: boolean,
  startText: string,
}

export default SlotChildren;
