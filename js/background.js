//ストレージに初期値を追加
const initialValue = (key,val) => {
  chrome.storage.sync.set({[key]:val})
}

//ストレージを全削除
const clearStorage = () => {
  chrome.storage.sync.clear()
}




clearStorage()
initialValue('rateValue',1)
initialValue('pitchValue',1)
initialValue('volumeValue',1)
initialValue('strLimit',30)
initialValue(
  'repData',[
  {before:"(https?|ftp)(://[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+)",after:'URL省略。'},
  {before:'>>',after:'アンカー'},
  {before:'!aku',after:'アク禁'},
  {before:"w",after:'ワラ'},
])
