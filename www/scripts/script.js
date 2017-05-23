var xmlhttp, obj;
var url = 'http://localhost:3000/getFeed'

$(document).ready(function () {
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      populatePopup(JSON.parse(xmlhttp.responseText))
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

});

function populatePopup (data) {
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var divLabel1 = document.createElement('div');
    $(divLabel1).addClass('feed-wrap');

    var divLabel2 = document.createElement('div');
    $(divLabel2).addClass('feed-content');

    var feedImage = document.createElement('a');
    var feedTitle = document.createElement('a');
    var feedDesc = document.createElement('p');

    $(feedTitle).addClass('feed-title');
    $(feedDesc).addClass('feed-desc');
    $(feedImage).addClass('feed-img');

    feedTitle.setAttribute('href', item.url);
    feedTitle.setAttribute('target', '_blank');

    feedImage.setAttribute('target', '_blank');

    var img_url = item.img_url ? item.img_url : 'www/imgs/nodexperts.jpg';

    $('<img />').attr({
      src: img_url,
    }).addClass('feed-img').appendTo(feedImage);

    feedTitle.innerHTML = item.title;
    feedDesc.innerHTML = item.description;

    $(divLabel2).append(feedImage);
    $(divLabel2).append(feedTitle);
    $(divLabel2).append(feedDesc).addClass('feed-desc');

    $(divLabel1).append(divLabel2);
    $(".feeds").append(divLabel1);
  }
}
