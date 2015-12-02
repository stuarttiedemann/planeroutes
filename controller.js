// Angular App Module and Controller
var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider,$locationProvider){
	$routeProvider.when('/',{
		templateUrl: 'textron.html',
		controller: 'myController'
	}).
	when('/mustang.html',{
		templateUrl: 'mustang.html',
		controller: 'myController'
	}).
	when('/m2.html',{
		templateUrl: 'm2.html',
		controller:'myController'
	}).
	when('/alpine.html',{
		templateUrl: 'alpine.html',
		controller: 'myController'
	}).
	when('/cj3.html',{
		templateUrl: 'cj3.html',
		controller: 'myController'
	}).
	otherwise({
		redirectTo: '/'
	});
});

myApp.controller('myController',function ($scope, $location){
	//Declare Global Variables
	var numberOfPilots = 0;
	var pilotChecked = 0;
	var address = '';
	var apiKey="AIzaSyDp4_cWYV1Ztq2WJn8JFU0i-SzgXEaPwHE";
	var mapOption = {
		zoom:4,
		center: new google.maps.LatLng(40.000,-98.000),
		mapTypeId: google.maps.mapTypeId
	}
	//  Next four functions call the partial html pages
	$scope.mustang = function(){
		$location.path('mustang.html');
	}
	$scope.m2Page = function(){
		$location.path('m2.html');
	}
	$scope.alpine = function(){
		$location.path('alpine.html');
	}
	$scope.cj3Page = function(){
		$location.path('cj3.html');
	}

	pilotChecked = $('.pilot:checked').val();
		console.log("pilotChecked= "+pilotChecked);
		if(pilotChecked == 1 || pilotChecked == 2){
			$('#one').prop('disabled',false);
			$('#two').prop('disabled',true);
			$('#three').prop('disabled',true);
			$('#four').prop('disabled',true);
		}else if(pilotChecked == 3 || pilotChecked == 4){
			$('#two').prop('disabled',false);
			$('#one').prop('disabled',true);
			$('#three').prop('disabled',true);
			$('#four').prop('disabled',true);
		}else if(pilotChecked == 5 || pilotChecked ==6){
			$('#three').prop('disabled',false);
			$('#one').prop('disabled',true);
			$('#two').prop('disabled',true);
			$('#four').prop('disabled',true);
		}else if(pilotChecked == 7 || pilotChecked == 8){
			$('#four').prop('disabled',false);
			$('#one').prop('disabled',true);
			$('#two').prop('disabled',true);
			$('#three').prop('disabled',true);
		}else{
			console.log("Error");
		}

	// Check to see if a pilot option has been selected.
	// Else disable dropdown.
	$scope.pilotIsChecked = function(){
		pilotChecked = $('.pilot:checked').val();
		console.log("pilotChecked= "+pilotChecked);
		if(pilotChecked == 1 || pilotChecked == 2){
			$('#one').prop('disabled',false);
			$('#two').prop('disabled',true);
			$('#three').prop('disabled',true);
			$('#four').prop('disabled',true);
		}else if(pilotChecked == 3 || pilotChecked == 4){
			$('#two').prop('disabled',false);
			$('#one').prop('disabled',true);
			$('#three').prop('disabled',true);
			$('#four').prop('disabled',true);
		}else if(pilotChecked == 5 || pilotChecked ==6){
			$('#three').prop('disabled',false);
			$('#one').prop('disabled',true);
			$('#two').prop('disabled',true);
			$('#four').prop('disabled',true);
		}else if(pilotChecked == 7 || pilotChecked == 8){
			$('#four').prop('disabled',false);
			$('#one').prop('disabled',true);
			$('#two').prop('disabled',true);
			$('#three').prop('disabled',true);
		}else{
			console.log("Error");
		}
	}

	// Function to check how many pilots will be on the plane
	$scope.planeSelector =function(){
		$scope.pilotIsChecked();
	    numberOfPilots = $('.pilot:checked').val();
		if(numberOfPilots == 1){
			$scope.planes = mustangs1;
		}else if(numberOfPilots == 2){
			$scope.planes = mustangs2;
		}else if(numberOfPilots == 3){
			$scope.planes = m21;
		}else if(numberOfPilots == 4){
			$scope.planes = m22;
		}else if(numberOfPilots ==5){
			$scope.planes = alpine1;
		}else if(numberOfPilots == 6){
			$scope.planes = alpine2;
		}else if(numberOfPilots == 7){
			$scope.planes = cj31;
		}else if(numberOfPilots == 8){
			$scope.planes = cj32;
		}
	}
	
	// Create a new google map in the html div with id = "map"
	$scope.map = new google.maps.Map($('#map')[0],mapOption);
	var lat;
	var lng;
	// Set a departure location if the user enters one
	$scope.geocodeAddress = function() {
		$scope.pilotIsChecked();
		address = $scope.address;
		var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key="+apiKey;
		// JSON return to provide lat and longitude of input city
	    $.getJSON(url, function(data){
	    	lat = data.results[0].geometry.location.lat;
	    	lng = data.results[0].geometry.location.lng;

	    	var pyrmont = {lat: lat, lng: lng};
				  	map = new google.maps.Map(document.getElementById('map'), {
				  	center: pyrmont,
				  	zoom: 4
				  	});
				  	// Drop a marker at the coordinates of the entered city
					var marker = new google.maps.Marker({
						map: map,
						position: new google.maps.LatLng(lat, lng)
				    })
	    })
	}
			// Function to draw range of selected plane and passenger combo on Google Map
			$scope.range = function($index){
				console.log("Value of address: "+address);
				// var map;
				//If no address is entered then use default coordinates
				if(address ==''){
					var pyrmont = {lat:40.000, lng: -98.000};
					map = new google.maps.Map(document.getElementById('map'), {
				  	center: pyrmont,
				  	zoom: 4
				  	});
				  	// Drop a marker at default coordinates
					var marker = new google.maps.Marker({
					map: map,
					position: new google.maps.LatLng(40.000,-98.000),
					});
					// Draw the range of the plane with passengers on map
					circle = new google.maps.Circle({
				  		map: map,
				  		radius: 1852*$scope.planes[$index].range,    // 812 nm (1852 meters per nautical mile)
				  		fillColor: '#AA0000'
					});
				  	circle.bindTo('center', marker, 'position');
				  	$scope.flightRange = $scope.planes[$index].range;
				// Else use the entered address
				}else{
					var pyrmont = {lat: lat, lng: lng};
				  	map = new google.maps.Map(document.getElementById('map'), {
				  	center: pyrmont,
				  	zoom: 4
				  	});
				  	// Drop a marker at the coordinates of the entered city
					var marker = new google.maps.Marker({
						map: map,
						position: new google.maps.LatLng(lat, lng)
				    })
				    // Draw the range of the plane with passengers on map
				    circle = new google.maps.Circle({
				  		map: map,
				  		radius: 1852*$scope.planes[$index].range,   // 812 nm (1852 meters per nautical mile)
				  		fillColor: '#AA0000'
					});
				  	circle.bindTo('center', marker, 'position');
				  	$scope.flightRange = $scope.planes[$index].range;
				}
			}
	})