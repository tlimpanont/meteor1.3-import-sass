import jQuery from 'jquery';

(function ($, window, document, undefined) {

    var pluginName = "themeSwitcher",
        defaults = {
            propertyName: "value"
        };

    function Plugin(element, options) {
        this.element = element;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function () {

            this.options.themes.forEach(function (theme) {
                var $option, $link;

                if (theme.disabled) {
                    $option = '<option value="' + theme.href + '">' + theme.href + '</option>';
                    $link = '<link class="appTheme" rel="stylesheet" href="' + theme.href + '" disabled="disabled">';
                } else {
                    $option = '<option value="' + theme.href + '" selected="selected">' + theme.href + '</option>';
                    $link = '<link class="appTheme" rel="stylesheet" href="' + theme.href + '">';
                }
                jQuery(this.element).append($option);
                jQuery(this.element).after($link);
            }.bind(this));


            jQuery(this.element).on('change', function (event) {

                var href = event.target.value;

                jQuery('link.appTheme').each(function (index, elm) {
                    if (jQuery(elm).attr('href').toLowerCase() === href.toLowerCase()) {
                        jQuery(elm).attr('disabled', null);
                    } else {
                        jQuery(elm).attr('disabled', 'disabled');
                    }
                });

            }.bind(this))
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
