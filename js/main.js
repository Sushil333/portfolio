const menuButton = document.querySelector('.btn-menu');
const nav = document.querySelector('nav');
const logo = document.querySelector('.logo');
const home = document.querySelector('#home');
const about = document.querySelector('#about');
const contact = document.querySelector('#contact');


window.addEventListener('DOMContentLoaded', function() {
    var isMobile;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     isMobile = true; 
    }
    
    // Sticky Nav on Mobile
    if (isMobile) {
        nav.classList.add('fixed');
    } else {
        nav.classList.add('desk');
    }

    var navPos = nav.offsetTop;
    var lastPos = 0;
    var lockTimer;
    window.addEventListener('scroll', function(){
        var pos = window.scrollY;
        var pos2 = pos + 50;
        var scrollBottom = pos + screen.height;

        if (!isMobile) {
            if (pos >= navPos + nav.clientHeight && lastPos < pos) {
                nav.classList.add('fixed');
                logo.style.display = 'inline-block';
            }
            if (pos < navPos && lastPos > pos) {
                nav.classList.remove('fixed');
                logo.style.display = 'none';
            }
            lastPos = pos;
        }
        
        // Link Highlighting
        if (pos2 > home.offsetTop)       { highlightLink('home'); }
        if (pos2 > about.offsetTop)      { highlightLink('about'); }
        //if (pos2 > $('#portfolio').offset().top)  { highlightLink('portfolio'); }
        //if (pos2 > $('#blog').offset().top)       { highlightLink('blog'); }
        if (pos2 > contact.offsetTop ||
        pos + screen.height === document.height) {
          highlightLink('contact');
        }
        function highlightLink(anchor) {
            document.querySelector('nav .active').classList.remove('active');
            document.querySelector(`nav [dest="${anchor}"]`).classList.add('active');
        }

        // Prevent Hover on Scroll
        clearTimeout(lockTimer);
        if(!document.querySelector('body').classList.contains('disable-hover')) {
            document.querySelector('body').classList.add('disable-hover')
        }

        lockTimer = setTimeout(function(){
            document.querySelector('body').classList.remove('disable-hover')
        }, 100);

        // EVENT HANDLERS
        var pageLinks = document.querySelectorAll('.page-link');
        
        pageLinks.forEach(pageLink => {
            pageLink.addEventListener('click', function() {
                const anchor = pageLink.getAttribute('dest');
                document.querySelector('.link-wrap').classList.remove('visible');
                document.querySelector('.btn-menu').classList.remove('close');
                document.querySelector('nav div').classList.remove('active');
                document.querySelector(`nav [dest="${anchor}"]`).classList.add('active');
                
                document.querySelector(`#${anchor}`).scrollIntoView({ block: 'start', behavior:'smooth'})
            });
        });

        // SCROLL ANIMATIONS
        function onScrollInit( items, elemTrigger ) {
            var offset = window.scrollY / 1.6;
            
            items.forEach(function(item) {
                var elem = item,
                animationClass = elem.getAttribute('data-animation'),
                animationDelay = elem.getAttribute('data-delay'),
                elementHeight = elem.clientHeight,
                windowHeight = window.innerHeight,
                scrollY = window.scrollY || window.pageYOffset,
                scrollPosition = scrollY + windowHeight,
                elementPosition = elem.getBoundingClientRect().top + scrollY + elementHeight;


                elem.style.animationDelay = animationDelay;
                var trigger = (elemTrigger) ? trigger : elem;
                if( trigger ) {
                    if (scrollPosition > elementPosition) {
                        elem.classList.add('animated');
                        elem.classList.add(animationClass);
                    }                    
                }

                   
            });
            /*
            var offset = $(window).height() / 1.6
        items.each( function() {
      var elem = $(this),
          animationClass = elem.attr('data-animation'),
          animationDelay = elem.attr('data-delay');

          elem.css({
            '-webkit-animation-delay':  animationDelay,
            '-moz-animation-delay':     animationDelay,
            'animation-delay':          animationDelay
          });

          var trigger = (elemTrigger) ? trigger : elem;

          trigger.waypoint(function() {
            elem.addClass('animated').addClass(animationClass);
            if (elem.get(0).id === 'gallery') mixClear(); //OPTIONAL
            },{
                triggerOnce: true,
                offset: offset
          });
    });
  }
            */
           
        }

        setTimeout(function() { onScrollInit(document.querySelectorAll('.waypoint')) }, 10);

    });  
});

/*
var section = document.querySelectorAll(".section");
var sections = {};
  var i = 0;
  
  Array.prototype.forEach.call(section, function(e) {
      sections[e.id] = e.offsetTop;
  });

  
  window.onscroll = function() {
      var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
      
    for (i in sections) {
        if (sections[i] <= scrollPosition) {
            document.querySelector('.active').setAttribute('class', ' ');
        document.querySelector('a[href*=' + i + ']').setAttribute('class', 'active');
      }
    }
  };
*/
menuButton.addEventListener('click', function() {
    document.querySelector('.link-wrap').classList.toggle('visible');
    document.querySelector('.btn-menu').classList.toggle('close');
});
    /* var mq = window.matchMedia('@media scree and (min-width: 600px)');
    function fixedNav() {
        if(window.scrollY+53 >= topOfNav) {
            nav.classList.add('fixed');
            nav.classList.add('desk');
            //if(mq.matches) {logo.style.display = 'inline-block';}
            logo.style.display = 'inline-block';
            document.querySelector('.bars-wrap').classList.add('animated');
        } else {
            nav.classList.remove('fixed');
            nav.classList.add('desk');
            //logo.style.display = 'none';
        }
    }
    
    window.addEventListener('scroll', fixedNav);
    */
