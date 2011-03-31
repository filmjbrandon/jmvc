<?php
require_once('functions.inc.php');

$tests[] = array('FormHidden','Add Form Hidden');
$tests[] = array('Form2Json','Convert Form to Json');
$tests[] = array('FormValidate','Send Form to URL for Validate');
$tests[] = array('FormAction','Change Form Action');
$tests[] = array('fill_form','Fill the Form with Test Data');

echo show($tests,false);

<form id="formid" action="submit.php">
  
  <input type="text" name="text_input">
  <input type="checkbox" value="true" name="checkbox_input">
  <input type="radio" value="1" name="radio_input">
  <select name="select_input" size="1">
    <option value="one">first</option>
    <option value="two" selected>second</option>
    <option value="three">third</option>
  </select>
  <textarea name="textarea_input"></textarea>

</form>

  </body>
</html>

