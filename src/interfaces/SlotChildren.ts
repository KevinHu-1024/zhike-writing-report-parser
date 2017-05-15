import Mark from './Mark';

interface SlotChildren extends Mark {
  endFix: string,
  endText: string,
  id: string,
  index: number,
  linkWord: string,
  processed: boolean,
  startText: string,
}

export default SlotChildren;
