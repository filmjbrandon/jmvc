var controller_tests_method_model_test = new function() {

  this.__construct = function() {
    $.log('controller_jmvc_tester_method_model_test init');
    models.person = new model('people');
    $.log('created models.person');
  }

  this.read_model = new function() {
    this.click = function() {
      models.person._load('name = "don"');
      $.log(models.person.id,models.person.name,models.person.age);
    };
  };

  this.read_model2 = new function() {
    this.click = function() {
      models.person._load(123);
      $.log(models.person.id,models.person.name,models.person.age);
    };
  };

  this.read_model3 = new function() {
    this.click = function() {
      models.person._load('name like %Laurie%');
      $.log(models.person);
    };
  };

  this.insert_model = new function() {
    this.click = function() {
      models.person = new model('people');
      models.person.name = 'Tyson';
      models.person.age = 47;
      models.person._save();
      $.log(models.person.id,models.person.name,models.person.age);
    };
  };

  this.update_model = new function() {
    this.click = function() {
      models.person.name = 'Andrew';
      models.person._save();
      $.log(models.person.id,models.person.name,models.person.age);
    };
  };

  this.update_model2 = new function() {
    this.click = function() {
      models.person.name = 'Luke';
      models.person._save('Name = Andrew');
      $.log(models.person.id,models.person.name,models.person.age);
    };
  };


  this.delete_model = new function() {
    this.click = function() {
      models.person._remove();
      $.log(models.person.id,models.person.name,models.person.age);
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
