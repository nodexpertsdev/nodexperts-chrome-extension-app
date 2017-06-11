/**
 * @file Hits API every 30 mins and if response is `object` and then creates a new Notification
 */

var nxLatestURL = 'https://nx-feed-server.herokuapp.com/checkForFeeds'
var intervalTime = 1800000/10; // 30 mins

function fetchLatestNXFeeds() {
 xmlhttp = new XMLHttpRequest();
 xmlhttp.onreadystatechange = function() {
   if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
     feed = JSON.parse(xmlhttp.responseText);
     if (typeof feed === 'object') {
       new Notification(feed.title, {
         body: feed["description"],
         icon: feed["img_url"]
       });
     }
   }
 }
 xmlhttp.open("GET", nxLatestURL, true);
 xmlhttp.send();
}


setInterval(function () {
  fetchLatestNXFeeds();
}, intervalTime);
