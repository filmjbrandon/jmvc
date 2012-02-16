var controller_form_method_index = new function() {

  this.__construct = function() {
    writeDebug('controller_jmvc_tester_method_form_test init');
  }

  this.FormHidden = new function() {
    this.click = function() {
      writeDebug($('#new_hidden').val());
      $('#formid').mvcFormHidden('new_hidden','New Hidden Value');
      writeDebug($('#new_hidden').val());
    };
  };

  this.FormChangeHidden = new function() {
    this.click = function() {
      writeDebug($('#new_hidden').val());
      $('#formid').mvcFormHidden('new_hidden','Different Value');
      writeDebug($('#new_hidden').val());
    };
  };

  this.Form2Json = new function() {
    this.click = function() {
      var json = $('#formid').mvcForm2Obj({'extra':'abc123'});
      writeDebug(json);
    };
  };

  this.FormValidate = new function() {
    this.click = function() {
      var bol = $('#formid').mvcFormValidate();
      writeDebug(bol);
      writeDebug(mvc.ajax_responds);
    };
  };

  this.FormValidateExtra = new function() {
    this.click = function() {
      var bol = $('#formid').mvcFormValidate('/jmvc_tester/form_test_fail.php', false, true, {'extra':'abc123'});
      writeDebug(bol);
      writeDebug(mvc.ajax_responds);
    };
  };

  this.FormAction = new function() {
    this.click = function() {
      writeDebug($('#formid').attr('action'));
      $('#formid').mvcFormAction('/new/path');
      writeDebug($('#formid').attr('action'));
    };
  };
  
  this.fill_form = new function() {
    this.click = function() {
      /* data is already declared by mvc */
      var data = {};
      data.text_input = 'This is a test';
      data.checkbox_input = true;
      data.radio_input = 1;
      data.select_input = 'third';
      data.textarea_input = 'This is a test';
      data.output = 'Put this in the output element';
      $.mvcMerge(data);
      writeDebug(data);
      writeDebug('updated DOM automatically');
    };
  };

}; /* close class */
