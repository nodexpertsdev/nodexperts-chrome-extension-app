var xmlhttp, obj;
var url = 'http://nodexperts.com/blog/wp-json/wp/v2/news'
var feeds = [];
var intervalTime = 1800000; // 30 minutes

function callNXNewsApi() {
  console.log('NX end point hitting');
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      feeds = JSON.parse(xmlhttp.responseText);
      populatePopup(feeds.splice(0, 20))
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

$(document).ready(function () {

  callNXNewsApi();
  setInterval(function () {
    callNXNewsApi();
  }, intervalTime);

  $('.category-btn').click('click', function () {
    toggleDisplay('.category-list');
  });

  $('#blogs').click('click', function () {
    var feedsByBlogs = feeds.filter(function (feed) {
      return feed.type === 'blogs';
    });
    populatePopup(feedsByBlogs);
  });

  $('#packages').click('click', function () {
    var feedsByBlogs = feeds.filter(function (feed) {
      return feed.type === 'packages';
    });
    populatePopup(feedsByBlogs);
  });

  $('#workshops').click('click', function () {
    var feedsByBlogs = feeds.filter(function (feed) {
      return feed.type === 'workshops';
    });
    populatePopup(feedsByBlogs);
  });

  $('#daily-quotes').click('click', function () {
    var feedsByBlogs = feeds.filter(function (feed) {
      return feed.type === 'daily-quotes';
    });
    populatePopup(feedsByBlogs);
  });

  $('#news').click('click', function () {
    var feedsByBlogs = feeds.filter(function (feed) {
      return feed.type === 'news';
    });
    populatePopup(feedsByBlogs);
  });
});

function toggleDisplay(elm) {
  if ($(elm).css('display') === 'block') {
    $(elm).css('display', 'none');
  } else {
    $(elm).css('display', 'block');
  }
}

function populatePopup (data) {
  $(".feeds").html('');
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var divLabel1 = document.createElement('div');
    $(divLabel1).addClass('feed-wrap');

    var divLabel2 = document.createElement('div');
    $(divLabel2).addClass('feed-content');

    var feedImage = document.createElement('a');
    var feedTitle = document.createElement('a');
    var feedDesc = document.createElement('p');
    var feedTime = document.createElement('time');

    $(feedTitle).addClass('feed-title');
    $(feedDesc).addClass('feed-desc');
    $(feedImage).addClass('feed-img');
    $(feedTime).addClass('feed-time');

    feedTitle.setAttribute('href', item.url);
    feedTitle.setAttribute('target', '_blank');

    feedImage.setAttribute('target', '_blank');

    var img_url = item.img_url ? item.img_url : 'www/imgs/nodexperts.jpg';

    $('<img />').attr({
      src: img_url,
    }).addClass('feed-img').appendTo(feedImage);

    feedTitle.innerHTML = item.title.rendered;
    feedDesc.innerHTML = item.content.rendered;
    feedTime.innerHTML = new Date(item.date).toUTCString();

    $(divLabel2).append(feedImage);
    $(divLabel2).append(feedTitle).append(feedTime);
    $(divLabel2).append(feedDesc).addClass('feed-desc');

    $(divLabel1).append(divLabel2);
    $(".feeds").append(divLabel1);
  }
}
