var controller_model_method_index = new function() {

  this.__construct = function() {
    $.log('controller_model_method_index init');
  };

  this.read_model = new function() {
    this.click = function() {
      mvc.model.person = new mvcModel('people'); /* people is the backend model file */
      mvc.model.person._sync('load');
      $("#output").append('<pre>' + obj2string(mvc.model.person) + '</pre>');
    };
  };

  this.read_model2 = new function() {
    this.click = function() {
      mvc.model.person = new mvcModel('people'); /* people is the backend model file */
      mvc.model.person.id = 123;
      mvc.model.person._sync_where('load');
      $("#output").append('<pre>' + obj2string(mvc.model.person) + '</pre>');
    };
  };

  this.read_model3 = new function() {
    this.click = function() {
    };
  };

  this.insert_model = new function() {
    this.click = function() {
 
    };
  };

  this.update_model = new function() {
    this.click = function() {
    };
  };

  this.update_model2 = new function() {
    this.click = function() {
    };
  };

  this.update_model3 = new function() {
    this.click = function() {
    };
  };

  this.delete_model = new function() {
    this.click = function() {
    };
  };

  this.model_exists = new function() {
    this.click = function() {
    };
  };

  this.form2model = new function() {
    this.click = function() {
    };
  };
  
  this.displaymodel = new function() {
    this.click = function() {
    };
  };
  
  this.dosomeotheraction = new function() {
    this.click = function() {
    };
  };
  
  this.read_models = new function() {
    this.click = function() {
    };
  };

  this.pickme = new function() {
    this.click = function() {
    }
  }

}; /* close class */

function obj2string(obj) {
  var str = '\n';
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (typeof(obj[prop]) === 'object') {
        str += prop + '->' + obj2string(obj[prop]);
      } else {
        str += prop + '->' + obj[prop] + '\n';
      }
    }
  }
  return str;
}
