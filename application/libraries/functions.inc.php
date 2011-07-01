<?php

function start_html() {
  echo '<!DOCTYPE html>
  <html>
  <head>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <script type="text/javascript" src="jmvc/jquery.mvcboot.js"></script>
    <style type="text/css">
    p {padding: 0px; margin: 0px; font-size: 13px; line-height: 15px;}
    #output {
      font-size: 10px;
      margin-bottom: 1px;
      margin-top: 1px;
      padding: 4px;
      border-color: #9c6d6d;
      border-width: 1px;
      border-style: solid;
    }
    
    #bogus {
      font-size: 10px;
      margin-bottom: 1px;
      margin-top: 1px;
      border-color: #6b939b;
      padding: 4px;
      border-style: solid;
      border-width: 1px;
    }
    
    .button {
      font-size: 13px;
      height: 24px;
      line-height: 24px;
      margin-bottom: 1px;
      margin-top: 1px;
      padding: 4px;
      background-color: #c6d7e0;
    }
    
    .button:hover {
      background-color: #f0f5f7;
    }
    
    .column1{ height: 24px; float: left; width: 50%;}
    .column2{ height: 24px; float: left; width: 50%;}
    .mytr{ height: 24px; }
    
    a { 
      text-shadow: 0px 2px 2px #cecfce; 
      padding-left: 22px; 
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAk1JREFUeNqEU01oE0EUfjO7m92ELWIRSsVcqgh6kygexJuEnDyJGg8RL6KH3FpUBD1ITzl4VXuoCikEPPRQLYKIEGoLtuRkEDEqlSLFkqQkukl2N+M3s5sYQ8QHH2/n7Xvf+5k37PUVnaQwBkALCgTf16AOAhXYHoQ2JdKn4xEln7jEaUhY6CEEHTp94+m01PLMaLTwUUZZTVcQ911XafavaIg+8H0diab6zJz8L28KSsOeG4pbAEqKwPX7xiMnMrNZjgimacRDxE+enea6Tgo4y3+vZjMmSDXErPOWJyiE1XIcqtVqVAd2geeLi9SAbgI/QzhA8k4+2/bEVVUBw3g0TKLRFjHdMPpZNOBMKkW97FpYgW6aVLh1KY+5zCsCE1OI6HSs6pDxbu0t/U8215dfGBo9tCNsVRGgl+O408zFe4/Pu2jB63TIlWi31beHm5DwPY8Y5qN/flmpOqJohePnspfk3YVsp9kkHwFd31dLIIe5vLREBtqKoGzTssi2bTWrmBFctSJoeTRfuJnOm2NjZESjFAlhAufSabKge5BkjksxQOpgD5BstdkR+txMZu9gr9vN7sTk4UTi+8eNjQmbb/fs6H9T50OLhF0o/nJF8Y8To6lxXjiaSCTKO6VKvUUXXD94JTHc2l8Ez8rYAVfQhx2iT9XAaeYUo6hO1oF4nEoeWd92sYorYuApBXJZEbzv9s5ys2yZJLfSZfdTzNYwSLRnI3h/6OMADcAb9RZkYXuAffI9lX+IrUe522tf67SF82ToUwtJ+gS/BRgAqRj2gYVDgaEAAAAASUVORK5CYII=); 
      background-repeat: no-repeat; 
      text-decoration: none; 
      font-weight: bold; 
      color: #495d75; 
    }
    
    a:hover{ text-decoration: underline; }
    </style>
  </head>
  <body>';
}

function end_html() {
  echo '</body></html>';
}

function show($tests) {
  $super = get_super();
  echo '<div><a href="'.$super->path.'">Home</a></div><div>JMVC - File:'.basename($_SERVER['PHP_SELF']).' - No Cache:'.mt_rand(1,9999).'</div>';

  foreach ($tests as $test) {
    $data = (isset($test[2])) ? ' data-mvc=\''.json_encode($test[2]).'\'' : '';
    echo '<div class="button" id="'.$test[0].$data.'">';
    echo '<div class="column1">Test Named '.$test[1].'</div>';
    echo '<div class="column2">Action Named '.$test[0].'</div>';
    echo '</div>'.chr(10);
  }
  
  echo '<div id="output"></div><div id="bogus"></div>';
  
  if (isset($_POST))
    echo '<pre>'.print_r($_POST,true).'</pre>';
}

function die_hard($why) {
  die('<pre>Die Hard: '.$why.'</pre>');
}

function &get_super() {
  global $controller_obj;
  return $controller_obj;
}
