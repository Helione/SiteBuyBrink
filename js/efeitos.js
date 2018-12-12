$(document).ready(function () {
    var $window = $(window);
    
    if($window.scrollTop()>75){
        $(".revealOnScroll").each(function(){
            $(this).removeClass("revealOnScroll");
        });
    }
    var w = $(window).width();
    if(w<=600){
        $('.revealOnScroll').each(function(){
            $(this).removeClass("revealOnScroll");
        });
        if(w<=480){
            $('#desktop-wrapper').removeClass("desktop-wrapper");
            $('#desktop-wrapper iframe').css("width","100%");
            $('#desktop-wrapper iframe').css("height","100%");
            $(function() {
                var $body = $(document);
                $body.bind('scroll', function() {
                    // "Disable" the horizontal scroll.
                    if ($body.scrollLeft() !== 0) {
                        $body.scrollLeft(0);
                    }
                });
            }); 
        }
    }
    /*=========SMOOTH SCROLL(Big Devices Only)============*/
    if(!(w<=600)){
        $(function() {
        $('a[href*=#]:not([href=#],[data-toggle],[data-target],[data-slide])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    $('.navigation__item__link').each(function(item,index){
                        if($(this).attr("href")==target.selector){
                            $(this).addClass("active--scrolled");
                        }
                        else{
                            $(this).removeClass("active--scrolled");
                        }
                    });
                    return false;
                }
            }
        });
     });
    }
    /*=========END --- SMOOTH SCROLL============*/
    $(document).on("scroll", onScrollChangeNavbar);
    
});

/*=================================================*/
/*=============ANIMATION FUNCTION================*/
/*Effects: Changes the navbar when scrolled and
changes the <a> adding the class->(active) when scrolled.
AND activate the animation of reveal on scroll*/
function onScrollChangeNavbar(event){
    var $window           = $(window),
      win_height_padded = $window.height() * 1.1;
    var scrolled = $window.scrollTop();
    $(".revealOnScroll:not(.animated)").each(function () {
      var $this     = $(this),
          offsetTop = $this.offset().top;
      if (scrolled + win_height_padded > offsetTop) {
            if ($this.data('timeout')) {
              window.setTimeout(function(){
                $this.addClass('animated ' + $this.data('animation'));
              }, parseInt($this.data('timeout'),10));
            } else {
              $this.addClass('animated ' + $this.data('animation'));
            }
       }
    });
    var scrollPos = $(document).scrollTop();

    if($(document).scrollTop()>75){
        $('.navigation').addClass('navigation_scrolled');
        $('.navigation__item__link').removeClass('active');
    }
    else{
        $('.navigation').removeClass('navigation_scrolled');
    }
    $('.navigation__list li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if(refElement.position()){
            if (refElement.position().top <= scrollPos 
                && refElement.position().top + refElement.height() > scrollPos) {
                $('.navigation__item__link').removeClass("active--scrolled");
                currLink.addClass("active--scrolled");
            }
        }
    });
}

