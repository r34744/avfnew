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
		$('#geolocationdata').prepend('<p>Your current latitude is: ' + position.coords.latitude +
								  '</p><br><p>With a longitude of: '+ position.coords.longitude +'</p>');
		var map = document.getElementById('showmap');
		map.style.display = 'block';
		var mapwidth = 600; 
		var mapheight = 600; 
		map.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude + 
		"&zoom=14&size=" + mapwidth + "x" + mapheight + "&maptype=roadmap&markers=color:green%7C" + position.coords.latitude +
		"," + position.coords.longitude + "&sensor=false";
	};
	
	var geolocationError = function(){
		alert(error.code + '/n' + error.message);
	};
	
	navigator.geolocation.getCurrentPosition(geolocationSuccess,geolocationError);

}); // end location pageinit


$('#picture').on('pageinit', function() {
	

 /*var onSuccess = function(imageData) {
		var image = document.getElementById('myImage');
		image.src = "data:image/jpeg;base64," + imageData;
		image.style.display = "block";
		
	};*/
	
	var onSuccess = function(imageData) {
		var image = document.getElementById('myImage');
		image.src = imageData;
		image.style.display = "block";
		
	};

	var onError = function(message){
    alert('Failed because: ' + message);
	};
	
	/*navigator.camera.getPicture(onSuccess, onError, {
		quality: 50, destinationType: Camera.DestinationType.DATA_URL});*/

	navigator.camera.getPicture(onSuccess, onError, {
		quality : 50, 
          destinationType : Camera.DestinationType.FILE_URI, 
          sourceType : Camera.PictureSourceType.CAMERA, 
          allowEdit : false,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 960,
          targetHeight: 640,
          popoverOptions: CameraPopoverOptions,
		saveToPhotoAlbum: true});
	

}); // end picture pageinit


$('#connection').on('pageinit', function() {
	
         var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'an Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet ';
            states[Connection.WIFI]     = 'WiFi ';
            states[Connection.CELL_2G]  = 'Cell 2G';
            states[Connection.CELL_3G]  = 'Cell 3G ';
            states[Connection.CELL_4G]  = 'Cell 4G ';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            $("#connectionoutput").html ("<p> You're currently connected through: </p><br><h2>"+ states[networkState] +
							  "</h2>");
	
}); // end browser pageinit


$('#device').on('pageinit', function() {
	
        $("#deviceinfo").html ('<p> Your Device Name Is: </p><br><h2>'+ device.name +
							  '</h2><br><p>Your Device UUID Is: </p><br><h2>' + device.uuid + '</h2>');
    
	
}); // end device pageinit

//};