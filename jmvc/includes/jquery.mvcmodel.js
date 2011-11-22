/* global mvc model storage */
mvc.model = {};

mvcModel = function(file) {
  /* these things maintain state */
  this._filename = file;
  this._records = {};
  this._index = 0;
  this._rows_affected = 0;
  this._error = '';
  this._error_no = 0;
  this._internal_id = jQuery.mvcModelId();
};

mvcModel.prototype._sync = function() {
  /* build payload (all args) */
  var payload = [];
  for (var idx = 0; idx < arguments.length; idx++) {
    payload[idx] = arguments[idx];
  }

  /* build our post */
  var post = {};

  post.filename = this._filename;
  post.record = mvcModelCopy(this,'_'); /* copy this without anything with underscore */
  post.payload = payload;
  
  /* send it out via blocking ajax */
  //var json = jQuery.mvcAjax(mvc.model_url + this._filename + '.js',post) || {};
	var json = jQuery.mvcAjax({"url": mvc.model_url + this._filename + '.js', "data": post}) || {};

  this._index = 0;
  this._rows_affected = json.row_affected;
  this._error = json.error;
  this._error_no = json.error_no;
  this._records = json.records; /* array of records - even if only 1 returned */
  this._sql = json.sql; /* usually empty unless debugging - this is controlled server side! */

  jQuery.extend(this,json.record); /* merge the record values back over this object */
};

mvcModel.prototype._fetch = function() {
  if ((this._index + 1) > this._rows_affected) {
    return false;
  }
  this._index++;
  return this._records[this._index];
};

mvcModel.prototype._seek = function(index) {
  if (index > this._rows_affected || index < 0) {
    return false;
  }
  this._index = index;
  return true;
};

/* jquery.mvcform.js needed to use this funciton */
/* to make this super safe either do ajax to server or uuid */
jQuery.fn.mvcForm2Model = function(file,json) {
  var tempmodel = new mvcModel(file);
  return jQuery.extend(tempmodel,jQuery(this).mvcForm2Obj(json));
};

jQuery.mvcModelId = function () {
  var now = new Date().getTime() / 1000;
  var s = parseInt(now, 10);
  var rnd = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  return s + rnd;
}

/* Copy */
mvcModelCopy = function(obj,strip_extra) {
  var final = {};
  strip_extra = strip_extra || '';
  for (var attr in obj) {
    if (typeof(obj[attr]) === 'boolean' || typeof(obj[attr]) === 'number' || typeof(obj[attr]) === 'string') {
      if (attr.substr(0,1) != strip_extra) {
        final[attr] = obj[attr];
      }
    }
  }
  return final;
};
