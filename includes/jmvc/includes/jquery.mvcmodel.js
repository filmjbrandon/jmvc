models = {};

function model(name,file) {
  this.model_name = name;
  this.model_filename = (!file) ? name : file;
  this.model_primary = 'undefined';
};

model.prototype.load = function(arg1,arg2) {
  var extra = {'mvc_arg1':arg1,'mvc_arg2':arg2};
  this._sendajax('load',extra);
};

model.prototype.save = function() {
  this._sendajax('save');
}

model.prototype.remove = function() {
  this._sendajax('remove');
}

model.prototype._sendajax = function(mode,extra) {
  extra = (!obj) ? {} : extra;
  extra.mvc_model_action = mode;
  for (var name in this) {
    if (this.hasOwnProperty(name)) {
      extra[name] = this.name;
    }
  }
  var serverjson = jQuery.mvcAjax('models/' + this.model_filename,extra);
  jQuery.extend(this,serverjson);
}