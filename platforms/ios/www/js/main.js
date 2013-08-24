// Gregory Koenig
// AVF 1308
//document.addEventListener("deviceready", onDeviceReady, false);
//function onDeviceReady() {

$("#instagram").on("pageinit", function(){
	
	var screenOutput = function(info){
		//alert('screenOutput');
		//console.log(info);
		$("#data-msg").html('<h2> LookThruMyEyes Tags</h2>');
			$.each(info.data, function(index, photo){
			var pic = "<li><img src='" + photo.images.standard_resolution.url + "'alt='" + photo.user.id + "' /><h4>" + photo.user.username + "</h4></li>";
			
			$("#data-output").append(pic);
			}); //end each
	}; //end screenOutput
	
	var tag = "lookthrumyeyes";
	var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=ceb5afc4977048d6a656adbaf27faf0f";
	$.getJSON(url, screenOutput);
    

}); // end instagram click



$('#weather').on('pageinit', function() {
      $.ajax({
         url: "http://api.aerisapi.com/observations/detroit,mi?client_id=HmXQEuv3ZDpbeRZFPUndB&client_secret=uvWYhEp1fK0XVaGPGQfkfAmq5ajx4OMcGVhMz7Vo",
         dataType: "jsonp",
         success: function(json) {
            if (json.success === true) {
               var ob = json.response.ob;
               $('#weatheroutput').html('<h2>The current weather in Detroit is </h2><br><h1>' + ob.weather.toLowerCase() +
										'</h1><br> <h2>with a temperature of </h2><br><h1>' + ob.tempF + '°</h1>');
            }
            else {
               alert('An error occurred: ' + json.error.description);
            }
         }
      });
});// end weather pageinit


$('#location').on('pageinit', function() {
	
	var geolocationSuccess=function (position){
		$('#geolocationdata').html('<p>Your current latitude is:</p><br><h2>' + position.coords.latitude +
								  '</h2><br><p>with a longitude of:</p><br><h2>'+position.coords.longitude +'</h2>');
	};
	
	var geolocationError = function(){
		alert(error.code + '/n' + error.message);
	};
	
	navigator.geolocation.getCurrentPosition(geolocationSuccess,geolocationError);

}); // end location pageinit


$('#picture').on('pageinit', function() {
	

 var onSuccess = function(imageData) {
		var image = document.getElementById('myImage');
		image.src = "data:image/jpeg;base64," + imageData;
		image.style.display = "block";
	};

	var onError = function(message){
    alert('Failed because: ' + message);
	};
	
	navigator.camera.getPicture(onSuccess, onError, { quality: 50 });


	

}); // end picture pageinit


$('#accel').on('pageinit', function() {
	
         var onSuccess=function (acceleration) {
			alert('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');
			};

			var onError= function () {
			alert('onError!');
			};

			navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
    
	
}); // end browser pageinit


$('#device').on('pageinit', function() {
	
        $("#deviceinfo").html ('<p> Your Device Name Is: </p><br><h2>'+ device.name +
							  '</h2><br><p>Your Device UUID Is: </p><br><h2>' + device.uuid + '</h2>');
    
	
}); // end device pageinit

//};