//flags
var alreadyAuto = false;
if (window.cordova != undefined) {
  document.addEventListener("deviceready", onDeviceReady, false);
} else {
  $(document).ready(function () {
    onDeviceReady();
  })
}

function onDeviceReady() {
  var smap = $(".map-salvaje");
  smap.hide();
  var dmap = $("#map");
  navigator.geolocation.getCurrentPosition(function (position) {
    loadStaticMap(position.coords.latitude, position.coords.longitude, smap);
    showMap(smap, dmap, position.coords.latitude, position.coords.longitude);
  });
  $(".logo").transition({
    "opacity": "1.0",
  }, 1000, function () {
    $(".logo").transition({
      "margin-top": "50%"
    }, 1000, function () {
      $(".logo").transition({
        "margin-top": "2%",
        "opacity": "0"
      }, 1000, function () {
        $(".logo").hide();
        $(".vform").transition({
          "opacity": "1.0"
        }, 1000);
        $(this).addClass("responsive-img");
      });
      setTimeout(function () {
        $("nav").transition({
          "opacity": "1"
        }, 1000);
      }, 500);
    });
  });

  $(".slide").click(function (e) {
    e.preventDefault();
    if (window.cordova != undefined) {
      window.plugins.nativepagetransitions.slide({
        // the defaults for direction, duration, etc are all fine
        "href": "boi.html"
      });
    } else {
      window.location.href = "boi.html";
    }
  });

  /*cordova.plugins.notification.local.schedule({
    title: "New Message",
    message: "Hi, are you ready? We are waiting."
});*/
}




