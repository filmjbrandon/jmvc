var controller_cookie_method_index = new function() {

  this.__construct = function() {
    writeDebug('controller_tests_method_cookie_test init');
  }

  this.writecookie = new function() {
    this.click = function() {
      var x = $.cookie('mycookie','is true');
      writeDebug(x);
    };
  };

  this.readcookie = new function() {
    this.click = function() {
      var x = $.cookie('mycookie');
      writeDebug(x);
    };
  };

  this.deletecookie = new function() {
    this.click = function() {
      var x = $.cookie('mycookie',null);
      writeDebug(x);
    };
  };

  this.writelongterm = new function() {
    this.click = function() {
      var x = $.cookie('mycookie_how','value',{ expires: 7, path: '/' });
      writeDebug(x);
    };
  };

}; /* close class */
