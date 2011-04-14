models = {}; /* global model storage */

mvc.modelExists = function(name) {
  return (!models[name]) ? false : true;
}

jQuery.fn.mvcForm2Model = function(name,json) {
  models[name] = new model(name);
  
  json = (!json) ? {} : json;

  /* convert form to json object */
  jQuery.each(jQuery(this).serializeArray(), function () {
    if (json[this.name]) {
      if (!json[this.name].push) {
        json[this.name] = [json[this.name]];
      }
      json[this.name].push(this.value || '');
    } else {
      json[this.name] = this.value || '';
    }
  });

  json.mvc_post_selector = this.selector;
  json.mvc_timestamp = Number(new Date());
  json.mvc_url = mvc.self;
  json.mvc_application_folder = mvc.application_folder;

  jQuery.extend(models[name],json);
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

