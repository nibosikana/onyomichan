const simple = [
  {before:'>>',after:'アンカ'},
  {before:'!aku',after:'アク禁'},
  {before:"!kaijo",after:'解除'},
  {before:"J( 'ｰ`)し",after:'マッマ'},
  {before:"(*^◯^*)",after:'ポジハメ'},
]

const regexp = [
  {before:"https?://[a-zA-Z0-9\-_\.:@!~*'\(¥);/?&=\+$,%#]+",after:'URL省略。'},
  {before:'(www*|ｗｗｗ*)',after:'ワラワラ'},
  {before:'([^a-zA-Z])(w|ｗ)',after:'$1ワラ'},
  {before:"彡\\(.\\)\\(.\\)",after:'やきう'},
  {before:"\\(o(‘|')ω(‘|')n\\)",after:'おんちゃん'},
]

export default { simple,regexp }
// let k; export default k = 12;