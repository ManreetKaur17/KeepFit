//========================== below working
var map;
var service;
var infowindow;
var fullInfowindow;

//-----

var yourInfoWindow;
var lati, longi;
var pos;
var request;
var request2;
var radius = 2000;
var zoomLevel = 14;
var searchType = 'park';

function searchArea(type) {
    console.log("Type selected: " + type);
    document.getElementById("typeHeading").innerHTML = type.substring(0, 1).toUpperCase() + type.substring(1) + "s";
    searchType = type;
    displayPlaces(lati, longi);
}



//------- selected distance

function changeDistance() {

    var e = document.getElementById("distanceSelect");
    var value = e.options[e.selectedIndex].value;
    //      console.log("Value: " + value);
    radius = value * 1000;
    //      console.log("Selectes rsdius: " + radius);

    let scale = radius / 500;
    zoomLevel = 16 - Math.log(scale) / Math.log(2);
    zoomLevel = parseInt(zoomLevel);
    console.log("Radius: " + radius);
    //        console.log("Scale: " + scale);
    console.log("Zoom level: " + zoomLevel);

    map.setZoom(zoomLevel); // working
    displayPlaces(lati, longi);
}

//----selected distance ends


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 6
    });
    yourInfoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lati = position.coords.latitude;
            longi = position.coords.longitude;
            console.log("Latitude: " + lati);
            console.log("Longitude: " + longi);

            pos = {
                lat: lati,
                lng: longi
            };

            displayPlaces(lati, longi);

        }, function () {
            handleLocationError(true, yourInfoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, yourInfoWindow, map.getCenter());
    }

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}


function displayPlaces(latu, longu) {
    var pyrmont = new google.maps.LatLng(latu, longu);

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: zoomLevel
    });

    yourInfoWindow.setPosition(pos);
    yourInfoWindow.setContent('Your Location :)');
    yourInfoWindow.open(map);
    map.setCenter(pos);

    request = {
        location: pyrmont,
        radius: radius,
        type: [searchType]
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

//-------==================above working

function callback(results, status) {
    if (results.length == 0) {
        window.alert("No " + searchType + "s found in specified area :(");
        console.log("No " + searchType + "s found in specified area");
    } else if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    console.log("in create marker");
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    marker.addListener('mouseover', function () {
        infoWindow = new google.maps.InfoWindow({
            content: place.name
        });
        infoWindow.open(map, marker);
    });

    marker.addListener('mouseout', function () {
        infoWindow.close();
    });

    marker.addListener('click', function () {

        infoWindow.close();

        let myPlace = place.place_id;
        let placeName = place.name;
        console.log(placeName);
    //    console.log(myPlace);

        new google.maps.places.PlacesService(map).getDetails({
            placeId: myPlace,
            fields: ['opening_hours', 'utc_offset_minutes'],
        }, function (place, status) {
            if (status !== 'OK') {
                window.alert("Something went wrong");
                return; // something went wrong
            }

            let openStatus = "Opening hours not available";
            
            if (typeof(place.opening_hours) !== "undefined") {  
                openStatus = "Opening hours:"; 
                const isOpenNow = place.opening_hours.isOpen();
                let openNow = "Not open now";
                if (isOpenNow) {
                    // We know it's open.
                    console.log("Open now");
                    openNow = "Open now";
                } else {
                    console.log("Not open now");
                }

                
                
            //    console.log(place.opening_hours.weekday_text);
                let hrsArr = place.opening_hours.weekday_text;
                let my = `
                <div>
                    <h4><u>${placeName}</u></h4>
                    <h5>${openNow}</h5>
                    <h5>${openStatus}</h5>
                    <h6>${hrsArr[0]}</h6>
                    <h6>${hrsArr[1]}</h6>
                    <h6>${hrsArr[2]}</h6>
                    <h6>${hrsArr[3]}</h6>
                    <h6>${hrsArr[4]}</h6>
                    <h6>${hrsArr[5]}</h6>
                    <h6>${hrsArr[6]}</h6>
                </div>
                `;

                fullInfowindow = new google.maps.InfoWindow({
                    content: my
                });
                fullInfowindow.open(map, marker);
            } else {
                console.log("Opening hours are undefined");
                fullInfowindow = new google.maps.InfoWindow({
                    content: `
                    <h4><u>${placeName}</u></h4>
                    <h6>Opening hours not available</h6>`
                });
                fullInfowindow.open(map, marker);
            }

        });

        
    });

}
