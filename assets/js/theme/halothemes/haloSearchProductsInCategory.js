import utils from '@bigcommerce/stencil-utils';
import Url from 'url';
import urlUtils from '../common/url-utils';
import _ from 'lodash';
import haloQuickSearch from './haloSearchCategories';

export default class SearchProductsCategory {

    constructor(options) {
        this.doSearch = _.debounce(this.doSearch.bind(this), 500);
        this.onInput = this.onInput.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onClear = this.onClear.bind(this);
        this.options = options;
        this.getUrlParameter = this.getUrlParameter.bind(this);
        this.removeUrlParameter = this.removeUrlParameter.bind(this);
        this.refreshContentCategory = this.refreshContentCategory.bind(this);
        this.originalPathname = window.location.pathname;
        this.$body = $('body');
        this.$input = $('[data-search-input]');
        this.$content = $('#product-listing-container');
        this.$sidebar = $('.page-sidebar');
        this.$formInput = this.$input.closest('form');
        this.$clearInput = this.$formInput.find('[data-clear-input]').hide();

        if (options && options.facetedSearch) {
            this.options.facetedSearch.updateViewCallback = this.updateFacetedSearch.bind(this);
        }

        this.bindEvents();

        const url = Url.parse(urlUtils.getUrl(), true);
        if (url.query.q) {
            this.$input.val(url.query.q);
            if(!$('#facetedSearch').length) {
                this.doSearch(this.$input.val());
            }
            this.$clearInput.show();
            $(window).trigger('statechange');
        }
    }

    destroy() {
        this.unbindEvents();
    }

    bindEvents() {
        this.$input.on('input', this.onInput);
        this.$formInput.on('submit', this.onFormSubmit);
        this.$clearInput.on('click', this.onClear);
    }

    unbindEvents() {
        this.$input.off('input', this.onInput);
        this.$formInput.off('submit', this.onFormSubmit);
        this.$clearInput.hide();
    }

    onFormSubmit() {
        return false;
    }

    onClear(event) {
        event.preventDefault();
        this.$clearInput.hide();
        this.$input.val('');
        this.onInput();
    }

    onInput() {
        this.doSearch(this.$input.val());
    }

    getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }

    removeUrlParameter(url, params) {
        const parsed = Url.parse(url, true);

        parsed.search = null;

        if (typeof params === 'string') {
            if (parsed.query.hasOwnProperty(params)) {
                parsed.query[params] = null;
                delete parsed.query[params];
            }
        } else if (typeof params === 'object') {
            params.forEach(param => {
                if (parsed.query.hasOwnProperty(param)) {
                    parsed.query[param] = null;
                    delete parsed.query[param];
                }
            });
        }

        return Url.format(parsed);
    }

    doSearch(searchQuery) {
        var category = this.getUrlParameter('category');
        var quickSearch = new haloQuickSearch;
        const options = {
            template: 'halothemes/halo-search-in-category',
        };

        this.$content.addClass('is-loading');

        quickSearch.search(searchQuery, category, options , (err, response) => {
            if (err) {
                return false;
            }

            if(!$('#facetedSearch').length) {
                this.$content.html(response);
                this.$content.removeClass('is-loading');
            }

            if (this.$input.val() == '') {
                if(!$('#facetedSearch').length) {
                    this.refreshContentCategory();
                }
                this.$clearInput.hide();
                const url = this.removeUrlParameter(urlUtils.getUrl(), ['q', 'search_query', 'search_query_adv', 'category', 'page']);
                urlUtils.goToUrl(url);
            } else {
                this.$clearInput.show();
                let url = this.removeUrlParameter(urlUtils.getUrl(), ['q', 'search_query', 'search_query_adv', 'page']);
                url = urlUtils.replaceParams(url, { q: searchQuery });
                urlUtils.goToUrl(url);
            }
        });
    }

    updateFacetedSearch() {
        const facetedSearch = this.options.facetedSearch;
        let requestUrl = urlUtils.getUrl();
        let requestOptions = facetedSearch.requestOptions;
        const url = Url.parse(requestUrl, true);
        const searchQuery = url.query.q || url.query.search_query;

        if (searchQuery) {
            if (window.location.pathname === '/search.php') {
                url.query.q = searchQuery;
                delete url.query.search_query;
                if (Number(url.query.category) === this.options.context.categoryId) {
                    delete url.query.category;
                }
                window.history.replaceState({}, document.title, `${this.originalPathname}?${urlUtils.buildQueryString(url.query)}`);
            }

            delete url.query.q;
            url.query.search_query = searchQuery;
            if (!url.query.category) {
                url.query.category = this.options.context.categoryId;
            }

            requestUrl = `/search.php?${urlUtils.buildQueryString(url.query)}`;
            requestOptions = {
                template: {
                    productListing: 'halothemes/halo-search-in-category',
                    sidebar: 'halothemes/halo-search-sidebar',
                },
                showMore: 'search/show-more',
            };
        }

        $(facetedSearch.options.blockerSelector).show();
        this.$content.addClass('is-loading');

        utils.api.getPage(requestUrl, requestOptions, (err, content) => {
            $(facetedSearch.options.blockerSelector).hide();
            this.$content.removeClass('is-loading');

            if (err) {
                throw new Error(err);
            }

            facetedSearch.refreshView(content);
        });
    }

    refreshContentCategory() {
        const $catUrl = $('.page-heading').data('category-url');
        const options = {
            template: 'halothemes/halo-products-in-category',
        };

        if ($catUrl != undefined) {
             utils.api.getPage($catUrl, options, (err, response) => {
                this.$content.html(response);
            });
        }
    }
}
