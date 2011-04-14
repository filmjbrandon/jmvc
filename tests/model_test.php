<?php
require_once('../includes/functions.inc.php');

$tests[] = array('read_model','Read Model');
$tests[] = array('read_model2','Read Model with id');
$tests[] = array('read_model3','Read All with Name Contains Laurie');
$tests[] = array('insert_model','Insert Model');
$tests[] = array('update_model','Update Model');
$tests[] = array('update_model2','Update Many Models Andrew to Luke');
$tests[] = array('update_model3','Update Many Models Luke to Andrew');
$tests[] = array('delete_model','Delete Model');
$tests[] = array('model_exists','Model Exists');
$tests[] = array('form2model','Form 2 Model');

echo show($tests,false);
?>
    <form id="formid" action="submit.php" method="post">
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

