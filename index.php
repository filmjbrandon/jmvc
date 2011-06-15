<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" media="screen" type="text/css" href="includes/style.css"/>
</head>
<body>
<?php
$files = glob('tests/*.php');
foreach ($files as $file) {
  $bn = basename($file,'.php');
  echo '<p><a href="tests/'.$bn.'">'.$bn.'</a></p>';
}
?>
</body>
</html>