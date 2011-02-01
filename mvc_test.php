<?php
  require_once('functions.inc.php');
  
  $tests[] = array('mvcController','Get this Controller');
  $tests[] = array('mvcController2','Get a Controller Named my_controller');
  $tests[] = array('mvcController3','Get this Controller when finished run function');
  $tests[] = array('mvcController4','Get a Controller Named my_controller when finished run function');

  $tests[] = array('fire_action','Manually attach a action');

  $tests[] = array('mvcView','Load a View');
  $tests[] = array('mvcUpdate','Refresh the screen (Update)');

  $tests[] = array('readall','Read Everything from MVC Element');
  $tests[] = array('readone','Read Single property from MVC Element');
  $tests[] = array('writeall','Write a entire Object to MVC Element');
  $tests[] = array('writeone','Write one Object to a MVC Element');
  $tests[] = array('cleardata','Clear  -Write a Empty Element to a MVC Element');

  $tests[] = array('clearallevents','Clear All Events');
  $tests[] = array('getallevents','Get All Events');
  $tests[] = array('doeseventexist','Does a Event Exist');
  $tests[] = array('clearevent','Clear a Event Function');
  $tests[] = array('seteventandfunciton','Set a Event and Function');

  $tests[] = array('mvcAjax','Making Blocking Ajax Call');

  $tests[] = array('execstring','Execute a function by string');
  $tests[] = array('execfunction','Execute a function by function');

  $tests[] = array('redirect','Client Side redirect');

  $tests[] = array('exists','does a element exists by id');
  $tests[] = array('testjsonpost','Post JSON via post');
?>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>Title Here</title>
    <link rel="shortcut icon" href="assets/img/favicon.ico" type="image/x-icon"/>

    <script type="text/javascript" src="includes/js/jquery-1.5.min.js"></script>
    <script type="text/javascript" src="includes/js/jquery.mvcboot.js"></script>

    <script language="Javascript" type="text/javascript">
    $(document).ready(function(){
      $.mvc();
    });
    </script>
  </head>
  <body>
<?php echo show($tests); ?>
  </body>
</html>
