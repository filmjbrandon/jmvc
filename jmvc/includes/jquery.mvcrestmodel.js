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

mvcModel.prototype.mvcsync = function() {
	/* 
	GET /rest/server/tablename/1/.json
	GET /rest/server/tablename/.json
	GET /rest/server/tablename/by/lastname/myers/.json 
	GET /rest/server/tablename/orderby/lastname/desc/.json
	GET /rest/server/tablename/limit/0/32/.json
	GET /rest/server/tablename/by/lastname/m%/orderby/lastname/limit/0/32/.json
	
	PUT /rest/server/tablename/1
	PUT /rest/server/tablename/
	
	DELETE /rest/server/tablename/1
	*/

	/* build the rest url */
	var resturl = mvc.rest_url;

	var json = jQuery.mvcAjax({"url": resturl, "data": jQuery(true,{},this)}) || {};

  jQuery.extend(true,this,json); /* merge the record values back over this object */
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

/*
jquery.mvcform.js needed to use this funciton
to make this super safe either do ajax to server or uuid
*/
jQuery.fn.mvcForm2Model = function(file,json) {
  var tempmodel = new mvcModel(file);
  return jQuery.extend(tempmodel,jQuery(this).mvcForm2Obj(json));
};

jQuery.mvcModelId = function () {
  var now = new Date().getTime() / 1000;
  var s = parseInt(now, 10);
  var rnd = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  return s + rnd;
};
