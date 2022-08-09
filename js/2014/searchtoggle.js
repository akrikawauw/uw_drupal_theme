"use strict";
UW.SearchToggle = Backbone.View.extend({
  el: "button.uw-search",
  events: { click: "toggleSearchBar" },
  settings: { isOpen: !1 },
  initialize: function () {},
  toggleSearchBar: function () {
    return (
      (this.settings.isOpen = !this.settings.isOpen),
        this.trigger("open"),
        UW.$body.toggleClass("search-open"),
        this.settings.isOpen ? (this.$el.attr("aria-label", "close search area"), this.$el.attr("aria-expanded", "true")) : (this.$el.attr("aria-label", "open search area"), this.$el.attr("aria-expanded", "false")),
        !1
    );
  },
});
