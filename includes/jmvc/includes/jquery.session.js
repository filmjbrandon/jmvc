/*
requires jquery 1.4.2+ and jquery.cookie.js
Written by Don Myers 2009
*/
jQuery.session_start = function() {
  /* setup if not alreay setup or push forward 1 year if it is */
  if (!$.cookie("mvc_uuid")) {
    $.cookie("mvc_uuid", (new Date().getTime()) + 'x' + $.uid(), { expires: 365 });
  } else {
    $.cookie("mvc_uuid", $.cookie("mvc_uuid"), { expires: 365 });
  }
  
  /* set the browser session */
  if (!$.cookie("mvc_sessionid")) {
    $.cookie("mvc_sessionid", $.uid());
  }
  
  /* let's read and cache our session data */
  var jsontxt = $.cookie("mvc_session");
  if (!jsontxt) {
    window.mvc_session = {};
  } else {
    window.mvc_session = $.secureEvalJSON(jsontxt);
  }
};

jQuery.session_uuid = function() {
  return $.cookie("mvc_uuid");
};

jQuery.session_id = function() {
  return $.cookie("mvc_sessionid");
};

jQuery.session_regenerate_id = function(delete_old_session) {
  if (delete_old_session) {
    $.cookie("mvc_session", null);
  }
  $.cookie("mvc_sessionid", $.uid());
};

jQuery.session_destroy = function() {
  $.cookie("mvc_session", null);
};

jQuery.session = function(name, value) {
  /* cached in window object */
  if (!name && !value) {
    return window.mvc_session;
  } else if (!value) {
    return window.mvc_session[name];
  } else {
    window.mvc_session[name] = value;
    $.cookie("mvc_session",$.toJSON(window.mvc_session));
  }
};

/* generate uuid and return it - RFC4122 v4 UUID */
jQuery.uid = function () {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).toUpperCase();
};
