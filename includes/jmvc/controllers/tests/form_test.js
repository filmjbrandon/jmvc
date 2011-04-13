var controller_tests_method_form_test = new function() {

  this.__construct = function() {
    $.log('controller_jmvc_tester_method_form_test init');
  }

  this.FormHidden = new function() {
    this.click = function() {
      var x = $("#formid").mvcFormHidden('new_hidden','New Hidden Value');
    };
  };

  this.FormChangeHidden = new function() {
    this.click = function() {
      var x = $("#formid").mvcFormHidden('new_hidden','Different Value');
    };
  };


  this.Form2Json = new function() {
    this.click = function() {
      var x = $("#formid").mvcForm2Json({'extra':'abc123'});
      $.log(x);
    };
  };

  this.FormValidateFail = new function() {
    this.click = function() {
      var rtnJson = $("#formid").mvcFormValidate('/jmvc_tester/ajax/form_test_fail.php');
      $.log(rtnJson);
    };
  };

  this.FormValidatePass = new function() {
    this.click = function() {
      var rtnJson = $("#formid").mvcFormValidate('/jmvc_tester/ajax/form_test_pass.php');
      $.log(rtnJson);
    };
  };

  this.FormValidateFailExtra = new function() {
    this.click = function() {
      var rtnJson = $("#formid").mvcFormValidate('/jmvc_tester/ajax/form_test_fail.php', false, {'extra':'abc123'});
      $.log(rtnJson);
    };
  };

  this.FormAction = new function() {
    this.click = function() {
      var rtnJson = $("#formid").mvcFormAction('/new/path');
      $.log(rtnJson);
    };
  };
  
  this.fill_form = new function() {
    this.click = function() {
      output.text_input = 'This is a test';
      output.checkbox_input = true;
      output.radio_input = 1;
      output.select_input = 'third';
      output.textarea_input = 'This is a test';
      output.output = 'Put this in the output element';
      output.bogus = 'Put this in the bogus elelement';
      $.mvcUpdate(output);
    };
  };

}; /* close class */
