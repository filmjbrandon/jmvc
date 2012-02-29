var controller_index_method_index = new function() {

  this.__construct = function() {
    $.log('controller_index_method_index init');
  };

  this.mvcClick = new function() {
    this.click = function() {
			alert('mvcClick');
    };
  };

  this.mvcController1 = new function() {
    this.click = function() {
      /* load controller by name */
      var x = $.mvcController('mvc/index');
      writeDebug(x);
    };
  };

  this.mvcController2 = new function() {
    this.click = function() {
      /* load controller by name then run function */
      var x = $.mvcController('mycontroller',function() { writeDebug("click"); });
      writeDebug(x);
    };
  };

  this.mvcController3 = new function() {
    this.click = function() {
      /* load default controller then run function */
      var x = $.mvcController(function() { writeDebug("click"); });
      writeDebug(x);
    };
  };

  this.change_event1 = new function() {
    this.click = function() {
      var x = $("#change_event3").mvcAction('click',function() { writeDebug("click"); });
      writeDebug(x);
    };
  };

  this.change_event2 = new function() {
    this.click = function() {
      var x = $("#change_event3").mvcAction('click',function() {
          writeDebug('click magic = ' + $(mvc.event).mvcData('magic'));
        },{'magic':123});
      writeDebug(x);
    };
  };

  this.mvcView = new function() {
    this.click = function() {
      /* load view with auto update */
      var x = $.mvcView('view_name',{},true);
      writeDebug(x);
      
    };
  };

  this.mvcUpdate = new function() {
    this.click = function() {
      json = {'output':'Donald Myers','bogus':123};
      $.mvcMerge(json);
    };
  };

  this.readall = new function() {
    this.click = function() {
      var rec = $("#data_element").mvcData();
      $("#output").html('name ' + rec.name + ' age ' + rec.age);
    };
  };

  this.readone = new function() {
    this.click = function() {
      $("#output").html($("#data_element").mvcData('name'));
    };
  };

  this.writeall = new function() {
    this.click = function() {
      $("#data_element").mvcData({'name':'Tyson Docks','age':47});
      $("#output").html('Wrote new name and age to element try read all to view them');
    };
  };

  this.writeone = new function() {
    this.click = function() {
      $("#data_element").mvcData('name','Peter Gunn');
      $("#output").html('Wrote new name to element try read all to view them');
    };
  };

  this.cleardata = new function() {
    this.click = function() {
      $("#data_element").mvcData({});
      $("#output").html('Cleared data on element try read all to view them');
    };
  };

  this.getallevents = new function() {
    this.click = function() {
      var events = $("#mvcClick").mvcEvent();
      $("#output").html('Javascript Array Returned See Console');
      $.log(events);
    };
  };

  this.doeseventexist = new function() {
    this.click = function() {
      var bol = $("#mvcClick").mvcEvent('click');
      if (bol) {
        $("#output").html('Yes click event exists on mvcClick id');
      } else {
        $("#output").html('No the click event don\'t exist on mvcClick id');
      }
   };
  };

  this.clearevent = new function() {
    this.click = function() {
      $("#mvcClick").mvcEvent('click',{});
      $("#output").html('Cleared Event Click - Try button 1 at top again');
    };
  };

  this.clearevents = new function() {
    this.click = function() {
      $("#mvcClick").mvcEvent({});
      $("#output").html('Cleared all Events - Try button 1 at top again');
    };
  };

  this.seteventandfunciton = new function() {
    this.click = function() {
      var func = function() { alert("Attached a new event"); };
      $("#mvcClick").mvcEvent('mouseover',func);
    };
  };

  this.mvcAjaxGETwd = new function() {
    this.click = function() {
    	var d = {name: "Don", age: 41};
      var json = $.mvcAjax({url: "rest", data: d, method: 'get'});
      $("#output").html('name ' + json.name + ' age ' + json.age);
    };
  };

  this.mvcAjaxGETnd = new function() {
    this.click = function() {
      var json = $.mvcAjax({url: "rest", method: 'get'});
      $("#output").html('name ' + json.name + ' age ' + json.age);
    };
  };

  this.mvcAjaxPOST = new function() {
    this.click = function() {
    	var d = {name: "Don", age: 41};
      var json = $.mvcAjax({url: "rest", data: d, method: 'post'});
      $("#output").html('name ' + json.name + ' age ' + json.age);
    };
  };

  this.mvcAjaxPUT = new function() {
    this.click = function() {
    	var d = {name: "Don", age: 41};
      var json = $.mvcAjax({url: "rest", data: d, method: 'put'});
      $("#output").html('name ' + json.name + ' age ' + json.age);
    };
  };

  this.mvcAjaxDELETE = new function() {
    this.click = function() {
    	var d = {name: "Don", age: 41};
      var json = $.mvcAjax({url: "rest", data: d, method: 'delete'});
      $("#output").html('name ' + json.name + ' age ' + json.age);
    };
  };

  this.execstring = new function() {
    this.click = function() {
      $.exec('alert("Function From String");');
    };
  };

  this.execfunction = new function() {
    this.click = function() {
      var func = function() { alert("real live javascript function"); }
      $.exec(func);
    };
  };

  this.redirect = new function() {
    this.click = function() {
      $.redirect("http://www.apple.com");
    };
  };

  this.exists = new function() {
    this.click = function() {
      var bol = $("#output").exists();
      
      if (bol) {
        $("#output").html('Yes output id exists');
      } else {
        $("#output").html('No output id doesn\'t exist');
      }

      var bol = $("#not_really_here").exists();
      
      if (bol) {
        $("#output").append(' also not_really_here id exists');
      } else {
        $("#output").append(' also not_really_here id doesn\'t exist');
      }
        
    };
  };

}; /* close class */
