export default function(){

    haloToolbarMobile();

    function haloToolbarMobile() {
        $(document).on('click', '.halo-sticky-toolbar-mobile [data-search-mobile]', event => {
            event.preventDefault();

            $('body').addClass('openSearchMobile');

            $('#quickSearch').addClass('is-open');
        });

        $(document).on('click', event => {
            if (($(event.target).closest('#quickSearch').length === 0) && ($(event.target).closest('.halo-sticky-toolbar-mobile').length === 0)){
                $('body').removeClass('openSearchMobile');
            }
        });
    }
}
