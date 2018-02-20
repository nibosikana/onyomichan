window.onload = function () {
        //数値を表示する
        $(window).ready(function () {
          $('#synRate').on('input', function () {
            var rate = '#' + $(this).attr('data-input');
            var val = $(this).val();
            $(rate).val(val);
          });
          $('#synPitch').on('input', function () {
            var pitch = '#' + $(this).attr('data-input');
            var val = $(this).val();
            $(pitch).val(val);
          });
          $('#synVol').on('input', function () {
            var vol = '#' + $(this).attr('data-input');
            var val = $(this).val();
            $(vol).val(val);
          });
          //設定を保存する
          $('#save').click(function () {
            //レート、ピッチ、ボリュームを取得する
            var rate_val = document.getElementById('synRate').value;
            var pitch_val = document.getElementById('synPitch').value;
            var vol_val = document.getElementById('synVol').value;
            //storageに保存する
            chrome.storage.local.set({
              rate: rate_val
            }, function () {});
            chrome.storage.local.set({
              pitch: pitch_val
            }, function () {});
            chrome.storage.local.set({
              vol: vol_val
            }, function () {});
            var savepopup = document.getElementById('savepopuptext');
            savepopup.style.opacity = 1;
            window.setTimeout(function () {
              var savepopup = document.getElementById('savepopuptext');
              savepopup.style.opacity = 0;
            }, 1500)
          });
        });
        $('#test').click(function () {
          speechSynthesis.cancel();
          var rate_val = document.getElementById('synRate').value;
          var pitch_val = document.getElementById('synPitch').value;
          var vol_val = document.getElementById('synVol').value;
          var ss = new SpeechSynthesisUtterance();
          ss.rate = rate_val;
          ss.pitch = pitch_val;
          ss.volume = vol_val;
          ss.lang = 'ja';
          ss.text = '「おーーーぷんにちゃんねる」へようこそ'
          speechSynthesis.speak(ss);
        });
        //現在の値を表示
        $(function () {
          chrome.storage.local.get(function (items) {
            items.vol = items.vol || 1.0;
            console.log(items.vol);
            document.getElementById('synVol').value = items.vol;
            document.getElementById('input3').value = items.vol;
            items.rate = items.rate || 1.0;
            console.log(items.rate);
            document.getElementById('synRate').value = items.rate;
            document.getElementById('input1').value = items.rate;
            items.pitch = items.pitch || 1.0;
            console.log(items.pitch);
            document.getElementById('synPitch').value = items.pitch;
            document.getElementById('input2').value = items.pitch;
          });
        });
      };