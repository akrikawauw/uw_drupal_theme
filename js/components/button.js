"use strict";
jQuery(document).ready(function (e) {
  window.onkeydown = function (e) {
    32 === e.keyCode && (e.preventDefault(), document.querySelector("a.btn").click());
  };
});
