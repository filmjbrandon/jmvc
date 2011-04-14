var controller_tests_method_model_list_test = new function() {

  this.__construct = function() {
    $.log('controller_tests_method_model_list_test init');
    models.person = new model('people');
    $.log('created models.person');
  }

  this.read_model3 = new function() {
    this.click = function() {
      models.person._load('name like %Laurie%');
      $.log(models.person);
      for(var idx in models.person._records) {
        var per = models.person._records[idx];
        $('#bogus').before('<div id="person' + per.id + '" data-mvc=\'{"name":' + per.id + '}\' class="pickme button"><div class="column1">' + per.id + '</div><div class="column2">' + per.name + '</div></div>');
      }
      
    };
  };
  
  this.pickme = new function() {
    this.click = function() {
      var x = $(mvc.event).mvcData("name");
      $("#bogus").html(x);
    }
  }

}; /* close class */
