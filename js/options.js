$(window).on("load", () => {

  chrome.storage.sync.get(null,(result) => {
    SimpleReplacementSetting.replaceData = result.simple_replace_data;
    RegExpReplacementSetting.replaceData = result.regexp_replace_data;
    otherSetting.otherData = result.other_data;
  })
  
  const setStorage = (key,val) => {
    chrome.storage.sync.set({[key]:val})
  }

  const SimpleReplacementSetting = new Vue({
    el: '.simple_tikan',
    data: {
      inputData: {
        before: null,
        after: null
      },
      replaceData: [],
      saveMessage: false
  },
  computed: {
    validation: function() {
      if(!(this.inputData.before && this.inputData.after)) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    add: function() {
      let new_replaceData = {
        before:this.inputData.before,
        after:this.inputData.after
      }
      this.replaceData.push(new_replaceData)
      this.inputData = {before:null,after:null}
    },
    save: function() {
      setStorage('simple_replace_data',this.replaceData)
      this.saveMessage = true
      setTimeout(() => {
        this.saveMessage = false
      }, 2000)
    },
  
    delete: function(item) {
      const index = this.replaceData.indexOf(item)
      this.replaceData.splice(index, 1)
    }
  
  }
})

const RegExpReplacementSetting = new Vue({
  el:'.regexp_tikan',
  data: {
    inputData: {
      before: null,
      after: null
    },
    replaceData: [],
    saveMessage: false
  },
  computed: {
    validation: function() {
      if(!(this.inputData.before && this.inputData.after)) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    add: function() {
      let new_replaceData = {
        before:this.inputData.before,
        after:this.inputData.after
      }
      this.replaceData.push(new_replaceData)
      this.inputData = {before:null,after:null}
    },
    save: function() {
      setStorage('regexp_replace_data',this.replaceData)
      this.saveMessage = true
      setTimeout(() => {
        this.saveMessage = false
      }, 2000)
    },
  
    delete: function(item) {
      const index = this.replaceData.indexOf(item)
      this.replaceData.splice(index, 1)
    }
  }
})

const otherSetting = new Vue({
  el: '.other',
  data: {
    otherData: {
      max_length: null,
      open2ch_url: null
    },
    saveMessage: false
  },
  // computed: {
  //   validation: function(){ 
  //     const pattern = /^\d+$/;    
  //     return pattern.test(this.otherData.max_length.trim())
  //   }
  // },
  methods: {
    save: function(){
      setStorage('other_data',
      {
        max_length: this.otherData.max_length,
        open2ch_url: this.otherData.open2ch_url
      })
      this.saveMessage = true
      setTimeout(() => {
        this.saveMessage = false
      }, 2000)
    }
  }
})
})


  