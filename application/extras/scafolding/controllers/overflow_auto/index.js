/* overflow_auto index */
var controller_overflow_auto_method_index = new function() {

  this.__construct = function() {
    $.log('controller_overflow_auto_method_index init');
  }

/*
  Additional Actions
  click, focus, blur, change, select, submit
  dblclick, hover, focusin, focusout
  mousedown, mouseenter, mouseleave, mouseleave, mousemove, mouseout, mouseover, mouseup
*/
  this.application_window = new function() {
    this.click = function() {
      $.log('application_window.click action');
    };
  };

  this.id_menu_bar = new function() {
    this.click = function() {
      $.log('id_menu_bar.click action');
    };
  };

  this.sortable_template_groups = new function() {
    this.click = function() {
      $.log('sortable_template_groups.click action');
    };
  };

  this.id_note_title = new function() {
    this.click = function() {
      $.log('id_note_title.click action');
    };
  };

  this.id_note_tags = new function() {
    this.click = function() {
      $.log('id_note_tags.click action');
    };
  };

  this.id_note = new function() {
    this.click = function() {
      $.log('id_note.click action');
    };
  };

  this.btn_new = new function() {
    this.click = function() {
      $.log('btn_new.click action');
    };
  };

  this.btn_save = new function() {
    this.click = function() {
      $.log('btn_save.click action');
    };
  };

  this.btn_delete = new function() {
    this.click = function() {
      $.log('btn_delete.click action');
    };
  };

  this.action = new function() {
    this.click = function() {
      $.log('action.click action');
    };
  };

}; /* close class */
