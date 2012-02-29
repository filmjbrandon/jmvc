/**
 * jQuery MVC Framkework for Client Side Interaction
 *
 * @package jQueryMVC
 * @license Creative Commons Attribution License http://creativecommons.org/licenses/by/3.0/legalcode
 * @link
 * @version 0.0.4
 * @author Don Myers donmyers@mac.com
 * @copyright Copyright (c) 2010
*/
/* MUST load jquery 1.4.2+ */

var mvc = (mvc) || {};

/* mvc settings */

/* Domain */
mvc.domain = 'http://jmvc.localhost'; /* WITHOUT trailing slash */

/* Folder (if any) */
mvc.folder = ''; /* WITHOUT trailing slash */

/* which segment is the controller (hint: the host is #2) */
mvc.controller_seg = 3;

/* ** That should be all you need to config JMVC! ** */

/* setup folders */
mvc.folders = {};

/* complete path */
mvc.folders.path = mvc.domain + mvc.folder + '/';

/* name of the folder containing the mvc javascript files WITH trailing slash */
mvc.folders.application = 'jmvc/';

/* location of the controllers WITH trailing slash */
mvc.folders.controller = mvc.folders.path + mvc.folders.application + 'controllers/';

/* location of the models WITH trailing slash */
mvc.folders.model = mvc.folders.path + mvc.folders.application + 'models/';

/* location of the includes WITH trailing slash */
mvc.folders.include = mvc.folders.path + mvc.folders.application + 'includes/';

/* location of the views WITH trailing slash */
mvc.folders.view = mvc.folders.path + mvc.folders.application + 'views/';

/* location of the rest server from mvc.folders.path WITH trailing slash */
mvc.rest_url = mvc.folders.path + 'restserver/';

/* auto load everything including starting the router */
mvc.auto_load = true;

/* prepend this to all ajax request urls */
mvc.ajax_url = '';

/* form submit on validation passed default value */
mvc.validation_submit = true;

/* append to the form element's action attribute action="/post/here" = url="/post/here_validate" - form element url if no URL provied */
mvc.validation_url = '_validate';

/* append current controller to views */
mvc.views_in_controller_folder = true;

/* view extension */
mvc.view_extension = '.tmpl';

/* reference to self */
mvc.self = location.href;

/* get URL parts */
mvc.segs = mvc.self.split('/');

mvc.folder = (mvc.segs[mvc.controller_seg] == '' || mvc.segs[mvc.controller_seg] == undefined) ? 'index' : mvc.segs[mvc.controller_seg];
mvc.file = (mvc.segs[mvc.controller_seg+1] == '' || mvc.segs[mvc.controller_seg+1] == undefined) ? 'index' : mvc.segs[mvc.controller_seg+1];

/* setup default controller + method */
mvc.controller = mvc.folder + '/' + mvc.file;

/* appended to the controller name in the controller js file */
mvc.controller_named = 'controller_';

/* appened to the method name in the contoller js file */
mvc.method_named = '_method_';

/* example var controller_jstorage_method_index = new function() { */

/* in the attached javascript object the constructor is called the */
mvc.constructor_named = '__construct';

/* allow console output (if present) */
mvc.debug = true;

/* mvc ajax defaults */
mvc.options = {
	type: 'json', /* default return type */
	method: 'post', /* ajax default request method */
	blocking: true, /* leave this on */
	update: false, /* auto update views on with returned ajax */
	cache: false, /* should ajax requests be cached - should be false */
	timeout: 3000, /* we uses a few blocking ajax calls how long should we wait? */
	url: mvc.folders.path, /* default url to request */
	data: {} /* default data sent */
};

/* if a element has a method add this css cursor by default */
mvc.default_cursor = 'pointer';

/* name of the libraries to auto include */
mvc.auto_include = ['jquery.mvc','jquery.mvcmodel','jquery.mvcform','jquery.session','third_party/jquery.tmpl','third_party/jquery.cookie','third_party/jquery.json-2.2','third_party/jstorage']; /*  */

/* holds jquery "this" that called the function for function calls object (actually contains data as well)*/
mvc.event = null;

/* holds the data for function calls json */
mvc.data = null;

/* ajax returned responds */
mvc.ajax_responds = null;
mvc.ajax_error = {};

/* a few other holders */
mvc.output = {};
mvc.json = {};
mvc.global = {};

/* the router */
jQuery.mvc = function (name,func) {
  /* set up segs for user */
  for (var idx=0;idx<=(mvc.controller_seg + 1);idx++) {
    mvc.segs.shift();
  }

  /* did they send in just a function? if so then the controller is mvc.controller */
  if (typeof(name) == 'function') {
    func = name;
    name = mvc.controller;
  } else {
    /* else if they didn't send in any thing then the controller is mvc.controller */
    name = (!name) ? mvc.controller : name;
  }

	//console.log(name,mvc.folder,mvc.file,mvc.segs);
   
  /* !TODO need to make this less blocking */
  /* load the required includes from inside the jmvc folder */
  for (var i=0, len = mvc.auto_include.length; i<len; ++i) {
  	jQuery.ajax({url: mvc.folders.include + mvc.auto_include[i] + '.js', dataType: 'script', cache: true, async: false });
  }
	
	// load a controller and try to run it.
	jQuery.mvcController(name.replace(/#/g,'').replace(/-/g,'_'),func);
	
};

/*
console logging function if exists and debug is on
IE (no console) safe
Load it here this way it's available before the includes are loaded incase we want to log something
*/
jQuery.log = function () {
  /* unlimited arguments */
  if (mvc.debug) {
    if (typeof window.console === 'object' && typeof window.console.log !== 'undefined') {
      for (var idx = 0; idx < arguments.length; idx++) {
        console.log(arguments[idx]);
      }
    }
  }
};

/* start jmvc */
jQuery().ready(function(){
  if (mvc.auto_load) {
  	jQuery.mvc();
  }
});
