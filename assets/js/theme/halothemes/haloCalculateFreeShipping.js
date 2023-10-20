import utils from '@bigcommerce/stencil-utils';

export default function (context) {
    if (context.themeSettings.halo_CalculateFreeShipping == true){
        const upsellMessage = ['<span>'+context.themeSettings.halo_CalculateFreeShipping_required+'</span>',
                       '<span>'+context.themeSettings.halo_CalculateFreeShipping_remaining+'</span>',
                       '<span>'+context.themeSettings.halo_CalculateFreeShipping_matched+'</span>'];

        function loadFreeShippingMessage(){
            const options = {
                template: 'halothemes/halo-calculate-free-shipping-tmp'
            };

            utils.api.cart.getContent(options, (err, response) => {
                showFreeShippingMessage(response);
            });
        }

        loadFreeShippingMessage();

        function showFreeShippingMessage(message) {
            if($(message).length > 0) {
                $(message).find('.haloCalulateFreeShipping-text').each((index, element) => {
                    if($('.condition_remaining', element).text() != "" || $('.congratulation', element).text()){
                        if(context.themeSettings.halo_CalculateFreeShipping_type == 'all'){
                            showProgress(message, element);
                        } else if (context.themeSettings.halo_CalculateFreeShipping_type == 'custom'){
                            var countryCode,
                                country,
                                countryList;

                            $.getScript('https://ssl.geoplugin.net/javascript.gp?k=9247556ec91c71e9', event => {
                                countryCode = geoplugin_countryCode();
                                country = $('.country', element).text();
                                countryList = country.split(",");

                                if ($.inArray(countryCode, countryList) != -1){
                                    showProgress(message, element);
                                }
                            });
                        }
                    }
                });

                if ($(message).find('.haloCalulateFreeShipping-text').length == 0) {
                    $('.halo-free-shipping-message').removeClass('animated-loading');
                }
            }
        }

        function showProgress(message, scope) {
            var max_percent = 0,
                classProgress;

            const condition_required = $('.condition_required', scope).text(),
                condition_matched = $('.condition_matched', scope).text(),
                condition_remaining = $('.condition_remaining', scope).text(),
                num_required = (condition_required != "" ? Number(condition_required.replace(/[^0-9.-]+/g,"")) : 0),
                num_matched = (condition_matched != "" ? Number(condition_matched.replace(/[^0-9.-]+/g,"")) : 0),
                num_remaining = (condition_remaining != "" ? Number(condition_remaining.replace(/[^0-9.-]+/g,"")) : 0);

            var percent = parseInt(num_matched/num_required * 100);
            percent = (percent > 100 ? 100 : percent);

            if(num_required == num_remaining){
                percent = 100;
            }

            if($('.congratulation', scope).text() != ""){
                percent = 100;
            }


            if(percent > max_percent){
                max_percent = percent;
            } else{
                return;
            }

            if(percent < 50) {
                classProgress = "progress-shipping-49";
                message = upsellMessage[1].replace('{remaining}', condition_remaining);
            } else if(percent < 75) {
                classProgress = "progress-shipping-74";
                message = upsellMessage[1].replace('{remaining}', condition_remaining);
            } else if(percent < 100) {
                classProgress = "progress-shipping-99";
                message = upsellMessage[1].replace('{remaining}', condition_remaining);
            } else if(percent == 100){
                classProgress = "progress-shipping-full";
                message = upsellMessage[2];
            }
            
            var progressIcon = `<div class="progress-truck-wrapper">
            <svg class="icon-shipping-truck" viewBox="0 0 40.55 24"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="truck-body" d="M40.43,11a3.86,3.86,0,0,0-3.68-2.65H28a1.25,1.25,0,0,1-1.43-1.43c0-2.18,0-4.35,0-6.53,0-.31-.08-.36-.37-.36H5.11a1.18,1.18,0,0,0-1.3,1.32c0,.74,0,1.48,0,2.22,0,.21-.06.27-.26.26-.36,0-.71,0-1.07,0a1.19,1.19,0,1,0,0,2.37H7.19c.43,0,.85,0,1.27,0a1,1,0,0,1,1.07,1A1.19,1.19,0,0,1,8.24,8.48H1.35a1.83,1.83,0,0,0-.47,0A1.19,1.19,0,0,0,0,9.85a1.18,1.18,0,0,0,1.19,1h9.66c.34,0,.68,0,1,0A1.19,1.19,0,0,1,13,12.47a1.26,1.26,0,0,1-1.26.76H1.24a1.19,1.19,0,1,0,0,2.38c.76,0,1.51,0,2.26,0,.26,0,.33.07.32.32,0,1,0,2.09,0,3.13A1.18,1.18,0,0,0,5.1,20.36c.63,0,1.26,0,1.9,0,.27,0,.39.06.47.36a4.55,4.55,0,0,0,8.78-.11.29.29,0,0,1,.32-.25H28.09a.3.3,0,0,1,.34.27,4.55,4.55,0,0,0,8.8,0,.31.31,0,0,1,.35-.26c.49,0,1,0,1.47,0a1.37,1.37,0,0,0,1.5-.87V11.41C40.41,11.29,40.47,11.12,40.43,11ZM32.84,21.62A2.18,2.18,0,1,1,35,19.45,2.21,2.21,0,0,1,32.84,21.62Zm-21,0A2.18,2.18,0,1,1,14,19.45,2.2,2.2,0,0,1,11.86,21.62Z"></path><path class="truck-body" d="M29.27,6h5.85c.1,0,.2,0,.29,0C33.64,2.72,32,.91,28.91.26V.57c0,1.68,0,3.35,0,5C28.9,5.9,29,6,29.27,6Z"></path><path class="wheel" d="M11.87,17.27A2.18,2.18,0,1,0,14,19.45,2.2,2.2,0,0,0,11.87,17.27Z"></path><path class="wheel" d="M32.85,17.27A2.18,2.18,0,1,0,35,19.45,2.22,2.22,0,0,0,32.85,17.27Z"></path></g></g></svg>
          </div>`;
            var progress = '<div class="progress-shipping '+classProgress+'" role="progressbar">\
            <div class="progress-meter" style="width: '+percent+'%;">'+'<span class="progress-meter--text">'+percent+'%</span>'+ progressIcon +'</div>\
        </div>';
            if(window.location.pathname == context.urls.cart){
                var pageCart = $('[data-cart]');

                progress += '<div class="shipping-message">'+message+'</div>';

                if(pageCart.find('.halo-free-shipping-message').length > 0){
                    pageCart.find('.halo-free-shipping-message').removeClass('animated-loading');
                    pageCart.find('.halo-free-shipping-message').html(progress);
                } else {
                    pageCart.find('[data-cart-status]').before('<div class="halo-free-shipping-message">' + progress + '</div>');
                }
            } else if($('body').hasClass('has-activeModal')){
                var previewCart = $('#previewModal');

                progress += '<div class="shipping-message">'+message+'</div>';

                if(previewCart.find('.halo-free-shipping-message').length > 0){
                    previewCart.find('.halo-free-shipping-message').html(progress);
                } else {
                    previewCart.find('.modal-body').prepend('<div class="halo-free-shipping-message">' + progress + '</div>');
                }
            } else if($("#cart-preview-dropdown").hasClass("f-open-dropdown")) {
                var previewCart = $('#cart-preview-dropdown');
                progress += '<div class="shipping-message">'+message+'</div>';
                if(previewCart.find('.halo-free-shipping-message').length > 0){
                    previewCart.find('.halo-free-shipping-message').removeClass('animated-loading');
                    previewCart.find('.halo-free-shipping-message').html(progress);
                } else {
                    previewCart.find('.side-dropdown-title').after('<div class="halo-free-shipping-message">' + progress + '</div>');
                }
            }
        }
    }
}
