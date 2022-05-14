
var map = L.map('map');
var tiles;
var lokacija;

var coor = {};

navigator.geolocation.getCurrentPosition(createMap);

function createMap(position) {
    map.setView([position.coords.latitude, position.coords.longitude], 20);

    tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);

    fetch("http://localhost:3000/posts").then(result => {
        return result.json();
    }).then(result => {
        for (var i = 0; i < result.length; i++) {
            L.marker({lat: result[i].lat, lng: result[i].lng}).addTo(map);
        }
    })
}

map.on('click', function(e) {
    if (lokacija == null) {
        lokacija = new L.marker(e.latlng).addTo(map);
        coor = e.latlng;
        $("#cpy-btn").css('background-color','#1abc9c');
        $("#cpy-btn").css('color','white');
        $("#cpy-btn").css('pointer-events','all');
    } else {
        lokacija.setLatLng(e.latlng);
        coor = e.latlng;
        $("#cpy-btn").css('background-color','#1abc9c');
        $("#cpy-btn").css('color','white');
        $("#cpy-btn").css('pointer-events','all');
    }
});

$("#cpy-btn").on("click", function(e) {
    $("#lat").val(coor.lat);
    $("#lng").val(coor.lng);
});

$( "#closeLoginModal" ).click(function() {
    $('#LoginModal').modal('hide');
});

$( "#closeRegisterModal" ).click(function() {
    $('#RegisterModal').modal('hide');
});

$('#login').on('submit', function(e) {
    e.preventDefault();
    url=""
    data = {"username": $('#usernameLogin').val(),"password": $('#passwordLogin').val()};
    $.ajax({
        type: "POST",
        url: url,
        data: data
    });

    $('#usernameLogin').val("");
    $('#passwordLogin').val("");
    $('#LoginModal').modal('hide');
});

$('#register').on('submit', function(e) {
    e.preventDefault();
    url=""
    data = {"username": $('#usernameRegister').val(),"password": $('#passwordRegister').val()};
    $.ajax({
        type: "POST",
        url: url,
        data: data
    });

    $('#usernameRegister').val("");
    $('#passwordRegister').val("");
    $('#RegisterModal').modal('hide');
});

$('#spotForm').on('submit', function(e) {
    e.preventDefault();
    url="/posts"
    data = {"lat": $('#lat').val(),"lng": $('#lng').val(),"cleaned": false};
    // $.ajax({
    //     type: "POST",
    //     url: url,
    //     data: data
    // });
    $.post(url, data);

    $('#lat').val("");
    $('#lng').val("");
});

