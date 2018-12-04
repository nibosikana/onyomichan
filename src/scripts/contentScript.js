window.onload = () => {
  const playIcon = chrome.extension.getURL('../images/play.svg');
  const pauseIcon = chrome.extension.getURL('../images/pause.svg');
  const stopIcon = chrome.extension.getURL('../images/stop.svg');
  const eyeIcon = chrome.extension.getURL('../images/eye.svg');
  const redeyeIcon = chrome.extension.getURL('../images/redeye.svg');

  
  const buttonBoxHtml = document.createElement('div');
  buttonBoxHtml.id = 'buttonBox-onyomichan';
  buttonBoxHtml.innerHTML = 
    `
    <input id="resnumInput-onyomichan" type="number" value="1" max="1000" min="1"/>
    <span id="playButton-onyomichan"><img src="${playIcon}"/></span>
    <span id="pauseButton-onyomichan"><img src="${pauseIcon}"/></span>
    <span id="stopButton-onyomichan"><img src="${stopIcon}"/></span>
    <span id="eyeButton-onyomichan"><img src="${eyeIcon}"/></span>
    <span id="redeyeButton-onyomichan"><img src="${redeyeIcon}"/></span>
    `
  document.body.appendChild(buttonBoxHtml);

  const playButton = document.getElementById("playButton-onyomichan");
  const pauseButton = document.getElementById("pauseButton-onyomichan");
  const stopButton = document.getElementById("stopButton-onyomichan");
  const eyeButton = document.getElementById("eyeButton-onyomichan");
  const redeyeButton = document.getElementById("redeyeButton-onyomichan");

  playButton.addEventListener('click',() => {
    playButton.style.display = "none";
    pauseButton.style.display = "inline";
    eyeButton.style.display = "none";
    redeyeButton.style.display = "inline";
    if(window.speechSynthesis.speaking){
      window.speechSynthesis.resume();
    }else{
      console.log('play')
      playEvent()
    }
  })

  pauseButton.addEventListener('click',() => {
    console.log('pause')
    pauseButton.style.display = "none";
    playButton.style.display = "inline";
    console.log(window.speechSynthesis)
    window.speechSynthesis.pause();

  })

  stopButton.addEventListener('click',() => {
    console.log('stop')
    pauseButton.style.display = "none";
    playButton.style.display = "inline";
    redeyeButton.style.display = "none";
    eyeButton.style.display = "inline";
    playButton.style['pointer-events'] = "auto"
    resetEvent()
  })

  eyeButton.addEventListener('click',() => {
    eyeButton.style.display = "none";
    redeyeButton.style.display = "inline";
    playButton.style['pointer-events'] = "none"
    console.log('eye')
    newResponse()
  })
}

//再生イベント
const playEvent = () => {
  var getBody = function(e){
    if ( !["ARES","DIV","#comment"].includes(e.nodeName)){
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
var _mo;
const resetEvent = () => {
  window.speechSynthesis.cancel();
  if(typeof _mo !='undefined'){
    _mo.disconnect();
  }else{
  }
}

//新しいレスを監視
const newResponse = () => {
  const target = document.getElementsByClassName('thread')[0];
  _mo = new MutationObserver((item) => {
    var getBody = function(e){
      if ( !["ARES","DIV","#comment"].includes(e.nodeName)){
      return e.textContent
      }
    }
    let nText = [...item[0].addedNodes[0].getElementsByTagName("dd")[0].childNodes].map(getBody).filter(Boolean).join('\n')
    speechSynthesis(nText)
  })
  _mo.observe(target,{childList:true})
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
