var d = document;
var whn = window.location.hostname;
var site = ['mangaindo.web.id','www.mangacanblog.com','kazemanga.xyz','www.manhwa-san.xyz'];
var img = d.querySelectorAll('#readerarea img');
var img1 = d.querySelectorAll('.reading-content img');
var img2 = d.querySelectorAll('.read-container img');
var img3 = d.querySelectorAll('.entry-content img');
var img4 = d.querySelectorAll('#imgholder img');
var img5 = d.querySelectorAll('.badan img');
var img6 = d.querySelectorAll('.post-body.post-content img');
var imgRead = img1.length != 0 ? img1 : img2.length != 0 ? img2 : whn == site[0] ? img3 : whn == site[1] ? img4 : whn == site[2] ? img5 : whn == site[3] ? img6 : img;

for (var i = 0; i < imgRead.length; i++) {
  if (imgRead[i].dataset.lazySrc) {
    imgRead[i].src = imgRead[i].dataset.lazySrc;
    delete imgRead[i].dataset.lazySrc;
  }
  if (imgRead[i].src.indexOf('docs.google') != -1) {
    imgRead[i].src = imgRead[i].src.replace(/https?:\/\/docs\.google\.com\/uc\?export=view&id=(.*)/g, 'https://lh3.googleusercontent.com/d/$1=s15000').replace(/i\d+\.wp\.com\//g, '');
  } else {
    imgRead[i].src = imgRead[i].src.replace(/\/((?:s|w|h)(?:\d{2}|\d{3}|\d{4})(?:[\-a-zA-Z]+)?)\//g, '/s15000/');
  }
  imgRead[i].src = imgRead[i].src.replace(/i\d+\.wp\.com\//g, '');
}
