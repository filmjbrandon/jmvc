models = {};

function model(name,file) {
  this.model_name = name;
  this.model_filename = (!file) ? name : file;
  this.model_primary = 'undefined';
  this.model_id = 'undefined';
  
  this.load = function() {
    /* make a copy and remove the methods - they don't travel well */
    var temp = this;
    temp.remove = temp.save = temp.load = '';
    var serverjson = jQuery.mvcAjax('models/' + this.model_filename,{'model_action':'load','name':temp});
    jQuery.extend(this,serverjson);
  };
  
  this.save = function() {
    alert( this.name + "s say meeow!" );
  };
  
  this.remove = function() {
    alert( this.name + "r say meeow!" );
  };
};
