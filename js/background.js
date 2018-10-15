//ストレージに初期値を追加
const initialValue = (key,val) => {
  chrome.storage.sync.set({[key]:val})
}

//インストール,アップデート
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.get(null,(result) => {
    if(!Object.keys(result).length == 0) {
      //前バージョンで使用していたデータを削除
      chrome.storage.sync.remove(['obj','other','voices'])
    } else {
      //初期値を入れる
      initialValue('rateValue',1)
      initialValue('pitchValue',1)
      initialValue('volumeValue',1)
      initialValue('strLimit',30)
      initialValue('repData',
      [
        {before:"(https?|ftp)(://[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+)",after:'URL省略。'},
        {before:'>>',after:'アンカー'},
        {before:'!aku',after:'アク禁'},
        {before:"w",after:'ワラ'},
      ])
    }
  })
})
