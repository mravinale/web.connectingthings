/* -- Full Screen Viewport Container
   ---------------------------- */

$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets
    init();
});

$(document).ready(function() {
  menuBinding();
  fullScreenContainer();
  owlCarousel();
  magnificPopup();
});



/* --- initialize functions on window load here -------------- */

function init() {
  tooltips();
  onePageScroll();
  scrollAnchor();
  toggleContactForm();
 // onepageScroll();

  $('.img-holder').imageScroll({
    holderMinHeight: 700,
    holderMaxHeight: 700,

    imgClass: 'perfect-fit'

  });
}

// Menu Binding

function menuBinding() {
  $('.menu-link, #close-menu').on('click', function(event) {
      $('#responsive-menu, .menu__overlay').toggleClass('active');
  });

  $('.menu__overlay').on('click', function(event) {
      $('#responsive-menu').toggleClass('active');
      $(this).toggleClass('active');
  });
}

//Video Integration -- Basically stops the video on modal on close
var vidUrl = $("iframe#video-frame").attr('src');
$('#video-btn-close').on('click', function(e) {
    $("iframe#video-frame").attr('src', vidUrl);
});


/* --- Full Screen Container ------------- */

function fullScreenContainer() {

  // Set Initial Screen Dimensions

  var screenWidth = $(window).width() + "px";
  var screenHeight = $(window).height() + "px";

  $("#intro, #intro .item, #intro-video").css({
    width: screenWidth,
    height: screenHeight
  });

  // Every time the window is resized...

  $(window).resize( function () {

    // Fetch Screen Dimensions

    var screenWidth = $(window).width() + "px";
    var screenHeight = $(window).height() + "px";
      
    // Set Slides to new Screen Dimensions
    
    $("#intro, #intro .item, #intro-video, #intro-video .item").css({
      width: screenWidth,
      height: screenHeight
    }); 
      
  });

}

/* --- onepage-scroll------------- */
function onepageScroll() {
  $("body").onepage_scroll({
    sectionContainer: ".section-scroll",
    animationTime   : 300,
    pagination: true
  });
}



/* --- owlCarousel ------------- */

function owlCarousel() {
    $("#owl-demo").owlCarousel({
        autoPlay: 6000, //Set AutoPlay to 3 seconds
       // navigation : true, // Show next and prev buttons
        slideSpeed : 800,
        paginationSpeed : 1000,
        singleItem:true,
        transitionStyle: "fade"
        // "singleItem:true" is a shortcut for:
        // items : 1,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false

    });

    $("#owl-example").owlCarousel({
      lazyLoad : true,
      items: 3,
      theme: "owl-theme-main"
    }); 
  
    $("#intro").owlCarousel({
      lazyLoad: true,
      lazyEffect: "fade",
      singleItem: true,
      navigation: true,
      navigationText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
      slideSpeed : 450,
      pagination: false,
      transitionStyle: "fade",
      theme: "owl-theme-featured"
      
    }); 
}



/* --- Tooltips ------------------- */

function tooltips() {
  $('.tooltips').tooltip(); 
}




/* --- Show/Hide Contact Form ------------------- */

function toggleContactForm() {
  $('.contact-button').click(function() {
    $(this).toggleClass('active');
    $('.contact-form').slideToggle(300);
  });
}




/* --- scrollReveal ------------------- */

//window.sr = new scrollReveal();
  


/* --- magnific popup ------------------- */

function magnificPopup() {

  // Gallery
  $('.popup-gallery').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-fade',
    disableOn: 700,
    removalDelay: 160,
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    },
    callbacks: {
      close: function() {
        $('.portfolio-item figure figcaption').removeClass('active');
        $('.portfolio-item figure .info').removeClass('active');
      }
    }
  });

  $('.portfolio-item figcaption a.preview').click(function(){
    $(this).parent().addClass('active');
    $(this).parent().siblings('.info').addClass('active');
  });

  // Zoom Gallery

  $('.zoom-modal').magnificPopup({
    type: 'image',
    mainClass: 'mfp-with-zoom', // this class is for CSS animation below

    zoom: {
      enabled: true, // By default it's false, so don't forget to enable it

      duration: 300, // duration of the effect, in milliseconds
      easing: 'ease-in-out', // CSS transition easing function 

      // The "opener" function should return the element from which popup will be zoomed in
      // and to which popup will be scaled down
      // By defailt it looks for an image tag:
      opener: function(openerElement) {
        // openerElement is the element on which popup was initialized, in this case its <a> tag
        // you don't need to add "opener" option if this code matches your needs, it's defailt one.
        return openerElement.is('i') ? openerElement : openerElement.find('i');
      }
    }

  });

  $('.popup-modal').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});
}




/* --- Scroll to Anchor ------------------- */

function scrollAnchor() {

  // scroll to specific anchor
  $('.scroll').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 650);
        return false;
      }
    }
  });
  
}


/* --- Modal overlay (used for signup form) ------------------- */

