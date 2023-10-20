import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';
import swal from 'sweetalert2';
import _ from 'lodash';

export default function(){
    if ($('#sticky_addtocart').length) {
        $('footer.footer').css('padding', '3rem 0 7rem');
    }
    var scroll = $('#form-action-addToCart').offset();

    if ($('#form-action-addToCart').length) {
        $(window).scroll(function(){
            if($(window).scrollTop() > scroll.top + 100){
                console.log("1");
                if(!$('#sticky_addtocart').hasClass('show_sticky')){
                    $('#sticky_addtocart').addClass('show_sticky');
                    if ($(window).width() > 1024) {
                        console.log("2");
                        $('.themevale_popup_left').css("bottom", $('#sticky_addtocart').outerHeight() + 40);
                        $('.themevale_popup_right').css("bottom", $('#sticky_addtocart').outerHeight() + 40);
                    } else if ($(window).width() > 550) {
                        console.log("3");
                        $('.themevale_popup_left').css("bottom", $('.themevale_popup_right').outerHeight() + $('#sticky_addtocart').outerHeight());
                        $('.themevale_popup_right').css("bottom", $('#sticky_addtocart').outerHeight());
                    } else {
                        console.log("4");
                        $('.themevale_popup_left').css("bottom", $('.themevale_popup_right').outerHeight() + $('#sticky_addtocart').outerHeight());
                        $('.themevale_popup_right').css("bottom", $('#sticky_addtocart').outerHeight());
                    }
                }
                const h_sticky = $('#sticky_addtocart').height() + 40;
                $('#smile-ui-container .smile-launcher-frame-container').css('bottom', h_sticky);
            } else{
                $('#sticky_addtocart').removeClass('show_sticky');
                $('.pop-up-option').removeClass('is-open');
                $('.choose_options_add').removeClass('is-active');
                $('#smile-ui-container .smile-launcher-frame-container').css('bottom', '20px');
                if ($(window).width() > 1024) {
                    $('.themevale_popup_left').css("bottom", 40);
                    $('.themevale_popup_right').css("bottom", 40);
                } else if ($(window).width() > 550) {
                    $('.themevale_popup_left').css("bottom", $('.themevale_popup_right').outerHeight() + 30);
                    $('.themevale_popup_right').css("bottom", 15);
                } else {
                    $('.themevale_popup_left').css("bottom", $('.themevale_popup_right').outerHeight());
                    $('.themevale_popup_right').css("bottom", 0);
                }
            }
        });
    
        $(document).on('click','.choose_options_add', function(event){
            $(this).toggleClass('is-active');
            $('.pop-up-option').toggleClass('is-open');
            const h_sticky = $('#sticky_addtocart').height() + $('#sticky_addtocart .pop-up-option').height() + 95;
            $('#smile-ui-container .smile-launcher-frame-container').css('bottom', h_sticky);
        });
    
        $(document).on('click','.pop-up-option .close', function(event){
            $(".pop-up-option").removeClass('is-open');
            $('.choose_options_add').removeClass('is-active');
            const h_sticky = $('#sticky_addtocart').height() + 40;
            $('#smile-ui-container .smile-launcher-frame-container').css('bottom', h_sticky);
        });
    
        window.onload = function(){
            if($(window).scrollTop() > scroll.top - 160){
                if(!$('#sticky_addtocart').hasClass('show_sticky')){
                    $('#sticky_addtocart').addClass('show_sticky');
                    if ($(window).width() > 1024) {
                        $('.themevale_popup_left').css("bottom", $('#sticky_addtocart').outerHeight() + 40);
                        $('.themevale_popup_right').css("bottom", $('#sticky_addtocart').outerHeight() + 40);
                    } else if ($(window).width() > 550) {
                        $('.themevale_popup_left').css("bottom", $('.themevale_popup_right').outerHeight() + $('#sticky_addtocart').outerHeight() + 30);
                        $('.themevale_popup_right').css("bottom", $('#sticky_addtocart').outerHeight() + 15 );
                    } else {
                        $('.themevale_popup_left').css("bottom", $('.themevale_popup_right').outerHeight() + $('#sticky_addtocart').outerHeight());
                        $('.themevale_popup_right').css("bottom", $('#sticky_addtocart').outerHeight());
                    }
                }
                const h_sticky = $('#sticky_addtocart').height() + 40;
                $('#smile-ui-container .smile-launcher-frame-container').css('bottom', h_sticky);
            }
        }
    }
}
