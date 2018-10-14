$(window).on("load", () => {

$('.menu .item').tab();

chrome.storage.sync.get(null,(result) => {
  console.log(result)
  voiceSetting.rateValue = result.rateValue;
  voiceSetting.pitchValue = result.pitchValue;
  voiceSetting.volumeValue = result.volumeValue;
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
    rateValue: 1,
    pitchValue: 1,
    volumeValue: 1,
    saveMessage: false
  },
  methods: {
    test: function() {
      speechSynthesis(this.rateValue,this.pitchValue,this.volumeValue)
    },
    save: function() {
      setStorage('rateValue',this.rateValue)
      setStorage('pitchValue',this.pitchValue)
      setStorage('volumeValue',this.volumeValue)
      this.saveMessage = true
      setTimeout(() => {
        this.saveMessage = false
      }, 2000)
    }
  }
})

})


