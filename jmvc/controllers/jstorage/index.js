var controller_jstorage_method_index = new function() {

  this.__construct = function() {
    $.log('controller_jmvc_tester_method_storage_test init');
  }

  this.seta = new function() {
    this.click = function() {
      var x = $.jStorage.set('seta',123);
      writeDebug(x);
    };
  };

  this.setb = new function() {
    this.click = function() {
      var x = $.jStorage.set('setb','Donald');
      writeDebug(x);
    };
  };

  this.setc = new function() {
    this.click = function() {
      var x = $.jStorage.set('setc',true);
      writeDebug(x);
    };
  };

  this.get_seta = new function() {
    this.click = function() {
      var x = $.jStorage.get('seta');
      writeDebug(x);
    };
  };

  this.get_default = new function() {
    this.click = function() {
      var x = $.jStorage.get('setd','Tyson');
      writeDebug(x);
    };
  };

  this.deletekey = new function() {
    this.click = function() {
      var x = $.jStorage.deleteKey('seta');
      writeDebug(x);
    };
  };

  this.flush = new function() {
    this.click = function() {
      var x = $.jStorage.flush();
      writeDebug(x);
    };
  };

  this.storageobj = new function() {
    this.click = function() {
      var all = $.jStorage.storageObj();
      writeDebug(all);
    };
  };

  this.storagesize = new function() {
    this.click = function() {
      var size = $.jStorage.storageSize();
      writeDebug(size);
    };
  };

  this.index = new function() {
    this.click = function() {
      var ary = $.jStorage.index('seta');
      writeDebug(ary);
    };
  };

  this.storageavailable = new function() {
    this.click = function() {
      var bol = $.jStorage.storageAvailable();
      writeDebug(bol);
    };
  };

  this.reinit = new function() {
    this.click = function() {
      var x = $.jStorage.reInit();
      writeDebug(x);
    };
  };

}; /* close class */
