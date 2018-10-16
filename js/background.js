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
      initialValue('voice_data',{
        rateValue: 1,
        pitchValue: 1,
        volumeValue: 1
      })
      initialValue('simple_replace_data',
      [
        {before:'>>',after:'安価'},
        {before:'!aku',after:'アク禁'},
        {before:"!kaijo",after:'解除'},
        {before:"J( 'ｰ`)し",after:'マッマ'},
        {before:"(*^◯^*)",after:'ポジハメ'},
      ])
      initialValue('regexp_replace_data',
      [
        {before:"https?://[a-zA-Z0-9\-_\.:@!~*'\(¥);/?&=\+$,%#]+",after:'URL省略。'},
        {before:'([^A-Z])w$',after:'$1、ワラ'},
        {before:'([^A-Z\s])w([！|。|\s])',after:'$1、ワラ$2'},
        {before:'www*',after:'ワラワラ'},
        {before:"彡\\(.\\)\\(.\\)",after:'やきう'},
      ])
      initialValue('other_data',
      {
        max_length:10000
      })
    }
  })
})
