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
  $('#buttonBox-onyomichan').append(`<span id="pauseButton-onyomichan"v-show="!pActive" v-on:click="pause"><img src="{{ pauseIcon }}"/></span>`)
  $('#buttonBox-onyomichan').append(`<span id="stopButton-onyomichan" v-on:click="stop"><img src="{{ stopIcon }}"/></span>`)
  $('#buttonBox-onyomichan').append(`<span id="eyeButton-onyomichan" v-show="eActive" v-bind:style="eStyle" v-on:click="eye"><img src="{{ eyeIcon }}"/></span>`)
  $('#buttonBox-onyomichan').append('<span id="redeyeButton-onyomichan" v-show="!eActive" v-bind:style="eStyle" v-on:click="redeye"><img src="{{ redeyeIcon }}"/></span>')


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
        this.pActive = false
        this.eActive = false
        this.eStyle['pointer-events'] = 'none'
        if(window.speechSynthesis.speaking){
          window.speechSynthesis.resume();
        }else{
          playEvent()
        }
      },
      pause: function() {
        this.pActive = true
        window.speechSynthesis.pause();
      },
      stop: function() {
        this.pActive = true
        this.eActive = true
        this.pStyle['pointer-events'] = 'auto'
        this.eStyle['pointer-events'] = 'auto'
        resetEvent()
      },
      eye: function() {
        this.eActive = false
        this.pStyle['pointer-events'] = 'none'
        newResponse()
      },
      redeye: function() {
        this.eActive = true
        this.pStyle['pointer-events'] = 'auto'
        this.eStyle['pointer-events'] = 'auto'
        resetEvent()

      }
    }
  })
})

//再生イベント
const playEvent = () => {
  let RES = []
  $('dl').children('dd').each(function( index ) {
    RES.push($(this.outerHTML).children('ares').empty().parent().text());
  });
  RES.forEach(function(val){
    speechSynthesis(val);
  })
  newResponse();
}

//終了イベント
const resetEvent = () => {
  window.speechSynthesis.cancel();
  if(typeof mo !='undefined'){
    mo.disconnect();
  }else{
  }
}

//新しいレスを監視
const newResponse = () => {
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
