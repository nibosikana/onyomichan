$(window).on("load", () => {

  chrome.storage.sync.get(null,(result) => {
    console.log(result)
    replacementSetting.repData = result.repData;
    otherSetting.strLimit = result.strLimit;
  })
  
  const setStorage = (key,val) => {
    chrome.storage.sync.set({[key]:val})
  }

  const replacementSetting = new Vue({
    el: '.tikan',
    data: {
      form: {
        before: null,
        after: null
      },
      repData: [],
      saveMessage: false
  },
  computed: {
    validation: function() {
      console.log('validation')
      if(!(this.form.before && this.form.after)) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    add: function() {
      console.log("add")
      let newRepData = {
        before:this.form.before,
        after:this.form.after
      }
      this.repData.push(newRepData)
      this.form = {before:null,after:null}
  
    },
    save: function() {
      console.log("save")
      setStorage('repData',this.repData)
      this.saveMessage = true
      setTimeout(() => {
        this.saveMessage = false
      }, 2000)
    },
  
    delete: function(item) {
      console.log("del")
      console.log(item)
      const index = this.repData.indexOf(item)
      this.repData.splice(index, 1)
    }
  
  }
})

const otherSetting = new Vue({
  el: '.other',
  data: {
    strLimit: null,
    saveMessage: false
  },
  computed: {
    validation: function(){ 
      console.log(this.strLimit)
      const pattern = /^\d+$/;    
      return pattern.test(this.strLimit.trim())
    }
  },
  methods: {
    save: function(){
      setStorage('strLimit',Number(this.strLimit))
      this.saveMessage = true
      setTimeout(() => {
        this.saveMessage = false
      }, 2000)
    }
  }
})
})


  