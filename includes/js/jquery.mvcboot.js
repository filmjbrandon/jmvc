/**
 * jQuery MVC Framkework for Client Side Interaction
 *
 * @package jQueryMVC
 * @license Creative Commons Attribution License http://creativecommons.org/licenses/by/2.0/uk/
 * @link
 * @version 0.0.4
 * @author Don Myers donmyers@mac.com
 * @copyright Copyright (c) 2010
*/
/* MUST load jquery 1.4.2+ */

var mvc = {};

/* mvc settings */

/* path to root folder - seg 3 needed if inside another folder trailing slash */
mvc.path = 'http://localhost/jmvc_tester/';

/* name of the folder containing the mvc javascript files with trailing slash */
mvc.application_folder = 'includes/jmvc/';

/* reference to self */
mvc.self = location.href;

/* get URL parts */
mvc.segs = mvc.self.split('/');

/* which segment is the controller + 1 is the method */
mvc.shift = 3;

var folder = (mvc.segs[mvc.shift] == '' || mvc.segs[mvc.shift] == undefined) ? 'index' : mvc.segs[mvc.shift];
var file = (mvc.segs[mvc.shift+1] == '' || mvc.segs[mvc.shift+1] == undefined) ? 'index' : mvc.segs[mvc.shift+1];

/* setup default controller + method */
mvc.controller = folder + '/' + file;

/* in the attached javascript object the first segement is called the */
mvc.controller_named = 'controller';

/* in the attached javascript object the second segement is called the */
mvc.method_named = 'method';

/* in the attached javascript object the constructor is called the */
mvc.constructor_named = '__construct';

/*  path to mvc parts folder */
mvc.mvcpath = mvc.path + mvc.application_folder;

/* allow console output (if present) */
mvc.debug = true;

/* we uses a few blocking ajax calls how long should we wait? */
mvc.blocking_wait = 3000;

/* if a element has a method add this css cursor by default */
mvc.default_cursor = 'pointer';

/* name of the main mvc javascript file */
mvc.main = 'jquery.mvc';

/* name of the libraries to include */
mvc.auto_include = Array('jquery.mvcform','jquery.mvcmodel','jquery.cookie','jquery.json-2.2','jstorage'); /*  */

/* setup some globalish mvc variables */
/* holds all the models */
mvc.model = Array();

/* holds jquery "this" that called the function for function calls object (actually contains data as well)*/
mvc.event = null;

/* holds the data for function calls json */
mvc.data = null;

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
  /* load the required includes */
  for (var i=0, len = mvc.auto_include.length; i<len; ++i) {
    jQuery.getScript(mvc.mvcpath + 'includes/' + mvc.auto_include[i] + '.js');
  }
    
  /* load the main mvc file and start controller */
  jQuery.getScript(mvc.mvcpath + 'includes/' + mvc.main + '.js',function() {
    jQuery.mvcController(name.replace("-","_"),func);
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
