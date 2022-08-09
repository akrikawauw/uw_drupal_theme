"use strict";
UW.Select = Backbone.View.extend({
  el: ".uw-select",
  submit: !1,
  current: 0,
  keyCodes: { enter: 13, spacebar: 32, tab: 9, up: 38, down: 40 },
  events: { "keydown li": "openMenuOnKeydown", "click li.active": "open", "click li.inactive": "close", "click .uw-select-arrow": "open", "click .uw-select-arrow.open": "closeWithoutAnimating", click: "closeWithoutAnimating" },
  template: '<div class="uw-select-mask"><ul class="uw-select"><% _.each( lis, function( title, value ) { %><li data-value="<%= value %>"><a href="#"><%= title %></a></li><% }) %></ul><span class="uw-select-arrow"></span></div>',
  initialize: function (e) {
    _.bindAll(this, "open", "close", "addOpenClass", "removeOpenClass", "closeWithoutAnimating"),
      (this.options = _.extend({}, this.settings, this.$el.data(), e)),
      this.parseSelect(),
      this.render(),
      $("body").click(this.closeWithoutAnimating);
  },
  open: function (e) {
    return this.isOpen() ? this.closeWithoutAnimating() : this.addOpenClass(), !1;
  },
  close: function (e) {
    this.$target = $(e.currentTarget);
    var t = this.$target.index();
    return this.isDisabled(t) || ((this.clicked = !0), (this.current = t), this.animate(), this.toggleLIClasses()), !1;
  },
  isDisabled: function (e) {
    var t = this.$el.find("li").eq(e).data().value;
    return this.$select.find('option[value="' + t + '"]').prop("disabled");
  },
  closeWithoutAnimating: function () {
    this.$el.removeClass("open"), this.$el.children().removeClass("open");
  },
  animate: function () {
    (this.scroll = this.$target.offset().top - this.$el.find("li").first().offset().top), this.$el.children("ul").animate({ scrollTop: this.scroll }, { queue: !1, complete: this.removeOpenClass });
  },
  cloneSelectEvents: function () {
    var e = this.$el.find("li").eq(this.current).data().value;
    this.$select.val(e),
      this.$select.find('option[value="' + e + '"]').prop("selected", !0),
    this.submit && this.$select.parent("form").submit(),
    this.trigger_link && (window.location = e),
    this.$select.hasClass("uw-select-wp") && (window.location = UW.baseUrl + "?cat=" + e);
  },
  render: function () {
    (this.html = _.template(this.template)({ lis: this.LIs })),
      this.$el.hide().after(this.html),
      (this.$select = this.$el),
      this.setElement(this.$el.next()),
      this.toggleLIClasses(),
    this.$el.find("li").length < 7 && this.$el.children("ul").height("auto");
  },
  parseSelect: function () {
    var e = _.map(this.$el.find("option"), this.getValue),
      t = _.map(this.$el.find("option"), this.getText);
    this.$el.data("submit") && (this.submit = !0), "links" == this.$el.data("type") && (this.trigger_link = !0), (this.current = this.$el.find(":selected").index()), (this.LIs = _.object(e, t));
  },
  toggleLIClasses: function () {
    this.$el.find("li").removeClass().addClass("inactive"), this.$el.find("li").eq(this.current).removeClass().addClass("active");
  },
  addOpenClass: function () {
    this.$el.addClass("open"), this.$el.children().addClass("open"), this.$el.children("ul").scrollTop(this.scroll);
  },
  removeOpenClass: function (e) {
    this.cloneSelectEvents(), (this.clicked || e) && (this.$el.removeClass("open"), this.$el.children().removeClass("open"), (this.clicked = !1));
  },
  getText: function (e) {
    return $(e).text();
  },
  getValue: function (e) {
    return e.value;
  },
  openMenuOnKeydown: function (e) {
    if (e.keyCode == this.keyCodes.tab && !this.isOpen()) return !0;
    if (_.contains(this.keyCodes, e.keyCode)) {
      switch ((this.isOpen() || this.open(), e.keyCode)) {
        case this.keyCodes.down:
          this.down();
          break;
        case this.keyCodes.up:
          this.up();
          break;
        case this.keyCodes.enter:
        case this.keyCodes.spacebar:
          this.current != this.$select.val() && (this.removeOpenClass(!0), this.toggleLIClasses(), this.cloneSelectEvents());
      }
      return !1;
    }
  },
  up: function () {
    this.atEdge("up") || ((this.current -= 1), this.move());
  },
  down: function () {
    this.atEdge("down") || ((this.current += 1), this.move());
  },
  move: function () {
    (this.$target = this.$el.find("li").eq(this.current)), this.$target.find("a").focus(), this.animate();
  },
  atEdge: function (e) {
    return (0 === this.current && "up" === e) || (this.current === this.$el.find("li").length - 1 && "down" === e);
  },
  isOpen: function () {
    return this.$el.hasClass("open");
  },
});
