/* global mvc model storage */
mvc.model = (mvc.model) || {};

mvcModel = function(file) {
  /* these things maintain state */
  this.mvcState = {};
  
  this.mvcState.filename = file;
  this.mvcState.records = {};
  this.mvcState.index = 0;
  this.mvcState.rows_affected = 0;
  this.mvcState.error = '';
  this.mvcState.error_no = 0;
  this.mvcState.internal_id = jQuery.mvcModelId();
	this.mvcState.external_id = -1;
};

mvcModel.prototype._rest = function(url,method) {
	url = (url) || '/';
	var data = this._copy(this);
	data.mvcState = this.mvcState;
	var url = mvc.rest_url + '/' + this.mvcState.filename + url;
	url = (/\/$/.test(url)) ? url.replace(/\/$/,"") : url;
	var json = jQuery.mvcAjax({"url": url + '.json', "method": method, "data": data}) || {};
  jQuery.extend(true,this,json); /* merge the record values back over this object */
};

mvcModel.prototype._get = function(url) {
	this._rest(url,'GET');	
};

mvcModel.prototype._post = function(id) {
	this._rest('/' + id,'POST');	
};

mvcModel.prototype._put = function(id) {
	this._rest('/' + id,'PUT');	
};

mvcModel.prototype._delete = function(id) {
	this._rest('/' + id,'DELETE');	
};

mvcModel.prototype._fetch = function() {
  if ((this.mvcState.index + 1) > this.mvcState.rows_affected) {
    return false;
  }
  this.mvcState.index++;
  return this.mvcState.records[this.mvcState.index];
};

mvcModel.prototype._seek = function(index) {
  if (index > this.mvcState.rows_affected || index < 0) {
    return false;
  }
  this.mvcState.index = index;
  return true;
};

mvcModel.prototype._copy = function(obj) {
	var final = {};
	for (var attr in obj) {
		if (typeof(obj[attr]) === 'boolean' || typeof(obj[attr]) === 'number' || typeof(obj[attr]) === 'string') {
			final[attr] = obj[attr];
		}
	}
	return final;
};

/*
jquery.mvcform.js needed to use this funciton
to make this super safe either do ajax to server or uuid
*/
jQuery.fn.mvcForm2Model = function(file,json) {
  var tempmodel = new mvcModel(file);
  return jQuery.extend(tempmodel,jQuery(this).mvcForm2Obj(json));
};

/*
jQuery.fn.createModel = function(name) {
	mvc.model[name] = new mvcModel(name);
};
*/

jQuery.mvcModelId = function () {
  var now = new Date().getTime() / 1000;
  var s = parseInt(now, 10);
  var rnd = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  return s + rnd;
};
