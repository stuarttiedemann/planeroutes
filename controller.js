// Angular App Module and Controller
angular.module('myApp',[]).controller('myController',function($scope){
	//Declare Global Variables
	var address = '';
	var apiKey="AIzaSyDp4_cWYV1Ztq2WJn8JFU0i-SzgXEaPwHE";
	var mapOption = {
		zoom:4,
		center: new google.maps.LatLng(40.000,-98.000),
		mapTypeId: google.maps.mapTypeId
	}
	// Function to check how many pilots will be on the plane
	$scope.planeSelector =function(){
	    var numberOfPilots = $('.pilot:checked').val();
		if(numberOfPilots == 1){
			$scope.planes = mustangs1;
		}else{
			$scope.planes = mustangs2;
		}
	}
	
	// Create a new google map in the html div with id = "map"
	$scope.map = new google.maps.Map($('#map')[0],mapOption);
	var geocoder = new google.maps.Geocoder();
	var lat;
	var lng;
	// Set a departure location if the user enters one
	$scope.geocodeAddress = function() {
		address = $scope.address;
		var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key="+apiKey;
		// JSON return to provide lat and longitude of input city
	    $.getJSON(url, function(data){
	    	lat = data.results[0].geometry.location.lat;
	    	lng = data.results[0].geometry.location.lng;
	    	var map;
	    	var marker = new google.maps.Marker({
			map: $scope.map,
			position: new google.maps.LatLng(lat, lng),
	    	})
	    })
	}
			// Function to draw range of selected plane and passenger combo on Google Map
			$scope.range = function($index){
				// console.log("Value of index is: "+$index);
				var map;
				var infowindow;
				//If no address is entered then use default coordinates
				if(address ==''){
					var pyrmont = {lat:40.000, lng: -98.000};
					map = new google.maps.Map(document.getElementById('map'), {
				  	center: pyrmont,
				  	zoom: 4
				  	});
				  	// Drop a marker at default coordinates
					var marker = new google.maps.Marker({
					map: $scope.map,
					position: new google.maps.LatLng(40.000,-98.000),
					});
					// Draw the range of the plane with passengers on map
					circle = new google.maps.Circle({
				  		map: map,
				  		radius: 1852*$scope.planes[$index].range,    // 812 nm (1852 meters per nautical mile)
				  		fillColor: '#AA0000'
					});
				  	circle.bindTo('center', marker, 'position');
				  	$scope.range = $scope.planes[$index].range;
				// Else use the entered address
				}else{
					var pyrmont = {lat: lat, lng: lng};
				  	map = new google.maps.Map(document.getElementById('map'), {
				  	center: pyrmont,
				  	zoom: 4
				  	});
				  	// Drop a marker at the coordinates of the entered city
					var marker = new google.maps.Marker({
						map: $scope.map,
						position: new google.maps.LatLng(lat, lng)
				    })
				    // Draw the range of the plane with passengers on map
				    circle = new google.maps.Circle({
				  		map: map,
				  		radius: 1852*$scope.planes[$index].range,   // 812 nm (1852 meters per nautical mile)
				  		fillColor: '#AA0000'
					});
				  	circle.bindTo('center', marker, 'position');
				  	$scope.range = $scope.planes[$index].range;
				}
			}
	})