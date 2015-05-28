/*jshint jquery:true */
/*global $:true */

var $ = jQuery.noConflict();


/* ==============================================
    Preloader
=============================================== */

$(window).load(function() {

    $('#preloader').delay(500).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('#preloader .inner').fadeOut(); // will first fade out the loading animation

    });


$(document).ready(function($) {
    "use strict";


    /* ==============================================
        Header effect
    =============================================== */

    $(".header").affix({
        offset: {
          top: 120, 
          bottom: function () {
          return (this.bottom = $('#footer-section').outerHeight(true));
          }
        }
    });


    /* ==============================================
        Full height home-section
    =============================================== */
    
    var windowHeight = $(window).height(),
        topSection = $('#hero-section');
    topSection.css('height', windowHeight);

    $(window).resize(function(){
        var windowHeight = $(window).height();
        topSection.css('height', windowHeight);       
    });

    /* ==============================================
        Collapse menu on click
    =============================================== */

    $('.navbar-collapse a:not(.dropdown-toggle)').click(function(){
        if($(window).width() < 768 )
            $('.navbar-collapse').collapse('hide');
    });

    /* ==============================================
        Scrollspy
    =============================================== */

    $('body').scrollspy({
       target: '#navigation-nav',
       offset: 150      //px/
    });

    /* ==============================================
        Smooth Scroll on anchors
    =============================================== */  

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top -50
            }, 1000);
            return false;
          }
        }
    });

    /* ==============================================
        Counter increment
    =============================================== */

    function countUp() {   
        var dataperc;   
        $('.stats-percent').each(function(){
            dataperc = $(this).attr('data-perc'),
            $(this).find('.percentfactor').delay(6000).countTo({
                from: 0,                 // number to begin counting
                to: dataperc,      
                speed: 1000,             // ms
                refreshInterval: 10,
            });  
        });
    }
        
    $('.stats-percent').waypoint(function() {
        countUp();
    },
    {
        offset: '95%',                 
        triggerOnce: true
    });
        

    /* ==============================================
        Animated content
    =============================================== */

    $('.animated').appear(function(){
        var el = $(this);
        var anim = el.data('animation');
        var animDelay = el.data('delay');
        if (animDelay) {

            setTimeout(function(){
                el.addClass( anim + " in" );
                el.removeClass('out');
            }, animDelay);

        }

        else {
            el.addClass( anim + " in" );
            el.removeClass('out');
        }    
    },{accY: -150});  


    /* ==============================================
        Parallax
    =============================================== */
    
    $.stellar({
        horizontalScrolling: false,
        verticalOffset: 0
    });

    /* ==============================================
        Placeholder
    =============================================== */ 

    $('input, textarea').placeholder();


    /* ==============================================
        OWL Carousel (initialize screenshot carousel)
    =============================================== */
    
    $(".screenshots-carousel").owlCarousel({
 
        autoPlay: 3000, //Set AutoPlay to 3 seconds
 
        items : 5,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]
 
    });

    /* ==============================================
        MagnificPopup - lightbox effect
    =============================================== */

    $('.zoom').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /* ==============================================
        Responsive video
    =============================================== */
    
    $(".video-container").fitVids();

    /* ==============================================
        MailChip
    =============================================== */

    $('.mailchimp').ajaxChimp({
        callback: mailchimpCallback,
        url: "http://clas-design.us10.list-manage.com/subscribe/post?u=5ca5eb87ff7cef4f18d05e127&amp;id=9c23c46672" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
    });

    function mailchimpCallback(resp) {
         if (resp.result === 'success') {
            $('.subscription-success').html('<i class="pe-7s-check"></i><br/>' + resp.msg).fadeIn(1000);
            $('.subscription-error').fadeOut(500);
        
        } else if(resp.result === 'error') {
            $('.subscription-error').html('<i class="pe-7s-close-circle"></i><br/>' + resp.msg).fadeIn(1000);
            $('.subscription-success').fadeOut(500);
        }  
    }
    
    /* ==============================================
        Scroll To Top
    =============================================== */

    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0,
            easing: 'swing'
        }, 750);
        return false;
    });

});

// team section biografi code 

$(document).ready(function() {
    $('#firstcol').hover(function(){
        $('#firstdet').slideToggle("slow");
    });
    $('#secondcol').hover(function(){
        $('#seconddet').slideToggle("slow");
    });
    $('#thirdcol').hover(function(){
        $('#thirddet').slideToggle("slow");
    });
    $('#fourthcol').hover(function(){
        $('#fourthdet').slideToggle("slow");
    });

     //   what we color change code 
        $('#create,#launch,#initiate,#actively').mouseenter(function(){
            $(this).addClass('color');
        })

        $('#create,#launch,#initiate,#actively').mouseleave(function(){
            $(this).removeClass('color');
        })

    // what we picture change code

        $('#create').hover(function(){
            $("#whate_img").attr("src","images/whate_we_do/devlop.jpeg");
        });


});

// Event Section JS code
/*
Please consider that the JS part isn't production ready at all, I just code it to show the concept of merging filters and titles together !
*/
$(document).ready(function(){
    $('.filterable .btn-filter').click(function(){
        var $panel = $(this).parents('.filterable'),
        $filters = $panel.find('.filters input'),
        $tbody = $panel.find('.table tbody');
        if ($filters.prop('disabled') == true) {
            $filters.prop('disabled', false);
            $filters.first().focus();
        } else {
            $filters.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $tbody.find('tr').show();
        }
    });

    $('.filterable .filters input').keyup(function(e){
        /* Ignore tab key */
        var code = e.keyCode || e.which;
        if (code == '9') return;
        /* Useful DOM data and selectors */
        var $input = $(this),
        inputContent = $input.val().toLowerCase(),
        $panel = $input.parents('.filterable'),
        column = $panel.find('.filters th').index($input.parents('th')),
        $table = $panel.find('.table'),
        $rows = $table.find('tbody tr');
        /* Dirtiest filter function ever ;) */
        var $filteredRows = $rows.filter(function(){
            var value = $(this).find('td').eq(column).text().toLowerCase();
            return value.indexOf(inputContent) === -1;
        });
        /* Clean previous no-result if exist */
        $table.find('tbody .no-result').remove();
        /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
        $rows.show();
        $filteredRows.hide();
        /* Prepend no-result row if all rows are filtered */
        if ($filteredRows.length === $rows.length) {
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="'+ $table.find('.filters th').length +'">No result found</td></tr>'));
        }
    });
});
      