function signupOverlay() {
  var container = document.querySelector( 'div.container' ),
    triggerBttn = document.getElementsByClassName( 'signup' ),
    overlay = document.querySelector( 'div#signup' ),
    closeBttn = overlay.querySelector( 'button.overlay-close' );
    transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
    support = { transitions : Modernizr.csstransitions };

  function toggleOverlay() {
    if( classie.has( overlay, 'open' ) ) {
      classie.remove( overlay, 'open' );
      classie.remove( container, 'overlay-open' );
      classie.add( overlay, 'close-me' );
      var onEndTransitionFn = function( ev ) {
        if( support.transitions ) {
          if( ev.propertyName !== 'visibility' ) return;
          this.removeEventListener( transEndEventName, onEndTransitionFn );
        }
        classie.remove( overlay, 'close-me' );
      };
      if( support.transitions ) {
        overlay.addEventListener( transEndEventName, onEndTransitionFn );
      }
      else {
        onEndTransitionFn();
      }
    }
    else if( !classie.has( overlay, 'close-me' ) ) {
      classie.add( overlay, 'open' );
      classie.add( container, 'overlay-open' );
    }
  }

  for (i = 0; i < triggerBttn.length; i++) {
      triggerBttn[i].addEventListener( 'click', toggleOverlay );
  }
  closeBttn.addEventListener( 'click', toggleOverlay );

  $('.signup').click(function(e) {
      e.preventDefault();
  });
}

/* --- Modal overlay (used for login form) ------------------- */

function loginOverlay() {
  var container = document.querySelector( 'div.container' ),
    triggerBttn = document.querySelector( '.login' ),
    overlay = document.querySelector( 'div#login' ),
    closeBttn = overlay.querySelector( 'button.overlay-close' );
    transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
    support = { transitions : Modernizr.csstransitions };

  function toggleOverlay() {
    if( classie.has( overlay, 'open' ) ) {
      classie.remove( overlay, 'open' );
      classie.remove( container, 'overlay-open' );
      classie.add( overlay, 'close-me' );
      var onEndTransitionFn = function( ev ) {
        if( support.transitions ) {
          if( ev.propertyName !== 'visibility' ) return;
          this.removeEventListener( transEndEventName, onEndTransitionFn );
        }
        classie.remove( overlay, 'close-me' );
      };
      if( support.transitions ) {
        overlay.addEventListener( transEndEventName, onEndTransitionFn );
      }
      else {
        onEndTransitionFn();
      }
    }
    else if( !classie.has( overlay, 'close-me' ) ) {
      classie.add( overlay, 'open' );
      classie.add( container, 'overlay-open' );
    }
  }

  triggerBttn.addEventListener( 'click', toggleOverlay );
  closeBttn.addEventListener( 'click', toggleOverlay );

  $('.login').click(function(e) {
      e.preventDefault();
  });
}



/* --- One Page Scroll ------------------- */

function onePageScroll() {
  $('.nav').onePageNav({
      currentClass: 'current',
      changeHash: false,
      scrollSpeed: 650,
      scrollOffset: 30,
      scrollThreshold: 0.5,
      filter: ':not(.login, .signup)',
      easing: 'swing',
      begin: function() {
          //I get fired when the animation is starting
      },
      end: function() {
          //I get fired when the animation is ending
      },
      scrollChange: function($currentListItem) {
          //I get fired when you enter a section and I pass the list item of the section
      }
  });

  $('.internal-nav').onePageNav({
    currentClass: 'current',
    changeHash: false,
    scrollSpeed: 650,
    scrollOffset: 30,
    scrollThreshold: 0.5,
    filter: ':not(.login, .signup)',
    easing: 'swing',
    begin: function() {
      //I get fired when the animation is starting
    },
    end: function() {
      //I get fired when the animation is ending
    },
    scrollChange: function($currentListItem) {
      //I get fired when you enter a section and I pass the list item of the section
    }
  });
}


$(window).scroll(function() {
  var windowpos = $(window).scrollTop() ;

  if (windowpos <= 500) {
      $('.nav li.current').removeClass('current');
  }
});




//Placeholder fixed for Internet Explorer
$(function() {
	var input = document.createElement("input");
	if(('placeholder' in input)==false) {
        $('[placeholder]').focus(function() {
			var i = $(this);
			if(i.val() == i.attr('placeholder')) {
				i.val('').removeClass('placeholder');
				if(i.hasClass('password')) {
					i.removeClass('password');
					this.type='password';
				}			
			}
		}).blur(function() {
			var i = $(this);	
			if(i.val() == '' || i.val() == i.attr('placeholder')) {
				if(this.type=='password') {
					i.addClass('password');
					this.type='text';
				}
				i.addClass('placeholder').val(i.attr('placeholder'));
			}
		}).blur().parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
				var i = $(this);
				if(i.val() == i.attr('placeholder'))
					i.val('');
			})
		});
	}
	});


/*When clicking on Full hide fail/success boxes */ 
$('#name').focus(function() {
     $('#success').html('');
  });

$(document).ready(function(){
  //  $(".player").mb_YTPlayer();

});