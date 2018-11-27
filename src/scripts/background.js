import rd from "./replaceData";
//ストレージに初期値を追加
const initialValue = (key,val) => {
  chrome.storage.sync.set({[key]:val})
}

//インストール,アップデート
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.get(null,(result) => {
    console.log(result)
    if(!result.obj){
    //前バージョンで使用していたデータを削除
    chrome.storage.sync.remove(['obj','other','voices'])
    //初期値を入れる
    initialValue('voice_data',{
      rateValue: 1,
      pitchValue: 1,
      volumeValue: 1
    })
    console.log(rd.simple)
    initialValue('simple_replace_data',rd.simple)
    initialValue('regexp_replace_data',rd.regexp)
    initialValue('other_data',
    {
      max_length: 10000,
      open2ch_url: 'open2ch.net/'
    })
    } else {
      //0.1.5以降アップデートする人(何も変更を加えない)
    }
  })
})
