/*
basic - add hidden
$("#form_id").mvcFormHidden('primary',23);
*/
jQuery.fn.mvcFormHidden = function (name, value) {
  return this.each(function () {
    var unique = 'mvc_generated_element_id_' + name;
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
simple - send form to url from form's action attrubute + validation_url setting ie action="submit" url = submit_validate
$("#form_id").mvcFormValidate();
basic - send the form id as json to given url
$("#form_id").mvcFormValidate('url');
advanced - send the form id as json to given url submit the form on true (if mvc_model_valid = true)
$("#form_id").mvcFormValidate('url',true);
advanced - send the form id as json to given url submit the form on true (if mvc_model_valid = true) with extra payload
$("#form_id").mvcFormValidate('url',true,{'extra':'abc123'});
*/
jQuery.fn.mvcFormValidate = function (url, submit, json) {
/*
validate this against some back end php via ajax
pass back a json object with and array for the view [key] = value
and variable mvc_model_valid = true/false
other options include:
mvc_pre_view with valid javascript code to run
mvc_post_view with valid javascript code to run
*/
  submit = (!submit) ? mvc.validation_submit : submit;
  url = (!url) ? jQuery(this).attr('action') + mvc.validation_url : url;

  var rtnJson = jQuery.mvcAjax(url,jQuery(this).mvcForm2Json(json),'json',true);

  if (rtnJson !== null) {
    if (rtnJson.mvc_model_valid === true && submit === true) {
      jQuery(this).unbind('submit').submit(); /* if returned false (no errors) then submit the form */
    }
    return (rtnJson.mvc_model_valid === true) ? true : false;
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
