$( document ).ready(function() {

var cloudName = "imgprocessor";
var apiKey = "188122967588527";
var apiSecret = "olUTfOrPXdq2JxH-XxCIHEZmHdg";
var presetName = "gtepwlbv";

$.cloudinary.config({ cloud_name: cloudName, api_key: apiKey});

cloudinary.setCloudName(cloudName);

openWidget = function() {
cloudinary.openUploadWidget(
	{upload_preset: presetName,
	 folder: "testing",
	 theme: "white",
	 effect: "trim"}, 
  function(err,d) {
  	if (err) {
  		msg += "<h1>Error</h1>"
  		msg += err.message;
  		msg += "<p>Images over 1MB need not be checked</p>"
  		$("#error").show().append(msg);
  	}
  	if ($("#smallButton").css("display") != "none") {
  	} else {
	  	$("#bigButton").toggle();
	  	$("#smallButton").toggle();
  	}
  	console.log(err)
  	var msg = "";
  	$("#results").text(msg);
  	for (i=0;i<d.length;i++) {
  		if (d[i].height < 1050) {
  			msg += "<div class='resultDivFail col-xs-12 col-sm-4 col-md-3 col-lg-2 col-xl-1'>"	
	  		msg += "<img class='resultImage' src=";
	  		msg += d[i].url;
	  		msg += ">";
	  		msg += "<p><a class='fail btn-floating btn-large waves-effect waves-light red darken-2 pulse'><i class=material-icons>cancel</i></a></span>"
	  		msg += "<h2 class='fileName truncate'>" + d[i].original_filename + "." + d[i].format + "</h2>";
	  		msg += "<div class=chip>";
	  		msg += "Height: " + d[i].height + "</div>";
	  		msg += "<div class=chip>";
	  		msg += "Width: " + d[i].width + "</div>";
	  		msg += "<div class='progress red lighten-3'>";
       		msg += "<div class='determinate red darken-2' style='width:" + ((d[i].height/1050)*100).toFixed() + "%'></div>";
  			msg += "</div>";
  			msg += "<p class=details>Image meets " + ((d[i].height/1050)*100).toFixed() + "%</br>of web requirements</p>"
	  		msg += "</div>";

  		} else if (d[i].height < 1800) {
			msg += "<div class='resultDivSuccessWeb col-xs-12 col-sm-4 col-md-3 col-lg-2 col-xl-1'>"	
	  		msg += "<img class='resultImage' src=";
	  		msg += d[i].url;
	  		msg += ">";
	  		msg += "<p><a class='successWeb btn-floating btn-large waves-effect waves-light orange darken-1'><i class=material-icons>warning</i></a></span>"
	  		msg += "<h2 class='fileName truncate'>" + d[i].original_filename + "." + d[i].format + "</h2>";
	  		msg += "<div class=chip>";
	  		msg += "Height: " + d[i].height + "</div>";
	  		msg += "<div class=chip>";
	  		msg += "Width: " + d[i].width + "</div>";
	  		msg += "<div class='progress orange lighten-3'>";
       		msg += "<div class='determinate orange darken-1' style='width:" + ((d[i].height/1800)*100).toFixed() + "%'></div>";
  			msg += "</div>";
  			msg += "<p class=details>Image meets " + ((d[i].height/1800)*100).toFixed() + "%</br>of print requirements</p>"
	  		msg += "</div>";
  		} else {
  			msg += "<div class='resultDivSuccess col-xs-12 col-sm-4 col-md-3 col-lg-2 col-xl-1'>"	
	  		msg += "<img class='resultImage' src=";
	  		msg += d[i].url;
	  		msg += ">";
	  		msg += "<p><a class='success btn-floating btn-large waves-effect waves-light green lighten-1'><i class=material-icons>done</i></a></span>"
	  		msg += "<h2 class='fileName truncate'>" + d[i].original_filename + "." + d[i].format + "</h2>";
	  		msg += "<div class=chip>";
	  		msg += "Height: " + d[i].height + "</div>";
	  		msg += "<div class=chip>";
	  		msg += "Width: " + d[i].width + "</div>";
	  		msg += "<div class='progress green'>";
       		msg += "<div class='determinate green lighten-1' style='width: 100%'></div>";
  			msg += "</div>";
  			msg += "<p class=details>Image meets</br>print requirements</p>"
	  		msg += "</div>";
  		}
	  	
  	}
  	$("#results").append(msg);
  	Materialize.fadeInImage('img');
  })};

$(".dropdown-button").dropdown();

$("#smallButton").hide();
var scrnHeight;
var padAmount;
screenHeight();

$(window).resize(function() {
	scrnHeight = $(window).height(); 
	screenHeight();
});

function screenHeight () {
	scrnHeight = $(window).height();
	$("body").css("height",scrnHeight);
}

function openHowTo() {
	$("#howTo").toggle();
}


});