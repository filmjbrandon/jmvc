<?php
class rests_controller {

  function __construct() {}
  
  function index() {
    start_html();

    show_header();

    $tests[] = array('get');
    $tests[] = array('get_one');
    $tests[] = array('get_all');
    $tests[] = array('post');
    $tests[] = array('put');
    $tests[] = array('delete');
    $tests[] = array('upsert_record');
    $tests[] = array('delete_model');
        
    $form = '<form id="formid" action="model" method="post">
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

    show_left_block($tests,$form);
    show_right_block();
    
    show_footer();

    end_html();
  }
}