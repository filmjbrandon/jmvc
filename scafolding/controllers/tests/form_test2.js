var controller_tests_method_form_test2 = new function() {

  this.__construct = function() {
    $.log('controller_tests_method_form_test2 init');
  }

  this.FormHidden = new function() {
    this.click = function() {
      $.log('FormHidden.click action');
    };
  };

  this.FormChangeHidden = new function() {
    this.click = function() {
      $.log('FormChangeHidden.click action');
    };
  };

  this.Form2Json = new function() {
    this.click = function() {
      $.log('Form2Json.click action');
    };
  };

  this.FormValidateFail = new function() {
    this.click = function() {
      $.log('FormValidateFail.click action');
    };
  };

  this.FormValidatePass = new function() {
    this.click = function() {
      $.log('FormValidatePass.click action');
    };
  };

  this.FormValidateFailExtra = new function() {
    this.click = function() {
      $.log('FormValidateFailExtra.click action');
    };
  };

  this.FormAction = new function() {
    this.click = function() {
      $.log('FormAction.click action');
    };
  };

  this.fill_form = new function() {
    this.click = function() {
      $.log('fill_form.click action');
    };
  };

  this.output = new function() {
    this.click = function() {
      $.log('output.click action');
    };
  };

  this.bogus = new function() {
    this.click = function() {
      $.log('bogus.click action');
    };
  };

  this.formid = new function() {
    this.click = function() {
      $.log('formid.click action');
    };
  };

  this.btnsubmit = new function() {
    this.click = function() {
      $.log('btnsubmit.click action');
    };
  };

}; /* close class */
