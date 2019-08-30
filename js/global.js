/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/
/* 01 - VARIABLES */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page load */
/* 05 - function on page resize */
/* 06 - function on page scroll */
/* 07 - swiper sliders */
/* 08 - buttons, clicks, hovers */

var _functions = {};

$(function() {

	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, headerH, winScr, footerTop, _isresponsive, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i), _isFF = 'MozAppearance' in document.documentElement.style;

	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	_functions.pageCalculations = function(){
		winW = $(window).width();
		winH = $(window).height();
		$('.mainBanner .cell-view').css({'height':winH - $('header').outerHeight() - 160});
	};

	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/
	if(_ismobile) $('body').addClass('mobile');
	_functions.pageCalculations();
    $('.SelectBox').SumoSelect({up: false});
	$('.SelectBoxUp').SumoSelect({up: true});

	/*============================*/
	/* 04 - function on page load */
	/*============================*/
	$(window).load(function(){
		_functions.initSwiper();
		$('body').addClass('loaded');
		$('#loader-wrapper').fadeOut();
	});

	/*==============================*/
	/* 05 - function on page resize */
	/*==============================*/
	_functions.resizeCall = function(){
		_functions.pageCalculations();
	};
	if(!_ismobile){
		$(window).resize(function(){
			_functions.resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			_functions.resizeCall();
		}, false);
	}

	/*==============================*/
	/* 06 - function on page scroll */
	/*==============================*/
	$(window).scroll(function(){
		_functions.scrollCall();
	});

	_functions.scrollCall = function(){
		winScr = $(window).scrollTop();
		//headerScrolled
        if ( winScr > 100 ) {
            $('header').addClass('topMenuScrolled');
            $('.mainMenuWrapper').addClass('mainMenuScrolled');
        } else {
            $('header').removeClass('topMenuScrolled');
            $('.mainMenuWrapper').removeClass('mainMenuScrolled');
        }
		//ScrollAnimation
		$('body.loaded .reveal-animate').each(function(){
			if($(this).data('top')<(winScr+winH)) $(this).addClass('visible');
		});
	};
	
	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
	var initIterator = 0;
	_functions.initSwiper = function(){
		$('.swiper-container').not('.initialized').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index+' initialized').attr('id', index);
			$t.find('>.swiper-pagination').addClass('swiper-pagination-'+index);
			$t.parent().find('>.swiper-button-prev').addClass('swiper-button-prev-'+index);
			$t.parent().find('>.swiper-button-next').addClass('swiper-button-next-'+index);

			var slidesPerViewVar = ($t.data('slides-per-view'))?$t.data('slides-per-view'):1;
			if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				pagination: '.swiper-pagination-'+index,
		        paginationClickable: true,
		        nextButton: '.swiper-button-next-'+index,
		        prevButton: '.swiper-button-prev-'+index,
		        slidesPerView: slidesPerViewVar,
		        autoHeight:($t.is('[data-auto-height]'))?parseInt($t.data('auto-height'), 10):0,
		        loop: ($t.is('[data-loop]'))?parseInt($t.data('loop'), 10):0,
				autoplay: ($t.is('[data-autoplay]'))?parseInt($t.data('autoplay'), 10):0,
		        breakpoints: ($t.is('[data-breakpoints]'))? { 767: { slidesPerView: parseInt($t.attr('data-xs-slides'), 10) }, 991: { slidesPerView: parseInt($t.attr('data-sm-slides'), 10) }, 1199: { slidesPerView: parseInt($t.attr('data-md-slides'), 10) } } : {},
		        initialSlide: ($t.is('[data-ini]'))?parseInt($t.data('ini'), 10):0,
		        speed: ($t.is('[data-speed]'))?parseInt($t.data('speed'), 10):500,
		        keyboardControl: true,
		        mousewheelControl: ($t.is('[data-mousewheel]'))?parseInt($t.data('mousewheel'), 10):0,
		        mousewheelReleaseOnEdges: true,
		        direction: ($t.is('[data-direction]'))?$t.data('direction'):'horizontal',
                spaceBetween: ($t.is('[data-space]'))?parseInt($t.data('space'), 10):0,
                effect: ($t.is('[data-effect]'))?($t.data('effect'), 'coverflow'):0,
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows : true
                },
				parallax: (_isFF)?($t.data('parallax'), 0): ($t.is('[data-parallax]'))?parseInt($t.data('parallax'), 10):0,
				onTouchMove: function() {
					$('.searchBottomImg').addClass('hideBottomImage');
				},
				onTouchEnd: function() {
					$('.searchBottomImg').removeClass('hideBottomImage');
				}
			});
			swipers['swiper-'+index].update();
			initIterator++;
		});
		$('.swiper-container.swiper-control-top').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).closest('.swipers-couple-wrapper').find('.swiper-control-bottom').attr('id')];
		});
		$('.swiper-container.swiper-control-bottom').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).closest('.swipers-couple-wrapper').find('.swiper-control-top').attr('id')];
		});
	};

	/*==============================*/
	/* 08 - buttons, clicks, hovers */
	/*==============================*/

	//open and close popup
	$(document).on('click', '.open-popup', function(){
		$('.popup-content').removeClass('active');
		$('.popup-wrapper, .popup-content[data-rel="'+$(this).data('rel')+'"]').addClass('active');
		$('html').addClass('overflow-hidden');
		return false;
	});

	$(document).on('click', '.popup-wrapper .button-close, .popup-wrapper .layer-close', function(){
		$('.popup-wrapper, .popup-content').removeClass('active');
		$('html').removeClass('overflow-hidden');
		setTimeout(function(){
			$('.ajax-popup').remove();
		},300);
		return false;
	});
	
	function openPopup(foo){
		$('.popup-content').removeClass('active');
		$('.popup-wrapper, .popup-content[data-rel="'+foo+'"]').addClass('active');
		$('html').addClass('overflow-hidden');
		return false;
	}
    
    //Smooth Scroll
    if(!_ismobile) {
        SmoothScroll({ stepSize: 100 })
    };
    
    //language drop down
    $('.switchLanguage').on('click', function() {
        $('.languageDropDown').slideToggle(200);
    });
    
    //hamburger menu
    $('.menuIcon').on('click', function() {
        $(this).toggleClass('menuIconActive');
        $('.mobileWrapper').toggleClass('menuActive');
		$('.searchpopup').toggleClass('mainMenyIsOpen');
		$('.searchPopupBtn ').toggleClass('mainMenyIsOpen');
    });
    
    //Responsive drop down menu
    $('.respDDicon').on('click', function() {
       $('.mainMenuDropDown').slideToggle(350); 
    });
	
	//date range picker
	$('#searchCalendar').dateRangePicker({
		autoClose: false,
		format: 'YYYY-MM-DD',
		separator: ' to ',
		language:'en',
		startOfWeek: 'sunday',// or monday
		getValue: function()
		{
			return $(this).val();
		},
		setValue: function(s)
		{
			if(!$(this).attr('readonly') && !$(this).is(':disabled') && s != $(this).val())
			{
				$(this).val(s);
			}
		},
		startDate: new Date(),
		endDate: false,
		time: {
			enabled: false
		},
		minDays: 0,
		maxDays: 0,
		showShortcuts: false,
		shortcuts:
		{},
		customShortcuts : [],
		inline:false,
		container:'#searchCalendar',
		alwaysOpen:false,
		singleDate:false,
		lookBehind: false,
		batchMode: false,
		duration: 200,
		stickyMonths: false,
		dayDivAttrs: [],
		dayTdAttrs: [],
		applyBtnClass: '',
		singleMonth: 'auto',
		showTopbar: true,
		swapTime: false,
		selectForward: true,
		selectBackward: false,
		showWeekNumbers: false,
		getWeekNumber: function(date) //date will be the first day of a week
		{
			return moment(date).format('w');
		},
		customOpenAnimation: function(cb) {
			$(this).fadeIn(100, cb);
		},
		customCloseAnimation: function(cb) {
			$(this).fadeOut(100, cb);
		}
	});
	
	//Calendar Position
	$('.date-picker-wrapper').addClass('calendarOpenUp');
	if ( $('#searchCalendar').hasClass('calendarNormalPos') ) {
		$('.date-picker-wrapper').removeClass('calendarOpenUp');
	}
	if(!_ismobile) {
		var wow = new WOW().init();
	}
	
	//init reveal animate function
	function revealInit(){
		$('.reveal-animate').each(function(){
			$(this).addClass('no-transition');
			$(this).data('top', $(this).offset().top + $(this).outerHeight());
			$(this).removeClass('no-transition');
		});
	}
    revealInit();
	
	//Open/close search popup
	$('.searchPopupBtn').on('click', function() {
		$('.searchpopup').toggleClass('openSearch');
	});
	
	$('.searchCloseButton').on('click', function() {
		$('.searchpopup').removeClass('openSearch');
	});
	
	//Pros Cons block
	$('.pros .as, .cons .as').on('click', function() {
		$(this).parent().find('ul').slideToggle(250);
	});
	
	//more info list
	$('.listInfo').on('click', function() {
		$(this).closest('.detailWrapper').find('.moreInfoList').slideToggle(250);
		$(this).closest('.detailWrapper').find('.toMuchInfo').toggleClass('open');
		$(this).toggleClass('minus')
	});
	
	//more info article
	$('.articleInfo').on('click', function() {
		$(this).closest('.moreArticle').find('.moreArticleDes').slideToggle(250);
		$(this).closest('.moreArticle').find('.moreArticleInfo').toggleClass('open');
		$(this).toggleClass('minus')
	});
	
	//filter toggle
	$('.filterIcon').on('click', function() {
		$(this).toggleClass('filtersOpen')
		$('.moreFilters').slideToggle();
	});
	
	//slider range
	$("#slider-range").slider({
      range: true,
      min: 600,
      max: 50000,
      values: [ 600, 50000 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "" + ui.values[ 0 ] );
		$( '#amount2' ).val( "" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "" + $( "#slider-range" ).slider( "values", 0 ) );
    $( "#amount2" ).val( "" + $( "#slider-range" ).slider( "values", 1 ) );
	
	//Search Option
	$('.searchOptions .button').on('click', function() {
		$('.searchSidebar').slideToggle(250);
	});
	
	//Booking Steps
	$('.bookingStepsDD').on('click', function() {
		$('.bookingStepsWrapper').slideToggle(250);
	});
	
	 //gallery
    $('.open-galleryPopup').on('click', function(){
    	var index = $(this).index();
    	openPopup('10');
    	swipers['swiper-'+$('.galleryPopup .swiper-container').attr('id')].slideTo(index, 0);
        return false;
    });
});