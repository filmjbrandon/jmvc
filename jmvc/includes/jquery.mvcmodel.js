/* I attach all models to the mvc super global mvc.user_m = mvcModel('user'); */

mvcModel = function(table) {
  /* these things maintain state */
  this._table = table;
  this._records = {};
  this._index = 0;
  this._rows_affected = 0;
  this._error = '';
  this._error_no = 0;
  this._internal_id = jQuery.mvcModelId();
};

mvcModel.prototype._get = function(url) {
	this._post(url,'get',{});
}

mvcModel.prototype._post = function(url) {
	this._rest(url,'post');
}

mvcModel.prototype._put = function(url) {
	this._rest(url,'put');
}

mvcModel.prototype._delete = function(url) {
	this._rest(url,'delete');
}

mvcModel.prototype._rest = function(url,method,data) {
	payload = (data) || mvc.clone(this);
	var json = jQuery.mvcAjax({url: mvc.rest_url + this._table + url, data: payload, method: method}) || {};
  jQuery.extend(this,json); 
}

/* none REST */
mvcModel.prototype._sync = function(extras) {
  /* send it out via blocking ajax */
	var json = jQuery.mvcAjax({url: mvc.model_url + this._table + '.js', data: {table: this._table, record: jQuery.clone(this), extra: extra}, method: 'post'}) || {};

	/* merge the json reply back over this object it should include the _ properties above */
  jQuery.extend(this,json); 
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

jQuery.mvcModelId = function () {
  var now = new Date().getTime() / 1000;
  var s = parseInt(now, 10);
  var rnd = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  return s + rnd;
}