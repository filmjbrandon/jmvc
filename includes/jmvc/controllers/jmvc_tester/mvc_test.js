var controller_jmvc_tester_method_mvc_test = new function() {

  this.__construct = function() {
    $.log('controller_jmvc_tester_method_mvc_test init');
  }

  this.mvcController = new function() {
    this.click = function() {
      $.log('mvcController.click action');
    };
  };

  this.mvcController2 = new function() {
    this.click = function() {
      $.log('mvcController2.click action');
    };
  };

  this.mvcController3 = new function() {
    this.click = function() {
      $.log('mvcController3.click action');
    };
  };

  this.mvcController4 = new function() {
    this.click = function() {
      $.log('mvcController4.click action');
    };
  };

  this.change_event = new function() {
    this.click = function() {
      $.log('fire_action.click action');
    };
  };

  this.mvcView = new function() {
    this.click = function() {
      $.log('mvcView.click action');
    };
  };

  this.mvcUpdate = new function() {
    this.click = function() {
      $.log('mvcUpdate.click action');
    };
  };

  this.readall = new function() {
    this.click = function() {
      $.log('readall.click action');
    };
  };

  this.readone = new function() {
    this.click = function() {
      $.log('readone.click action');
    };
  };

  this.writeall = new function() {
    this.click = function() {
      $.log('writeall.click action');
    };
  };

  this.writeone = new function() {
    this.click = function() {
      $.log('writeone.click action');
    };
  };

  this.cleardata = new function() {
    this.click = function() {
      $.log('cleardata.click action');
    };
  };

  this.clearallevents = new function() {
    this.click = function() {
      $.log('clearallevents.click action');
      $("#bogus").mvcEvent({});
    };
  };

  this.getallevents = new function() {
    this.click = function() {
      $.log('getallevents.click action');
      var events = $("#bogus").mvcEvent();
      $.log(events);
    };
  };

  this.doeseventexist = new function() {
    this.click = function() {
      $.log('doeseventexist.click action');
      var bool = $("#bogus").mvcEvent('click');
      $.log(bool);
    };
  };

  this.clearevent = new function() {
    this.click = function() {
      $.log('clearevent.click action');
      $("#bogus").mvcEvent('click',{});
    };
  };

  this.seteventandfunciton = new function() {
    this.click = function() {
      $.log('seteventandfunciton.click action');
      var func = function() { alert("hello"); };
      $("#bogus").mvcEvent('click',func);
    };
  };

  this.mvcAjax = new function() {
    this.click = function() {
      $.log('mvcAjax.click action');
    };
  };

  this.execstring = new function() {
    this.click = function() {
      $.log('execstring.click action');
    };
  };

  this.execfunction = new function() {
    this.click = function() {
      $.log('execfunction.click action');
    };
  };

  this.redirect = new function() {
    this.click = function() {
      $.log('redirect.click action');
    };
  };

  this.exists = new function() {
    this.click = function() {
      $.log('exists.click action');
    };
  };

  this.testjsonpost = new function() {
    this.click = function() {
      $.log('testjsonpost.click action');
    };
  };

  this.add_multi_clicks = new function() {
    this.click = function() {
      $.log('add_multi_clicks.click action');
    };
  };

  this.output = new function() {
    this.click = function() {
      $.log('output.click action');
    };
  };

}; /* close class */
