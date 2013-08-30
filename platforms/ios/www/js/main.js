// Gregory Koenig
// AVF 1308

document.addEventListener("deviceready", onDeviceReady, false);

//Device Functions----------------------

var instagramFn = function () {
	event.preventDefault();
	$("#data-msg").show();
	var screenOutput = function (info) {
		//alert('screenOutput');
		//console.log(info);
		$("#data-msg").html('<h2> LookThruMyEyes Tags</h2>');
		$.each(info.data, function (index, photo) {
			var pic = "<li><img src='" + photo.images.standard_resolution.url + "'alt='" + photo.user.id + "' /><h4>" + photo.user.username + "</h4></li>";
			
			$("#data-output").append(pic);
        }); //end each
	}; //end screenOutput
	
	var tag = "lookthrumyeyes";
	var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=ceb5afc4977048d6a656adbaf27faf0f";
	$.getJSON(url, screenOutput);
    
}; // end instagram Fn


var weatherFn = function () {
    $.ajax({
         //url: "http://api.aerisapi.com/observations/detroit,mi?client_id=HmXQEuv3ZDpbeRZFPUndB&client_secret=uvWYhEp1fK0XVaGPGQfkfAmq5ajx4OMcGVhMz7Vo",
        url: "http://api.aerisapi.com/observations/42.6723,-83.628407?client_id=HmXQEuv3ZDpbeRZFPUndB&client_secret=uvWYhEp1fK0XVaGPGQfkfAmq5ajx4OMcGVhMz7Vo", 
        dataType: "jsonp",
         success: function (json) {
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
};// end weather Fn


var locationFn = function () {
	
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
	
	var geolocationError = function () {
		alert(error.code + '/n' + error.message);
	};
	
	navigator.geolocation.getCurrentPosition(geolocationSuccess,geolocationError);

}; // end location pageinit


var pictureFn = function () {

	
	var onSuccess = function (imageData) {
		var image = document.getElementById('myImage');
		image.src = imageData;
		image.style.display = "block";
		alert("Image Saved to the Camera Album");
	};

	var onError = function (message) {
    alert('Failed because: ' + message);
	};
	
	
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
	

}; // end picture pageinit


var connectionFn = function () {
	
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
	
}; // end browser pageinit


var deviceFn = function () {
	
        $("#deviceinfo").html ('<p> Your Device Name Is: </p><br><h2>'+ device.name +
							  '</h2><br><p>Your Device UUID Is: </p><br><h2>' + device.uuid + '</h2>');
    
	
}; // end device pageinit

//============Camera Mash=================

var captureCameraPicFn = function () {

var onGeoSuccess = function (position){
	var canvas = document.getElementById("canvasPnl");
    var context = canvas.getContext("2d");
    var lattext = "Latitude:";
    var longtext = "Longitude:";
    var latlocationtxt = position.coords.latitude;
    var longlocationtxt = position.coords.longitude;
    context.textAlign = "left";
    context.fillStyle = "rgba(0,0,0,0.3)";
    context.font = '70px "Arial"';
    context.fillText(lattext, 30, 725);
    context.font = '100px "Arial"';
    context.fillText(latlocationtxt, 30, 800);
    context.font = '70px "Arial"';
    context.fillText(longtext, 30, 875);
    context.font = '100px "Arial"';
    context.fillText(longlocationtxt, 30, 950);
    
};

var onCameraPicError = function (errMsg) {
    alert("Error capturing picture: " + errMsg);
};

var onGeoError = function (errMsg) {
    alert("Error retrieving location information: " + errMsg);
};

var onCameraPicSuccess = function (imageData) {
	var canvas = document.getElementById("canvasPnl");
      var context = canvas.getContext("2d");
    canvas.style.display = "block";
    var img= new Image();
    img.src = imageData;
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
       context.font = '200px "Arial"';
        //context.fillText("hello", 400, 50);
        navigator.geolocation.getCurrentPosition(onGeoSuccess,onGeoError);
    };   
    
};
       

    navigator.camera.getPicture(onCameraPicSuccess, onCameraPicError, {
		quality : 80, 
          destinationType : Camera.DestinationType.FILE_URI, 
          sourceType : Camera.PictureSourceType.CAMERA, 
          allowEdit : false,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions
		});
}; 
  
var savePicFn = function () {
    var canvas = document.getElementById("canvasPnl");
    window.canvas2ImagePlugin.saveImageDataToLibrary(
        function(msg){
            cnosole.log(msg);
        },
        function(err){
            console.log(err);
        },
        document.getElementById("canvasPnl")
        );
    alert("Image Saved to the Camera Album");
};

//=================end camera mash

//============Weather Picture Mash=================

var captureWeatherPicFn = function () {

    
var onWeatherGeoSuccess = function (position){
	var canvas = document.getElementById("canvasPn2");
    var context = canvas.getContext("2d");
    var latlocationtxt = position.coords.latitude;
    var longlocationtxt = position.coords.longitude;
    
            $.ajax({
            url: "http://api.aerisapi.com/observations/" + latlocationtxt + "," + longlocationtxt + "?client_id=HmXQEuv3ZDpbeRZFPUndB&client_secret=uvWYhEp1fK0XVaGPGQfkfAmq5ajx4OMcGVhMz7Vo", 
            dataType: "jsonp",
            success: function (json) {
                if (json.success === true) {
                    var ob = json.response.ob;
                    context.textAlign = "left";
                    context.fillStyle = "rgba(0,0,0,0.3)";
                    context.font = '200px "Arial"';
                    context.fillText(ob.tempF + '°', 20, 300);
                }
                else {
                    alert('An error occurred: ' + json.error.description);
                }
                }
            });
       
}; //end onWeatherGeoSuccess

var onWeatherCameraPicError = function (errMsg) {
    alert("Error capturing picture: " + errMsg);
};

var onWeatherGeoError = function (errMsg) {
    alert("Error retrieving location information: " + errMsg);
};

var onWeatherCameraPicSuccess = function (imageData) {
	var canvas = document.getElementById("canvasPn2");
    var context = canvas.getContext("2d");
    canvas.style.display = "block";
    var img= new Image();
    img.src = imageData;
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
       context.font = '200px "Arial"';
        //context.fillText("hello", 400, 50);
        navigator.geolocation.getCurrentPosition(onWeatherGeoSuccess,onWeatherGeoError);
    };   
    
};
       

    navigator.camera.getPicture(onWeatherCameraPicSuccess, onWeatherCameraPicError, {
		quality : 80, 
          destinationType : Camera.DestinationType.FILE_URI, 
          sourceType : Camera.PictureSourceType.CAMERA, 
          allowEdit : false,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions
		});
}; 
  
var saveWeatherPicFn = function () {
    var canvas = document.getElementById("canvasPn2");
    window.canvas2ImagePlugin.saveImageDataToLibrary(
        function(msg){
            cnosole.log(msg);
        },
        function(err){
            console.log(err);
        },
        document.getElementById("canvasPn2")
        );
    alert("Image Saved to the Camera Album");
};


//=================end weather picture mash

function onDeviceReady() {
	$("#instagramBTN").on("click", instagramFn);
	$('#weather').on('pageinit', weatherFn);
	$('#location').on('pageinit', locationFn);
	$('#pictureBTN').on('click', pictureFn);
	$('#connection').on('pageinit', connectionFn);
	$('#device').on('pageinit', deviceFn);
	$('#captureCameraPic').on('click', captureCameraPicFn);
	$('#savePic').on('click', savePicFn);
    $('#captureWeatherPic').on('click', captureWeatherPicFn);
	$('#saveWeatherPic').on('click', saveWeatherPicFn);
	
} //end device ready
