models = {}; /* global model storage */

mvc.modelExists = function(name) {
  return (!models[name]) ? false : true;
}

/* jquery.mvcform.js needed to use this funciton */
jQuery.fn.mvcForm2Model = function(name,json) {
  models[name] = new model(name);
  jQuery.extend(models[name],$(this).mvcForm2Json(json));
};

function model(name,file) {
  this._model_name = name;
  this._model_filename = (!file) ? name : file;
  this._model_primary = 'undefined';
};

model.prototype._load = function(extra) {
  this.__ajax('load',extra);
};

model.prototype._save = function(extra) {
  this.__ajax('save',extra);
}

model.prototype._remove = function(extra) {
  this.__ajax('remove',extra);
}

model.prototype.__ajax = function(action,extra) {
  extra = (!extra) ? {} : extra;
  if (typeof(extra) != 'object') {
    var hold = extra;
    extra = {};
    extra._string = hold;
  }
  extra.mvc_model_action = action;
  extra.record = {};
  for (var attr in this) {
    if (this.hasOwnProperty(attr)) {
      extra.record[attr] = this[attr];
    }
  }
  var serverjson = jQuery.mvcAjax(mvc.model_url + this._model_filename + '.js',extra);
  jQuery.extend(this,serverjson);
}

