/*
basic - add hidden
$("#form_id").mvcFormHidden('primary',23);
*/
jQuery.fn.mvcFormHidden = function (name, value) {
  return this.each(function () {
    var unique = mvc.auto_gen + name;
    if (jQuery('#' + unique).length > 0) {
      jQuery('#' + unique).attr('value', value);
    } else {
      jQuery('<input />').attr('type', 'hidden').attr('id', unique).attr('name', name).val(value).appendTo(this);
    }
  });
};

/*
basic
$("#form_id").mvcForm2Json();
advanced - add additional payload
$("#form_id").mvcForm2Json({'extra':'abc123'});
*/
jQuery.fn.mvcForm2Json = function(json) {
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

  return json;
};

/* 
!needs work
Simplify Object to Record
*/
/*
jQuery.simplify = function(obj) {
  var data = {};
  for (var attr in obj) {
    if (typeof(obj[attr]) === 'boolean' || typeof(obj[attr]) === 'number' || typeof(obj[attr]) === 'string') {
      data[attr] = obj[attr];
    }
  }
  return data;
};
*/

/*
simple - send form to url from form's action attrubute + validation_url setting ie action="submit" url = submit_validate
$("#form_id").mvcFormValidate();
basic - send the form id as json to given url
$("#form_id").mvcFormValidate('url');
advanced - send the form id as json to given url submit the form on true (if mvc_model_valid = true)
$("#form_id").mvcFormValidate('url',true);
advanced - send the form id as json to given url submit the form on true (if mvc_model_valid = true) with extra payload
$("#form_id").mvcFormValidate('url',true,{'extra':'abc123'});
*/
jQuery.fn.mvcFormValidate = function (url, submit, update_view, json) {
/*
validate this against some back end php via ajax
pass back a json object with and array for the view [key] = value
and variable mvc_model_valid = true/false
if the json is not returned or invalid the form is considered invalid (valid = false)
other options include:
mvc_pre_view with valid javascript code to run
mvc_post_view with valid javascript code to run
*/
  submit = (!submit) ? mvc.validation_submit : submit;
  url = (!url) ? jQuery(this).attr('action') + mvc.validation_url : url;
  update_view = (!update_view) ? mvc.auto_update_view : update_view;

  mvc.ajax_responds = jQuery.mvcAjax(url,jQuery(this).mvcForm2Json(json),'json',true);
  
  if (mvc.ajax_responds !== null) {
    if (mvc.ajax_responds.mvc_model_valid === true && submit === true) {
      jQuery(this).unbind('submit').submit(); /* if returned false (no errors) then submit the form */
    }
    return (mvc.ajax_responds.mvc_model_valid === true) ? true : false;
  } else {
    return false;
  }
};

/*
basic - change the url of the form action
$("#form_id").mvcFormAction('new url');
*/
jQuery.fn.mvcFormAction = function (url) {
  return this.each(function () {
    jQuery(this).attr('action', url);
  });
};

/*
!needs work
wrapper to unbind a forms submit action
$("#formid").mvcUnbindSubmit();
*/
/*
jQuery.fn.mvcUnbindSubmit = function () {
  jQuery(this).submit(function() {
    return false;
  });
}
*/