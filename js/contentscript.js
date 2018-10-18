//ウィンドウを閉じたとき
$(window).on("beforeunload", () => {
  resetEvent()

});

$(window).on("load", () => {
  //ボタン画像
  const buttonIcon = (path) => {
    return chrome.extension.getURL(path);
  }
  //ボタンを追加
  $('body').append('<div id="buttonBox-onyomichan"></div>');
  $('#buttonBox-onyomichan').append(`<span id="playButton-onyomichan" v-show="pActive" v-bind:style="pStyle" v-on:click="play"><img src="{{ playIcon }}"/></span>`)
  $('#buttonBox-onyomichan').append(`<span id="pauseButton-onyomichan" v-show="!pActive" v-on:click="pause"><img src="{{ pauseIcon }}"/></span>`)
  $('#buttonBox-onyomichan').append(`<span id="stopButton-onyomichan" v-on:click="stop"><img src="{{ stopIcon }}"/></span>`)
  $('#buttonBox-onyomichan').append(`<span id="eyeButton-onyomichan" v-show="eActive" v-bind:style="eStyle" v-on:click="eye"><img src="{{ eyeIcon }}"/></span>`)
  $('#buttonBox-onyomichan').append('<span id="redeyeButton-onyomichan" v-show="!eActive" v-bind:style="eStyle" v-on:click="redeye"><img src="{{ redeyeIcon }}"/></span>')

  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    console.log(message)
    switch(message.type) {
      case 'play':
        buttonEvent.play();
        break;
      case 'pause':
        buttonEvent.pause();
        break;
      case 'stop':
        buttonEvent.stop();
        break;
      case 'eye':
        buttonEvent.eye();
        break;
      case 'redeye':
        buttonEvent.redeye();
        break;
      default:
        console.log(buttonEvent)
        sendStatus(buttonEvent);
        break;
    }
    return true
  })

  const buttonEvent = new Vue({
    el: '#buttonBox-onyomichan',
    data: {
      playIcon: buttonIcon('images/play.svg'),
      pauseIcon: buttonIcon('images/pause.svg'),
      stopIcon: buttonIcon('images/stop.svg'),
      eyeIcon: buttonIcon('images/eye.svg'),
      redeyeIcon: buttonIcon('images/redeye.svg'),
      pStyle: {
        'pointer-events': 'auto',
      },
      eStyle: {
        'pointer-events': 'auto',
      },
      pActive: true,
      eActive: true
    },
    methods: {
      play: function() {
        // this.pActive = false
        // this.eActive = false
        // this.eStyle['pointer-events'] = 'none'

        if(window.speechSynthesis.speaking){
          console.log('再開')
          resumeEvent(this)
          sendStatus(this)

        }else{
          console.log('再生')
          playEvent(this)
          sendStatus(this)
        }
      },
      pause: function() {
        pauseEvent(this)
        sendStatus(this)
      },
      stop: function() {
        resetEvent(this)
        sendStatus(this)
      },
      eye: function() {
        newResponse(this)
        sendStatus(this)
      },
      // redeye: function() {
      //   this.eActive = true
      //   this.pStyle['pointer-events'] = 'auto'
      //   this.eStyle['pointer-events'] = 'auto'
      //   resetEvent()
      // }
    }
  })
})

//データを送る
const sendStatus = (data) => {
  chrome.runtime.sendMessage(
  { type: "buttonStatus", pActive: data.pActive, eActive: data.eActive, eStyle: data.eStyle},function(response){
    console.log(response)
  })
}
  
//再生イベント
const playEvent = (data) => {
  data.pActive = false
  // data.eActive = false
  // data.eStyle['pointer-events'] = 'none'
  let RES = []
  $('dl').children('dd').each(function( index ) {
    RES.push($(this.outerHTML).children('ares').empty().parent().text());
  });
  RES.forEach(function(val){
    speechSynthesis(val);
  })
  newResponse(data);
}

//一時停止イベント
const pauseEvent = (data) => {
  data.pActive = true
  window.speechSynthesis.pause();
}

//再開イベント
const resumeEvent = (data) => {
  data.pActive = false
  data.eActive = false
  window.speechSynthesis.resume();
}

//終了イベント
const resetEvent = (data) => {
  data.pActive = true
  data.eActive = true
  // data.pStyle['pointer-events'] = 'auto'
  // data.eStyle['pointer-events'] = 'auto'
  window.speechSynthesis.cancel();
  if(typeof mo !='undefined'){
    mo.disconnect();
  }else{
  }
}

//新しいレスを監視
const newResponse = (data) => {
  data.eActive = false
  // data.pStyle['pointer-events'] = 'none'
  const target = document.getElementsByClassName('thread')[0];
  mo = new MutationObserver((data) => {
    let nText = $(data[0].addedNodes[0].innerHTML).children('ares').empty().parent().text()
    speechSynthesis(nText)
  })
  mo.observe(target,{childList:true})
}

//読み上げる
const speechSynthesis = (ssText) => {
  chrome.storage.sync.get(null,(result) => {
    if(ssText.length-2 <= result.other_data.max_length){
      const new_simple_replace_data = result.simple_replace_data.map((value) => {
        value.before = value.before.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
        return value
      })
      const repData = result.regexp_replace_data.concat(new_simple_replace_data)
      repData.map((value) => {
        const reg = new RegExp(value.before, 'g');
        ssText = ssText.replace(reg,value.after)
        return ssText
      })
      let ss = new SpeechSynthesisUtterance();
      console.log(ssText)
      ss.text = ssText;
      ss.rate = result.voice_data.rateValue;
      ss.pitch = result.voice_data.pitchValue;
      ss.volume = result.voice_data.volumeValue;
      ss.lang = 'ja';
      window.speechSynthesis.speak(ss);
    }
  })

}
