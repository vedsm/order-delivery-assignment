'use strict';

exports.getWeightsOfArea = function(lat, long){
  return [1, 1, 1]
}

exports.distBetween = function(lat1, long1, lat2, long2){
  // console.log("distBetween called with 2 lat & longs", lat1, long1, lat2, long2)
  Number.prototype.toRad = function() {
      return this * Math.PI / 180;
  }
  
  // var lat2 = 42.741; 
  // var long2 = -71.3161; 
  // var lat1 = 42.806911; 
  // var long1 = -71.290611; 
  
  var R = 6371; // km 
  //has a problem with the .toRad() method below.
  var x1 = lat2-lat1;
  var dLat = x1.toRad();  
  var x2 = long2-long1;
  var dLon = x2.toRad();  
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                  Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                  Math.sin(dLon/2) * Math.sin(dLon/2);  
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; 
  
  // alert(d);
  console.log("Calculating distace between 2 lat & longs", lat1, long1, lat2, long2, d)
  return d;
}