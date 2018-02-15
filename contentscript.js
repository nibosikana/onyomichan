//html読み込み
$.get(chrome.extension.getURL('./button.html'), function (data) {
    $($.parseHTML(data)).appendTo('body');
});
//リロードした時にキャンセルする
window.addEventListener('beforeunload', function () {
    speechSynthesis.cancel();
    mo.disconnect();
});
//chrome.storage
chrome.storage.local.get(function (items) {
    var words = items.words || {
            before: ['https://[!-~]+', 'http://[!-~]+', '>>', '!aku', 'www*'],
            after: ['URL省略。', 'URL省略。', 'アンカー', 'アク禁', 'ワラワラ']
    };
    console.log(words);
    var title_read = items.title_read || false;
    console.log(title_read);
    items.length = items.length || 2000;
    console.log(items.length)
    //再生
    $('#start-btn').click(function () {
            speechSynthesis.cancel();
            startEvent();
    });
    //一時停止（ストップ）
    $('#stop-btn').click(function () {
            speechSynthesis.pause();
    });
    //一時停止解除
    $('#resume-btn').click(function () {
            speechSynthesis.resume();
    });
    //リセット
    $('#reset-btn').click(function () {
            speechSynthesis.cancel();
            mo.disconnect();
            document.getElementById('newthread-btn').disabled = '';
            document.getElementById('start-btn').disabled = '';
    });
    //キーボード操作
    $(function ($) {
            $(window).keydown(function (e) {
                    //Ctrlキー+qキー
                    if (event.ctrlKey) {
                            if (e.keyCode === 81) {
                                    speechSynthesis.cancel();
                                    startEvent();
                                    return false;
                            }
                    }
                    //Ctrlキー+wキー   
                    if (event.ctrlKey) {
                            if (e.keyCode === 87) {
                                    document.getElementById('newthread-btn').disabled = '';
                                    document.getElementById('start-btn').disabled = '';
                                    speechSynthesis.cancel();
                                    mo.disconnect();
                                    return false;
                            }
                    }
                    //Ctrlキー+eキー   
                    if (event.ctrlKey) {
                            if (e.keyCode === 69) {
                                    speechSynthesis.resume();
                                    return false;
                            }
                    }
                    //Ctrlキー+rキー   
                    if (event.ctrlKey) {
                            if (e.keyCode === 82) {
                                    speechSynthesis.pause();
                                    return false;
                            }
                    }
            })
    });

    function startEvent() {
            document.getElementById('newthread-btn').disabled = 'true';
            document.getElementById('start-btn').disabled = 'true';
            var number = document.getElementById('number').value;
            var ti = document.getElementsByTagName('h1')[0].innerText;
            var title = ti;
            var text = [];
            var tes = [];
            var mm = number;
            var aa = $(`ares[num=${mm}]`)[0];
            var dd = document.getElementsByTagName('dd');
            var are = document.getElementsByTagName('ares');
            are = [].slice.call(are);
            var index = are.indexOf(aa);
            console.log(items.url_read)
            console.log(items.length);
            for (var i = index; i < dd.length; i++) {
                    if (items.url_read === true) {
                            var text = $($("dd")[i].outerHTML).children().empty().parent().text();
                    } else {
                            var text = $($("dd")[i].outerHTML).children('ares').empty().parent().text();
                    }
                    if (text.length < items.length) {
                            tes.push(text);
                    } else {
                            console.log(text.length)
                    }
                    console.log(text)
            }
            test = tes.join('');
            var thread = title + test;
            console.log(words);
            for (var i = 0; i < words.before.length; i++) {
                    var aft = words.after[i];
                    var targetStr = words.before[i];
                    var regExp = new RegExp(targetStr, "g");
                    thread = thread.replace(regExp, aft);
                    console.log(regExp, aft);
            }
            var ss = new SpeechSynthesisUtterance();
            if (title_read === true) {
                    for (var i = 0; i < words.before.length; i++) {
                            var aft = words.after[i];
                            var targetStr = words.before[i];
                            var regExp = new RegExp(targetStr, "g");
                            thread = thread.replace(regExp, aft);
                    }
                    ss.text = thread;
            } else {
                    for (var i = 0; i < words.before.length; i++) {
                            var aft = words.after[i];
                            var targetStr = words.before[i];
                            var regExp = new RegExp(targetStr, "g");
                            test = test.replace(regExp, aft);
                    }
                    ss.text = test;
            }
            ss.rate = items.rate || 1;
            ss.pitch = items.pitch || 1;
            ss.volume = items.vol || 1;
            ss.lang = 'ja';
            speechSynthesis.speak(ss);
            console.log(ss);
            var target = document.getElementsByClassName('thread')[0];

            function newThread() {
                    var hh = target.lastChild;
                    var newth = [];
                    if (items.url_read === true) {
                            var newtt = $(hh.childNodes[2].outerHTML).children().empty().parent().text();
                    } else {
                            var newtt = $(hh.childNodes[2].outerHTML).children('ares').empty().parent().text();
                    }
                    if (newtt.length < items.length) {
                            newth.push(newtt)
                    } else {}
                    newt = newth.join('');
                    for (var i = 0; i < words.before.length; i++) {
                            var aft = words.after[i];
                            var targetStr = words.before[i];
                            var regExp = new RegExp(targetStr, "g");
                            newt = newt.replace(regExp, aft);
                    }
                    var ss = new SpeechSynthesisUtterance();
                    ss.text = newt;
                    ss.volume = items.vol || 1.0;
                    ss.rate = items.rate || 1.0;
                    ss.pitch = items.pitch || 1.0;
                    ss.lang = 'ja';
                    speechSynthesis.speak(ss);
                    console.log(ss);
            }
            mo = new MutationObserver(newThread);
            mo.observe(target, {
                    childList: true
            });
    }
    //新規スレ読み上げ
    $('#newthread-btn').click(function () {
            document.getElementById('newthread-btn').disabled = 'true';
            document.getElementById('start-btn').disabled = 'true';
            var target = document.getElementsByClassName('thread')[0];

            function newThread() {
                    var hh = target.lastChild;
                    var newth = [];
                    if (items.url_read === true) {
                            var newtt = $(hh.childNodes[2].outerHTML).children().empty().parent().text();
                    } else {
                            var newtt = $(hh.childNodes[2].outerHTML).children('ares').empty().parent().text();
                    }
                    if (newtt.length < items.length) {
                            newth.push(newtt)
                    } else {}
                    newt = newth.join('');
                    for (var i = 0; i < words.before.length; i++) {
                            var aft = words.after[i];
                            var targetStr = words.before[i];
                            var regExp = new RegExp(targetStr, "g");
                            newt = newt.replace(regExp, aft);
                    }
                    var ss = new SpeechSynthesisUtterance();
                    ss.text = newt;
                    ss.volume = items.vol || 1.0;
                    ss.rate = items.rate || 1.0;
                    ss.pitch = items.pitch || 1.0;
                    ss.lang = 'ja';
                    speechSynthesis.speak(ss);
                    console.log(ss);
            }
            mo = new MutationObserver(newThread);
            mo.observe(target, {
                    childList: true
            });
    });
    //新規スレ読み上げやめる
    $('#newthread-stop-btn').click(function () {
            document.getElementById('newthread-btn').disabled = '';
            document.getElementById('start-btn').disabled = '';
            speechSynthesis.cancel();
            mo.disconnect();
    });
});