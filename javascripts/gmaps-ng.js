angular.module("googlemap-ng", []).directive("googlemap", function() {
  return {
    restrict: "EAC",
    scope: {
      options: "=",
      markers: "=",
      mapLoadInProgress: '@'
    },
    link: function(scope, element, $filter) {

      var codeAddress, createMarker, drawMarker, el, geocoder, map, markersObjList, prepareMarkers, removeMarkers;
      map = void 0;
      geocoder = void 0;
      markersObjList = void 0;

      el = angular.element(element);
      map = new google.maps.Map(el[0], scope.options);

      map = new GMaps({
        div: '#'+ el[0].id,
        lat: 55.634317,
        lng: 37.439019,
        zoom: 15
      });

      prepareMarkers = function(markers) {

        console.log(markers)

        map.removeMarkers();

        if (markers) {

          for (item in markers) {
            if(markers.hasOwnProperty(item)){
              var item = markers[item];

              console.log(item)

              if(item.location.latitude && item.location.longitude){
                var coordinates = new google.maps.LatLng(item.location.latitude, item.location.longitude);
                drawMarker(coordinates, item);
              }else{
                codeAddress(item.address, drawMarker, item);
              }
            }
          }

          map.refresh();

        }
      };

      codeAddress = function (address, callback, item) {
        GMaps.geocode({
          address: address,
          callback: function(results, status) {
            if (status == 'OK') {
              callback(results[0].geometry.location, item);
            }else{
              console.log(address + ' - Geocode was not successful for the following reason: ' + status);
            }
          }
        });
      };

      drawMarker = function (coordinates, options){
        var infowindow = '<div class="map-infowindow">';
        if(options.name) infowindow += '<div class="name">'+ options.name +'</div>';
        if(options.address) infowindow += '<div class="address">'+ options.address +'</div>';
        infowindow += '</div>';

        marker = map.addMarker({
          position: coordinates,
          title: options.name,
          infoWindow: {
            content: infowindow
          },
          click: function(){
            this.infoWindow.open(map, this);
          }
        });

      };

      return scope.$watch("markers", function(oldData) {
        if (oldData) {
          return prepareMarkers(oldData);
        }
      });
    }
  };
});