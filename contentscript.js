//ウィンドウを閉じたとき
$(window).on("beforeunload", () => {
  window.speechSynthesis.cancel();
  mo.disconnect();
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

  //Clickイベント
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
        window.speechSynthesis.cancel();
        mo.disconnect();
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
        window.speechSynthesis.cancel();
        mo.disconnect();
      }
    }
  })
  console.log(buttonEvent)
})

//再生イベント
const playEvent = () => {
  const repWords = {
    before: [/2/g,/>>/g],
    after: ["ああああああああああああ","ううううううううう"]
  }
  let RES = []
  $('dd').each(function( index ) {
    RES.push($(this.outerHTML).children('ares').empty().parent().text());
  });
  console.log(RES)
  const pText = replaceText(RES, repWords);
  console.log(pText)
  pText.forEach(function(val){
    speechSynthesis(val);
  })
  newResponse();
}

//置換
const replaceText = (text,word) => {
  const resArr = text.map((value) => {
    i = 0;
    do {
      value = value.replace(word["before"][i],word["after"][i])
      i++;
    } while(i < word["before"].length)
    return value
  })
  return resArr

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
    let ss = new SpeechSynthesisUtterance();
    ss.text = ssText;
    ss.rate = result.rateValue;
    ss.pitch = result.pitchValue;
    ss.volume = result.volumeValue;
    ss.lang = 'ja';
    console.log(ss);
    window.speechSynthesis.speak(ss);
  })

}
