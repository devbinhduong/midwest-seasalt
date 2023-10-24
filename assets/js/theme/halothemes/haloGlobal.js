import utils from '@bigcommerce/stencil-utils';
import haloRecentlyBoughtPopup from './haloRecentlyBoughtPopup';
import haloQuickShop from './haloQuickShop';
import { over } from 'lodash';
export default function(context) {
	const $context = context;
	const theme_settings = context.themeSettings;

	function eventLoad() {
		$(document).ready(function() {
			haloRecentlyBoughtPopup($context);
			checkCookiesPopup();
			haloQuickShop($context);

			mobileMenu();

			/* Mint custom */
			faqTab();

			var slickWrapperList = document.querySelectorAll('.section-slick');

            /* Loop All Slick Slider */
           slickWrapperList.forEach((item) => {
				slickCarousel(item)
		   })

			videoBannerPopup();

		})
	}

	eventLoad();

	$(window).on('resize',(e)=>{
		checkCookiesPopup();
	})


	function checkCookiesPopup() {
		if ($('#consent-manager').length) {
			var height = $('#consent-manager').height() + 15;

			$('#recently_bought_list').css('bottom', height);
		}
	}

	function mobileMenu() {
		$('#menu_responsive .has-dropdown > p.has-subMenu').click(function(e) {
			$(this).parent().toggleClass('is-open');
			$(this).parent().siblings('.navPages-item').toggleClass('hidden');
		})

		$(document).on('click', event => {
		if ($('body').hasClass('has-activeNavPages') && $(event.target).closest('.halo-background').length > 0) {
			let closeSidebar = document.querySelector(".mobileMenu-toggle");
				closeSidebar.click();
			}
		});
	}

	function faqTab() {
		let faqList = document.querySelectorAll(".custom-faqs__item");
	
		if(!faqList) return;
	
		for (let item of faqList) {
			item.addEventListener("click", (e) => {
				item.classList.toggle('is-open');
			})	
		}
	}

	function slickCarousel(element) {
		if(!element) return;

        const showDesktop = parseInt(element.getAttribute('data-slick-show-desktop')),
            showTablet = parseInt(element.getAttribute('data-slick-show-tablet')),
            showMobile = parseInt(element.getAttribute('data-slick-show-mobile')),
			isShowDot = element.getAttribute('data-slick-show-dot') == 'true' ? true : false,
			isShowArrow = element.getAttribute('data-slick-show-arrow') == 'true' ? true : false;

        $(element).slick({
            dots: isShowDot,
            arrows: isShowArrow,
            infinite: true,
            mobileFirst: true,
            slidesToShow: showMobile,
            slidesToScroll: 1,

            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: showDesktop
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: showTablet
                    }
                }
            ]
        });
    }

	function videoBannerPopup() {
		let playButtons = document.querySelectorAll(".banner-video-popup .video-button"),
			overlay = document.querySelector(".video-overlay"),
			close = document.querySelector(".video-popup__close");

		const videoFrame = document.getElementById('videoFrame');

		if(!playButtons || !overlay || !close) return;

		function closeOverlay () {
			overlay.style.display = "none";
		}

		overlay.addEventListener('click', closeOverlay);

		close.addEventListener("click", closeOverlay);

		for(let playButton of playButtons) {
			playButton.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopImmediatePropagation();

				let video = playButton.closest('.banner-video-popup').getAttribute('data-video-link'),
					videoId = video.match(/[?&]v=([^&]+)/)[1]

				videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
				overlay.style.display = "flex";
			})
		}
	}
}

