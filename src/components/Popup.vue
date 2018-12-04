<template>
  <div>
    <div class="header">
    <div class="ui inverted menu teal">
      <div class="right item">
        <a class="ui inverted button" v-bind:href="open2ch_url" target="_blank">open2ch</a>   
        <a class="ui inverted button" id='top' href="chrome-extension://onmhkgkgngndakhakokgfgopchckepfd/src/views/options.html" target="_blank" style="margin-left:5px">設定</a>
      </div>
    </div>
  </div>
  <SaveMessage ref="msg"></SaveMessage>
  <div class="onsei">
    <div class="ui attached message">
      <h4>音声設定</h4>
    </div>
    <div class="ui attached fluid segment">
      <p>レート:{{ voiceData.rateValue }}</p>
      <input type="range" id="rate-range" min="0.1" max="3" step="0.1" v-model="voiceData.rateValue"/>
      <p>ピッチ:{{ voiceData.pitchValue }}</p>
      <input type="range" id="pitch-range" min="0" max="2" step="0.1" v-model="voiceData.pitchValue"/>
      <p>ボリューム:{{ voiceData.volumeValue }}</p>
      <input type="range" id="volume-range" min="0" max="1" step="0.1" v-model="voiceData.volumeValue"/>
      <button class="ui green button" style="margin-top: 30px" v-on:click="test">テスト</button>
      <button class="ui blue button" v-on:click="save" style="margin-top: 30px;">保存</button>
    </div>
  </div>
  </div>
</template>

<script>
import 'semantic-ui-css/semantic.min.css';
import SaveMessage from './SaveMessage.vue';
import Storage from '../modules/Storage.js';

export default {
  data () {
    return {
      voiceData: {
        rateValue: null,
        pitchValue: null,
        volumeValue: null,
      },
      open2ch_url: null
    }
  },
  created() {
    chrome.storage.sync.get(null,(result) => {
      console.log(result)
      this.voiceData.rateValue = result.voice_data.rateValue,
      this.voiceData.pitchValue = result.voice_data.pitchValue,
      this.voiceData.volumeValue = result.voice_data.volumeValue,
      this.open2ch_url = result.open2ch_url
    })
  },
  components: {
    SaveMessage
  },
  methods: {
    test() {
      window.speechSynthesis.cancel()
      let ss = new SpeechSynthesisUtterance();
      ss.text = 'おーーーぷん2ちゃんねるわ、2012年に開設された日本の電子掲示板である。';
      ss.rate = this.voiceData.rateValue;
      ss.pitch = this.voiceData.pitchValue;
      ss.volume = this.voiceData.volumeValue;
      ss.lang = 'ja';
      window.speechSynthesis.speak(ss);
    },
    save() {
      this.$refs.msg.message()
      Storage.set('voice_data',this.voiceData)
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'Icons';
  src: url("/fonts/icons.woff2") format('woff');
}

html {
  width: 350px;
  height: 200px;
}

body {
  width: 350px;
  height: 200px;
}

h2 {
  display: flex;
  align-items: center;
  justify-content: center;
}

[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background-color: #929191;
  height: 5px;
  width: 100%;
  border-radius: 6px;
}

[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  position: relative;
  border: 2px solid rgba(136, 135, 135, 0.7);
  width: 22px;
  height: 22px;
  background-color: #fff;
  border-radius: 50%;
}

*:focus {
  outline: none;
}
</style>


