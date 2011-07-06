var controller_session_method_index = new function() {

  this.__construct = function() {
    writeDebug('controller_jmvc_tester_method_session_test init');
    writeDebug($.session_start());
  };

  this.session_start = new function() {
    this.click = function() {
      var sid = $.session_start();
      writeDebug(sid);
    };
  };

  this.session_uuid = new function() {
    this.click = function() {
      var uuid = $.session_uuid();
      writeDebug(uuid);
    };
  };

  this.session_id = new function() {
    this.click = function() {
      var sid = $.session_id();
      writeDebug(sid);
    };
  };

  this.session_regenerate_id = new function() {
    this.click = function() {
      var new_sid = $.session_regenerate_id()
      writeDebug(new_sid);
    };
  };

  this.session_regenerate_id2 = new function() {
    this.click = function() {
      var new_sid = $.session_regenerate_id(true)
      writeDebug(new_sid);
    };
  };

  this.session_destroy = new function() {
    this.click = function() {
      var bol = $.session_destroy();
      writeDebug(bol);
    };
  };

  this.session_read = new function() {
    this.click = function() {
      var my_name_is = $.session('my_name_is');
      writeDebug(my_name_is);
    };
  };

  this.session_read_all = new function() {
    this.click = function() {
      var all = $.session();
      writeDebug(all);
    };
  };

  this.session_writedm = new function() {
    this.click = function() {
      $.session('my_name_is','Donald Myers');
      var my_name_is = $.session('my_name_is');
      writeDebug(my_name_is);
    };
  };

  this.session_writetm = new function() {
    this.click = function() {
      $.session('my_name_is','Tyson Myers');
      var my_name_is = $.session('my_name_is');
      writeDebug(my_name_is);
    };
  };

  this.uid = new function() {
    this.click = function() {
      var uid = $.uid();
      writeDebug(uid);
    };
  };

}; /* close class */
