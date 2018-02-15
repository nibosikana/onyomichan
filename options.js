chrome.storage.local.get(function (items) {
    var defaulttable =
            '<tbody><tr><th>置換前</th><th>置換後</th><th id="del">削除</th></tr><tr><td>https:\/\/[!-~]+</td><td>URL省略。</td><td><button type="submit" name="del" id="delete" class="delete">削除</button></td></tr><tr><td>http:\/\/[!-~]+</td><td>URL省略。</td><td><button type="submit" name="del" id="delete" class="delete">削除</button></td></tr><tr><td>&gt;&gt;</td><td>アンカー</td><td><button type="submit" name="del" id="delete" class="delete">削除</button></td></tr><tr><td>!aku</td><td>アク禁</td><td><button type="submit" name="del" id="delete" class="delete">削除</button></td></tr><tr><td>www*</td><td>ワラワラ</td><td><button type="submit" name="del" id="delete" class="delete">削除</button></td></tr></tbody>';
    if (items.tab === undefined) {
            items.tab = defaulttable;
            var table = document.getElementById('table');
            table.innerHTML = items.tab;
    } else {
            var table = document.getElementById('table');
            table.innerHTML = items.tab;
    }
    console.log(items.tab);
    console.log(items.words)
    document.getElementById('title-read').checked = items.title_read;
    document.getElementById('url-read').checked = items.url_read;
    document.getElementById('length').value = items.length || 2000;
    console.log(items.title_read);
    console.log(items.url_read);
    console.log(items.length);
});
window.onload = function () {
    var add = document.getElementById('add');
    add.addEventListener('click', function () {
            if (document.getElementById('before').value == "" || document.getElementById('after').value == "") {
                    alert('入力されていないため追加できません')
            } else {
                    var table = document.getElementById('table');
                    var before = document.getElementById('before').value;
                    var after = document.getElementById('after').value;
                    var del = ('<button type="submit" name="del" id="delete" class="delete" >削除</button>');
                    var newtr = table.insertRow(-1);
                    var cell1 = newtr.insertCell(-1);
                    var cell2 = newtr.insertCell(-1);
                    var cell3 = newtr.insertCell(-1);
                    cell1.innerText = before;
                    cell2.innerText = after;
                    cell3.innerHTML = del;
                    var reset_before = document.getElementById('before');
                    var reset_after = document.getElementById('after');
                    reset_before.value = '';
                    reset_after.value = '';
            }
    }, false);
    $(document).on("click", "#delete", function () {
            var a = $(this).closest('tr');
            $(a).remove();
    });
    document.getElementById('save').onclick = function () {
            var before = [];
            var after = [];
            var words = {
                    before: before,
                    after: after
            };
            var table = document.getElementById('table').innerHTML;
            var tr = $("table tr")
            for (var i = 1; i < tr.length; i++) {
                    var cells = tr.eq(i).children();
                    for (var j = 0; j < cells.length; j++) {
                            before[i - 1] = (cells.eq(j - 2).text());
                            after[i - 1] = (cells.eq(j - 1).text());
                    };
            };
            var savetext = document.getElementById('savetext');
            savetext.style.opacity = 1;
            console.log(savetext);
            window.setTimeout(function () {
                    var savetext = document.getElementById('savetext');
                    savetext.style.opacity = 0;
            }, 1500)
            var tab = document.getElementById('table').innerHTML;
            console.log(tab)
            chrome.storage.local.set({
                    tab: tab
            }, function () {});
            chrome.storage.local.set({
                    words: words
            }, function () {});
    };
    document.getElementById('save-other').onclick = function () {
            var title_read = document.getElementById('title-read');
            var tc = title_read.checked;
            console.log(tc);
            chrome.storage.local.set({
                    title_read: tc
            }, function () {});
            var url_read = document.getElementById('url-read');
            var ur = url_read.checked
            console.log(ur);
            chrome.storage.local.set({
                    url_read: ur
            }, function () {});
            var len = document.getElementById('length').value;
            console.log(len)
            chrome.storage.local.set({
                    length: len
            }, function () {});
            var savetextother = document.getElementById('savetext-other');
            savetextother.style.opacity = 1;
            window.setTimeout(function () {
                    var savetextother = document.getElementById('savetext-other');
                    savetextother.style.opacity = 0;
            }, 1500)
    };
};