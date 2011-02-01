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
    <h2>The American College Form Handler 3 Tester</h2>

    <div id="action1">action 1</div>
    <div id="action2" data-mvc='{"name":"Laurie Myers","age":21}'>action 2</div>
    <div id="action3" data-mvc='{"name":"Don Myers","age":40}'>action 3</div>

<?php
  for ($idx = 4;$idx <= 20;$idx++) {
    echo '<div id="action'.$idx.'">action '.$idx.'</div>';
  }
?>
    
    <div id="output"></div>

  </body>
</html>
