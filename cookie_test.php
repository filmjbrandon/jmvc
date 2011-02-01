<?php
require_once('functions.inc.php');

$tests[] = array('writecookie','Write to Cookie');
$tests[] = array('readcookie','Read to Cookie');
$tests[] = array('deletecookie','Delete Cookie');
$tests[] = array('writelongterm','Write Long Term');
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

