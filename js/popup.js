$(window).on("load", () => {

$('.menu .item').tab();

chrome.storage.sync.get(null,(result) => {
  console.log(result)
  voiceSetting.voiceData = result.voice_data;
  voiceSetting.open2ch_url = 'https://' + result.other_data.open2ch_url;
})

const saveMessage = () => {
  let message = $('#message')
  message.removeClass('hidden')
  setTimeout(() => {
  message.addClass('hidden')
  },1800)
}

const setStorage = (key,val) => {
  chrome.storage.sync.set({[key]:val})
  saveMessage()
}

const speechSynthesis = (rate,pitch,volume) => {
  let ss = new SpeechSynthesisUtterance();
  ss.text = 'おーーーぷん2ちゃんねるわ、2012年に開設された日本の電子掲示板である。';
  ss.rate = rate;
  ss.pitch = pitch;
  ss.volume = volume;
  ss.lang = 'ja';
  window.speechSynthesis.speak(ss);
}

const voiceSetting = new Vue({
  el: 'body',
  data: {
    voiceData: {
      rateValue: 1,
      pitchValue: 1,
      volumeValue: 1,
    },
    open2ch_url: null,
    saveMessage: false
  },
  methods: {
    test: function() {
      window.speechSynthesis.cancel()
      speechSynthesis(this.voiceData.rateValue,this.voiceData.pitchValue,this.voiceData.volumeValue)
    },
    save: function() {
      setStorage('voice_data',this.voiceData)
    }
  }
})

})


