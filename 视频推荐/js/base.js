var site_url = '/';
var twitter_name = 'chrismahon';
var ie7 = (document.all && !window.opera && window.XMLHttpRequest);
var overlay_colour = '#FFF';
var overlay_opacity = .8;

$(function() {

	/* FORMS ---------------------------------------------------------*/

		$('textarea.hint, input.hint').hint();

	/* NAV ---------------------------------------------------------*/
	
		$('ul#siteNav > li').mouseenter(function(){
		
			$(this).addClass('hover');
		
			// check width	
			var $ul = $(this).find('ul');
			var $link = $(this).find('a:first');
			
			// if link is wider make the list the same width
			if( $ul.width() < $link.outerWidth() ) {
				$ul.width( $link.outerWidth() );
			}
			
			// ie7 nonsense
			if(ie7) { $ul.find('li').width( $ul.outerWidth() ) };
			
		}).mouseleave(function(){
		
			$(this).removeClass('hover');
			Cufon.refresh();
			
		});

	/* WORK ---------------------------------------------------------*/
		
		// magnifying glass
		$('a.gallery').live('mouseenter', function(){
			$(this).append('<span></span>');
		}).live('mouseleave', function(){
			var t = $(this);
			t.find('span').fadeOut('fast', function(){
				t.find('span').remove();
			});
		});
		
		// bind tabs
		var $filterType = $('#pageTabs li a');
		
		// get the first collection
		var $work = $('.fullWork');
		
		// clone applications to get a second collection
		var $data = $work.clone();
		
		// attempt to call Quicksand on every form change
		$filterType.live('click', function(e) {
		
			$('#pageTabs li').removeClass('selected');
		
			if ($(this).attr('rel') == 'all') {
				var $filteredData = $data.find('li');
			} else {
				var $filteredData = $data.find('li[class=' + $(this).attr('rel') + ']');
			}
			
			// finally, call quicksand
			$work.quicksand($filteredData, {
				duration: 800,
				easing: 'easeInOutQuad',
				attribute: 'id'
			});
			
			Cufon.refresh();
			$(this).focus();
			
			return false;
		
		});


	/* GALLERY ---------------------------------------------------------*/
		
		$("a.gallery").livequery(function(){
			
			$(this).fancybox({
				padding: 0,
				centerOnScroll: true,
				overlayColor: overlay_colour,
				overlayOpacity: overlay_opacity,
				titlePosition: 'over'
			});
			
		});

		$("a.video").livequery(function(){
			
			var href = $(this).attr('href');
			
			if( href.match(/width=[0-9]+/i) && href.match(/height=[0-9]+/i) ) {
				var videoWidth = parseInt( href.match(/width=[0-9]+/i)[0].replace('width=','') );
				var videoHeight =  parseInt( href.match(/height=[0-9]+/i)[0].replace('height=','') );
			}
			
			if( $(this).hasClass('vimeo') ) {
			
				$(this).fancybox({
					padding: 0,
					centerOnScroll: true,
					overlayColor: overlay_colour,
					overlayOpacity: overlay_opacity,
					titleShow: false,
					href: this.href.replace(new RegExp("com/", "i"), 'com/moogaloop.swf?clip_id='),
					type: 'swf',
					width: videoWidth,
					height: videoHeight,
					swf: {
						wmode: 'transparent',
						allowfullscreen: 'true'
					}
				});
			
			} else {

				$(this).fancybox({
					padding: 0,
					centerOnScroll: true,
					overlayColor: overlay_colour,
					overlayOpacity: overlay_opacity,
					titleShow: false,
					href: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
					type: 'swf',
					width: videoWidth,
					height: videoHeight,
					swf: {
						wmode: 'transparent',
						allowfullscreen: 'true'
					}
				});
			
			}
			
		});
		
	/* TWITTER ---------------------------------------------------------*/

		if(twitter_name) {

			$('div#footer').before('<div id="latestTweet"></div><!-- #latestTweet -->');

			setTimeout(function(){
			
				getTwitters('latestTweet', { 
					id: twitter_name,
					count: 1,
					enableLinks: true,
					ignoreReplies: false,
					clearContents: true,
					template: '%text% <a href="http://twitter.com/%user_screen_name%/statuses/%id%/">%time%</a>'
				});
			
			}, 500);
		
		}

	/* SLIDER ---------------------------------------------------------*/
	
		$('#slider').nivoSlider({
			effect: 'sliceDown',
			captionOpacity: 0,
			slices: 8,
			animSpeed: 600,
			pauseTime: 3000,
			beforeChange: function() {
				$('.nivo-imageLink:visible span').animate({'marginLeft':'0','opacity':'0'}, "fast", "swing");
			},
			afterChange: function() {
				$('.nivo-imageLink:visible span').animate({'marginLeft':'-20px','opacity':'1'}, "fast", "swing");
			}
		});
		
		$('.nivo-imageLink:first span').animate({'marginLeft':'-20px','opacity':'1'}, "fast", "swing");

});

$.fn.hint = function() {
	return this.each(function(){
		var t = $(this); // get jQuery version of 'this'
		var title = t.attr('title'); // get it once since it won't change
		
		if (title) { // only apply logic if the element has the attribute
			
			// on focus, set value to blank if current value matches title attr
			t.focus(function(){
				if (t.val() == title) {
					t.val('');
					t.addClass('blur');
				}
			})

			// on blur, set value to title attr if text is blank
			t.blur(function(){
				if (t.val() == '') {
					t.val(title);
					t.removeClass('blur');
				}
			})

			// now change all inputs to title
			t.blur();
		}
	})
}