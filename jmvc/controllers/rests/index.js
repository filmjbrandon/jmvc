var controller_rests_method_index = new function() {

  this.__construct = function() {
    $.log('controller_rest_method_index init');
  };

  this.get = new function() {
    this.click = function() {
    			
			mvc.user_m = new mvcModel('user');
			mvc.user_m._get();
  	}
  };
  
  this.get_one = new function() {
    this.click = function() {
    			
			mvc.user_m = new mvcModel('user');
			mvc.user_m.id = 2;
			
  		mvc.user_m._get();
  	}
  };
  
  this.get_where = new function() {
    this.click = function() {
    			
			mvc.user_m = new mvcModel('user');
  		mvc.user_m._get('/where/id/gt/3');
  	}
  };

  this.get_big_sample = new function() {
    this.click = function() {
    			
			mvc.user_m = new mvcModel('user');
  		mvc.user_m._get('/where/id/gt/3/orderby/id/desc/limit/0/999');
  	}
  };

  this.get_function = new function() {
    this.click = function() {
    			
			mvc.user_m = new mvcModel('user');
  		mvc.user_m._get('/method/2/3');
  	}
  };

  this.post = new function() {
    this.click = function() {
			mvc.user_m = new mvcModel('user');
  		mvc.user_m.name = "Donald Myers";
  		mvc.user_m.age = 23;
  		mvc.user_m.id = 123;

  		mvc.user_m._post();
  	}
  };
  
    this.put = new function() {
	    this.click = function() {
				mvc.user_m = new mvcModel('user');
	  		mvc.user_m.name = "Donald Myers";
	  		mvc.user_m.age = 23;
	
	  		mvc.user_m._put();
	  	}
	  };

    this.delete = new function() {
	    this.click = function() {
				mvc.user_m = new mvcModel('user');
	  		mvc.user_m.id = 2;
	  		mvc.user_m._delete();
	  	}
	  };

		this.test = new function() {
			this.click = function() {
			}
		};

}; /* close class */

