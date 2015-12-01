// Angular App Module and Controller
angular.module('myApp',[]).controller('myController',function($scope){
	
	
	var address = '';
	var apiKey="AIzaSyDp4_cWYV1Ztq2WJn8JFU0i-SzgXEaPwHE";
	var mapOption = {
		zoom:4,
		center: new google.maps.LatLng(40.000,-98.000),
		mapTypeId: google.maps.mapTypeId
	}

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
	$scope.geocodeAddress = function() {
		address = $scope.address;
		var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key="+apiKey;

	    $.getJSON(url, function(data){
	    	// console.log(data)
	    	lat = data.results[0].geometry.location.lat;
	    	lng = data.results[0].geometry.location.lng;
	    	var map;
			// var infowindow;
			var pyrmont = {lat: lat, lng: lng};
				  // map = new google.maps.Map(document.getElementById('map'), {
				  // 	center: pyrmont,
				  // 	zoom: 8
				  // });
	    	var marker = new google.maps.Marker({
			map: $scope.map,
			position: new google.maps.LatLng(lat, lng),
	    	})
	    	// $('#address').val('');
	    })
	}

			$scope.range = function($index){
				var map;
				var infowindow;
				  // var address = $('#address').val;
				  console.log("The value of address is: "+address);
				if(address ==''){
					var mapOption = {
					zoom:4,
					center: new google.maps.LatLng(40.000,-98.000),
					mapTypeId: google.maps.mapTypeId
					}
					var pyrmont = {lat:40.000, lng: -98.000};
					map = new google.maps.Map(document.getElementById('map'), {
				  	center: pyrmont,
				  	zoom: 4
				  	});
					var marker = new google.maps.Marker({
					map: $scope.map,
					position: new google.maps.LatLng(40.000,-98.000),
					});
					var circle = new google.maps.Circle({
				  		map: map,
				  		radius: 1503824,    // 812 nm (1852 meters per nautical mile)
				  		fillColor: '#AA0000'
					});
					console.log(circle);
				  	circle.bindTo('center', marker, 'position');
				}else{
					var pyrmont = {lat: lat, lng: lng};
				  	map = new google.maps.Map(document.getElementById('map'), {
				  	center: pyrmont,
				  	zoom: 4
				  	});
					var marker = new google.maps.Marker({
						map: $scope.map,
						position: new google.maps.LatLng(lat, lng)
				    })
				    var circle = new google.maps.Circle({
				  		map: map,
				  		radius: 1503824,    // 812 nm (1852 meters per nautical mile)
				  		fillColor: '#AA0000'
					});
				  	circle.bindTo('center', marker, 'position');
				}
			}
	})