//flags
var alreadyAuto = false;

if (typeof cordova === null) {
  document.addEventListener("deviceready", onDeviceReady, false);
} else {
  $(document).ready(function () {
    onDeviceReady();
  })
}

function triggerMap() {
  $("#map").css({
    "width": "100%",
    "height": "100%"
  })
}

function onDeviceReady() {
  $(".map-salvaje").hide();
  navigator.geolocation.getCurrentPosition(function (position) {
    loadStaticMap(position.coords.latitude, position.coords.longitude);
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
    if (typeof cordova !== null) {
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

function showMap() {
  var container = $('#map').get(0);
  var map = new google.maps.Map(container, {
    center: { lat: 10.578474, lng: -71.612383 },
    zoom: 10,
    fullscreenControl: false,
    disableDefaultUI: true
  });

  var marker = new google.maps.Marker({
    map: map,
    draggable: true
  });

  var volverBtn = document.createElement("a");
  volverBtn.innerHTML = "VOLVER";
  volverBtn.className = "btn mapControls";
  volverBtn.addEventListener('click', toggleMap);
  var ubiqBtn = document.createElement("a");
  ubiqBtn.addEventListener('click', function () {
    getPosition(marker, map);
  });
  ubiqBtn.innerHTML = "<i class='material-icons'>gps_fixed</i>";
  ubiqBtn.className = "btn mapControls";
  map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(volverBtn);
  map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(ubiqBtn);


  google.maps.event.addListener(map, 'click', function (event) {
    placeMarker(event.latLng, marker, map);
  });
  $('.map-salvaje').click(function () {
    toggleMap(marker, map);
    alreadyAuto = true;
  });
}

function placeMarker(location, marker, map) {
  marker.setPosition(location);
  map.panTo(location);
  map.setZoom(18);
  console.log(location.lat(), ",", location.lng());
  loadStaticMap(location.lat(), location.lng());
}

function loadStaticMap(lat, lng) {
  $('.map-salvaje').show();
  $('.map-salvaje').attr("src", "https://maps.googleapis.com/maps/api/staticmap?zoom=18&center=" + lat + "," + lng + "&size=" + $(".map-salvaje").width().toFixed(0) + "x100&zoom=9&maptype=roadmap&markers=color:red%7Clabel:A%7C" + lat + "," + lng + "&key=AIzaSyBvzD6w4CpxJu_giqVDSJ43pBN7TTcLMfQ");
  $('.map-salvaje').css({
    "margin-top": "0px"
  })
}

function getPosition(marker, map) {
  navigator.geolocation.getCurrentPosition(function (position) {
    myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    placeMarker(myLatlng, marker, map);
  });
}

function toggleMap(marker, map) {
  $(".gmnoprint").hide();
  $('#map img.gm-fullscreen-control').parent("button").trigger('click');
  if (!alreadyAuto) {
    getPosition(marker, map);
  }
}
