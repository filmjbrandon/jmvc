var controller_jstorage_method_index = new function() {

  this.__construct = function() {
    $.log('controller_jmvc_tester_method_storage_test init');
  }

  this.seta = new function() {
    this.click = function() {
      $.jStorage.set('seta',123);
      $('#output').append('<p>Set Persistant Storage Key seta to 123</p>');
    };
  };

  this.setb = new function() {
    this.click = function() {
      $.jStorage.set('setb','Donald');
      $('#output').append('<p>Set Persistant Storage Key setb to Donald</p>');
    };
  };

  this.setc = new function() {
    this.click = function() {
      $.jStorage.set('setc',true);
      $('#output').append('<p>Set Persistant Storage Key setc to true</p>');
    };
  };

  this.get_seta = new function() {
    this.click = function() {
      var seta = $.jStorage.get('seta');
      data.bogus = seta;
      $.mvcUpdate(data);
      $('#output').append('<p>Get Key named seta and display</p>');
    };
  };

  this.get_default = new function() {
    this.click = function() {
      var setd = $.jStorage.get('setd','Tyson');
      data.bogus = setd;
      $.mvcUpdate(data);
      $('#output').append('<p>Get Key named setd (empty) and display with Tyson default</p>');
    };
  };

  this.deletekey = new function() {
    this.click = function() {
      $.jStorage.deleteKey('seta');
      $('#output').append('<p>Deleted Key seta</p>');
    };
  };

  this.flush = new function() {
    this.click = function() {
      $.jStorage.flush();
      $('#output').append('<p>Flushed Everything</p>');
    };
  };

  this.storageobj = new function() {
    this.click = function() {
      var all = $.jStorage.storageObj();
      $.log(all.seta);
      $('#output').append('<p>Got all Keys as Read Only Object</p>');
      $('#output').append('<p>seta ' + all.seta + ' setb ' + all.setb + ' setc ' + all.setc + '</p>');
    };
  };

  this.storagesize = new function() {
    this.click = function() {
      var size = $.jStorage.storageSize();
      $('#output').append('<p>Display size ' + size + 'b</p>');
    };
  };

  this.index = new function() {
    this.click = function() {
      var ary = $.jStorage.index('seta');
      $('#output').append('<p>Keys: ' + ary + '</p>');
    };
  };

  this.storageavailable = new function() {
    this.click = function() {
      var bol = $.jStorage.storageAvailable();
      $('#output').append('<p>Is jStorage Supported ' + bol + '</p>');
    };
  };

  this.reinit = new function() {
    this.click = function() {
      $.jStorage.reInit();
      $('#output').append('<p>Reloaded from Storage</p>');
    };
  };

}; /* close class */
