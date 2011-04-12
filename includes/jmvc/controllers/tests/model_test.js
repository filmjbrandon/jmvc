models = {};

var controller_tests_method_model_test = new function() {

  this.__construct = function() {
    $.log('controller_jmvc_tester_method_model_test init');
  }

  this.read_model = new function() {
    this.click = function() {
      models.person = new model('people');
      models.person.load();
    };
  };

  this.upsert_model = new function() {
    this.click = function() {
      $.log('upsert_model.click action');
    };
  };

  this.update_model = new function() {
    this.click = function() {
      $.log('update_model.click action');
    };
  };

  this.delete_model = new function() {
    this.click = function() {
      $.log('delete_model.click action');
    };
  };

  this.model_exists = new function() {
    this.click = function() {
      $.log('model_exists.click action');
    };
  };

  this.form2model = new function() {
    this.click = function() {
      $.log('form2model.click action');
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

}; /* close class */
