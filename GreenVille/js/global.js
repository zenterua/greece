/* 01 - variables */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page resize */
/* 05 - function on page scroll */
/* 06 - swiper sliders */
/* 07 - buttons, clicks, hovers */
/* 08 - scroll animation */
/* 09 - ajax */

var _functions = {};

jQuery(function($) {
	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, winScr, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i), _isFF = 'MozAppearance' in document.documentElement.style;

	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	_functions.pageCalculations = function(){
		winW = $(window).width();
		winH = $(window).height();
	};

	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/
	if(_ismobile) $('body').addClass('mobile');
	
	setTimeout( function() {
		$('html, body').animate({scrollTop: 0}, 1);
		setTimeout( function() {
			_functions.pageCalculations();
			// Sumo select init
			if ($('.SelectBox').length)$('.SelectBox').SumoSelect();

			// Loader
			$('.loader-wrapper').addClass('loaded');

			// Swiper init function
			_functions.initSwiper();
	    
			// Animation init function
			animationTrgg();
		}, 500);
	}, 10);

	/*==============================*/
	/* 04 - function on page resize */
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
	/* 05 - function on page scroll */
	/*==============================*/

	$(window).scroll(function(){
		_functions.scrollCall();
	});

	_functions.scrollCall = function(){
		winScr = $(window).scrollTop();
		animationTrgg();
	};

	/*=====================*/
	/* 06 - swiper sliders */
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
		        breakpoints: ($t.is('[data-breakpoints]'))? { 767: { slidesPerView: parseInt($t.attr('data-xs-slides'), 10), slidesPerColumn: 0 }, 991: { slidesPerView: parseInt($t.attr('data-sm-slides'), 10) }, 1199: { slidesPerView: parseInt($t.attr('data-md-slides'), 10) }, 1500: {slidesPerView: parseInt($t.attr('data-lg-slides'), 10)} } : {},
		        initialSlide: ($t.is('[data-ini]'))?parseInt($t.data('ini'), 10):0,
		        speed: ($t.is('[data-speed]'))?parseInt($t.data('speed'), 10):500,
		        keyboardControl: true,
		        mousewheelControl: ($t.is('[data-mousewheel]'))?parseInt($t.data('mousewheel'), 10):0,
		        mousewheelReleaseOnEdges: true,
		        direction: ($t.is('[data-direction]'))?$t.data('direction'):'horizontal',
				spaceBetween: ($t.is('[data-space]'))?parseInt($t.data('space'), 10):0,
				parallax: (_isFF)?($t.data('parallax'), 0): ($t.is('[data-parallax]'))?parseInt($t.data('parallax'), 10):0,
				centeredSlides: ($t.is('[data-centered]'))?parseInt($t.data('centered'), 10):0,
				slidesPerColumn: ($t.is('[data-per-column]'))?parseInt($t.data('per-column'), 10):0,
				effect: ($t.is('[data-effect]'))?$t.data('effect'):'slide',
				fade: {
				  crossFade: true
				}
			});
			swipers['swiper-'+index].update();
			initIterator++;
		});
		$('.swiper-container.swiper-control-top').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-bottom').attr('id')];
		});
		$('.swiper-container.swiper-control-bottom').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-top').attr('id')];
		});
	};

	/*==============================*/
	/* 07 - buttons, clicks, hovers */
	/*==============================*/

	//open and close popup
	$(document).on('click', '.open-popup', function(){
		if ( $(this).hasClass('playButton') ) { //Check if video popup
	 		var videoSrc = $(this).attr('data-video-src');
			setTimeout(function() {
				$('.popup-wrapper').find('iframe').attr('src', videoSrc + '??modestbranding=1;iv_load_policy=0;modestbranding=1;showinfo=0&amp;autoplay=1');
			},700);
			$('.popup-content').removeClass('active');
		}
		$('.popup-wrapper, .popup-content[data-rel="'+$(this).data('rel')+'"]').addClass('active');
		$('html').addClass('overflow-hidden');
		return false;
	});

	$(document).on('click', '.popup-wrapper .button-close, .popup-wrapper .layer-close', function(){
		$('.popup-wrapper, .popup-content').removeClass('active');
		$('.popup-wrapper').find('iframe').attr('src', '');
		$('html').removeClass('overflow-hidden');
		setTimeout(function(){
			$('.ajax-popup').remove();
		},300);
		return false;
	});
	
	//Function OpenPopup
	function openPopup(foo){
		$('.popup-content').removeClass('active');
		$('.popup-wrapper, .popup-content[data-rel="'+foo+'"]').addClass('active');
		$('html').addClass('overflow-hidden');
		return false;
	}

	// Show/hide main tab-menu
	$('.hamburger').on('click', function () {
		$(this).toggleClass('hamburgerActive');
		$('nav').toggleClass('openMenu');
		$('html, body').toggleClass('overflow-hidden');
		$('body').toggleClass('hideContent');
	});

	// Responsive toggle tab-menu
	$('nav li p').on('click', function () {
		if($('.hamburger').is(':hidden')){return false;}
		$(this).parent().find('> ul').slideToggle(350);
		$(this).parent().find('> i').toggleClass('iconRotate');
	});

	// Responsive ajax navigation
	$('.responsiveNav').on('click', function() {
		$(this).find('i').toggleClass('iconRotate');
		$('.responsiveNav').siblings('.ajaxNavigation').slideToggle(450);
	});
	$('.ajaxNavigation a').on('click', function(e) {
		e.preventDefault();
		$('.responsiveNav .as').html($(this).find('span').html());
		if ($('.responsiveNav').is(':visible')) $(this).closest('.ajaxNavigation').slideUp(450);
		$('.responsiveNav i').removeClass('iconRotate');
	});

	//Accordeon
	$('.accordeon-title').on('click', function() {
		if ( $(this).hasClass('active') ) {
			$(this).closest('.accordeon').find('.accordeon-title').removeClass('active').next().slideUp();
		} else {
			$(this).closest('.accordeon').find('.accordeon-title').not(this).removeClass('active').next().slideUp();
			$(this).addClass('active').next().slideDown();
		}
	});

	// Check if input is empty / hide placeholder
	$('.simple-input').on('change', function() {
		if ($(this).val()) {
			$(this).closest('label').addClass('hidePl');
		} else {
			$(this).closest('label').removeClass('hidePl');
		}
	});

	// Map navigation
	$('.mapNav, .mapNavClose').on('click', function() {
		$('.mapNavWrapper').toggleClass('active');
	});

	$('.currentLocation').on('click', function() {
		$(this).find('ul').slideToggle(350);
		$(this).toggleClass('rotateBgIcon');
	});

	$('.currentLocation li').on('click', function() {
		$('.currentLocation span').html($(this).html());
	});

	$('.marker').on('click', function() {
		if ( $('.hamburger').is(':visible') ) {
			$('.mapNavWrapper, .mapNav').removeClass('active');
		}
		if ( $(this).hasClass('active'))  return false;
		$('.marker').removeClass('active');
		$(this).addClass('active');
	});

	// Partners info box
	var checkInfoBox = 1;
	$('.partners').mouseenter ( function() {
			if ( $('.hamburger').is(':visible') ) return false;  // Check if responsive

			var thisPartners = $(this),
				infoBox = $('.partnersInfoBox'),
				infoBoxHeight,
				tOffsetTop,
				tOffsetLeft;

			setTimeout(function() {
				// Set info box content
				infoBox.find('.imgWrapper img').attr('src', thisPartners.attr('data-info-img'));
				infoBox.find('.partnersDiscount span').html(thisPartners.attr('data-info-discount'));
				infoBox.find('.infoBoxContent .as a').html(thisPartners.attr('data-info-title'));
				infoBox.find('.infoBoxContent p').html(thisPartners.attr('data-info-text'));

				// Take and set position after input content
				infoBoxHeight = $('.partnersInfoBox').height();
				tOffsetTop = thisPartners.offset().top - infoBoxHeight / 1.1;
				tOffsetLeft = thisPartners.offset().left;

				// Check content position
				if ( thisPartners.closest('.swiper-slide').hasClass('swiper-slide-active') && $(thisPartners).index() === 0 ) {
					infoBox.css({ // Position for first item
						'top' : tOffsetTop,
						'left' : tOffsetLeft
					});
				} else if ( thisPartners.closest('.swiper-slide').prev().hasClass('swiper-slide-next') && $(thisPartners).index() === 1 ) {
					infoBox.css({ // Position for last item
						'top' : tOffsetTop,
						'left' : $(window).width() - infoBox.width()
					});
				}
				else {
					infoBox.css({ 
						'top' : tOffsetTop,
						'left' : tOffsetLeft - 35
					});
				}

				// Active info box popup
				infoBox.addClass('active');
			}, 350);
	});

	$('.partnersInfoBox').mouseenter(function() { //Check if tooltip hover
		checkInfoBox = 0;
	}); 


	$('.partnersInfoBox').mouseleave(function() { //Check if tooltip mouse leave 
		$('.partnersInfoBox').removeClass('active');
		checkInfoBox = 1;
	}); 

	$('.partners').mouseleave(function() {
		setTimeout(function() {
			if ( checkInfoBox === 1 ) {
				$('.partnersInfoBox').removeClass('active');
			}
		}, 10);
	});

	// Close layer
	$('.closeLayer').on('click', function() {
		$(this).removeClass('active');
	});

	// Form animation
	$('.simple-input').focus(function() { //If input focus in
		$(this).closest('label').addClass('activeInput');
	});

	$('.simple-input').blur(function() { //After unfocus input
		$(this).closest('label').removeClass('activeInput');
	});

	/*==============================*/
	/* 08 - Scroll animation */
	/*==============================*/

	// Page content animation
	var scroll_index = 0,
		animationTrggLen = $('.simpleAnimationTrgg').length;
	function animationTrgg() {
		if ( scroll_index == animationTrggLen ) return false; // Check if animated last iteam
		else if ( ( $('.simpleAnimationTrgg').eq(scroll_index).offset().top <= $(window).scrollTop() + $(window).height() /1.3 ) ) {
			$('.simpleAnimationTrgg').eq(scroll_index).addClass('showAnimation');
			scroll_index ++; // Increment variables for next animation block
		}
	}

	/*==============================*/
	/* 09 - Ajax */
	/*==============================*/
	$(document).on('click', '.ajaxNavigation a', function(e) {
		e.preventDefault();
		var url = $(this).attr('href');

		// Change navigation active
		$('.ajaxNavigation a').removeClass('active');
		$(this).addClass('active');

		$('.ajaxLoader').fadeIn();

		$.ajax({
			type: 'GET',
			async: true,
			url: url,
			success: function(response) {
				var responseObject = $($.parseHTML(response));
				setTimeout(function() { //setTimeout for front delay
					$('.ajaxWrapperContent *').remove();
					$('.ajaxWrapperContent').append(responseObject);
					$('.ajaxContent').animate({opacity: 1, top: 0}, 1100); //animate ajax content
					$('.ajaxLoader').fadeOut();
				}, 1500);
			}
		});
	});

});