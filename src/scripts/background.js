import intdata from "../modules/InitialData";
import Storage from '../modules/Storage'

//インストール,アップデート
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.get(null,(result) => {
    console.log(Object.keys(result).length)
    if(!Object.keys(result).length){
      Storage.set('voice_data',intdata.voice)
      Storage.set('simple_replace_data',intdata.simple)
      Storage.set('regexp_replace_data',intdata.regexp)
      Storage.set('other_data',intdata.other)
    }else{}
  })
})
