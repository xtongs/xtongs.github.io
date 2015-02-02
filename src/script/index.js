$(function() {
    var $canvas = $('.canvas');
    var $page = $('.page');
    var $medium = $('.medium');
    var $header = $('.header');
    var $footer = $('.footer');
    // init
    $header.addClass('show');
    $footer.addClass('show');
    var loading = setInterval(function() {
        var $iframe = $medium.find('iframe');
        if ($iframe) {
            $medium.addClass('loaded');
            showMedium();
            clearInterval(loading);
        }
    }, 500);

    function showMedium() {
        $canvas.addClass('show');
        $page.addClass('showmore');
        $medium.addClass('show');
    }
});