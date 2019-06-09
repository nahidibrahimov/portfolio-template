/* One Page Portfolio HTML Template */
/* Author: Nahid Ibrahimov */
/* http://nahidibrahimov.com */

let speed = 250; //spped of navigation opening/closing in ms
let menu_opened = false;
let fixed_nav = false;
let animate = false; // animate fixed navbar on navigation closing
let scrlLoaderPerc = 0;

function show_fixed_nav() {
	let navbar = $('.custom-navbar');
	let navbar_pos = navbar.offset().top + navbar.outerHeight(true); //passing true includes margin and padding
	let curr_scroll_pos = $(document).scrollTop();
	if(curr_scroll_pos > navbar_pos && !fixed_nav && !menu_opened){
		$('.fixed-nav').stop().animate({left: 0}, speed);
		fixed_nav = true;
	}else if(curr_scroll_pos < navbar_pos){
		$('.fixed-nav').stop().animate({left: -100}, speed);
		fixed_nav = false;
	}
} //show_fixed_nav()
    
function menuHover() {
	$('section').each(function() {
		var secoff = Math.floor($(this).offset().top);
		var docoff = $(document).scrollTop();
		if(docoff >= secoff - 180){
			var hash = '#' + $(this).attr('id');
			var attr = $('.menu li a').each(function(){
				$(this).attr('href');
			});
			for(var i = 0; i < attr.length; i++){
				if(attr[i].hash == hash){
					attr[i].parentNode.classList.add('active');
				}else{
					attr[i].parentNode.classList.remove('active');
				} // if
			} // for loop
		} // if statement
	}); // for each
} //menuHover()

function animateWelcome() {
    let animUpdates = 0;
    const svgPath = document.querySelectorAll('.path');
    
    const svgText = anime({
      targets: svgPath,
      loop: false,
      direction: 'alternate',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 700,
      delay: (el, i) => { return i * 500 }
    });
    
    setTimeout(function(){
        $('h1').animate({opacity: '1'}, 2000);
        $('.welcome .desc').animate({opacity: '1'}, 2000);
        $('.intro-btns, .next-page').animate({opacity: '1'}, 1250);
    }, 1500);


}

function scrollLoader() {
    let scrlHeight = $(document).outerHeight(true) - $(window).outerHeight();
    scrlLoaderPerc = Math.floor((100 * $(document).scrollTop()) / scrlHeight) + '%';
    if($(document).scrollTop() > 150){
        $('.scrollProgressBar').fadeIn('fast');
        $('.scrollLoader').css({width: scrlLoaderPerc}); 
    }else{
        $('.scrollLoader').css({width: 0});
        $('.scrollProgressBar').fadeOut('fast'); 
    }
}


 // Wait for window load
$(window).on('load', function() {
	menuHover();
	show_fixed_nav(); 
	// Animate loader off screen
	$(".se-pre-con").fadeOut(1000, animateWelcome());
});


//on document ready
$(document).ready(function() {

	// OWL CAROUSEL
	var owl = $('.owl-carousel');
	owl.owlCarousel({
	  loop: false,
	  nav: false,
	  margin: 10,
	  responsive: {
	    0: {
	      items: 1
	    },
	    600: {
	      items: 2
	    },
	    992: {
	      items: 3
	    }
	  }
	});
	owl.on('mousewheel', '.owl-stage', function(e) {
	  if (e.deltaY > 0) {
	    owl.trigger('next.owl');
	  } else {
	    owl.trigger('prev.owl');
	  }
	  e.preventDefault();
	});



  	// CUSTOM JS
       
    //show menu on click open menu   
    $('.open-menu').on('click', function(e){
    	$('.header .open-menu').animate({ opacity: 0 }, 'fast', function(){
    	$('.navigation').css({display: 'block'});
    	$('.overlay').fadeIn();
    	$('.navigation').animate({ left:0 }, speed, function(){
    		$('.close-menu').fadeIn();
    		menu_opened = true;
    	});				
    	});	
    });
    
    //show menu on click open menu from fixed menu button
    $('.fixed-nav .open-menu').on('click', function(){
    	$('.header .open-menu').animate({ opacity: 0 });
    	$('.fixed-nav').animate({left: -100}, speed, function(){
    		$('.navigation').css({display: 'block'});
    	$('.overlay').fadeIn();

        // animate navigation
    	$('.navigation').animate({left:0}, speed, function(){
    		$('.close-menu').fadeIn();
    		menu_opened = true;
    	}); // animate navigation

    	}); //hide fixed nav event
    }); //on click event
    
    //hide menu on click close button
    $('.close-menu').on('click', function(){
    	$('.navigation').animate({left:-320}, speed, function(){
    		$('.navigation').css({display: 'none'});
    		$('.overlay, .close-menu').fadeOut();
    		$('.header .open-menu').animate({ opacity: 1 }, 'fast', 'linear');	
    		menu_opened = false;
    		fixed_nav = false;
    		show_fixed_nav();
    	});	
    }); 
    
    //hide menu on click body overlay
    $('.overlay').on('click', function(){
    	$('.navigation').animate({left:-320}, speed, function(){
    		$('.navigation').css({display: 'none'});
    		$('.overlay, .close-menu').fadeOut();
        $('.header .open-menu').animate({ opacity: 1 }, 'fast', 'linear');  
    		menu_opened = false;
    		fixed_nav = false;
    		show_fixed_nav();
    	});
    	
    }); 


    //animate sections
    AOS.init();

    //call func to get scroll loader width after every refresh
    scrollLoader(); 



    //on scroll event
	$(window).on('scroll', function() {
    
		if($(document).scrollTop() > 150){
			$(".scrollTop").fadeIn();
		}else{
			$(".scrollTop").fadeOut();
		}
		show_fixed_nav(); //show fixed navigation
        scrollLoader(); //show scroll progress bar
		menuHover(); //hover current secion in navigation bar 			
	});
  

    //scroll to top button    
    $(".scrollTop").on("click", function(){   
    	$('html, body').animate({scrollTop: 0}, 500, function(){
    		window.location.hash = "";
    	});
    });
 

    // hide menu on click   
    $(".menu a, .next-page a, .welcome .btn").on('click', function(event) {
    	event.preventDefault();
    	if(menu_opened){
    		//$('.header .open-menu').fadeOut();
    		$('.navigation').animate({left:-320}, 'fast', function(){
    			$('.navigation').css({display: 'none'});
    			$('.overlay').fadeOut();
    			$('.close-menu').fadeOut();
    			$('.header .open-menu').animate({ opacity: 1 }, 'fast', 'linear');  
    			$('.fixed-nav').animate({left: 0}, speed);
    			menu_opened = false;
          show_fixed_nav();
    	});
    }


    //smooth scrolling     
    if(this.hash !== "") {
         event.preventDefault();
         var hash = this.hash;
         $('html, body').animate({
           scrollTop: $(hash).offset().top
         }, 800, function(){
           window.location.hash = hash;
         });
       }
    });


}); //document ready

