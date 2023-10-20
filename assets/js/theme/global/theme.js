/*eslint-disable*/
import Instafeed from 'instafeed.js/instafeed.min';

export default function() {

  /* === READY START === */
  jQuery(document).ready(function() {

    /* ============ INSTAGRAM SCRIPT START ============ */
    let loadingImg = $('[data-loading]').data('loading');
    let feed = new Instafeed({
      get: 'user',
      limit:'20',
      userId: jQuery("#instafeed").attr("data-id"),
      accessToken: jQuery("#instafeed").attr("data-key"),
      resolution: "low_resolution",
      template: '<div class="insta-item-wrap {{orientation}}"><div class="insta-item"><a class="animation" href="{{link}}" target="_blank"><img class="lazyload" src="'+loadingImg+'" data-src="{{image}}" /></a></div></div>',
      after: function() {
        if($('body.milano-layout--Blue').length){
        jQuery('#instafeed').slick({
          dots: false,
          //infinite: false,
          centerMode: true,
          centerPadding: '100px',
          slidesToShow: 6,
          arrows: true,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          responsive: [
            {
              breakpoint: 1901,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1651,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1441,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1025,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1023,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 668,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 569,
              settings: {
                slidesToShow: 3,
                centerPadding: '80px',
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 481,
              settings: {
                slidesToShow: 2,
                centerPadding: '70px',
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 321,
              settings: {
                slidesToShow: 1,
                centerPadding: '70px',
                slidesToScroll: 1
              }
            }
          ]
        });
      } else{
        jQuery('#instafeed').slick({
          dots: false,
          //infinite: false,
          centerMode: false,
          centerPadding: '100px',
          slidesToShow: 9,
          arrows: false,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          responsive: [
            {
              breakpoint: 1901,
              settings: {
                slidesToShow: 9,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1651,
              settings: {
                slidesToShow: 9,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1441,
              settings: {
                slidesToShow: 9,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1025,
              settings: {
                slidesToShow: 7,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1023,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 668,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 569,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 481,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 376,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 321,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            }
          ]
        });

      }
      }
    });
    if(jQuery("#instafeed").length && jQuery("#instafeed").attr("data-id")!="" && jQuery("#instafeed").attr("data-key")!=""){
      feed.run();
    }
    /* ============ INSTAGRAM SCRIPT END ============ */


  });
  /* === READY END === */
  
}
/*eslint-enable*/
