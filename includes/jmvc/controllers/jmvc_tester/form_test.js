var controller_jmvc_tester_method_form_test = new function() {

  this.__construct = function() {
    $.log('controller_index init');
  }

  this.FormHidden = new function() {
    this.click = function() {
      var x = $("#formid").mvcFormHidden('new_hidden','New Hidden Value');
    };
  };

  this.Form2Json = new function() {
    this.click = function() {
      var x = $("#formid").mvcForm2Json({'extra':'abc123'});
      $.log(x);
    };
  };

  this.FormValidate = new function() {
    this.click = function() {
      var x = $("#formid").mvcFormValidate('form_val_test.php', false, {'extra':'abc123'});
    };
  };

  this.FormAction = new function() {
    this.click = function() {
      var x = $("#formid").mvcFormAction('/new/path');
    };
  };
  
  this.fill_form = new function() {
    this.click = function() {
      output.text_input = 'This is a test';
      output.checkbox_input = true;
      output.radio_input = 1;
      output.select_input = 'two';
      output.textarea_input = 'This is a test';
      $.mvcUpdate(output);
    };
  };

}; /* close class */
