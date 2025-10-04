(function (Drupal, drupalSettings, $) {
  "use strict";
  const body = document.getElementsByTagName("body");
  const searchArea = document.getElementById("uwsearcharea");
  const searchButton = document.querySelector("button.uw-search");
  const radiobtn = document.getElementsByClassName("radiobtn");
  const mobileSelect = document.getElementById("mobile-search-select");
  const optionsFieldset = document.getElementById("uw");
  const form = document.querySelector("form.uw-search");
  const searchLabels = document.getElementById("search-labels");
  const submitButton = document.querySelector("input.search");
  const radioLabel = document.getElementsByClassName("radio");
  const url = window.location.href;

  // Get the initial search site from theme settings.
  let searchSite = searchArea.dataset.search;
  let searchBar = document.getElementById("uw-search-bar");

  // Change the form action and name attribute depending on which site should be searched.
  function switchAction() {
    if ( "uw" === searchSite ) {
      form.action = "https://www.washington.edu/search/";
      searchBar.setAttribute("name", "q");
    } else {
      form.action = $("form.uw-search").data("sitesearch");
      // Get the search name from theme settings.
      searchBar.setAttribute("name", drupalSettings.search.searchName);
    }
  }
  function toggleSearchArea() {
    document.body.classList.toggle("search-open");
  }
  function setAttributes( el, attrs ) {
    for ( let key in attrs ) {
      el.setAttribute( key, attrs[key] );
    }
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
    form.submit();
    return false;
  }
})(Drupal, drupalSettings, jQuery);
