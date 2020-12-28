;(function(){
	var $win = $(window),
		$doc = $(document),
		$html = $(document.documentElement),
		$body = $(document.body);

	window.lp_template = {};

	lp_template.hasSlick = false;
	
	lp_template.mapList = [];
	
	lp_template.initMaps = function(list) {
	
		var yMapsList = list.filter(function(item) {
			return item.type === 'yandex';
		});
		
		var gMapsList = list.filter(function(item) {
			return item.type === 'google';
		});
		
		if (yMapsList.length) {
			try {
				yMapsList.forEach(fnMaps);
			} catch(e) {
				$.getScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU', function() {
					yMapsList.forEach(fnMaps);
				});
			}
		}
		
		if (gMapsList.length) {
			if (typeof google == undefined) {
				$.getScript('https://maps.googleapis.com/maps/api/js?v=3', function() {
					gMapsList.forEach(fnMaps);
				});
			} else {
				gMapsList.forEach(fnMaps);
			}
		}
		
		function fnMaps(options) {
			
			if (typeof options.center == 'string') {
				options.center = options.center.split(',');
			}
			
			$.each(options.data, function(key, item) {
				if (typeof item.coords == 'string') {
					item.coords = item.coords.split(',');
				}
			});
			
			console.log(options.data);
			
			if (options.type == 'google') {
				initGoogle(options);
			} else {
				initYandex(options);
			}
		}
	
		function initYandex (options) {
			ymaps.ready(function() {
	
				var map = new ymaps.Map(options.id, {
					center: options.center,
					zoom: options.zoom,
					behaviors: ['drag', 'rightMouseButtonMagnifier'],
				});
	
				map.controls.add(
					new ymaps.control.ZoomControl()
				);
	
				var MyBalloonContentLayoutClass = ymaps.templateLayoutFactory.createClass(
					'<div class="baloon-content">' +
					'<h3>$[properties.name]</h3>' +
					'$[properties.desc]' +
					'</div>'
				);
	
				var myCollection = new ymaps.GeoObjectCollection();
	
				$.each(options.data, function(key, item) {
					myCollection.add(new ymaps.Placemark(
						item.coords,
						item,
						{balloonContentLayout: MyBalloonContentLayoutClass}
					));
				});
	
				map.geoObjects.add(myCollection);
			});
		}
	
		function initGoogle (options) {
			var map = new google.maps.Map(document.getElementById(options.id), {
				zoom: parseInt(options.zoom),
				center: new google.maps.LatLng(options.center[0], options.center[1]),
				scrollwheel: false
			});
	
			$.each(options.data, function(key, item) {
				
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(item.coords[0], item.coords[1]),
					map: map,
					title: item.name
				});
	
				var infowindow = new google.maps.InfoWindow({
					content: '<div class="baloon-content">' +
					'<h3>' + item.name + '</h3>' +
					item.desc +
					'</div>'
				});
	
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map, marker);
				});
	
			});			
		}
	} 

	lp_template.addMapToList = function(obj) {
		return lp_template.mapList.push(obj);
	}

	lp_template.tabs = {
		tabs1: function($self) {
			var $tabs = $self.find('.js-tabs');

			if ($tabs.length) {
				$tabs.responsiveTabs({
					startCollapsed: 'accordion',
					setHash: false,
					animation: 'slide'
				});
			}
		}
	} 

	lp_template.slickSliders = {
		slider1: function($self) {
			var $slider = $self.find('.js-slider-1');
			if ($slider.length) {
			
				$slider.each(function() {
					var $this = $(this),
						autoplay = $this.data('autoplay') || false,
						$thisParent = $this.closest('[data-block-layout]'),
						$thisPrev = $thisParent.find('.slider_prev'),
						$thisNext = $thisParent.find('.slider_next'),
						$thisDots = $thisParent.find('.slider_dotts');

					$this.slick({	        
						infinite: true,
						adaptiveHeight: true,
						dots: true,
						arrows: true,			
						speed: 800,			
						appendDots: $thisDots,
						prevArrow: $thisPrev,
						nextArrow: $thisNext,
						autoplay: autoplay,
						slidesToShow: 1
					});
				});
			}
		},
		reviews: function($self) {
			var $slider = $self.find('.js-slick-reviews');
			if ($slider.length) {
				$slider.each(function() {
					var $this = $(this),
						$thisParent = $this.closest('[data-block-layout]'),
						$thisPrev = $thisParent.find('.sliderRevPrev'),
						$thisNext = $thisParent.find('.sliderRevNext'),
						$thisDots = $thisParent.find('.slide_comm_dots');

					$this.slick({	        
						infinite: true,
					adaptiveHeight: true,
					dots: true,
					arrows: true,			
					speed: 800,			
					appendDots: $thisDots,
					prevArrow: $thisPrev,
					nextArrow: $thisNext,
					autoplay: false,
					fade: false,
					autoplay: true,
					slidesToShow: 2,
					responsive: [
						{
						  breakpoint: 769,
						  settings: {
							slidesToShow: 1,
						  }
						}
					  ]
					});
				});
			}
		},
		productsSlider1: function($self) {
			var $slider = $self.find('.js-slider-2');
			
			console.log($slider.length);

			if ($slider.length) {
				$slider.each(function() {
					var $this = $(this),
						$thisParent = $this.closest('[data-block-layout]'),
						$thisPrev = $thisParent.find('.salebox_slider_prev'),
						$thisNext = $thisParent.find('.salebox_slider_next'),
						$thisDots = $thisParent.find('.salebox_slider_dotts');

					$this.slick({	        
						infinite: true,
				        adaptiveHeight: true,
				        dots: true,
						arrows: true,			
						speed: 800,			
						appendDots: $thisDots,
						prevArrow: $thisPrev,
						nextArrow: $thisNext,
						autoplay: true,
						slidesToShow: $thisParent.width() >=699 ? 2 : 3,
						responsive: [
						    {
						      breakpoint: 769,
						      settings: {
						        slidesToShow: 2,
						      }
						    },
						    {
						      breakpoint: 541,
						      settings: {
						        slidesToShow: 1,
						      }
						    }
						  ]
					});
				});
			}
		}
	}

	lp_template.timers = {
		timer: function($self) {
			var seoTimerBlocks = $self.find('.js-timer'),
				$htmlLang = $html.attr('lang'),
				timerDays, timerHours, timerMinutes, timerSeconds;

			if ($htmlLang=='de' || $htmlLang=='en') {
				timerDays = 'd';
				timerHours = 'h';
				timerMinutes = 'm';
				timerSeconds = 's';
		    } else {
				timerDays = 'д';
				timerHours = 'ч';
				timerMinutes = 'м';
				timerSeconds = 'с'
		    }

			if (seoTimerBlocks.length) {
				seoTimerBlocks.lpTimer({
					format_out : '<span class="time_dy_wr"><ins class="time_dy_in"><span class="time_dy_dig">%d</span></ins><div class="time_dy_tit">' + timerDays + '</div></span><span class="time_dy_wr time_hr"><ins class="time_dy_in time_hr_in"><span class="time_dy_dig time_hr_dig">%h</span></ins><div class="time_dy_tit time_hr_tit">' + timerHours + '</div></span><span class="colon">:</span><span class="time_dy_wr time_min"><ins class="time_dy_in time_min_in"><span class="time_dy_dig time_min_dig">%m</span></ins><div class="time_dy_tit time_min_tit">' + timerMinutes + '</div></span><span class="colon">:</span><span class="time_dy_wr time_sec"><ins class="time_dy_in time_sec_in"><span class="time_dy_dig time_sec_dig">%s</span></ins><div class="time_dy_tit time_sec_tit">' + timerSeconds + '</div></span>',
					language: $htmlLang,
					update_time: 1000,
					onEnd: function() {
						$(this).hide();
					}
				});
			}
		},
	}

	lp_template.popupForm = function($block) {
		$block.on('click', '[data-popup-form]', function(e) {
			var $this = $(this);

			if (myo.show) {
				myo.show({
					json: $this.data('api-url'),
					onContentLoad: function(w) {
						s3LP.initForms($(this.bodyDiv));
					}
				});
			} else if (myo.open) {
				myo.open({
					json: $this.data('api-url'),
					onLoad: function(w) {
						s3LP.initForms($(this.bodyDiv));
					}
				});
			}
			
			e.preventDefault();
		});
	}

	lp_template.queue = {
		
		initSlickSlider: function($block) {
			if (lp_template.hasSlick) {
				if (typeof $.fn.slick == 'undefined') {
					$.getScript("/g/libs/jquery-slick/1.9.0/slick.min.js", function( data, textStatus, jqxhr ) {
						$(document).find('head').append('<link rel="stylesheet" href="/g/libs/jquery-slick/1.9.0/slick.css">');
						queue(lp_template.slickSliders, $block);
					});
				} else {
					queue(lp_template.slickSliders, $block);
				}
			}
		},

		initTabs: function($block) {
			if ($block.find('[data-init-tabs]').length) {
				if (typeof $.fn.responsiveTabs == 'undefined') {
					$.getScript("/g/templates/shop2/2.71.2/js/jquery.responsiveTabs.min.js", function() {
						queue(lp_template.tabs, $block);
					});
				} else {
					queue(lp_template.tabs, $block);
				}
			} 
		},

		initTimers: function($block) {
			if (typeof $.fn.lpTimer == 'undefined') {
				$.getScript("/g/s3/lp/lp_content/js/timer.js", function( data, textStatus, jqxhr ) {
					queue(lp_template.timers, $block);
				});
			} else {
				queue(lp_template.timers, $block);
			}
		},

		stepsAccordeon: function($block) {
			var $buttons = $block.find('.js_keyMoment_tit_init');

			$buttons.on('click', function(e) {
				e.preventDefault();

				if ($win.width() > 767) return;

				var $this = $(this),
					$thisParent = $this.closest('.saleseopage_keyMoment_listBlok'),
					$thisText = $thisParent.find('.saleseopage_keyMoment_listBlok_bottomPart');

				$thisParent.toggleClass('active');
				$thisText.slideToggle();

			});
		},

		productAccordeon: function($block) {
			var $buttons = $block.find('.del_name_init');

			$buttons.on('click', function(e) {
				e.preventDefault();

				if ($win.width() > 640) return;

				var $this = $(this),
					$thisParent = $this.closest('.salepage_formprod_del_name_text'),
					$thisText = $thisParent.find('.salepage_formprod_del_text');

				$thisParent.toggleClass('active');
				$thisText.slideToggle();

			});
		},
		
		popupForm: function($block) {
			if ($block.find('[data-popup-form]').length) {
				if (typeof myo == 'function') {
					lp_template.popupForm($block);
				} else {
					$.getScript('/g/libs/jquery-popover/0.0.3/jquery.popover.min.js', function() {
						$(document).find('head').append('<link rel="stylesheet" href="/g/libs/jquery-popover/0.0.3/jquery.popover.css">');
						lp_template.popupForm($block);
					});
				}
			}
		},
		
		initLightGallery: function($block) {
			var $blocks = $block.find('.js-lightgallery');

			if (typeof $.fn.lightGallery === 'undefined') {
				$.getScript("/g/libs/lightgallery/v1.2.19/lightgallery.js", function( data, textStatus, jqxhr ) {
			    	$(document).find('head').append('<link rel="stylesheet" href="/g/templates/shop2/2.70.2/css/lightgallery.css">');
				    lgInit()
				});
			} else {
				lgInit()
			}

			function lgInit () {
				$blocks.lightGallery({
			        selector: 'a',
			        thumbnail: false,
			        download: false
			    });
			}
		}
	}

	lp_template.init = function($block) {
		queue(lp_template.queue, $block);
	}

	window.lp_init = function(block_wrapper) {
	
		var $wrapper = block_wrapper.find('.decor-wrap');
			wrapperWidth = $wrapper.width();
			
		$win.on('resize', function(){
			var $wrap = $body.find('.decor-wrap')
			$wrap.find('.js-slider-2, .js-slick-reviews, .js-slider-1').width($wrap.width());
		}).trigger('resize');
	
		if ($wrapper.length && wrapperWidth >= 1100) {
			$wrapper.addClass('fullWidth');
		} else if ($wrapper.length && wrapperWidth < 700) {
			$wrapper.addClass('miniWidth');
		} else if ($wrapper.length && wrapperWidth < 900) {
			$wrapper.addClass('middelWidth');
		}
	
		if (!lp_template.hasSlick && block_wrapper.find("[data-init-slick]").length) {
			lp_template.hasSlick = true;
		}
	
		lp_template.init(block_wrapper);
	
		if (lp_template.mapList.length) {
			
			lp_template.initMaps(lp_template.mapList);
			
			lp_template.mapList = [];
		}
		
		if (document.location.hash.length > 1 && $(document.location.hash).length) {
			setTimeout(function() {
				$('html, body').scrollTop($(document.location.hash).offset().top);
			}, 200);
		}
	}

	function queue(obj, $block) {
		Object.keys(obj).forEach(function(item){
			var func = obj[item];

			if (typeof func == 'function') {
				func($block);
			}
		});
	}

})();