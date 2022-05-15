
var map = L.map('map');
var tiles;
var lokacija;

var username = "";
var password = "";
var points = 0;

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

//Login
$('#login').on('submit', function(e) {
    e.preventDefault();
    url=""
    // data = {"username": $('#usernameLogin').val(),"password": $('#passwordLogin').val()};
    // $.post(url, data);


    username = $('#usernameLogin').val();
    password = $('#passwordLogin').val();


    validUsername = false;
    fetch("http://localhost:3000/users").then(result => {
        return result.json();
    }).then(result => {
        for (var i = 0; i < result.length; i++) {
            if (username === result[i].username){
                found = true;
                if(password === result[i].password){
                    $('#user').html(username);
                    $('#user-footer').html(username);
                    points = result[i].points;
                    validUsername = true;
                }
                else{
                    alert("Wrong username and password combination");
                }
            }
        }
        if(!validUsername)
            alert("Username does not exist");
        $('#points').html(points);
    });



    $('#usernameLogin').val("");
    $('#passwordLogin').val("");
    $('#LoginModal').modal('hide');
});

//Registration
$('#register').on('submit', function(e) {
    e.preventDefault();
    url="/users"
    data = {"username": $('#usernameRegister').val(),"password": $('#passwordRegister').val()};

    usernameTaken = false;
    fetch("http://localhost:3000/users").then(result => {
        return result.json();
    }).then(result => {

        for(var i = 0; i<result.length; i++){
            if(data.username === result[i].username){
                usernameTaken = true;
                alert("Username is already taken.");
                break;
            }   
        }

    });

    if(!usernameTaken)
        $.post(url, data);

    $('#usernameRegister').val("");
    $('#passwordRegister').val("");
    $('#RegisterModal').modal('hide');
});

//Submitting coordinates
$('#spotForm').on('submit', function(e) {
    e.preventDefault();
    url="/posts"
    data = {"lat": $('#lat').val(),"lng": $('#lng').val(),"status": true, "username" : username};
    $.post(url, data);

    //to je nrdu zan

    var patch = {
        "points" : ++points
    }
    
    $.ajax({
       type: 'PATCH',
       url: "/users/" + username,
       data: patch
    //    processData: false,
    //    contentType: 'application/merge-patch+json',
    
       /* success and error handling omitted for brevity */
    });


    if(username != null){
        $('#points').html(points);
    }

    $('#lat').val("");
    $('#lng').val("");
});

