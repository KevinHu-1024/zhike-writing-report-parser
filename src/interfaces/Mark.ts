interface Mark {
  start: number,
  end: number,
  sentStart: number,
  sentEnd: number,
  startInSent: number,
  endInSent: number,
  text: string,
  type: string,
  typeExplains: string[],
  isPositive: boolean,
  level: number,
  explain: string[],
}

export default Mark;
