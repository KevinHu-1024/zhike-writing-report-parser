import Mark from './Mark';

interface SlotChildren extends Mark {
  endFix: string,
  endText: string,
  id: string,
  index: number,
  linkWord: string,
  processed: boolean,
  startText: string,
  sentIndex: number,
  link: boolean,
}

export default SlotChildren;
