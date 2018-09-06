$(window).on("load", () => {

  //ボタン画像
  const buttonIcon = (path) => {
    return chrome.extension.getURL(path);
  }

  //ボタンを追加
  $('body').append('<div id="buttonBox-onyomichan"></div>');
  $('#buttonBox-onyomichan').append(`<span id="playButton-onyomichan" v-show="isActive" v-on:click="play"><img src="{{ playIcon }}"/></span>`)
  $('#buttonBox-onyomichan').append(`<span id="pauseButton-onyomichan"v-show="!isActive" v-on:click="pause"><img src="{{ pauseIcon }}"/></span>`)
  $('#buttonBox-onyomichan').append(`<span id="stopButton-onyomichan" v-on:click="stop"><img src="{{ stopIcon }}"/></span>`)
  $('#buttonBox-onyomichan').append(`<span id="eyeButton-onyomichan" v-on:click="eye"><img src="{{ eyeIcon }}"/></span>`)
  $('#buttonBox-onyomichan').append('<span id="slashButton-onyomichan" v-on:click="slash">Slash</span>')



  //Clickイベント
  const buttonEvent = new Vue({
    el: '#buttonBox-onyomichan',
    data: {
      playIcon: buttonIcon('images/play.svg'),
      pauseIcon: buttonIcon('images/pause.svg'),
      stopIcon: buttonIcon('images/stop.svg'),
      eyeIcon: buttonIcon('images/eye.svg'),
      isActive: true
    },
    methods: {
      play: function(event) {
        this.isActive = !this.isActive

      },
      pause: function(event) {
        this.isActive = !this.isActive
        console.log(this.pauseIcon)
      },
      stop: function(event) {
        console.log(event)
      },
      eye: function(event) {
        console.log(event)
      },
      slash: function(event) {
        console.log(event)
      }
    }
  })
  console.log(buttonEvent)
})


const playEvent = () => {
  //レスを取得
  let RES = []
  $('dd').each(function( index ) {
    RES.push($(this.outerHTML).children('ares').empty().parent().text());
  });
  console.log(RES)
}
//  //html読み込み
//  $.get(chrome.extension.getURL('button.html'), function (data) {
//   $($.parseHTML(data)).appendTo('body');
// });
// window.addEventListener('beforeunload', function () {
//   speechSynthesis.cancel();
//   observer.disconnect();
// });
// $(document).ready(function () {
//   eye = document.getElementById("eye-btn")
//   slash = document.getElementById("slash-btn")
//   stop = document.getElementById("stop-btn")
//   var start = new Vue({
//     el: '.button-box',
//     data: {
//       seen: true
//     },
//     methods: {
//       start: function () {
//         this.seen = false
//         if (speechSynthesis.speaking == true) {
//           speechSynthesis.resume();
//         } else {
//           eye.style = "color:red";
//           eye.disabled = "true";
//           slash.disabled = 'true';
//           startEvent();
//           Mutation()
//         }
//       },
//       pause: function () {
//         this.seen = true
//         if (speechSynthesis.speaking == true) {
//           speechSynthesis.pause();
//         } else {
//           speechSynthesis.cancel();
//         }
//       },
//       stop: function () {
//         this.seen = true
//         eye.style.color = "";
//         eye.disabled = "";
//         slash.disabled = '';
//         speechSynthesis.cancel();
//         observer.disconnect();
//       },
//       eye: function () {
//         sb = document.getElementById("start-btn")
//         Mutation();
//         eye.style = "color:red";
//         eye.disabled = 'true';
//         sb.disabled = 'true';
//         stop.disabled = 'true';
//       },
//       slash: function () {
//         this.seen = true
//         eye.style.color = "";
//         eye.disabled = "";
//         sb.disabled = '';
//         stop.disabled = '';
//         speechSynthesis.cancel();
//         observer.disconnect();
//       }
//     }
//   })

//   function startEvent() {
//     chrome.storage.sync.get(function (result) {
//       speechSynthesis.cancel();
//       var num = $("#number").val()
//       var ares = $(`ares[num=${num}]`)[0];
//       var index = $("ares").get().indexOf(ares)
//       var last = $("dd").length
//       var dd = $("dd").slice(index, last);
//       var title = $("h1").get(0).textContent;
//       var res = dd.map(function (value, array) {
//         var t = $(array.outerHTML).children('ares').empty().parent().text();
//         if (t.length - 2 < result.other[1]) {
//           return t;
//         } else {}
//       })
//       var ss = new SpeechSynthesisUtterance();
//       if (result.other[0] == true) {
//         text = title
//         text += $.makeArray(res).join("");
//         Replace(result);
//         ss.text = text;
//       } else {
//         text = $.makeArray(res).join("");
//         Replace(result);
//         ss.text = text;
//       }
//       ss.rate = result.voices[0];
//       ss.pitch = result.voices[1];
//       ss.volume = result.voices[2];
//       ss.lang = 'ja';
//       speechSynthesis.speak(ss);
//       //console.log(ss);
//     })
//   }

//   function Mutation() {
//     var target = $('.thread').get(0);
//     observer = new MutationObserver(function () {
//       chrome.storage.sync.get(function (result) {
//         text = $($("dd").last()[0].outerHTML).children('ares').empty().parent().text();
//         Replace(result)
//         var ss = new SpeechSynthesisUtterance();
//         ss.rate = result.voices[0];
//         ss.pitch = result.voices[1];
//         ss.volume = result.voices[2];
//         ss.lang = 'ja';
//         ss.text = text;
//         speechSynthesis.speak(ss);
//         console.log(ss);
//       });
//     })
//     var config = {
//       childList: true
//     }
//     observer.observe(target, config)
//   }

//   function Replace(result) {
//     for (var k = 0; k < result.obj.before.length; k++) {
//       var targetStr = result.obj.before[k];
//       var bef = new RegExp(targetStr, "g");
//       var aft = result.obj.after[k];
//       text = text.replace(bef, aft);
//     }
//   }
// })