/*------------------------------------------------------------------

	IMAGE PREVIEWER

	'tap' event in handlers function requires tappy:
	https://github.com/filamentgroup/tappy

-------------------------------------------------------------------*/

(function($){

	$.fn.imagePreviewer = function(options) {

		var plugin = this,
			thumbs = [],
			photos = [],
			index = 0,
			settings = $.extend({
				photoWrap: '.feature',
				thumbsWrap: '.thumbnails'
			}, options||{} ),

			$w = $(window);

		plugin.init = function() {

			// Cycle through thumbnail items and push details to arrays
			$(settings.thumbsWrap).children().each(function(i, v) {
				thumbs.push({
					item: $(v),
					link: $(v).find('a'),
					img: $(v).find('img'),
					fullSize: $(v).find('a').attr('href')
				});
				photos.push($(v).find('a').attr('href'));
			});

			// Defer loading of additional full-sized images until page has finished loading
			$w.bind('load', function() {
				$(photos).each(function(i, v) {
					if (i > 0) {
						$(settings.photoWrap).append( '<img src="' + v + '" alt=" ">' );
					}
				});
				plugin.swapPhoto(0);
			});

			handlers();

			// Add active class to first item
			$(thumbs[0].item).addClass('active');

		};

		handlers = function() {
			// Bind event handler to thumbnail links
			$.each(thumbs, function(i, v) {
				$(this)[0].link.on('click tap', function(e) {
					if ( index !== i ) {
						$(v)[0].item.addClass('active').siblings().removeClass('active');
						plugin.swapPhoto(i);
					}
					index = i;
					e.preventDefault();
				});
			});
		};

		plugin.swapPhoto = function(num) {
			$(settings.photoWrap).children('img').each(function(i) {
				if (num === i) {
					$(this).show().siblings().hide();
				}
			});
		};

		if ( $(this.selector).length > 0 ) plugin.init();

	}

})(jQuery);