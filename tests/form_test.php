<?php
require_once('../includes/functions.inc.php');

$tests[] = array('FormHidden','Add Form Hidden');
$tests[] = array('FormChangeHidden','Form Change Hidden');
$tests[] = array('Form2Json','Convert Form to Json');
$tests[] = array('FormValidateFail','Send Form to URL for Validate always Fail');
$tests[] = array('FormValidatePass','Send Form to URL for Validate always Pass');
$tests[] = array('FormValidateFailExtra','Send Form to URL for Validate always Fail with extra Payload');
$tests[] = array('FormAction','Change Form Action');
$tests[] = array('fill_form','Fill the Form with Test Data');

echo show($tests,false);
?>
    <form id="formid" action="submit.php">
      <p>Name: <input type="text" name="text_input"></p>
      <p>Red: <input type="checkbox" value="red" name="checkbox_input1"></p>
      <p>Green: <input type="checkbox" value="green" name="checkbox_input2"></p>
      <p>Blue: <input type="checkbox" value="blue" name="checkbox_input3"></p>
      <p><input type="radio" value="1" name="radio_input"></p>
      <p><input type="radio" value="2" name="radio_input"></p>
      <p><input type="radio" value="3" name="radio_input"></p>
      <p>Select: 
      <select name="select_input" size="1">
        <option value="first">first</option>
        <option value="second" selected>second</option>
        <option value="third">third</option>
      </select>
      </p>
      <p>Textarea: <textarea name="textarea_input"></textarea></p>
    </form>

  </body>
</html>

