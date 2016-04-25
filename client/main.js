import jQuery from 'jquery';

if(Meteor.isClient) {
    jQuery(function() {
        jQuery('#themeSwitcher').themeSwitcher({
            themes: [
                { href: 'themes/darkly/style.css', disabled: true },
                { href: 'themes/flatly/style.css', disabled: true },
                { href: 'themes/default/style.css', disabled: false }
            ]
        });
    });
}
