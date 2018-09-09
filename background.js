const initialValue = (key,val) => {
  chrome.storage.sync.set({[key]:val})
}

initialValue('rateValue',1)
initialValue('pitchValue',1)
initialValue('volumeValue',1)