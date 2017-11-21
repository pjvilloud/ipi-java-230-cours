
hljs.initHighlightingOnLoad();
var nbSlides = $(".step.slide").length;
var showPopover = new URL(window.location).searchParams.get("showPopover");

var rootElement = document.getElementById( "impress" );

rootElement.addEventListener( "impress:stepenter", function(event) {

  var currentStep = event.target;
  var numeroSlide = $(currentStep).attr("data-nb");
  $("#numSlide").html(numeroSlide);
  var percentageSlide = Math.round(numeroSlide * 100 / nbSlides);
  $("#progress").attr("style", "width: " + percentageSlide + "%;");
  $("#progress").attr("aria-valuenow", percentageSlide);

  if(showPopover === "true") {
  	setTimeout(function(){
	  	$('#' + currentStep.id + ' [data-toggle="popover"]').popover('show', {
		    container: 'body'
		  });
	}, 1000);
  } else {
  	$('#' + currentStep.id + ' [data-toggle="popover"]').popover({
	    container: 'body'
	  });
  }

  
});

rootElement.addEventListener( "impress:stepleave", function(event) {

  var currentStep = event.target;
  $('#' + currentStep.id + ' [data-toggle="popover"]').popover('dispose');
});

$(window).on('hashchange', function(e){
    //Gérer dropdown-toggle
    var origEvent = e.originalEvent;
    oldHash = origEvent.oldURL.substring(origEvent.oldURL.lastIndexOf("#")).replace("/","");
    newHash = origEvent.newURL.substring(origEvent.newURL.lastIndexOf("#")).replace("/","");
    $('#my-navbar li a').removeClass("active");
    $('#my-navbar li a[href="' + newHash.substring(0,newHash.indexOf("-")) + '"]').addClass("active");
    $('#my-navbar li a[href="' + newHash.substring(0,newHash.lastIndexOf("-")) + '"]').addClass("active");
    $('#my-navbar li a[href="' + newHash + '"]').addClass("active");
    
});

$(window).on('mousewheel', function(event) {
  if(event.deltaY < 0) {
    imp.next();
  } else{
    imp.prev();
  }
  e.preventDefault();
});

//-------------------

$("#correctGeneric").click(function(event) {
  $(event.target).toggleClass('btn-primary').toggleClass('btn-success');
  $("#correctGeneric > i").toggleClass('fa-times-circle ');
  $("#correctGeneric > i").toggleClass('fa-check-circle');
  $("#genericCompareTo").toggleClass('text-danger').toggleClass('text-success');
  var html = $("#genericExtends").html();
  $("#genericExtends").html(html === "" ? " extends Comparable" : "");
});

$("#toggleClassIntern").click(function(event) {
  $(event.target).toggleClass('btn-primary').toggleClass('btn-success');
  $("#toggleClassIntern > i").toggleClass('fa-times-circle ');
  $("#toggleClassIntern > i").toggleClass('fa-check-circle');
  $("#interneNew").toggleClass('text-danger').toggleClass('text-success')
  var html = $("#internePrivate").html();
  $("#internePrivate").html(html === '<span class="hljs-keyword">private</span>' ? '<span class="hljs-keyword">public</span>' : '<span class="hljs-keyword">private</span>');
});

$("div.step.slide").each(function(index, el) {
  var id = $(el).attr("id");
  var title = $(el).find("h1.display-3").text();
  $(el).attr("data-nb", index + 1);
  var yOffset = 1100;
  var xOffset = 2000;
  var ybase = 1100;
  var xbase = 0; 
  if(id !== 'accueil'){
    if(id.indexOf("-") > 0){
      var baseId = id.substring(0,id.indexOf("-"));
      console.log(baseId);
      $("div#dropdown-"+baseId).append('<a class="dropdown-item" href="#'+id+'">'+title+'</a>');
      $(el).attr("data-rel-x", xOffset);
      $(el).attr("data-rel-y", 0);
    } else {
      if($('div[id^="'+id+'-"]').length > 0){
        $("ul.nav.nav-pills.mr-auto").append('<li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" id="navbarDropdown'+id+'" href="#'+id+'" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+title+'</a> <div id="dropdown-'+id+'" class="dropdown-menu" aria-labelledby="navbarDropdown'+id+'"></div></li>');  
        $(el).attr("data-x", 0);
        $(el).attr("data-rel-y", yOffset);
      } else {
        $("ul.nav.nav-pills.mr-auto").append('<li class="nav-item"><a class="nav-link" href="#'+id+'">'+title+'</a></li>');  
        $(el).attr("data-x", 0);
        $(el).attr("data-rel-y", yOffset);
      }
    }
  }
});

var imp = impress();
imp.init();