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
			getTitleSidebar();
			informationSidebar();

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


	function getTitleSidebar() {
		var h3Elements = document.querySelectorAll('.midwest_seasalt_cms h3');

		h3Elements.forEach(function(h3, index) {
			var anchor = document.createElement('a');
			anchor.textContent = h3.textContent;
			anchor.href = '#sidebar-item' + index;

			h3.id = "sidebar-item" + index;

			anchor.addEventListener('click', function(e) {
				e.preventDefault();

				document.querySelectorAll('.custom-list-title a').forEach(function(a) {
					a.classList.remove('is-active');
				});

				anchor.classList.add('is-active');

				let anchorHref = anchor.getAttribute("href");

				$('html, body').animate({
					scrollTop: ($(anchorHref).offset().top - 200)
				}, 1000);

			});

			document.querySelector('.custom-list-title').appendChild(anchor);
		});

		window.addEventListener('scroll', function() {
			h3Elements.forEach(function(h3, index) {
				var rect = h3.getBoundingClientRect();
				if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
					document.querySelectorAll('.custom-list-title a').forEach(function(a) {
						a.classList.remove('is-active');
					});

					var correspondingAnchor = document.querySelectorAll('.custom-list-title a')[index];
					correspondingAnchor.classList.add('is-active');
				}
			});

			/* Add class is-sticky when scroll lagger header Height */
			let header = document.querySelector('header').clientHeight;
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			let headerHeightSticky = header;
			if (scrollTop > headerHeightSticky){
				document.querySelector('.cms_left').classList.add('is-sticky');
			}
			else {
				document.querySelector('.cms_left').classList.remove('is-sticky');
			}
			
		});
	}

	function informationSidebar () {
		let openButton = document.querySelector(".info-open-sidebar"),
			closeButton = document.querySelector(".info-close-sidebar"),
			sidebar = document.querySelector(".custom-infomatio-page .cms_left"),
			sidebarItem = document.querySelectorAll(".custom-list-title > a");

		if(!openButton || !closeButton || !sidebar) return;

		openButton.addEventListener("click", () => {
			sidebar.classList.add("is-open");
		});

		closeButton.addEventListener("click", () => {
			sidebar.classList.remove("is-open");
		});

		for(let item of sidebarItem) {
			item.addEventListener("click", (e) => {
				e.preventDefault();
				sidebar.classList.remove('is-open');
			})
		}
	}
}

