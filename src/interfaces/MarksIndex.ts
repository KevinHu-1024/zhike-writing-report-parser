import SlotChildren from './SlotChildren';

interface Info {
  explain: string,
  key: string,
  title: string,
};

interface Index {
  info: Info,
  marks: SlotChildren[],
}

interface Data {
  [propName: string]: Index,
}

interface MarksIndex {
  data: Data,
  sortKeys: string[],
}

export default MarksIndex;
