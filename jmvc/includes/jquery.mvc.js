/*
Requires jQuery 1.4.3+

$.mvcController('controller/method');
  load controller based on controller/method

$.mvcController('controller/method',func);
  load controller based on controller/method
  run function or string when finished

$.mvcController(func);
  load default and run function or string when finished

*/
jQuery.mvcController = function(name,func) {
  var segs = name.split('/');
  var clas = segs[0] || 'index';
  var meth = segs[1] || 'index';
  var complete_name = mvc.controller_named + clas + mvc.method_named + meth; /* controller_index_method_index */
  jQuery.log(name,complete_name + '.' + mvc.constructor_named + '()',mvc.mvcpath + 'controllers/' + clas + '/' + meth + '.js');
  jQuery.getScript(mvc.mvcpath + 'controllers/' + clas + '/' + meth + '.js', function () {
    /* fire off construct */
    jQuery.exec(complete_name + '.' + mvc.constructor_named + '()');
    var ctrlr = window[complete_name];
    for (var elementid in ctrlr) {
      if (typeof(ctrlr[elementid]) === 'object') {
        for (var eventname in ctrlr[elementid]) {
          if (typeof(ctrlr[elementid][eventname]) === 'function') {
            /* data-mvc is now automagically attached via jquery 1.4.3+ */
            /* attach any events to matching classes and ids */
            jQuery('#' + elementid).mvcEvent(eventname,complete_name + '.' + elementid + '.' + eventname + '();');
            jQuery('.' + elementid).mvcEvent(eventname,complete_name + '.' + elementid + '.' + eventname + '();');
          }
        }
      }
    }
    /* fire off any when complete code sent in */
    jQuery.exec(func);
  });
};

/*
Attach event and data in one call
this is equivalent to calling data and event seperately
event = click,mouseover,change,keyup
func = indexController.action1.click() or func = function() { alert('welcome'); };
optional
data = json object
*/
jQuery.fn.mvcAction = function(event,func,data) {
  if (data) {
    jQuery(this).mvcData(data);
  }
  jQuery(this).mvcEvent(event,func);
};

/*
get view and send it to mvc.update to populate the html
required
name: name of the view file either absolute or relative /folder/file or folder/folder/file or file
optional
json: extra variables sent to view ajax call
update: true/false update the DOM when id's or classes match
this will also try to load a controller for your new view

-- I like what jQuery is adding when it comes to a templating class not exactly sure how that fits thou...
*/
jQuery.mvcView = function (name, json, update) {
  var view_file = mvc.mvcpath + 'views/' + name + '.js';
  $.log('Try to Load View ' + view_file);
  var rtnjson = jQuery.mvcAjax(view_file, json, 'json', update);
  jQuery.mvcController(name);
  return rtnjson;
};

/*
load json properties into html based on matching selectors
matches on id,class,form element name
*/
jQuery.mvcUpdate = function (json) {
  if (json) {
    jQuery.exec(json.mvc_pre_view);
    for (var property in json) { /* we are only using strings or numbers */
      if (typeof(json[property]) === 'string' || typeof(json[property]) === 'number' || typeof(json[property]) === 'boolean') {
        var value = json[property];

        /* match classes & ids */
        jQuery('.' + property + ',#' + property).html(value);

        /* match any form element names */
        /* hidden field */
        if (jQuery('[name=' + property + ']').is('input:hidden')) {
          jQuery('input[name=' + property + ']').val(value);
        } /* input text */
        if (jQuery('[name=' + property + ']').is('input:text')) {
          jQuery('input[name=' + property + ']').val(value);
        } /* input textarea */
        if (jQuery('[name=' + property + ']').is('textarea')) {
          jQuery('textarea[name=' + property + ']').val(value);
        } /* input radio button */
        if (jQuery('[name=' + property + ']').is('input:radio')) {
          jQuery('input[name=' + property + '][value="' + value + '"]').attr('checked', true);
        } /* input checkbox */
        if (jQuery('[name=' + property + ']').is('input:checkbox')) {
          jQuery('input:checkbox[name=' + property + ']').attr('checked', (value === 1 || value === true));
        } /* input select */
        if (jQuery('[name=' + property + ']').is('select')) {
          jQuery('select[name=' + property + ']').val(value);
        }
      }

    }
    jQuery.exec(json.mvc_post_view);
  }
};

