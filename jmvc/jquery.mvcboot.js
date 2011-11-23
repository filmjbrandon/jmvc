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

var mvc = {};

/* mvc settings */

/* Domain */
mvc.domain = 'http://localhost'; /* NO trailing slash */

/* Folder (if any) */
mvc.folder = '/jmvc'; /* NO trailing slash */

/* ** That should be all you need to config JMVC! ** */

/* auto load everything including starting the router */
mvc.auto_load = true;

/* complete path */
mvc.path = mvc.domain + mvc.folder + '/'; 

/* name of the folder containing the mvc javascript files with trailing slash */
mvc.application_folder = 'jmvc/';

/* prepend this to all ajax request urls */
mvc.ajax_url = '';

/* form submit on validation passed default value */
mvc.validation_submit = true;

/* append to validation action url if no URL provied */
mvc.validation_url = '_validate';

/* location of the models - absolute path */
mvc.model_url = mvc.path + mvc.application_folder + 'models/';

/* location of the rest server - absolute path */
mvc.rest_url = 'rest/server';

/* auto generated prefix */
mvc.auto_gen = '';

/* reference to self */
mvc.self = location.href;

/* get URL parts */
mvc.segs = mvc.self.split('/');

/* which segment is the controller + 1 is the method */
mvc.shift = 4;

var folder = (mvc.segs[mvc.shift] == '' || mvc.segs[mvc.shift] == undefined) ? 'index' : mvc.segs[mvc.shift];
var file = (mvc.segs[mvc.shift+1] == '' || mvc.segs[mvc.shift+1] == undefined) ? 'index' : mvc.segs[mvc.shift+1];

/* setup default controller + method */
mvc.controller = folder + '/' + file;

/* appended to the controller name in the controller js file */
mvc.controller_named = 'controller_';

/* appened to the method name in the contoller js file */
mvc.method_named = '_method_';

/* ie var controller_jstorage_method_index = new function() { */

/* in the attached javascript object the constructor is called the */
mvc.constructor_named = '__construct';

/*  path to mvc parts folder */
mvc.mvcpath = mvc.path + mvc.application_folder;

/* allow console output (if present) */
mvc.debug = true;

/* auto update views on ajax */
mvc.auto_update_view = false;

/* we uses a few blocking ajax calls how long should we wait? */
mvc.blocking_wait = 3000;

/* if a element has a method add this css cursor by default */
mvc.default_cursor = 'pointer';

/* name of the main mvc javascript file */
mvc.main = 'jquery.mvc';

/* name of the libraries to include */
mvc.auto_include = Array('jquery.mvcrestmodel','jquery.mvcform','jquery.session','third_party/jquery.cookie','third_party/jquery.json-2.2','third_party/jstorage'); /*  */
//mvc.auto_include = Array();

/* holds jquery "this" that called the function for function calls object (actually contains data as well)*/
mvc.event = null;

/* holds the data for function calls json */
mvc.data = null;

/* ajax returned responds */
mvc.ajax_responds = null;

/* a few other holders */
mvc.output = {};
mvc.json = {};
mvc.global = {};

/* the router */
jQuery.mvc = function (name,func) {
  /* set up segs for user */
  mvc.shift--;
  for (idx=0;idx<=mvc.shift;idx++) {
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
  /* load the required includes from inside the jmvc folder */
  for (var i=0, len = mvc.auto_include.length; i<len; ++i) {
    jQuery.getScript(mvc.mvcpath + 'includes/' + mvc.auto_include[i] + '.js');
  }

  /* load the main mvc file and start controller */
  jQuery.getScript(mvc.mvcpath + 'includes/' + mvc.main + '.js',function(data, textStatus) {		
		jQuery.mvcController(name.replace(/#/g,'').replace(/-/g,'_'),func);
  });
  
};

/*
console logging function if exists and debug is on
IE (no console) safe
Load it here this way it's avaiable before the includes are loaded incase we want to log something
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
