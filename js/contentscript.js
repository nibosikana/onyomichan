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
  $('#buttonBox-onyomichan').append(`<input id="resnumInput-onyomichan" type="number" value="1" max="1000" min="1"/>`)
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
  var getBody = function(e){
    if ( !["ARES","DIV"].includes(e.nodeName)){
      return e.textContent
    }
  }
  let resArray = []
  let num = document.getElementById('resnumInput-onyomichan').value
  console.log(num)
  let dd = document.getElementsByTagName('dd');
  [...dd].forEach((item) => {
    let l = {
      "num":item.getElementsByTagName("ares")[0] ? item.getElementsByTagName("ares")[0].getAttribute("num"): null,
      "body":[...item.childNodes].map(getBody).filter(Boolean).join('\n')
    }
    resArray.push(l)
  })
  console.log(resArray)
  resArray.forEach((item) => {
    if(Number(num) <= Number(item.num)){
      speechSynthesis(item.body)
    }
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
  mo = new MutationObserver((item) => {
    var getBody = function(e){
      if ( !["ARES","DIV"].includes(e.nodeName)){
      return e.textContent
      }
    }
    let nText = [...item[0].addedNodes[0].getElementsByTagName("dd")[0].childNodes].map(getBody).filter(Boolean).join('\n')
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
      //console.log(ssText)
      ss.text = ssText;
      ss.rate = result.voice_data.rateValue;
      ss.pitch = result.voice_data.pitchValue;
      ss.volume = result.voice_data.volumeValue;
      ss.lang = 'ja';
      window.speechSynthesis.speak(ss);
    }
  })
}
