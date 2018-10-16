$(window).on("load", () => {

  chrome.storage.sync.get(null,(result) => {
    console.log(result)
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
      console.log('validation')
      if(!(this.inputData.before && this.inputData.after)) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    add: function() {
      console.log("add")
      let new_replaceData = {
        before:this.inputData.before,
        after:this.inputData.after
      }
      this.replaceData.push(new_replaceData)
      this.inputData = {before:null,after:null}
    },
    save: function() {
      console.log("save")
      setStorage('simple_replace_data',this.replaceData)
      this.saveMessage = true
      setTimeout(() => {
        this.saveMessage = false
      }, 2000)
    },
  
    delete: function(item) {
      console.log("del")
      console.log(item)
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
      console.log('validation')
      if(!(this.inputData.before && this.inputData.after)) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    add: function() {
      console.log("add")
      let new_replaceData = {
        before:this.inputData.before,
        after:this.inputData.after
      }
      this.replaceData.push(new_replaceData)
      this.inputData = {before:null,after:null}
    },
    save: function() {
      console.log("save")
      setStorage('regexp_replace_data',this.replaceData)
      this.saveMessage = true
      setTimeout(() => {
        this.saveMessage = false
      }, 2000)
    },
  
    delete: function(item) {
      console.log("del")
      console.log(item)
      const index = this.replaceData.indexOf(item)
      this.replaceData.splice(index, 1)
    }
  }
})

const otherSetting = new Vue({
  el: '.other',
  data: {
    otherData: {
      max_length: null
    },
    saveMessage: false
  },
  computed: {
    validation: function(){ 
      console.log(this.otherData.max_length)
      const pattern = /^\d+$/;    
      return pattern.test(this.otherData.max_length.trim())
    }
  },
  methods: {
    save: function(){
      setStorage('other_data',{max_length: this.otherData.max_length})
      this.saveMessage = true
      setTimeout(() => {
        this.saveMessage = false
      }, 2000)
    }
  }
})
})


  