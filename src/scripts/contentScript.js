const buttonEvent = new Vue({
  el: 'body',
  data: {
    buttonData:{
      play: {
        icon: chrome.extension.getURL('images/play.svg'),
        style:{'pointer-events': 'auto'},
        active:true
      },
      pause: chrome.extension.getURL('images/pause.svg'),
      stop: chrome.extension.getURL('images/stop.svg'),
      eye: {
        icon: chrome.extension.getURL('images/eye.svg'),
        style: {'pointer-events': 'auto'},
        active: true
    },
      redeye: chrome.extension.getURL('images/redeye.svg'),
    }
  },
  created (){
    const buttonBoxHtml = document.createElement('div');
    buttonBoxHtml.id = 'buttonBox-onyomichan'
    buttonBoxHtml.innerHTML =
    `
    <input id="resnumInput-onyomichan" type="number" value="1" max="1000" min="1"/>
    <span id="playButton-onyomichan" v-show="buttonData.play.active" v-bind:style="buttonData.play.style" v-on:click="play"><img src="{{ buttonData.play.icon }}"/></span>
    <span id="pauseButton-onyomichan"v-show="!buttonData.play.active" v-on:click="pause"><img src="{{ buttonData.pause }}"/></span>
    <span id="stopButton-onyomichan" v-on:click="stop"><img src="{{ buttonData.stop }}"/></span>
    <span id="eyeButton-onyomichan" v-show="buttonData.eye.active" v-bind:style="buttonData.eye.style" v-on:click="eye"><img src="{{ buttonData.eye.icon }}"/></span>
    <span id="redeyeButton-onyomichan" v-show="!buttonData.eye.active" v-bind:style="buttonData.eye.style" v-on:click="redeye"><img src="{{ buttonData.redeye }}"/></span>
    `
    document.body.appendChild(buttonBoxHtml);
  },
  methods: {
    play: function() {
      this.buttonData.play.active = false
      this.buttonData.eye.active = false
      this.buttonData.eye.style['pointer-events'] = 'none'
      if(window.speechSynthesis.speaking){
        window.speechSynthesis.resume();
      }else{
        playEvent()
      }
    },
    pause: function() {
      this.buttonData.play.active = true
      window.speechSynthesis.pause();
    },
    stop: function() {
      this.buttonData.play.active = true
      this.buttonData.eye.active = true
      this.buttonData.play.style['pointer-events'] = 'auto'
      this.buttonData.eye.style['pointer-events'] = 'auto'
      resetEvent()
    },
    eye: function() {
      this.buttonData.eye.active = false
      this.buttonData.play.style['pointer-events'] = 'none'
      newResponse()
    },
    redeye: function() {
      this.buttonData.eye.active = true
      this.buttonData.play.style['pointer-events'] = 'auto'
      this.buttonData.eye.style['pointer-events'] = 'auto'
      resetEvent()

    }
  },
  beforeDestroy: function () {
    resetEvent()
  }
})

//再生イベント
const playEvent = () => {
  var getBody = function(e){
    if ( !["ARES","DIV"].includes(e.nodeName)){
      return e.textContent
    }
  }
  const resArray = []
  const num = document.getElementById('resnumInput-onyomichan').value
  console.log(num)
  const dd = document.getElementsByTagName('dd');
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
