$( document ).ready(function() {

var cloudName = "imgprocessor";
var apiKey = "188122967588527";
var apiSecret = "olUTfOrPXdq2JxH-XxCIHEZmHdg";
var presetName = "gtepwlbv";
var approvedList = [];
var approvedWebList = [];
var rejectedList = [];

$.cloudinary.config({ cloud_name: cloudName, api_key: apiKey});

cloudinary.setCloudName(cloudName);
cloudinary.setAPIKey(apiKey);

openWidget = function() {
cloudinary.openUploadWidget(
	{upload_preset: presetName,
	 folder: "testing2",
	 theme: "white",
	 effect: "trim",
	 max_image_width: 2500,
	 max_image_height: 2500}, 
  function(err,d) {
  	console.log(d);
  	if (err) {
  		$("#errorContent").html("");
  		msg += "<h1>Error</h1>"
  		msg += err.message;
  		msg += "<p>Images over 1MB need not be checked</p>"
  		$("#error").show();
  		$("#errorContent").append(msg);
  	}
  	if ($("#smallButton").css("display") != "none") {
  	} else {
	  	$("#bigButton").toggle();
	  	$("#smallButton").toggle();
  	}
  	var msg = "";
  	$("#results").text(msg);
  	console.log(d);
  	for (i=0;i<d.length;i++) {
  		if (d[i].height < 1050 && d[i].width < 1050) {
  			rejectedList.push(d[i].public_id);
  			msg += "<div class='resultDivFail col-xs-12 col-sm-4 col-md-3 col-lg-2 col-xl-1 tooltipped' data-position=top data-delay=50 data-tooltip='Do not submit. Image will be rejected'>"	
	  		msg += "<div class='imgWrapper valign-wrapper'><img class='resultImage' src=";
	  		msg += d[i].url;
	  		msg += "></div>";
	  		msg += "<a class='fail btn-floating btn-large waves-effect waves-light red darken-2 pulse'><i class=material-icons>cancel</i></a></span></p>"
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

  		} else if (d[i].height < 1800 && d[i].width < 1800) {
  			approvedWebList.push(d[i].public_id);
			msg += "<div class='resultDivSuccessWeb col-xs-12 col-sm-4 col-md-3 col-lg-2 col-xl-1 tooltipped' data-position=top data-delay=50 data-tooltip='This image will be approved for web use only'>"	
	  		msg += "<div class='imgWrapper valign-wrapper'><img class='resultImage' src=";
	  		msg += d[i].url;
	  		msg += "></div>";
	  		msg += "<a class='successWeb btn-floating btn-large waves-effect waves-light orange darken-1'><i class=material-icons>warning</i></a></span>"
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
  			approvedList.push(d[i].public_id);
  			var siggy = d[i].signature;
  			console.log(siggy);
  			msg += "<div class='resultDivSuccess col-xs-12 col-sm-4 col-md-3 col-lg-2 col-xl-1 tooltipped' data-position=top data-delay=50 data-tooltip='This image will be approved for all uses'>"	
	  		msg += "<div class='imgWrapper valign-wrapper'><img class='resultImage' src=";
	  		msg += d[i].url;
	  		msg += "></div>";
	  		msg += "<a class='success btn-floating btn-large waves-effect waves-light green lighten-1'><i class=material-icons>done</i></a></span>"
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
  	$('.tooltipped').tooltip({delay: 50});
  	console.log(approvedList);

  	var idsList = "";
  	for (var i=0; i<approvedList.length; i++) {
  		idsList += "&public_ids%5B%5D=";
  		idsList += approvedList[i];
  	}

  	console.log(idsList);

  	var timestamp = (Date.now() / 1000).toFixed(0);

  	console.log(timestamp);

  	var signature = CryptoJS.SHA1("mode=create&public_ids=" + approvedList.join(",") + "&timestamp=" + timestamp + "olUTfOrPXdq2JxH-XxCIHEZmHdg").toString(CryptoJS.enc.Hex);

  	console.log(signature);
  	
	$.getJSON("https://api.cloudinary.com/v1_1/imgprocessor/image/generate_archive?&api_key=188122967588527&mode=create" + idsList + "&signature=" + signature + "&timestamp=" + timestamp,function(d,err) {
  		console.log(d.secure_url);
  		var msg = "";
  		msg += "<div><a href=";
  		msg += d.secure_url;
  		msg += "><button id=downloadBtn class='waves-effect waves-light btn-large'>Download ZIP of all approved images</button></a></div>";
  		$("#results").prepend(msg);
  		// $("#downloadZip").toggle();
  	});
	// got hash from this string: mode=create&public_ids=testing2/tdr2qbkn3givxn7vs28c,sample&timestamp=1492805286olUTfOrPXdq2JxH-XxCIHEZmHdg
	// Steps: 1) get current timestamp, 2) convert above string to SHA1 and use as signature
	// to convert string to hash: CryptoJS.SHA1("mode=create&public_ids=testing2/tdr2qbkn3givxn7vs28c,sample&timestamp=1492801416olUTfOrPXdq2JxH-XxCIHEZmHdg").toString(CryptoJS.enc.Hex);

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