var controller_jmvc_tester_method_cookie_test = new function() {

  this.__construct = function() {
    $.log('controller_index init');
  }

  this.writecookie = new function() {
    this.click = function() {
      var x = $.cookie('mycookie','is true');
    };
    this.mouseover = function () {
      $.log('hello');
    };
    this.mouseout = function () {
      $.log('click key');
    }
  };

  this.readcookie = new function() {
    this.click = function() {
      var x = $.cookie('mycookie');
      x = (x == null) ? '' : x;
      output.output = x;
      $.mvcUpdate(output);
    };
  };

  this.deletecookie = new function() {
    this.click = function() {
      var x = $.cookie('mycookie',null);
    };
  };

  this.writelongterm = new function() {
    this.click = function() {
      var x = $.cookie('mycookie_how','value',{ expires: 7, path: '/' });
    };
  };

}; /* close class */
