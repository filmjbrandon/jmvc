<?php
require_once('functions.inc.php');

$tests[] = array('seta','Set Value A');
$tests[] = array('setb','Set Value B');
$tests[] = array('setc','Set Value C');
$tests[] = array('get','Get Value');
$tests[] = array('get_default','Get With Default');
$tests[] = array('deletekey','Delete Key');
$tests[] = array('flush','Flush');
$tests[] = array('storageobj','Get Storage as RO Object');
$tests[] = array('storagesize','Storage Size');
$tests[] = array('index','Returns the used keys as an array');
$tests[] = array('storageavailable','Is Storage Available');
$tests[] = array('reinit','Reloads the data from browser storage');
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

