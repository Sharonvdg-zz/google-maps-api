$(document).ready(function() {
    console.log( "ready!" );
    
    var map;
    var markers = [];
    function initMap() {
        map = new google.maps.Map($('#map')[0], {
            zoom: 12,
            center: {lat: 51.4, lng: 5.4}
        });

        var locations = [
            {title: 'Eindhoven', location: {lat: 51.441642, lng: 5.469722}},
            {title: 'SSC Eindhoven', location: {lat: 51.451915, lng: 5.489143}},
            {title: 'Sharon', location: {lat:  51.642632, lng:  4.541374}}
        ];

        var largeInfowindow = new google.maps.InfoWindow({
            maxWidth: 200
        });
        var bounds = new google.maps.LatLngBounds();

        var iconImg = {
            url: 'http://findicons.com/files/icons/2498/party_elements/256/2.png',
            scaledSize: new google.maps.Size(25, 25), // scaled size
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0)
        }

        for (var i = 0; i < locations.length; i++) {
            var position = locations[i].location;
            var title = locations[i].title;
            // var color = locations[i].color;

            var marker = new google.maps.Marker({
                map: map,
                position: position,
                title: title,
                icon: iconImg,
                animation: google.maps.Animation.DROP,
                id: i
            });
            // push marker to array of markers
            markers.push(marker);
            // extend boundaries of map for each marker
            bounds.extend(marker.position);
            // create event to open infowindow
            marker.addListener('click', function() {
                populateInfoWindow(this, largeInfowindow);
            });
        };
        map.fitBounds(bounds);

        $('#show-listings').on('click', showListings);
        $('#hide-listings').on('click', hideListings);

        function populateInfoWindow(marker, infowindow) {
            if (infowindow.marker != marker) {
                infowindow.marker = marker;
                infowindow.setContent('<div>' + marker.title + ' ' + marker.position + '</div>');
                infowindow.open(map, marker);
                // clear marker property
                infowindow.addListener('closeclick', function() {
                    infowindow.marker = null;
                });
            };
        };

        // loop through markers and display them
        function showListings() {
            var bounds = new google.maps.LatLngBounds();
            //extend boundaries map
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
                bounds.extend(markers[i].position);
            }
            map.fitBounds(bounds);
        }
        // loop through markers and hide them
        function hideListings() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
        }

        // var tribeca = {lat: -20, lng: 100};
        // var marker = new google.maps.Marker({
        //     position: tribeca,
        //     map: map,
        //     title: 'First Marker'
        // });
        // var infowindow = new google.maps.InfoWindow({
        //     content: 'Hi I am info'
        // });
        // marker.addListener('click', function() {
        //     infowindow.open(map, marker);
        // });
    };
    initMap();

});


