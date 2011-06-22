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
};

model.prototype._load = function(extra) {
  this._action('load',extra);
};

model.prototype._save = function(extra) {
  this._action('save',extra);
}

model.prototype._remove = function(extra) {
  this._action('remove',extra);
}

model.prototype._action = function(action,extra) {
  extra = (!extra) ? {} : extra;
  /* is extra a where clause string */
  if (typeof(extra) != 'object') {
    var hold = extra;
    extra = {};
    extra._string = hold;
  }
  extra.mvc_model_action = action;
  extra.record = {};
  /* make a copy without the methods */
  for (var attr in this) {
    if (this.hasOwnProperty(attr)) {
      extra.record[attr] = this[attr];
    }
  }
  /* send it out via blocking ajax */
  var serverjson = jQuery.mvcAjax(mvc.model_url + this._model_filename + '.js',extra);
  
  /* merge it back with this object */
  jQuery.extend(this,serverjson);
}
