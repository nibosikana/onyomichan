// firstvoices = [1, 1, 1]
// firstobj = {
//   before: ["(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)", "www*", ">>", "!aku"],
//   after: ["URL省略。", "ワラワラ", "アンカー", "アク禁"]
// }
// firstother = [false, 2000]
// chrome.storage.sync.set({
//   voices: firstvoices
// }, function () {
//   console.log(voices);
// });
// chrome.storage.sync.set({
//   obj: firstobj
// }, function () {
//   console.log(voices);
// });
// chrome.storage.sync.set({
//   other: firstother
// }, function () {
//   console.log(other);
// });