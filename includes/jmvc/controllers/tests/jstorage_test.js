
var controller_tests_method_jstorage_test = new function() {

  this.__construct = function() {
    $.log('controller_jmvc_tester_method_storage_test init');
  }

  this.seta = new function() {
    this.click = function() {
      $.jStorage.set('seta',123);
    };
  };

  this.setb = new function() {
    this.click = function() {
      $.jStorage.set('setb','Donald');
    };
  };

  this.setc = new function() {
    this.click = function() {
      $.jStorage.set('setc',true);
    };
  };

  this.get_seta = new function() {
    this.click = function() {
      var z = $.jStorage.get('seta');
      output.output = z;
      $.mvcUpdate(output);
    };
  };

  this.get_default = new function() {
    this.click = function() {
      var z = $.jStorage.get('setd','Tyson');
      output.output = z;
      $.mvcUpdate(output);
    };
  };

  this.deletekey = new function() {
    this.click = function() {
      $.jStorage.deleteKey('seta');
    };
  };

  this.flush = new function() {
    this.click = function() {
      $.jStorage.flush();
    };
  };

  this.storageobj = new function() {
    this.click = function() {
      var z = $.jStorage.storageObj();
      output.output = z;
      $.mvcUpdate(output);
    };
  };

  this.storagesize = new function() {
    this.click = function() {
      var z = $.jStorage.storageSize();
      output.output = z;
      $.mvcUpdate(output);
    };
  };

  this.index = new function() {
    this.click = function() {
      var ary = $.jStorage.index('seta');
      $.log(ary);
      output.output = ary;
      $.mvcUpdate(output);
    };
  };

  this.storageavailable = new function() {
    this.click = function() {
      var z = $.jStorage.storageAvailable();
      output.output = z;
      $.mvcUpdate(output);
    };
  };

  this.reinit = new function() {
    this.click = function() {
      $.jStorage.reInit();
    };
  };


}; /* close class */