/*
Getters
return complete mvc data object
var value = $("#selector").mvcData(); (returns object)

return specific value
var value = $("#selector").mvcData("age"); (return value or undefinded)

Setters
$("#selector").mvcData({}); (clears it out)

$("#selector").mvcData("name","value");
*/
jQuery.fn.mvcData = function (name, value) {
  /* GETTER - return Object if both empty */
  if (!name && !value) {
    return jQuery(this).data('mvc');
  }
  /* SETTER - if name is a object */
  if (typeof(name) == 'object') {
    jQuery(this).data('mvc',name);
    return true;
  }
  /* GETTER - if value is empty then they are asking for a property by name */
  if (!value) {
    var rtn;
    var temp = jQuery(this).data('mvc');
    if (temp) {
      rtn = temp[name];
    }
    return rtn;
  }
  /* SETTER - if name & value set */
  if (name && value) {
    var temp = jQuery(this).data('mvc');
    if (temp) {
      temp[name] = value;
      jQuery(this).data('mvc',temp);
      return true;
    }
    return false;
  }
};

/*
Generic Event Set/Get
*/
jQuery.fn.mvcEvent = function (event, func) {
  /* SETTER - event = object & function empty - clear all */
  if (typeof(event) == 'object' && !func) {
    jQuery(this).die().css('cursor', '');
    return true;
  }

  /* GETTER - event & func empty - return all events */
  if (!event && !func) {
    var id = this.selector;
    var events = Array();

    jQuery.each(jQuery(document).data('events').live, function (name,value) {
      if (value.selector == id) {
        if (event !== '' && value.origType == event) {
          events.push(value.origType);
        } else if (!event)  {
          events.push(value.origType);
        }
      }
    });
    return events;
  }

  /* GETTER - event = string & function empty - does event exist */
  if (event && !func) {
    var id = this.selector;
    var events = Array();
    jQuery.each(jQuery(document).data('events').live, function (name,value) {
      if (value.selector == id) {
        if (event !== '' && value.origType == event) {
          events.push(value.origType);
        } else if (!event)  {
          events.push(value.origType);
        }
      }
    });
    return (events.length !== 0);
  }

  /* SETTER - event = string & function = empty object - clear function */
  if (event && typeof(func) == 'object') {
    jQuery(this).die(event);
    return true;
  }

  /* SETTER - event = object & func = object - event and function */
  if (event && func) {
    jQuery(this).live(event,function () {
      mvc.event = jQuery(this);
      var dd = jQuery(this).data('mvcdata');
      mvc.data = (!dd) ? {} : dd;
      jQuery.exec(func);
    }).css('cursor', mvc.default_cursor);
    return true;
  }
}

/*
Used in model, view, form to get json with blocking
$.mvcAjax();
required
name = url of the file either /absolute/file.js or folder/file (based off of mvc folder)
optional
json addition json to send
type json{default} or any valid jQuery post dataType
update true/false{default} send to the update function
*/
jQuery.mvcAjax = function(posturl, json, type, update) {
  /* NOTE: this is blocking ajax */
  json = json || {};
  type = type || 'json';

  json.mvc_posturl = posturl;
  json.mvc_type = type;
  json.mvc_update = update;
  json.mvc_timestamp = Number(new Date());

  if (jQuery.session_uid) {
    json.mvc_uuid = jQuery.session_uid();
    json.mvc_session_id = jQuery.session_id();
  }
  
  if (jQuery.cookie) {
    json.cookie = jQuery.cookie();
  }

  var rtnjson = {};
  jQuery.ajax({
    cache: false,
    type: 'POST',
    async: false,
    timeout: mvc.blocking_wait,
    url: mvc.ajax_url + posturl,
    dataType: type,
    data: json,
    success: function (ajaxjson) {
      rtnjson = ajaxjson;
    },
    error: function(jqXHR, textStatus, errorThrown) {
      jQuery.log('mvcAjax Error (4)',jqXHR,textStatus,errorThrown);
    }
  });

  /* blocking - continue */
  /* if update true then update the screen with returned json */
  update = (!update) ? mvc.auto_update_view : update;
  if (update) {
    jQuery.mvcUpdate(rtnjson);
  }
  return rtnjson;
};

/*
execute code 
function or string
*/
jQuery.exec = function(code) {
  if (code !== '' || code !== undefined) {
    var func = (typeof(code) === 'function') ? code : new Function(code);
    try {
      func();
    } catch (err) {
      jQuery.log('jQuery.exec ERROR: ',err,code);
    }
  }
};

/*
client based redirect
*/
jQuery.redirect = function(url) {
  window.location.replace(url);
};

/* does a element exist in the DOM?
another simple wrapper function
if ($("#selector).exists()) {
  do something
}
*/
jQuery.fn.exists = function() {
  return jQuery(this).length > 0;
};

/* create a wrapper for $.postJSON(); - uses post instead of get same parameters as in $.getJSON(); */
jQuery.extend({
  postJSON: function(url, data, callback) {
    return jQuery.post(url, data, callback, 'json');
  }
});

