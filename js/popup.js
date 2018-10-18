$(window).on("load", () => {

$('.menu .item').tab();
$('.ui.dropdown')
  .dropdown();


chrome.storage.sync.get(null,(result) => {
  console.log(result)
  voiceSetting.voiceData = result.voice_data;
  voiceSetting.open2ch_url = 'http://' + result.other_data.open2ch_url;
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
  ss.text = 'おーーーぷん2ちゃんねるわ、2012年に開設された日本の電子掲示板である。管理者は矢野さとる';
  ss.rate = rate;
  ss.pitch = pitch;
  ss.volume = volume;
  ss.lang = 'ja';
  window.speechSynthesis.speak(ss);
}

chrome.tabs.query({url:'http://*.open2ch.net/test/read.cgi/*'}, (tab) => {
  console.log(tab)
  tab.forEach((value) => {
    console.log(value.title)
    voiceSetting.options.push({ text: value.title, value: value.id })
    chrome.tabs.sendMessage(value.id,
    { type: "first" },(response) => {
      console.log(response)
    })
  })
})

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  console.log(message)
  console.log(voiceSetting)
  voiceSetting.pActive = message.pActive;
  voiceSetting.eActive = message.eActive;
  // voiceSetting.selected = message.tabStatus;

})



const voiceSetting = new Vue({
  el: 'body',
  data: {
    voiceData: {
      rateValue: 1,
      pitchValue: 1,
      volumeValue: 1,
    },
    open2ch_url: null,
    pStyle: {
      'pointer-events': 'auto',
    },
    eStyle: {
      'pointer-events': 'auto',
    },
    pActive: true,
    eActive: true,
    selected: null,
    options: []
  },
  methods: {
    play: function() {
      chrome.tabs.sendMessage(this.selected,
      { type: "play" },(response) => {
        console.log(response)
      })
    },
    pause: function() {
      chrome.tabs.sendMessage(this.selected,
      { type: "pause" },(response) => {
        console.log(response)
      })
    },
    stop: function() {
      chrome.tabs.sendMessage(this.selected,
      { type: "stop" },(response) => {
        console.log(response)
      })
    },
    eye: function() {
      chrome.tabs.sendMessage(this.selected,
      { type: "eye" },(response) => {
        console.log(response)
      })
    },
    redeye: function() {
      chrome.tabs.sendMessage(this.selected,
      { type: "redeye" },(response) => {
        console.log(response)
      })
    },
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


