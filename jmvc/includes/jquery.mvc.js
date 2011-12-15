/*
Requires jQuery 1.4.3+

$.mvcController(name);
  load controller based on controller/method

$.mvcController(name,func);
  load controller based on controller/method
  run function or string when finished

*/
jQuery.mvcController = function (name,func) {

  var segs = name.split('/');
  var clas = segs[0];
  var meth = segs[1];
  var complete_name = mvc.controller_named + clas + mvc.method_named + meth; /* controller_index_method_index */
  jQuery.log('MVC jQuery.mvcController Load',name,complete_name + '.' + mvc.constructor_named + '()',mvc.mvcpath + 'controllers/' + clas + '/' + meth + '.js');

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
event = click,mouseover,change,keyup
func = indexController.action1.click() or func = function() { alert('welcome'); };
optional
data = json object
*/
jQuery.fn.mvcAction = function (event,func,data) {
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
update: true/false{default} update the DOM when id's or classes match
this will also try to load a controller for your new view

-- I like what jQuery is adding when it comes to a templating class not exactly sure how that fits thou...
*/
jQuery.mvcView = function (name, json, update) {
  var rtnjson = jQuery.mvcAjax({"url": 'views/' + name, "update": update, "data": json});
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
$.mvcAjax({});
options
type, method, blocking, update, cache, timeout, url
*/
jQuery.mvcAjax = function (settings) {
	jQuery.extend(mvc.options,settings);
	
  if (jQuery.session_uid && mvc.options.method.toUpperCase() == 'GET') {
    mvc.options.data._uuid = jQuery.session_uid();
    mvc.options.data._session_id = jQuery.session_id();
  }
  
  if (jQuery.cookie && mvc.options.method.toUpperCase() == 'GET') {
    mvc.options.data._cookie = jQuery.cookie();
  }

	if (options.method.toUpperCase() == 'GET') {
		/* if you don't turn on caching jquery-ajax will attach a timestamp to the url so it always changes */
		options.cache = true;
	}

  var reply = {};
  
  jQuery.ajax({
    cache: mvc.options.cache,
    dataType: mvc.options.type,
    type: mvc.options.method,
    async: !mvc.options.blocking,
    timeout: mvc.options.timeout,
    url: mvc.path + mvc.options.url,
    data: mvc.clone(mvc.options.data),
    success: function (responds) {
      reply = responds;
    },
    error: function(jqXHR, textStatus, errorThrown) {
      jQuery.log('MVC jQuery.ajax Error',jqXHR, textStatus, errorThrown);
    }
  });

  /* if update true then update the screen with returned json */
  if (options.update) {
    jQuery.mvcUpdate(reply);
  }

  return reply;
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
      jQuery.log('MVC jQuery.exec ERROR',err,code);
    }
  }
};

/*
client based redirect
*/
jQuery.redirect = function (url) {
  window.location.replace(url);
};

/* 
Does this object exist in the DOM?
if ($("#selector).exists) {
  do something
}
*/
jQuery.fn.exists = function () {
  return jQuery(this).length > 0;
};

/*
this will make a copy of a object without the methods
which jack up some ajax calls
*/
mvc.clone = function(obj) {
  var clone = {};
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (typeof(obj[prop]) === 'object') {
        clone[prop] = mvc.clone(obj[prop]);
      } else {
				clone[prop] = obj[prop];
      }
    }
  }
  return clone;
}

/*
create a wrapper for $.postJSON(); - uses post instead of get as in $.getJSON();
*/
jQuery.extend({
  postJSON: function (url, data, callback) {
    return jQuery.post(url, data, callback, 'json');
  }
});

