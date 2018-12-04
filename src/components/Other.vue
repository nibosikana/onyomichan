<template>
  <div class="other">
    <SaveMessage ref="msg"></SaveMessage>
    <div class="ui attached message">
      <h3>その他</h3>
    </div>
    <div class="ui attached fluid segment">
      <div class="ui form">
        <div class="inline field">
          <label>読み上げるレスの最大文字数：</label>
          <div class="ui right labeled input">
            <input type="text" v-model="otherData.max_length">
            <div class="ui label">文字</div>
          </div>
        </div>
        <div class="inline field">
          <label>ポップアップウィンドウの右上の「open2ch」のリンク先を変更する：</label>
          <div class="ui labeled input">
            <div class="ui label">https://</div>
            <input type="text" placeholder="＊.open2ch.net/＊" v-model="otherData.open2ch_url">
          </div>
        </div>
      </div>
      <button class="ui blue button" v-on:click="save" style="margin-top: 20px">保存</button>
    </div>
  </div>
</template>

<script>
import Storage from '../modules/Storage.js';
import intdata from '../modules/InitialData.js';
import SaveMessage from './SaveMessage.vue';

export default {
  data () {
    return {
      otherData: {
        max_length: null,
        open2ch_url: null
      }
    }
  },
  created() {
    chrome.storage.sync.get(null,(result) => {
      this.otherData.max_length = result.other_data.max_length
      this.otherData.open2ch_url = result.other_data.open2ch_url
    })
  },
  components: {
    SaveMessage
  },
  methods: {
    save: function(){
      Storage.set('other_data',
      {
        max_length: this.otherData.max_length,
        open2ch_url: this.otherData.open2ch_url
      })
      this.$refs.msg.message()
    }
  }
}
</script>

<style>

</style>

