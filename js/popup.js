$(window).on("load", () => {

$('.menu .item').tab();

chrome.storage.sync.get(null,(result) => {
  console.log(result)
  voiceSetting.voiceData = result.voice_data;
})

const setStorage = (key,val) => {
  chrome.storage.sync.set({[key]:val})
}

const speechSynthesis = (rate,pitch,volume) => {
  let ss = new SpeechSynthesisUtterance();
  ss.text = 'おーぷんにちゃんねるへようこそ。';
  ss.rate = rate;
  ss.pitch = pitch;
  ss.volume = volume;
  ss.lang = 'ja';
  console.log(ss);
  window.speechSynthesis.speak(ss);
}



const voiceSetting = new Vue({
  el: '.onsei',
  data: {
    voiceData: {
      rateValue: 1,
      pitchValue: 1,
      volumeValue: 1,
    },
    saveMessage: false
  },
  methods: {
    test: function() {
      speechSynthesis(this.voiceData.rateValue,this.voiceData.pitchValue,this.voiceData.volumeValue)
    },
    save: function() {
      setStorage('voice_data',this.voiceData)
      this.saveMessage = true
      setTimeout(() => {
        this.saveMessage = false
      }, 2000)
    }
  }
})

})


