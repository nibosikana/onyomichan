
//htmlファイルを読み込む
// var mesg = document.querySelector('.mesg');
// mesg = '<test>' + mesg.outerHTML + '</test>';
// console.log(mesg);

//javascriptでもhtmlファイル読み込みやってみた
// $.get(chrome.extension.getURL('./popup.html'),function(data){
//     $($.parseHTML(data))
//       .insertAfter('h1');
//   });


//areaタグをddタグの後ろに移動したい（試行錯誤）
// $('ares').wrap('<res class="aiu">');
// $('dd').wrap('<tex>');
//$("ares").insertAfter("dd");



//リロードした時にキャンセルする
window.addEventListener('beforeunload', function(){
    speechSynthesis.cancel();
  });


//ボタン設置（仮）
$('h1').after('<button id="reset-btn">停止</button>');
$('h1').after('<button id="resume-btn">再開</button>');
$('h1').after('<button id="stop-btn">一時停止</button>');
$('h1').after('<button id="start-btn">開始</button>');


$(function () {
    $('dd').attr('class', 'tx');
});
$(function () {
    $('dd').attr('id', 'tx');
});
$(function () {
    $('ares').attr({'id':'ares','class':'ares'});
});



//開始ボタン
document.getElementById('start-btn').onclick = function(){
    

    //ddタグを取得
var str = document.getElementsByTagName("dd");



    //スレの数だけ繰り返す
    for(var i = 0; i < str.length; i++){

        var thread = $($("dd")[i].outerHTML).children().empty().parent().text();
         console.log(thread);
        
    //テキストを取得して、再生する
    //var thread = str[i].childNodes[0].textContent;
    //var thread = str[i].firstChild.textContent;
    //console.log(thread);

    var ss = new SpeechSynthesisUtterance (thread);
    var voice = window.speechSynthesis.getVoices();

    //音質の設定など
    ss.lang = 'ja-JP'
    ss.pitch = 1.5;
    ss.volume = 0.1;
    ss.rate = 1.2;
    speechSynthesis.speak(ss);
    
    }
};


//一時停止（ストップ）
document.getElementById('stop-btn').onclick = function(){
    speechSynthesis.pause();
};


//一時停止解除
document.getElementById('resume-btn').onclick = function(){
    speechSynthesis.resume();
};
 

//リセット
document.getElementById('reset-btn').onclick = function(){
    speechSynthesis.cancel();
    
};







  





  
 