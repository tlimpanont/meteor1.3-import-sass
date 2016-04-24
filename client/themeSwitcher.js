import { Template } from 'meteor/templating';

if(Meteor.isClient) {
    Template.themeSwitcher.onCreated(function () {
        this.themes = new ReactiveVar([
            { href: 'themes/darkly/style.css', disabled: true },
            { href: 'themes/flatly/style.css', disabled: true },
            { href: 'themes/default/style.css', disabled: false }
        ]);
    });

    Template.themeSwitcher.events({
        'change select' : function(event, template) {
            var themes = template.themes.get();
            themes.forEach(function(theme) {
                theme.disabled = true;
            });
            var selectedTheme = _.findWhere(themes, { href: event.target.value });
            selectedTheme.disabled = false;
            template.themes.set(themes);
        }
    });
    Template.themeSwitcher.helpers({
        themes: function() {
            return Template.instance().themes.get();
        }
    });
}
