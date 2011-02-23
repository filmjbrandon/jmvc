var controller_jmvc_tester_method_mvc_test = new function() {

  this.__construct = function() {
    $.log('controller_jmvc_tester_method_mvc_test init');
  }

  this.mvcController = new function() {
    this.click = function() {
      var d = $("#action2").mvcData('new_value',"dog");
      console.log(d);
      var d = $("#action2").mvcData();
      console.log(d);
    };
    this.mouseover = function() {
      console.log(mvc.event,mvc.data);
    }
  };

  this.mvcController2 = new function() {
    this.click = function() {
      var d = $("#action2").mvcData("not_set");
      console.log(d);
    };
  };

  this.mvcController3 = new function() {
    this.click = function() {
      var d = $("#action3").mvcData();
      console.log(d);
    };
  };

  this.mvcController4 = new function() {
    this.click = function() {
      var d = $("#action4").mvcEvent({});
      console.log(d);
    };
  };

  this.fire_action = new function() {
    this.click = function() {
      var d = $("#action5").mvcEvent();
      console.log(d);
    };
  };

  this.action6 = new function() {
    this.click = function() {
      var d = $("#action6").mvcEvent("click");
      console.log(d);
    };
  };

  this.action7 = new function() {
    this.click = function() {
      var d = $("#action7").mvcEvent("lips");
      console.log(d);
    };
  };

  this.action8 = new function() {
    this.click = function() {
      var newfunc = function() { alert('new funciton') };
      var d = $("#action8").mvcEvent("click",newfunc);
      console.log(d);
    };
  };

  this.action9 = new function() {
    this.click = function() {
      var newfunc = "some_other_function()";
      var d = $("#action9").mvcEvent("click",newfunc);
      console.log(d);
    };
  };

  this.action10 = new function() {
    this.click = function() {
      var d = $("#action9").mvcEvent("click",{});
      console.log(d);
    };
  };

  this.action11 = new function() {
    this.click = function() {
      var d = $("#action9").mvcEvent("click");
      console.log(d);
    };
  };


}; /* close class */

function some_other_function() {
  alert("some other function");
}
