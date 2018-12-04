<template>
  <div class="regexp_tikan">
    <SaveMessage ref="msg"></SaveMessage>
    <div class="ui attached message">
      <h3>正規表現置換</h3>
    </div>
    <div class="ui attached fluid segment">
      <div class="ui form">
        <div class="field">
          <label>置換前:</label>
          <input type="text" v-model="words.before" placeholder="入力する...">
        </div>
      </div>
      <div class="ui form">
        <div class="field">
          <label>置換後:</label>
          <input type="text" v-model="words.after" placeholder="入力する...">
        </div>
      </div>
      <button class="ui orange button" v-on:click="add" :disabled="validation" style="margin-top: 20px">追加</button>
      <button class="ui blue button" v-on:click="save" style="margin-top: 20px">保存</button>
      <button class="ui grey button" v-on:click="initialize">初期化</button>        
      </div>
    <div class="ui attached fluid segment">
      <table class="ui celled fixed unstackable table">
        <thead>
          <tr>
            <th>置換前</th>
            <th>置換後</th>
            <th class="one wide"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in arr" v-bind:key="index">
            <td>{{ item.before }}</td>
            <td>{{ item.after }}</td>
            <td>
              <button class="ui compact icon button" v-on:click="remove(item)">
                <i class="times icon"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
      words:{
        before: null,
        after: null
      },
      arr: null,
    }
  },
  created() {
    chrome.storage.sync.get(null,(result) => {
      console.log(result)
      this.arr = result.regexp_replace_data
    })
  },
  components: {
    SaveMessage
  },
  computed: {
    validation: function() {
      if(!(this.words.before && this.words.after)) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    add: function() {
      let new_replaceData = {
        before:this.words.before,
        after:this.words.after
      }
      this.arr.push(new_replaceData)
      this.words = {before:null,after:null}
    },

    save: function() {
      Storage.set('regexp_replace_data',this.arr)
      this.$refs.msg.message()
    },

    initialize: function() {
      this.arr = []
      this.arr.push(...intdata.regexp)
    },

    remove: function(item) {
      const index = this.arr.indexOf(item)
      this.arr.splice(index, 1)
    },
  }
}
</script>

<style>

</style>


