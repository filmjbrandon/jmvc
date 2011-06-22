<?php
class form_controller {

  function __construct() {}
  
  function index() {
    start_html();

    $tests[] = array('FormHidden','Add Form Hidden');
    $tests[] = array('FormChangeHidden','Form Change Hidden');
    $tests[] = array('Form2Json','Convert Form to Json');
    $tests[] = array('FormValidate','Validate Form Default Options Random Output');
    $tests[] = array('FormValidateExtra','Validate Form Misc Options Random Output');
    $tests[] = array('FormAction','Change Form Action');
    $tests[] = array('fill_form','Fill the Form with Test Data');
    
    echo show($tests);

    echo '<form id="formid" action="form" method="post">
      <p>Name: <input type="text" name="text_input"></p>
      <p><input type="checkbox" value="red" name="checkbox_input1"> Red</p>
      <p><input type="checkbox" value="green" name="checkbox_input2"> Blue</p>
      <p><input type="checkbox" value="blue" name="checkbox_input3"> Green</p>
      <p><input type="radio" value="1" name="radio_input"> True</p>
      <p><input type="radio" value="2" name="radio_input"> False</p>
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

