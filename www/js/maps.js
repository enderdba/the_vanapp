function showMap(dmap, smap, latitude, longitude) {
    var container = dmap.get(0);
    var map = new google.maps.Map(container, {
        center: { lat: latitude, lng: longitude },
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
        getPosition(marker, map, smap);
    });
    ubiqBtn.innerHTML = "<i class='material-icons'>gps_fixed</i>";
    ubiqBtn.className = "btn mapControls";
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(volverBtn);
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(ubiqBtn);


    google.maps.event.addListener(map, 'click', function (event) {
        placeMarker(event.latLng, marker, map, smap);
    });
    smap.click(function () {
        toggleMap(marker, map, smap);
        alreadyAuto = true;
    });
}

function placeMarker(location, marker, map, smap) {
    marker.setPosition(location);
    map.panTo(location)
    map.setZoom(18);
    console.log(location.lat(), ",", location.lng());
    loadStaticMap(location.lat(), location.lng(), smap);
}

function loadStaticMap(lat, lng, smap) {
    smap
        .show()
        .attr("src",
        "https://maps.googleapis.com/maps/api/staticmap?zoom=18"
        + "&center=" + lat + "," + lng + "&size=" + smap.width().toFixed(0) + "x100&zoom=9&maptype=roadmap&markers=color:red%7Clabel:A%7C" + lat + "," + lng + "&key=AIzaSyBvzD6w4CpxJu_giqVDSJ43pBN7TTcLMfQ")
        .css({
            "margin-top": "0px"
        })
}

function getPosition(marker, map, smap) {
    navigator.geolocation.getCurrentPosition(function (position) {
        myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        placeMarker(myLatlng, marker, map, smap);
    });
}

function toggleMap(marker, map, smap) {
    $(".gmnoprint").hide();
    $('#map img.gm-fullscreen-control').parent("button").trigger('click');
    if (!alreadyAuto) {
        getPosition(marker, map, smap);
    }
}

function triggerMap(smap) {
    smap.css({
        "width": "100%",
        "height": "100%"
    })
}