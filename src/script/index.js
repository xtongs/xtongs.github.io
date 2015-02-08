$(function(){
    $body = $('body');
    $logo = $('.logo');
    $logo.on('touchstart click',function(e){
        e.stopPropagation();
        e.preventDefault();
        $body.toggleClass('blur').on('touchstart click',function(){
            $body.removeClass('blur');
        });
    });
});