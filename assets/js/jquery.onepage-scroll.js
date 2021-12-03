/* ===========================================================
 * jquery-onepage-scroll.js v1.1.1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create an Apple-like website that let user scroll
 * one page at a time
 *
 * Credit: Eike Send for the awesome swipe event
 * https://github.com/peachananr/onepage-scroll
 * 
 * License: GPL v3 
 *
 * ========================================================== */

!function($){
  
  var defaults = {
    sectionContainer: "section",
    easing: "swing",
    animationTime: 1000,
    pagination: true,
    updateURL: false,
    keyboard: true,
    beforeMove: null,
    afterMove: null,
    loop: false
	};
	
	/*------------------------------------------------*/
	/*  Credit: Eike Send for the awesome swipe event */    
	/*------------------------------------------------*/
	/*
	$.fn.swipeEvents = function() {
      return this.each(function() {

        var startX,
            startY,
            $this = $(this);

        $this.bind('touchstart', touchstart);

        function touchstart(event) {
          var touches = event.originalEvent.touches;
          if (touches && touches.length) {
            startX = touches[0].pageX;
            startY = touches[0].pageY;
            $this.bind('touchmove', touchmove);
          }
          event.preventDefault();
        }

        function touchmove(event) {
          var touches = event.originalEvent.touches;
          if (touches && touches.length) {
            var deltaX = startX - touches[0].pageX;
            var deltaY = startY - touches[0].pageY;

            if (deltaX >= 50) {
              $this.trigger("swipeLeft");
            }
            if (deltaX <= -50) {
              $this.trigger("swipeRight");
            }
            if (deltaY >= 50) {
              $this.trigger("swipeUp");
            }
            if (deltaY <= -50) {
              $this.trigger("swipeDown");
            }
            if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
              $this.unbind('touchmove', touchmove);
            }
          }
          event.preventDefault();
        }

      });
    };
	*/

  $.fn.onepage_scroll = function(options){
    var settings = $.extend({}, defaults, options),
        el = $(this),
        sections = $(settings.sectionContainer)
        total = sections.length,
        status = "off",
        topPos = 0,
        lastAnimation = 0,
        quietPeriod = 500,
        paginationList = "";
    
    $.fn.transformPage = function(settings, pos, index) {
      $('html, body').animate({
          scrollTop: pos + '%'
      }, settings.animationTime, settings.easing, function(e){
        if (typeof settings.afterMove == 'function') settings.afterMove(index);
      });
    }
    
    $.fn.moveDown = function() {
      var el = $(this)
      index = $(settings.sectionContainer +".active").data("index");
      current = $(settings.sectionContainer + "[data-index='" + index + "']");
      next = $(settings.sectionContainer + "[data-index='" + (index + 1) + "']");
      if(next.length < 1) {
        if (settings.loop == true) {
          pos = 0;
          next = $(settings.sectionContainer + "[data-index='1']").offset().top;
        } else {
          return
        }
        
      } else {
        //pos = (index * 100);
        pos = $(settings.sectionContainer + "[data-index='" + (index + 1) + "']").offset().top;
      }
      if (typeof settings.beforeMove == 'function') settings.beforeMove( current.data("index"));
      current.removeClass("active")
      next.addClass("active");
      if(settings.pagination == true) {
        $("#section-controls a" + "[data-index='" + index + "']").removeClass("active");
        $("#section-controls a" + "[data-index='" + next.data("index") + "']").addClass("active");
      }
      
      $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
      $("body").addClass("viewing-page-"+next.data("index"))
      
      if (history.replaceState && settings.updateURL == true) {
        var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (index + 1);
        history.pushState( {}, document.title, href );
      }   
      el.transformPage(settings, pos, index);
    }
    
    $.fn.moveUp = function() {
      var el = $(this)
      index = $(settings.sectionContainer +".active").data("index");
      current = $(settings.sectionContainer + "[data-index='" + index + "']");
      next = $(settings.sectionContainer + "[data-index='" + (index - 1) + "']");
      //console.log(next);

      if(next.length < 1) {
        if (settings.loop == true) {
          pos = ((total - 1) * 100) * -1;
          next = $(settings.sectionContainer + "[data-index='"+total+"']").offset().top;
        }
        else {
          return
        }
      }else {
        //pos = ((next.data("index") - 1) * 100) * -1;
        pos = next.offset().top;
      }
      if (typeof settings.beforeMove == 'function') settings.beforeMove(current.data("index"));
      current.removeClass("active")
      next.addClass("active");
      if(settings.pagination == true) {
        $("#section-controls a" + "[data-index='" + index + "']").removeClass("active");
        $("#section-controls a" + "[data-index='" + next.data("index") + "']").addClass("active");
      }
      if($(next).hasClass('controls-bright')) $('#section-controls').addClass('controls-bright');
      else $('#section-controls').addClass('controls-dark');
      $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
      $("body").addClass("viewing-page-"+next.data("index"))
      
      if (history.replaceState && settings.updateURL == true) {
        var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (index - 1);
        history.pushState( {}, document.title, href );
      }
      el.transformPage(settings, pos, index);
    }
    
    $.fn.moveTo = function(page_index) {
      current = $(settings.sectionContainer + ".active")
      next = $(settings.sectionContainer + "[data-index='" + (page_index) + "']");
      if(next.length > 0) {
        if (typeof settings.beforeMove == 'function') settings.beforeMove(current.data("index"));
        current.removeClass("active")
        next.addClass("active")
        $("#section-controls a" + ".active").removeClass("active");
        $("#section-controls a" + "[data-index='" + (page_index) + "']").addClass("active");
        $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
        $("body").addClass("viewing-page-"+next.data("index"))
        
        pos = $(settings.sectionContainer + "[data-index='" + (page_index) + "']").offset().top;
        el.transformPage(settings, pos, page_index);
        if (settings.updateURL == false) return false;
      }
    }
    
    function init_scroll(event, delta) {
        deltaOfInterest = delta;
        var timeNow = new Date().getTime();
        // Cancel scroll if currently animating or within quiet period
        if(timeNow - lastAnimation < quietPeriod + settings.animationTime) {
            event.preventDefault();
            return;
        }

        if (deltaOfInterest < 0) {
          el.moveDown()
        } else {
          el.moveUp()
        }
        lastAnimation = timeNow;
    }
    
    // Prepare everything before binding wheel scroll
    
    $.each( sections, function(i) {
      //var elemClass = $(this).attr("class").split(" ").pop();
      //$(this).attr('id', elemClass);
      $(this).addClass("section").attr("data-index", i+1);
      topPos = topPos + 100;
      if(settings.pagination == true) {
        paginationList += "<a data-index='"+(i+1)+"' href='#" + (i+1) + "'><span></span></a>"
      }
    });
    /*
    el.swipeEvents().bind("swipeDown",  function(){ 
      el.moveUp();
    }).bind("swipeUp", function(){ 
      el.moveDown(); 
    });
    */
    // Create Pagination and Display Them
    if(settings.pagination == true) {
      $("<div id='section-controls' class='controls-bright'>" + paginationList + "</div>").prependTo("body");
      posTop = (el.find("#section-controls").height() / 2) * -1;
      el.find("#section-controls").css("margin-top", posTop);
    }
    
    if(window.location.hash != "" && window.location.hash != "#1") {
      init_index =  window.location.hash.replace("#", "")
      $(settings.sectionContainer + "[data-index='" + init_index + "']").addClass("active")
      $("body").addClass("viewing-page-"+ init_index)
      if(settings.pagination == true) $("#section-controls a" + "[data-index='" + init_index + "']").addClass("active");
      
      next = $(settings.sectionContainer + "[data-index='" + (init_index) + "']");
      if(next) {
        next.addClass("active")
        if(settings.pagination == true) $("#section-controls a" + "[data-index='" + (init_index) + "']").addClass("active");
        $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
        $("body").addClass("viewing-page-"+next.data("index"))
        if (history.replaceState && settings.updateURL == true) {
          var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (init_index);
          history.pushState( {}, document.title, href );
        }
      }
      //pos = ((init_index - 1) * 100) * -1;
      
      pos = $(settings.sectionContainer + "[data-index='" + (init_index) + "']").offset().top;
      //console.log(pos);
      el.transformPage(settings, pos, init_index);
      
    }else{
      $(settings.sectionContainer + "[data-index='1']").addClass("active")
      $("body").addClass("viewing-page-1")
      if(settings.pagination == true) $("#section-controls a" + "[data-index='1']").addClass("active");
    }
    if(settings.pagination == true)  {
      $("#section-controls a").click(function (){
        var page_index = $(this).data("index");
        if (!$(this).hasClass("active")) {
          current = $(settings.sectionContainer + ".active")
          next = $(settings.sectionContainer + "[data-index='" + (page_index) + "']");
          if(next) {
            current.removeClass("active")
            next.addClass("active")
            $("#section-controls a" + ".active").removeClass("active");
            $("#section-controls a" + "[data-index='" + (page_index) + "']").addClass("active");
            $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
            $("body").addClass("viewing-page-"+next.data("index"))
          }
          //pos = ((page_index - 1) * 100) * -1;
          
          pos = $(settings.sectionContainer + "[data-index='" + (page_index) + "']").offset().top;
          //console.log(pos);
          el.transformPage(settings, pos, page_index);
        }
        if (settings.updateURL == false) return false;
      });
    }
    
    
    
    $(document).bind('mousewheel DOMMouseScroll', function(event) {
      event.preventDefault();
      var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
      init_scroll(event, delta);
    });
    
    if(settings.keyboard == true) {
      $(document).keydown(function(e) {
        var tag = e.target.tagName.toLowerCase();
        switch(e.which) {
          case 38:
            if (tag != 'input' && tag != 'textarea') el.moveUp()
          break;
          case 40:
            if (tag != 'input' && tag != 'textarea') el.moveDown()
          break;
          default: return;
        }
        e.preventDefault(); 
      });
    }
    return false;
    
  }
  
}(window.jQuery);