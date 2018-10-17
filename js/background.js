//ストレージに初期値を追加
const initialValue = (key,val) => {
  chrome.storage.sync.set({[key]:val})
}

//インストール,アップデート
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.get(null,(result) => {
    //0.1.5以降新規でインストールする人
    if(Object.keys(result).length == 0) {
      //初期値を入れる
      initialValue('voice_data',{
        rateValue: 1,
        pitchValue: 1,
        volumeValue: 1
      })
      initialValue('simple_replace_data',
      [
        {before:'>>',after:'アンカ'},
        {before:'!aku',after:'アク禁'},
        {before:"!kaijo",after:'解除'},
        {before:"J( 'ｰ`)し",after:'マッマ'},
        {before:"(*^◯^*)",after:'ポジハメ'},
      ])
      initialValue('regexp_replace_data',
      [
        {before:"https?://[a-zA-Z0-9\-_\.:@!~*'\(¥);/?&=\+$,%#]+",after:'URL省略。'},
        {before:'(www*|ｗｗｗ*)',after:'ワラワラ'},
        {before:'([^a-zA-Z])(w|ｗ)',after:'$1ワラ'},
        {before:"彡\\(.\\)\\(.\\)",after:'やきう'},
        {before:"\\(o(‘|')ω(‘|')n\\)",after:'おんちゃん'},

      ])
      initialValue('other_data',
      {
        max_length: 10000,
        open2ch_url: 'open2ch.net/'
      })
    } else {
      //0.1.4からアップデートする人
      if(result.obj){
      //前バージョンで使用していたデータを削除
      chrome.storage.sync.remove(['obj','other','voices'])
      //初期値を入れる
      initialValue('voice_data',{
        rateValue: 1,
        pitchValue: 1,
        volumeValue: 1
      })
      initialValue('simple_replace_data',
      [
        {before:'>>',after:'アンカ'},
        {before:'!aku',after:'アク禁'},
        {before:"!kaijo",after:'解除'},
        {before:"J( 'ｰ`)し",after:'マッマ'},
        {before:"(*^◯^*)",after:'ポジハメ'},
      ])
      initialValue('regexp_replace_data',
      [
        {before:"https?://[a-zA-Z0-9\-_\.:@!~*'\(¥);/?&=\+$,%#]+",after:'URL省略。'},
        {before:'(www*|ｗｗｗ*)',after:'ワラワラ'},
        {before:'([^a-zA-Z])(w|ｗ)',after:'$1ワラ'},
        {before:"彡\\(.\\)\\(.\\)",after:'やきう'},
        {before:"\\(o(‘|')ω(‘|')n\\)",after:'おんちゃん'},
      ])
      initialValue('other_data',
      {
        max_length: 10000,
        open2ch_url: 'open2ch.net/'
      })
      } else {
        //0.1.5以降アップデートする人(何も変更を加えない)
      }

    }
  })
})
