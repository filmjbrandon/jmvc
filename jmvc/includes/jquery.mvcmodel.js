/* I attach all models to the mvc super global mvc.user_m = mvcModel('user'); */

mvcModel = function(table) {
  /* these things maintain state */
  this._table = table;
	this._clear();
};

mvcModel.prototype._clear = function() {
  this._records = [];
  this._index = 0;
  this._rows_affected = 0;
  this._error = '';
  this._error_no = 0;
  this._internal_id = this._id();
	this.id = -1;
}

/* select */
mvcModel.prototype._get = function(url) {
	url = (url) || '';
	url = (this.id != -1) ? '/' + this.id : url;
	this.__ajax(mvc.rest_url + this._table + url,'get',{});
}

/* insert unless there is a id then update */
mvcModel.prototype._post = function() {
	id = (this.id != -1) ? '/' + this.id : '';
	this.__ajax(mvc.rest_url + this._table + id,'post',mvc.clone(this));
}

/* update */
mvcModel.prototype._put = function() {
	this.__ajax(mvc.rest_url + this._table,'put',mvc.clone(this));
}

/* delete */
mvcModel.prototype._delete = function() {
	this.__ajax(mvc.rest_url + this._table + '/' + this.id,'delete',mvc.clone(this));
	this.id = -1; /* set the id to null */
}

/* generic REST */
mvcModel.prototype._sync = function(extras) {
	this.__ajax(mvc.model_url + this._table + '.js', 'post', {table: this._table, record: mvc.clone(this), extra: extra});
};

mvcModel.prototype.__ajax = function(url,method,data) {
  /* send it out via blocking ajax */
	var json = jQuery.mvcAjax({url: url, data: data, method: method}) || {};
	
	/* merge the json reply back over this object it should include the _ properties above */
  this._clear();
  jQuery.extend(this,json);
  console.log(this);
}

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

mvcModel.prototype._id = function () {
  return "xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).toUpperCase();
}