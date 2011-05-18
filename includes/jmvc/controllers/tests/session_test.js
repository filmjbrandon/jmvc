var controller_tests_method_session_test = new function() {

  this.__construct = function() {
    $.log('controller_jmvc_tester_method_session_test init');
  }

  this.session_start = new function() {
    this.click = function() {
      var x = $.session_start();
    };
  };

  this.session_uuid = new function() {
    this.click = function() {
      var x = $.session_uuid();
      output.output = x;
      $.mvcUpdate(output);
    };
  };

  this.session_id = new function() {
    this.click = function() {
      var x = $.session_id();
      output.output = x;
      $.mvcUpdate(output);
    };
  };

  this.session_regenerate_id = new function() {
    this.click = function() {
      var x = $.session_regenerate_id()
    };
  };

  this.session_regenerate_id2 = new function() {
    this.click = function() {
      var x = $.session_regenerate_id(true)
    };
  };

  this.session_destroy = new function() {
    this.click = function() {
      var x = $.session_destroy();
    };
  };

  this.session_read = new function() {
    this.click = function() {
      var x = $.session('my_name_is');
      output.output = x;
      $.mvcUpdate(output);
    };
  };

  this.session_read_all = new function() {
    this.click = function() {
      var x = $.session();
      $.log(x);
      $.mvcUpdate(output);
    };
  };

  this.session_write = new function() {
    this.click = function() {
      var x = $.session('my_name_is','Donald L Myers');
      output.output = x;
      $.mvcUpdate(output);
    };
  };


  this.uid = new function() {
    this.click = function() {
      var x = $.uid();
      output.output = x;
      $.mvcUpdate(output);
    };
  };


}; /* close class */
