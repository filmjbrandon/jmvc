var controller_rests_method_index = new function() {

  this.__construct = function() {
    $.log('controller_rest_method_index init');
  };

  this.read_all_tables = new function() {
    this.click = function() {
			var t = $.mvcREST(mvc.path + 'rest_server/.json','GET');
			$.log(t);
			
    };
  };

}; /* close class */

function obj2string(obj) {
  var str = '\n';
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (typeof(obj[prop]) === 'object') {
        str += prop + '->' + obj2string(obj[prop]);
      } else {
        str += prop + '->' + obj[prop] + '\n';
      }
    }
  }
  return str;
}
