<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" media="screen" type="text/css" href="includes/style.css"/>
</head>
<body>
<?php
$no = array('index','functions.inc','create-controller-for-url');

$files = glob('tests/*.php');
foreach ($files as $file) {
  $bn = basename($file,'.php');
  if (!in_array($bn,$no))
    echo '<p><a href="tests/'.$bn.'">'.$bn.'</a></p>';
}
?>
</body>
</html>