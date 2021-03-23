var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 40;

// // on scroll, let the interval function know the user has scrolled
$(window).scroll(function(){
  didScroll = true;
});

// // run hasScrolled() and reset didScroll status
setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);


function hasScrolled() {
    // store the scroll position in a variable for easy access
    var st = $(this).scrollTop();
    // check if they scrolled more than delta
    if (Math.abs(lastScrollTop - st) <= delta)
    return;

    // check if they scrolled past the header and if they scrolled up or down
    // If current position > last position AND scrolled past navbar...
    if (st > lastScrollTop && st > navbarHeight){
        console.log("scrolling down");
        // Scroll Down
        document.getElementById("logo").style.opacity = "0";
        document.getElementById("menu").style.opacity = "0";
        document.getElementById("btn").style.opacity = "0";
        document.getElementById("menu-dropdown-bg").style.opacity = "0";
        document.getElementById("header_black_background").style.opacity = "0";
    } else {
        console.log("scrolling up");
        // Scroll Up
        // If did not scroll past the document (possible on mac)...
        if(st + $(window).height() < $(document).height()) { 
            document.getElementById("logo").style.opacity = "100";
            document.getElementById("menu").style.opacity = "100";
            document.getElementById("btn").style.opacity = "100";
            document.getElementById("menu-dropdown-bg").style.opacity = "100";
            document.getElementById("header_black_background").style.opacity = "100";
        }
    }

    // set lastScrollTop to the current position
    lastScrollTop = st;
}

function show_logo() {
    document.getElementById("logo").style.opacity = "100";
    document.getElementById("menu").style.opacity = "100";
}

function hide_logo() {
    document.getElementById("logo").style.opacity = "0";
    document.getElementById("menu").style.opacity = "0";
}