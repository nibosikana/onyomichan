$(window).on("load", () => {

const voiceSetting = new Vue({
  el: '.onsei',
  data: {
    rateValue: 1,
    pitchValue: 1,
    volumeValue: 1,
  },
})
  //tab
  $('.menu .item').tab();

})
// window.onload = function () {
//   chrome.storage.sync.get(function (result) {
//     let voice = new Vue({
//       el: '.voice',
//       data: {
//         rv: result.voices[0],
//         pv: result.voices[1],
//         vv: result.voices[2]
//       },
//       computed: {
//         rate: function () {
//           return this.rv
//         },
//         pitch: function () {
//           return this.pv
//         },
//         volume: function () {
//           return this.vv
//         }
//       },
//       methods: {
//         save: function () {
//           let voices = [voice.rate, voice.pitch, voice.volume]
//           chrome.storage.sync.set({
//             voices: voices
//           }, function () {
//             console.log(voices);
//           });
//           saveMessage();
//         },
//         test: function () {
//           speechSynthesis.cancel();
//           var ss = new SpeechSynthesisUtterance();
//           ss.rate = voice.rate;
//           ss.pitch = voice.pitch;
//           ss.volume = voice.volume;
//           ss.lang = 'ja';
//           ss.text = '「おーーーぷんにちゃんねる」へようこそ'
//           speechSynthesis.speak(ss);
//         }
//       }
//     });    
//   });
//   let table = new Vue({
//     el: '#menu2',
//     methods: {
//       add: function () {
//         if (document.getElementById('before').value == "" || document.getElementById('after').value == "") {} else {
//           let table = document.getElementById('table')
//           let tr = table.insertRow(-1);
//           let td1 = tr.insertCell(-1);
//           let td2 = tr.insertCell(-1);
//           let td3 = tr.insertCell(-1);
//           td1.innerHTML = this.before;
//           td1.className = "bef"
//           td2.innerHTML = this.after;
//           td2.className = "aft"
//           td3.innerHTML = '<button class="btn btn-danger" id="delete">削除</button>';
//         }
//       },
//       save: function () {
//         saveMessage();
//         let bef = document.getElementsByClassName("bef");
//         let aft = document.getElementsByClassName("aft");
//         console.log(bef, aft)
//         var objbefore = []
//         var objafter = []
//         var forEach = Array.prototype.forEach;
//         forEach.call(bef, function (b) {
//           objbefore.push(b.textContent)
//         });
//         forEach.call(aft, function (a) {
//           objafter.push(a.textContent)
//         });
//         var obj = {
//           before: objbefore,
//           after: objafter
//         }
//         chrome.storage.sync.set({
//           obj: obj
//         }, function () {
//           console.log(obj);
//         });
//       }
//     }
//   })
//   $(document).on("click", "#delete", function () {
//     var a = $(this).closest('tr');
//     $(a).remove();
//   });
//   chrome.storage.sync.get(function (result) {
//     let other = new Vue({
//       el: '#other',
//       data: {
//         tr: result.other[0],
//         le: result.other[1]
//       },
//       methods: {
//         save: function () {
//           let title = document.getElementById("title-read").checked;
//           let len = document.getElementById("length").value;
//           let other = [title, len];
//           chrome.storage.sync.set({
//             other: other
//           }, function () {
//             console.log(other);
//           });
//           saveMessage();
//         }
//       }
//     })
//   });
//   chrome.storage.sync.get(function (result) {
//     console.log(result.obj)
//     for (let i = 0; i < result.obj.before.length; i++) {
//       let table = document.getElementById("table");
//       let tr = table.insertRow(-1);
//       let td1 = tr.insertCell(-1);
//       let td2 = tr.insertCell(-1);
//       let td3 = tr.insertCell(-1);
//       td1.innerHTML = result.obj.before[i];
//       td1.className = "bef"
//       td2.innerHTML = result.obj.after[i];
//       td2.className = "aft"
//       td3.innerHTML = '<button class="btn btn-danger" id="delete">削除</button>';
//     }
//   })
  
// };

// function saveMessage() {
//   let st = document.getElementById('savetext');
//   st.style.opacity = 1;
//   window.setTimeout(function () {
//     st.style.opacity = 0;
//   }, 1500);
// }
