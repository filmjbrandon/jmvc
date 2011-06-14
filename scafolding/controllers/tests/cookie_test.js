var controller_tests_method_cookie_test = new function() {

  this.__construct = function() {
    $.log('controller_tests_method_cookie_test init');
  }

  this.writecookie = new function() {
    this.click = function() {
      $.log('writecookie.click action');
    };
  };

  this.readcookie = new function() {
    this.click = function() {
      $.log('readcookie.click action');
    };
  };

  this.deletecookie = new function() {
    this.click = function() {
      $.log('deletecookie.click action');
    };
  };

  this.writelongterm = new function() {
    this.click = function() {
      $.log('writelongterm.click action');
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
