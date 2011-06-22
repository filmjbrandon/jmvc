<?php
class model_controller {

  function __construct() {}
  
  function index() {
    start_html();

    $tests[] = array('read_model','Read Model');
    $tests[] = array('read_model2','Read Model with id');
    $tests[] = array('read_model3','Read All with Name Contains Luke');
    $tests[] = array('insert_model','Insert Model');
    $tests[] = array('update_model','Update Model');
    $tests[] = array('update_model2','Update Many Models Andrew to Luke');
    $tests[] = array('update_model3','Update Many Models Luke to Andrew');
    $tests[] = array('delete_model','Delete Model');
    $tests[] = array('model_exists','Model Exists');
    $tests[] = array('form2model','Form 2 Model');
    $tests[] = array('displaymodel','Display What\'s in the current model');
    $tests[] = array('dosomeotheraction','Send jump Action (make all values "jump")');
    $tests[] = array('read_models','Read All with Name Contains Luke and make a list');
    
    echo show($tests,false);
    
    echo '<form id="formid" action="model" method="post">
          <p>Name: <input type="text" name="text_input"></p>
          <p><input type="checkbox" value="red" name="checkbox_input1"> Red</p>
          <p><input type="checkbox" value="green" name="checkbox_input2"> Green</p>
          <p><input type="checkbox" value="blue" name="checkbox_input3"> Blue</p>
          <p><input type="radio" value="1" name="radio_input"> Yes</p>
          <p><input type="radio" value="2" name="radio_input"> No</p>
          <p><input type="radio" value="3" name="radio_input"> Maybe</p>
          <p>Select: 
          <select name="select_input" size="1">
            <option value="first">first</option>
            <option value="second" selected>second</option>
            <option value="third">third</option>
          </select>
          </p>
          <p>Textarea: <textarea name="textarea_input"></textarea></p>
          <p><input type="submit"></p>
        </form>';
    
    end_html();
  }
}