(function (Drupal, drupalSettings, $) {
  "use strict";
  var body = document.getElementsByTagName("body"),
    searchArea = document.getElementById("uwsearcharea"),
    searchButton = document.querySelector("button.uw-search"),
    radiobtn = document.getElementsByClassName("radiobtn"),
    mobileSelect = document.getElementById("mobile-search-select"),
    optionsFieldset = document.getElementById("uw"),
    form = document.querySelector("form.uw-search"),
    searchLabels = document.getElementById("search-labels"),
    submitButton = document.querySelector("input.search"),
    radioLabel = document.getElementsByClassName("radio"),
    url = window.location.href,
    searchSite = searchArea.dataset.search,
    searchBar = document.getElementById("uw-search-bar");

  function switchAction() {
    "uw" === searchSite ? ((form.action = "https://www.washington.edu/search/"), searchBar.setAttribute("name", "q")) : ((form.action = $("form.uw-search").data("sitesearch")), searchBar.setAttribute("name",  drupalSettings.search.searchName ));
  }
  function toggleSearchArea() {
    document.body.classList.toggle("search-open");
  }
  function setAttributes(e, t) {
    for (var a in t) e.setAttribute(a, t[a]);
  }
  function toggleBlur() {
    document.body.classList.contains("search-open")
      ? (searchArea.hidden = !1, optionsFieldset || mobileSelect ? "none" == window.getComputedStyle(mobileSelect).display ? optionsFieldset.focus() : mobileSelect.focus() : searchBar.focus(), setAttributes(searchButton, {
        "aria-label": "close search area",
        "aria-expanded": "true"
      }), setAttributes(searchArea, {"aria-hidden": "false"})) : (searchArea.hidden = !0, setAttributes(searchButton, {
        "aria-label": "open search area",
        "aria-expanded": "false"
      }), setAttributes(searchArea, {"aria-hidden": "true"}))
  }
  if (document.onkeydown = function (e) {
    return e.keyCode !== UW.KEYCODES.TAB ? e.keyCode !== UW.KEYCODES.ESC || !$("body").hasClass("search-open") || (e.stopPropagation(), toggleSearchArea(), searchButton.focus(), toggleBlur(), !1) : (e.target !== submitButton || e.shiftKey || searchLabels.classList.add("focused"), e.target != submitButton && searchLabels.classList.contains("focused") && (searchLabels.classList.remove("focused"), !e.shiftKey) ? (e.stopPropagation(), toggleSearchArea(), searchButton.focus(), toggleBlur(), !1) : void 0)
  }, searchButton.addEventListener("click", function () {
    toggleSearchArea(), toggleBlur()
  }), submitButton.addEventListener("click", function () {
    Array.from(radiobtn).forEach(function (e) {
      e.disabled = !0
    }),
      submitForm()
      }),optionsFieldset || mobileSelect) if ("none" == window.getComputedStyle(mobileSelect).display) for (var _loop = function () {
    var e = radiobtn[i];
    e.onchange = function () {
      searchSite = e.value, switchAction()
    }
  }, i = 0; i < radioLabel.length; i++) _loop(); else mobileSelect.addEventListener("change", function () {
    searchSite = mobileSelect.value, switchAction()
  });

  function submitForm(e) {
    return form.submit(), !1;
  }
})(Drupal, drupalSettings, jQuery);
