/*
$.mvcModelRead('model_name',primary id,'file (url)');
$.mvcModelRead('user',23,'m_user');
*/
jQuery.mvcModelRead = function(name,id,file) {
  if (jQuery.mvcModelExists(name)) { 
    var file = (!file) ? mvc.model[name].model_file : file;
    if (!id) {
      /* create */
      var jsonmodel = jQuery.mvcAjax('models/' + file + 'model',{"mvc_model_mode":"create"});
      var newmodel = new model(name,file);
      mvc.model[name] = jQuery.extend(jsonmodel,newmodel);
    } else {
      /* read */
      var jsonmodel = jQuery.mvcAjax('models/' + mvc.model[name].model_file + 'model',{"id":id,"mvc_model_mode":"read"});
      var currentmodel = mvc.model[name];
      mvc.model[name] = jQuery.extend(jsonmodel,currentmodel);
    }
  } else {
    /*
    doesn't exists 
    create it then read it
    */
    var file = (!file) ? name : file;
    var newmodel = new model(name,file);
    var jsonmodel = jQuery.mvcAjax('models/' + file + 'model',{"mvc_model_mode":"create"});
    mvc.model[name] = jQuery.extend(jsonmodel,newmodel);
    if (id) {
      var jsonmodel = jQuery.mvcAjax('models/' + mvc.model[name].model_file + 'model',{"id":id,"mvc_model_mode":"read"});
      var currentmodel = mvc.model[name];
      mvc.model[name] = jQuery.extend(jsonmodel,currentmodel);
    }
  }
  return mvc.model[name];
}

/*
$.mvcModelUpdate('model_name');
$.mvcModelUpdate('user');
*/
jQuery.mvcModelUpdate = function(name) {
  if (jQuery.mvcModelExists(name)) {
    mvc.model[name].mvc_model_mode = 'update';
    var json = jQuery.mvcAjax('models/' + mvc.model[name].model_file + 'model', mvc.model[name]);
    return json.model_updated;
  }
}

/*
$.mvcModelUpsert('primary_id_as_string','model_name');
*/



/*
$.mvcModelDelete('model_name',primary id,'file (url)');
$.mvcModelDelete('user',23,'m_user');
*/
jQuery.mvcModelDelete = function(name,id,file) {
  if (jQuery.mvcModelExists(name) && !id) {
    var m = mvc.model[name];
    var pri = m.model_primary;
    var id = m[pri];
    mvc.model[name] = jQuery.mvcAjax('models/' + mvc.model[name].model_file + 'model',{"mvc_model_mode":"delete","id":id});
    mvc.model[name] = null;
  } else if (id) {
    file = (!file) ? name : file;
    jQuery.mvcAjax('models/' + file + 'model',{"mvc_model_mode":"delete","id":id});
  }
}

/*
$.mvcModelExists('model_name');
$.mvcModelExists('user');
*/
jQuery.mvcModelExists = function (name) {
  return (mvc.model[name]) ? true : false;
};

/*
convert a form to a model
$.mvcForm2Model('form_id');
$.mvcForm2Model('main_form');
*/
jQuery.fn.mvcForm2Model = function(name) {
  var json = jQuery(this).mvcForm2Json();
  
  if (!mvc.model[name]) {
    mvc.model[name] = new model(name);
  }
  mvc.model[name] = jQuery.extend(json,mvc.model[name]);
  
  return mvc.model[name];
}

/* 
model object/class
*/
function model(name,file) {
  this.model_name = name;
  this.model_file = (!file) ? name : file;
}
/*
model.prototype.create = function() {
};
model.prototype.update = function() {
};
model.prototype.read = function() {
};
model.prototype.remove = function() {
};
*/