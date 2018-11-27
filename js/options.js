
const optionSetting = new Vue({
  el: 'body',
  data: {
    simple_words:{
      before: null,
      after: null
    },
    regexp_words:{
      before: null,
      after: null
    },
    simple_arr: [],
    regexp_arr: [],
    otherData: {
      max_length: null,
      open2ch_url: null
    },
    saveMessage: false
  },
  created() {
    chrome.storage.sync.get(null,(result) => {
      this.simple_arr = result.simple_replace_data;
      this.regexp_arr = result.regexp_replace_data;
      this.otherData = result.other_data;
    })
  },
  computed: {
    validation_s: function() {
      if(!(this.simple_words.before && this.simple_words.after)) {
        return true
      } else {
        return false
      }
    },
    validation_r: function() {
      if(!(this.regexp_words.before && this.regexp_words.after)) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    add_s: function() {
      let new_replaceData = {
        before:this.simple_words.before,
        after:this.simple_words.after
      }
      this.simple_arr.push(new_replaceData)
      this.simple_words = {before:null,after:null}
    },

    save_s: function() {
      setStorage('simple_replace_data',this.simple_arr)
    },

    initialize_s: function() {
      this.simple_arr = []
      this.simple_arr.push(
        {before:'>>',after:'アンカ'},
        {before:'!aku',after:'アク禁'},
        {before:"!kaijo",after:'解除'},
        {before:"J( 'ｰ`)し",after:'マッマ'},
        {before:"(*^◯^*)",after:'ポジハメ'},
      )
    },

    delete_s: function(item) {
      const index = this.simple_arr.indexOf(item)
      this.simple_arr.splice(index, 1)
    },

    add_r: function() {
      let new_replaceData = {
        before:this.regexp_words.before,
        after:this.regexp_words.after
      }
      this.regexp_arr.push(new_replaceData)
      this.regexp_words = {before:null,after:null}
    },

    save_r: function() {
      setStorage('regexp_replace_data',this.regexp_arr)
    },

    initialize_r: function() {
      this.regexp_arr = []
      this.regexp_arr.push(
        {before:"https?://[a-zA-Z0-9\-_\.:@!~*'\(¥);/?&=\+$,%#]+",after:'URL省略。'},
        {before:'(www*|ｗｗｗ*)',after:'ワラワラ'},
        {before:'([^a-zA-Z])(w|ｗ)',after:'$1ワラ'},
        {before:"彡\\(.\\)\\(.\\)",after:'やきう'},
        {before:"\\(o(‘|')ω(‘|')n\\)",after:'おんちゃん'},
      )
    },

    delete_r: function(item) {
      const index = this.regexp_arr.indexOf(item)
      this.regexp_arr.splice(index, 1)
    },
    
    save_o: function(){
      setStorage('other_data',
      {
        max_length: this.otherData.max_length,
        open2ch_url: this.otherData.open2ch_url
      })
    }
  }
})

const saveMessage = () => {
  let message = document.getElementById('message')
  message.classList.remove('hidden')
  setTimeout(() => {
  message.classList.add('hidden')
  },1800)
}

const setStorage = (key,val) => {
  chrome.storage.sync.set({[key]:val})
  saveMessage()
}