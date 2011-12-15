var controller_rests_method_index = new function() {

  this.__construct = function() {
    $.log('controller_rest_method_index init');
  };

  this.get = new function() {
    this.click = function() {
    			
			mvc.model.user = new mvcModel('people');
			
  		mvc.model.user.name = "Donald Myers";
  		mvc.model.user.age = 23;
  		mvc.model.user.month = "december";
  		mvc.model.user.id = 41;
  		
  		mvc.model.user._get('/45');
  		mvc.model.user._get('/by/lastname/myers');
  		mvc.model.user._get('/by/lastname/myers/orderby/lastname');
  		mvc.model.user._get('/by/lastname/myers/orderby/lastname/limit/0/999');
  	}
  };
  
  this.get_one = new function() {
    this.click = function() {
    			
			mvc.model.user = new mvcModel('people');
  		mvc.model.user.name = "Donald Myers";
  		mvc.model.user.age = 23;
  		mvc.model.user.month = "december";
  		mvc.model.user.id = 41;

  		mvc.model.user._get('/' + mvc.model.user.id);
  	}
  };
  
  this.get_all = new function() {
    this.click = function() {
    			
			mvc.model.user = new mvcModel('people');
  		mvc.model.user.name = "Donald Myers";
  		mvc.model.user.age = 23;
  		mvc.model.user.month = "december";
  		mvc.model.user.id = 41;
  		
  		mvc.model.user._get();
  	}
  };

  this.post = new function() {
    this.click = function() {
    			
			mvc.model.user = new mvcModel('people');
  		mvc.model.user.name = "Donald Myers";
  		mvc.model.user.age = 23;
  		mvc.model.user.month = "december";
  		mvc.model.user.id = 41;

			$.extend(mvc.model.user,$("#formid").mvcForm2Obj());
  		
  		mvc.model.user._post(mvc.model.user.id);
  	}
  };
  
    this.put = new function() {
	    this.click = function() {
	    			
				mvc.model.user = new mvcModel('people');
	  		mvc.model.user.name = "Donald Myers";
	  		mvc.model.user.age = 23;
	  		mvc.model.user.month = "december";
	  		mvc.model.user.id = 42;
	  		
	  		mvc.model.user._put(mvc.model.user.id);
	  	}
	  };

    this.delete = new function() {
	    this.click = function() {
	    			
				mvc.model.user = new mvcModel('people');
	  		mvc.model.user.id = 43;	  		
	  		mvc.model.user._delete(mvc.model.user.id);

	  	}
	  };

		this.test = new function() {
			this.click = function() {
			}
		};

}; /* close class */

