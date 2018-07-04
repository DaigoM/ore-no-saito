$(document).ready(function(){
    var body = $('body'),
        windowJq = $(window),
        scrollPosition = 0,
        menuLinks = $('.second-navbar-row li a, .second-navbar-row .navbar-brand'),
        customNavbar = $('.custom-navbar'),
        socialMediabtn = $('.first-navbar-row a');

    body.scrollspy({ target: '#second-collapse-navbar'});

    $('[data-toggle="tooltip"]').tooltip();

    $('#return-to-top').click(function() {
        $('body,html').animate({
            scrollTop : 0
        }, 500);
    });

    $('.timer').countTo();

    body.smoothScroll();

    new WOW().init();

    windowJq.scroll(function(){
        var CurrentScrollPosition = $(this).scrollTop(),
            windowH = windowJq.height();

        if ( CurrentScrollPosition >= windowH ) {
            $('#return-to-top').fadeIn();
        } else {
            $('#return-to-top').fadeOut();
        }

        
        if ( CurrentScrollPosition > scrollPosition && menuLinks.has('.scrolldown') ) {
            menuLinks.addClass('scrolldown');
            customNavbar.attr('style', 'background-color: rgba(124, 181, 63, 1)');
            socialMediabtn.attr('style','padding-top: 0; padding-bottom: 0;');
        } else {
            menuLinks.removeClass('scrolldown');
            customNavbar.attr('style', '');

            socialMediabtn.attr('style', '');
        }

        // scrollPosition = CurrentScrollPosition;
    });


});
