export default {
  get (key){
    try {
      
    } catch (e) {}
  },
  set (key, val) {
    try {
      chrome.storage.sync.set({[key]:val})
    } catch (e) {}
  },
  remove (key) {
    try {

    } catch (e) {}
  },
  clear () {
    try {

    } catch (e) {}
  }
}