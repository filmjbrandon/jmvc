<?php
require_once('functions.inc.php');

$tests[] = array('session_start','Session Start');
$tests[] = array('session_uuid','Session uuid');
$tests[] = array('session_id','Session id');
$tests[] = array('session_regenerate_id','Session Regenerate Id');
$tests[] = array('session_regenerate_id2','Session Regenerate Id With Clear');
$tests[] = array('session_destroy','Session Destroy');
$tests[] = array('session_read','Session Read');
$tests[] = array('session_read_all','Session Read All');
$tests[] = array('session_write','Session Write');
$tests[] = array('uid','uid');
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

