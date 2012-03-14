/*
I attach all models to the mvc super global mvc.user_m = new mvcModel('user');
They talk to the backend via a REST Server
*/
mvcModel = function(name,primary){
	this._clear();
	this._table = name;
	this._primary = (primary) ? primary : 'id';
}

mvcModel.prototype._clear = function() {
  this._records = [];
  this._index = 0;
  this._rows_affected = 0;
  this._error = '';
  this._error_no = 0;
  this._internal_id = this._id();
	this._primary = '';
}

/* select / get */
mvcModel.prototype._get = function(url) {
	url = (url) || '';
	url = (this.[this._primary] != -1) ? '/' + this[this._primary] : url;
	this.__ajax(mvc.rest_url + this._table + url,'get',{});
}

/* insert unless there is a id then update */
mvcModel.prototype._post = function(method) {
	arg = (this[this._primary] != -1) ? '/' + this[this._primary] : '';
	arg = (method) ? arg : '/' + method;
	this.__ajax(mvc.rest_url + this._table + arg,'post',mvc.clone(this));
}

/* update */
mvcModel.prototype._put = function(method) {
	method = (method) ? '/' + method : '';
	this.__ajax(mvc.rest_url + this._table + method,'put',mvc.clone(this));
}

/* delete */
mvcModel.prototype._delete = function(method) {
	arg = (this[this._primary] != -1) ? '/' + this[this._primary] : '';
	arg = (method) ? arg : '/' + method;
	this.__ajax(mvc.rest_url + this._table + arg,'delete',mvc.clone(this));
}

/* used by all the REST functions */
mvcModel.prototype.__ajax = function(url,method,data) {
  /* send it out via blocking ajax */
	var json = jQuery.mvcAjax({url: url, data: data, method: method}) || {};
	
	/* merge the json reply back over this object it should include the _ properties above */
  this._clear();
  jQuery.extend(this,json);
  console.log(this);
}

/* fetch the current db record and move the cursor forward 1 - returns false if at last record */
mvcModel.prototype._fetch = function() {
  if ((this._index + 1) > this._rows_affected) {
    return false;
  }
  this._index++;
  return this._records[this._index];
};

/* move the database cursor to a specific record */
mvcModel.prototype._seek = function(index) {
  if (index > this._rows_affected || index < 0) {
    return false;
  }
  this._index = index;
  return true;
};

/* create a unique id */
mvcModel.prototype._id = function () {
  return "xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).toUpperCase();
}