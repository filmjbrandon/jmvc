/* global mvc model storage */
mvc.model = mvc.model || {};

mvcModel = function(table) {
  /* these things maintain state */
  this.mvcState = {};
  
  this.mvcState.table = table;
  this.mvcState.records = {};
  this.mvcState.index = 0;
  this.mvcState.rows_affected = 0;
  this.mvcState.error = '';
  this.mvcState.error_no = 0;
  this.mvcState.internal_id = jQuery.mvcModelId();
	this.mvcState.external_id = -1;
};

mvcModel.prototype._rest = function(url,method) {
	var json = jQuery.mvcAjax({"url": mvc.rest_url + '/' + this.mvcState.table + url + '.json', "method": method, "data": this._copy(this)}) || {};
  jQuery.extend(true,this,json); /* merge the record values back over this object (model) */
};

/* select */
mvcModel.prototype._get = function(url) {
	url = url || '';
	this._rest(url,'GET');	
};

/* insert */
mvcModel.prototype._post = function(id) {
	this._rest('/' + id,'POST');	
};

/* update */
mvcModel.prototype._put = function(id) {
	this._rest('/' + id,'PUT');	
};

/* delete */
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

jQuery.mvcModelId = function () {
  var now = new Date().getTime() / 1000;
  var s = parseInt(now, 10);
  var rnd = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  return s + rnd;
};
