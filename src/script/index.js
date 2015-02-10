$(function() {
	setTimeout(function(){
		var w = $('.section .fa').width();
		if(w < parseInt($('body').css('font-size'))){
			$('.section .fa').each(function(i,d){
				$(d).addClass('nofont').css('margin-left',-w);
				$(d).text($(d).parent().attr('title')[0]);
			});
		}
	},2000);
	touch.on($('.logo'), 'touchstart', function(e) {
		e.stopPropagation();
		e.preventDefault();
		$('body').toggleClass('blur');
		touch.on($('body'), 'touchstart', function(e) {
			$('body').removeClass('blur');
		});
	});
});