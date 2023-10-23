import utils from '@bigcommerce/stencil-utils';
import haloRecentlyBoughtPopup from './haloRecentlyBoughtPopup';
import haloQuickShop from './haloQuickShop';
export default function(context) {
	const $context = context;
	const theme_settings = context.themeSettings;
	function eventLoad() {
		$(document).ready(function() {
			haloRecentlyBoughtPopup($context);
			checkCookiesPopup();
			haloQuickShop($context);
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
mobileMenu()
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

faqTab();