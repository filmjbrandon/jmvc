var controller_form_method_index = new function() {

  this.__construct = function() {
    $.log('controller_jmvc_tester_method_form_test init');
  }

  this.FormHidden = new function() {
    this.click = function() {
      $.log('FormHidden.click');
      $('#formid').mvcFormHidden('new_hidden','New Hidden Value');
      $('#output').append('<p>Changed/Created Hidden on form with id of formid</p>');
    };
  };

  this.FormChangeHidden = new function() {
    this.click = function() {
      $('#formid').mvcFormHidden('new_hidden','Different Value');
      $('#output').append('<p>Changed/Created Hidden on form with id of formid</p>');
    };
  };

  this.Form2Json = new function() {
    this.click = function() {
      var json = $('#formid').mvcForm2Obj({'extra':'abc123'});
      $.log(json);
      $('#output').append('<p>Check your console output</p>');
    };
  };

  this.FormValidate = new function() {
    this.click = function() {
      var bol = $('#formid').mvcFormValidate();
      $('#output').append('<p>Passed: '+bol+' More in Console</p>');
      $.log('Validate Return Responds',mvc.ajax_responds);
    };
  };

  this.FormValidateExtra = new function() {
    this.click = function() {
      var bol = $('#formid').mvcFormValidate('/jmvc_tester/form_test_fail.php', false, true, {'extra':'abc123'});
      $('#output').append('<p>Passed: '+bol+' More in Console</p>');
      $.log('Validate Return Responds',mvc.ajax_responds);
    };
  };

  this.FormAction = new function() {
    this.click = function() {
      $('#formid').mvcFormAction('/new/path');
      $('#output').append('<p>Changed form with id formid to /new/path</p>');
    };
  };
  
  this.fill_form = new function() {
    this.click = function() {
      /* data is already declared by mvc */
      data.text_input = 'This is a test';
      data.checkbox_input = true;
      data.radio_input = 1;
      data.select_input = 'third';
      data.textarea_input = 'This is a test';
      data.output = 'Put this in the output element';
      data.bogus = 'Put this in the bogus elelement';
      $.mvcUpdate(data);
    };
  };

}; /* close class */
