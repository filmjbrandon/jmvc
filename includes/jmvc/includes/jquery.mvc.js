/*
Requires jQuery 1.4.3

$.mvcController();
  load the config file controller by default (seg 3 or 4) nameController.js with no "finished" function
  
$.mvcController(name);
  load this controller nameController.js

$.mvcController(func);
  load the default controller (seg 3 or 4) with this complete function
  func = string function (eval) or f = function() { alert('welcome'); };

$.mvcController(name,func);
  name = name of controller nameController.js
  func = string function (eval) or f = function() { alert('welcome'); };

*/
jQuery.mvcController = function (name,func) {
  $.log(name);
  var segs = name.split('/');
  var clas = segs[0];
  var meth = segs[1];
  var complete_name = mvc.controller_named + '_' + clas + '_' + mvc.method_named + '_'  + meth; /* controller_index_method_index */
  $.log(mvc.mvcpath + 'controllers/' + clas + '/' + meth + '.js');
  jQuery.getScript(mvc.mvcpath + 'controllers/' + clas + '/' + meth + '.js', function () {
    /* fire off construct */
    jQuery.exec(complete_name + '.' + mvc.constructor_named + '()');
    var ctrlr = window[complete_name];
    for (var elementid in ctrlr) {
      if (typeof(ctrlr[elementid]) === 'object') {
        for (var eventname in ctrlr[elementid]) {
          if (typeof(ctrlr[elementid][eventname]) === 'function') {
            /* data-mvc is now automagically attached via jquery 1.4.3 */
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
event = click,mouseover,change,keyup
func = indexController.action1.click() or func = function() { alert('welcome'); };
optional 
data = json object
*/
jQuery.fn.mvcAction = function(event,func,data) {
  jQuery(this).mvcData(data).mvcEvent(event,func);
};

/* 
get view and send it to mvc.update to populate the html
required
name: name of the view file either absolute or relative /folder/file or folder/folder/file or file
optional
json: extra variables sent to view ajax call
update: true/false{default} update the DOM when id's or classes match
*/
jQuery.mvcView = function (name, json, update) {
  var rtnjson = jQuery.mvcAjax('views/' + name, json, 'json', update);
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
    /* GET return Object if both empty */
    if (!name && !value) {
      return jQuery(this).data('mvc');
    }
    /* SET if name is a object */
    if (typeof(name) == 'object') {
      jQuery(this).data('mvc',name);
      return true;
    } 
    /* GET if value is empty then they are asking for a property by name */
    if (!value) {
      var rtn;
      var temp = jQuery(this).data('mvc');
      if (temp) {
        rtn = temp[name];
      }
      return rtn;
    }
    if (name && value) {
      /* SET if name & value set */
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
  if (typeof(event) == 'object' && !func) {
    /* SET clear all */
    jQuery(this).die().css('cursor', '');
    return true;
  }
  
  if (!event && !func) {
    /* GET return all events */
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
  
  if (event && !func) {
    /* GET does event exist */
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
  
  if (event && typeof(func) == 'object') {
    /* SET clear function */
    jQuery(this).die(event);
    return true;
  }
  
  if (event && func) {
    /* SET event and function */
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
$("#selector").mvcAjax();
required
name = url of the file either /absolute/file.js or folder/file (based off of mvc folder)
optional
json addition json to send
type json{default} or any valid jQuery post dataType
update true/false{default} weither to send to the update function
*/
jQuery.mvcAjax = function (name, json, type, update) {
  /* NOTE: this is blocking ajax */
  json = (!json) ? {} : json;
  type = (!type) ? 'json' : type;

  json.mvc_json_name = name;
  json.mvc_type = type;
  json.mvc_update = update;
  json.mvc_timestamp = Number(new Date());

  if (jQuery.session_uuid) {
    json.mvc_uuid = jQuery.session_uid();
    json.mvc_session_id = jQuery.session_id();
  }
  if (jQuery.cookie) {
    json.cookie = jQuery.cookie();
  }

  /* either absolute path/filename (starts is /) or relative to mvc folder (no starting /) and is javascript (.js) */
  var posturl = (name.substring(0,1) == '/') ? mvc.path + name.substring(1) : mvc.mvcpath + name + '.js';

  var rtnjson = {};
  jQuery.ajax({
    type: 'POST',
    async: false,
    timeout: mvc.blocking_wait,
    url: posturl,
    dataType: type,
    data: json,
    success: function (j) {
      rtnjson = j;
    }
  });
  /* blocking - continue */
  /* if update true then update the screen with returned json */
  if (update) {
    jQuery.mvcUpdate(rtnjson);
  }
  return rtnjson;
};

/*
execute code
function or string
*/
jQuery.exec = function (code) {
  if (code !== '' || code !== undefined) {
    var func = (typeof(code) === 'function') ? code : new Function(code);
    try {
      func();
    } catch (err) {
      jQuery.log('jQuery.exec ERROR: ',err);
    }
  }
};

/*
client based redirect
*/
jQuery.redirect = function (url) {
  window.location.replace(url);
};

/* simple wrapper to make the syntax "look" cleaner */
/* var mine = Json; "looks" cleaner then var mine = {}; */
var output = Json = {};

/* does a element exist in the DOM?
another simple wrapper function 
if ($("#selector).exists) {
  do something
}
*/
jQuery.fn.exists = function() {
  return jQuery(this).length > 0;
};

/* create a wrapper for $.postJSON(); - uses post instead of get as in $.getJSON(); */
jQuery.extend({
  postJSON: function( url, data, callback) {
    return jQuery.post(url, data, callback, "json");
  }
});
