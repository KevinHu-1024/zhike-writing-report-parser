import SlotChildren from '../interfaces/SlotChildren'
export default function markInSentence(...marks: SlotChildren[]): SlotChildren[] {
  const sentences = this.reportJSON.reportBySentence || [];
  this._data.sentences = sentences
  
  if (sentences.length !== 0) {
    try {
      for(let mark of marks) {
        mark.sentIndex = 0;

        for (let i = 0; i < sentences.length; i++) {
          const current = sentences[i].beginPosition
          const next = sentences[i + 1] && sentences[i + 1].beginPosition
          if (mark.start >= current) {
            if (mark.end <= next || !next) {
              mark.sentIndex = i
            }
          }
        }
      } 
    } catch (error) {
      console.log(error)
    }
  }
  
  return marks;
}
