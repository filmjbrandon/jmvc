var controller_session_method_index = new function() {

  this.__construct = function() {
    $.log('controller_jmvc_tester_method_session_test init');
    $.session_start();
  };

  this.session_start = new function() {
    this.click = function() {
      var sid = $.session_start();
      $('#output').append('<p>Session Id '+sid+'</p>');
    };
  };

  this.session_uuid = new function() {
    this.click = function() {
      var uuid = $.session_uuid();
      $('#output').append('<p>User UUID '+uuid+'</p>');
    };
  };

  this.session_id = new function() {
    this.click = function() {
      var sid = $.session_id();
      $('#output').append('<p>Session Id '+sid+'</p>');
    };
  };

  this.session_regenerate_id = new function() {
    this.click = function() {
      var new_sid = $.session_regenerate_id()
      $('#output').append('<p>New Session Id '+new_sid+'</p>');
    };
  };

  this.session_regenerate_id2 = new function() {
    this.click = function() {
      var new_sid = $.session_regenerate_id(true)
      $('#output').append('<p>New Session Id '+new_sid+' Completely Deleted previous data</p>');
    };
  };

  this.session_destroy = new function() {
    this.click = function() {
      var bol = $.session_destroy();
      $('#output').append('<p>Destory Session '+bol+'</p>');
    };
  };

  this.session_read = new function() {
    this.click = function() {
      var my_name_is = $.session('my_name_is');
      $('#output').append('<p>Key my_name_is = '+my_name_is+'</p>');
    };
  };

  this.session_read_all = new function() {
    this.click = function() {
      var all = $.session();
      $('#output').append('<p>All: '+dump(all)+'</p>');
    };
  };

  this.session_writedm = new function() {
    this.click = function() {
      $.session('my_name_is','Donald Myers');
      var my_name_is = $.session('my_name_is');
      $('#output').append('<p>Key my_name_is = '+my_name_is+'</p>');
    };
  };

  this.session_writetm = new function() {
    this.click = function() {
      $.session('my_name_is','Tyson Myers');
      var my_name_is = $.session('my_name_is');
      $('#output').append('<p>Key my_name_is = '+my_name_is+'</p>');
    };
  };

  this.uid = new function() {
    this.click = function() {
      var uid = $.uid();
      $('#output').append('<p>Random Id '+uid+'</p>');
    };
  };

}; /* close class */

function dump(arr) {
  /* http://www.openjs.com/scripts/others/dump_function_php_print_r.php */
  var dumped_text = "";
  var level = 0;
  
  //The padding given at the beginning of the line.
  var level_padding = "";
  for(var j=0;j<level+1;j++) level_padding += "    ";

  if(typeof(arr) == 'object') { //Array/Hashes/Objects
    for(var item in arr) {
      var value = arr[item];

      if(typeof(value) == 'object') { //If it is an array,
        dumped_text += level_padding + "'" + item + "' ...\n";
        dumped_text += dump(value,level+1);
      } else {
        dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
      }
    }
  } else { //Stings/Chars/Numbers etc.
    dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
  }
  return dumped_text;
}
