var controller_tests_method_session_test = new function() {

  this.__construct = function() {
    $.log('controller_tests_method_session_test init');
  }

  this.session_start = new function() {
    this.click = function() {
      $.log('session_start.click action');
    };
  };

  this.session_uuid = new function() {
    this.click = function() {
      $.log('session_uuid.click action');
    };
  };

  this.session_id = new function() {
    this.click = function() {
      $.log('session_id.click action');
    };
  };

  this.session_regenerate_id = new function() {
    this.click = function() {
      $.log('session_regenerate_id.click action');
    };
  };

  this.session_regenerate_id2 = new function() {
    this.click = function() {
      $.log('session_regenerate_id2.click action');
    };
  };

  this.session_destroy = new function() {
    this.click = function() {
      $.log('session_destroy.click action');
    };
  };

  this.session_read = new function() {
    this.click = function() {
      $.log('session_read.click action');
    };
  };

  this.session_read_all = new function() {
    this.click = function() {
      $.log('session_read_all.click action');
    };
  };

  this.session_write = new function() {
    this.click = function() {
      $.log('session_write.click action');
    };
  };

  this.uid = new function() {
    this.click = function() {
      $.log('uid.click action');
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
