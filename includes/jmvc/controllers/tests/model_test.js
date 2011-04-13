var controller_tests_method_model_test = new function() {

  this.__construct = function() {
    $.log('controller_jmvc_tester_method_model_test init');
    models.person = new model('people');
    $.log('created models.person');
  }

  this.read_model = new function() {
    this.click = function() {
      models.person._load('name = "don"');
      show(models.person);
    };
  };

  this.read_model2 = new function() {
    this.click = function() {
      models.person._load(123);
      show(models.person);
    };
  };

  this.read_model3 = new function() {
    this.click = function() {
      models.person._load('name like %Laurie%');
      show(models.person);
    };
  };

  this.insert_model = new function() {
    this.click = function() {
      models.person = new model('people');
      models.person.name = 'Tyson';
      models.person.age = 47;
      models.person._save();
      show(models.person);
    };
  };

  this.update_model = new function() {
    this.click = function() {
      models.person.name = 'Andrew';
      models.person._save();
      show(models.person);
    };
  };

  this.update_model2 = new function() {
    this.click = function() {
      models.person = new model('people');
      models.person.name = 'Luke';
      models.person._save('Name = Andrew');
      show(models.person);
    };
  };

  this.update_model3 = new function() {
    this.click = function() {
      models.person = new model('people');
      models.person.name = 'Andrew';
      models.person._save('Name = Luke');
      show(models.person);
    };
  };

  this.delete_model = new function() {
    this.click = function() {
      models.person._remove();
      show(models.person);
    };
  };

  this.model_exists = new function() {
    this.click = function() {
      $.log(models._exists('person'));
    };
  };

  this.form2model = new function() {
    this.click = function() {
      $.log('form2model.click action');
    };
  };

}; /* close class */

function show(m) {
  $.log('id '+m.id,'name '+m.name,'age '+m.age,'error '+m._error);
  $.log(m);
}
