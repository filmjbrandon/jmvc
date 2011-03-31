<?php
$no = array('index','functions.inc');

$files = glob('*.php');
foreach ($files as $file) {
  $bn = basename($file,'.php');
  if (!in_array($bn,$no))
    echo '<p><a href="'.$bn.'">'.$bn.'</a></p>';
}
