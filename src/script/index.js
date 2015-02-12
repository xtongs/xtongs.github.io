$(function() {
	touch.on($('.logo'), 'touchstart', function(e) {
		e.stopPropagation();
		e.preventDefault();
		$('body').toggleClass('blur');
		touch.on($('body'), 'touchstart', function(e) {
			$('body').removeClass('blur');
		});
	});
});