var controller_model_method_index = new function() {

  this.__construct = function() {
    $.log('controller_jmvc_tester_method_model_test init');
    models.person = new model('people');
    $('#output').append('<p>Created Person Model models.person</p>');
  };

  this.read_model = new function() {
    this.click = function() {
      models.person._load('name = "don"');
      show(models.person);
    };
  };

  this.read_model2 = new function() {
    this.click = function() {
      models.person._load(14);
      show(models.person);
    };
  };

  this.read_model3 = new function() {
    this.click = function() {
      models.person._load('name like %Luke%');
      show(models.person);
      show(models.person._records[0]);
    };
  };

  this.insert_model = new function() {
    this.click = function() {
      models.person = new model('people');
      models.person.name = 'Tyson' + Math.floor(Math.random()*11);
      models.person.age = Math.floor(Math.random()*100);
      models.person._save();
      show(models.person);
    };
  };

  this.update_model = new function() {
    this.click = function() {
      models.person.name = 'Andrew';
      models.person._save();
      show(models.person);
    };
  };

  this.update_model2 = new function() {
    this.click = function() {
      models.person = new model('people');
      models.person.name = 'Luke';
      models.person._save('name = Andrew');
      show(models.person);
    };
  };

  this.update_model3 = new function() {
    this.click = function() {
      models.person = new model('people');
      models.person.name = 'Andrew';
      models.person._save('name = Luke');
      show(models.person);
    };
  };

  this.delete_model = new function() {
    this.click = function() {
      models.person._remove();
      show(models.person);
    };
  };

  this.model_exists = new function() {
    this.click = function() {
      $('#output').append('<p>'+mvc.modelExists('person')+'</p>');
    };
  };

  this.form2model = new function() {
    this.click = function() {
      $('#formid').mvcForm2Model('myform');
      show(models.myform);
    };
  };
  
  this.displaymodel = new function() {
    this.click = function() {
      show(models.person);
    };
  };
  
  this.dosomeotheraction = new function() {
    this.click = function() {
      models.person._action('jump');
      show(models.person);
    };
  };
  
  this.read_models = new function() {
    this.click = function() {
      models.person._load('name like %Luke%');
      $.log(models.person);
      for(var idx in models.person._records) {
        var per = models.person._records[idx];
        $('#output').before('<div id="person' + per.id + '" data-mvc=\'{"primary":' + per.id + '}\' class="pickme">ID ' + per.id + ' Name ' + per.name + '  Age ' + per.age + '</div>');
      }
    };
  };

  this.pickme = new function() {
    this.click = function() {
      var primary = $(mvc.event).mvcData("primary");
      $('#output').append('<p>' + primary + '</p>');
    }
  }

}; /* close class */

/* php.js */
function print_r(j){var k='',pad_char=' ',pad_val=4,d=this.window.document,getFuncName=function(a){var b=(/\W*function\s+([\w\$]+)\s*\(/).exec(a);if(!b){return'(Anonymous)'}return b[1]},repeat_char=function(a,b){var c='';for(var i=0;i<a;i++){c+=b}return c},formatArray=function(a,b,c,d){if(b>0){b++}var e=repeat_char(c*b,d);var f=repeat_char(c*(b+1),d);var g='';if(typeof a==='object'&&a!==null&&a.constructor&&getFuncName(a.constructor)!=='PHPJS_Resource'){g+='Array\n'+e+'(\n';for(var h in a){if(Object.prototype.toString.call(a[h])==='[object Array]'){g+=f+'['+h+'] => '+formatArray(a[h],b+1,c,d)}else{g+=f+'['+h+'] => '+a[h]+'\n'}}g+=e+')\n'}else if(a===null||a===undefined){g=''}else{g=a.toString()}return g};return formatArray(j,0,pad_val,pad_char)}

function show(m) {
  $('#output').append('<p><pre>'+print_r(m)+'</pre></p>');
  $.log(m);
}
