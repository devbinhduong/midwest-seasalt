import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import $ from 'jquery';
import FacetedSearch from './common/faceted-search';
import searchProductsCategory from './halothemes/haloSearchProductsInCategory';
export default class Category extends CatalogPage {
    constructor(context) {
        super(context);
    }
    onReady() {
        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }
        this.initSearchProductsCategory();
    }
    initSearchProductsCategory() {
        this.searchProductsCategory = new searchProductsCategory({
            context: this.context,
            facetedSearch: this.facetedSearch,
            searchCallback: (content) => {
                $('#product-listing-container').html(content.productListing);

                $('body').triggerHandler('compareReset');

                if(this.context.themeSettings.haloMultiImageSwap == false){
                    $('html, body').animate({
                        scrollTop: 0,
                    }, 100);
                }
            },
        });
    }
    initFacetedSearch() {
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);
            
            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        });
    }
}
