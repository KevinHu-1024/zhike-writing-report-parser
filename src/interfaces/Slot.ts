import SlotChildren from './SlotChildren';

interface Slot {
  start: number,
  end: number,
  children: SlotChildren[],
}

export default Slot;
