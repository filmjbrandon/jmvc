<?php
$path = 'http://localhost/jmvc/';
$search_path = '/Volumes/Data/MAMP/htdocs/jmvc';
?>
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title> </title>
  <script type="text/javascript" src="jquery/jquery-1.7.1.min.js"></script>
  <script type="text/javascript" src="jmvc/jquery.mvcboot.js"></script>
  <script type="text/javascript" src="jmvc/includes/jquery.mvc.js"></script>
  <script>var mvc = (mvc) || {};</script>
<?php globr($search_path,'.js'); ?>
</head>
  <body>
		<p>Finished</p>
  </body>
</html>
<?php
function globr($searchDirectory,$searchPattern) { 
	global $path, $search_path;

	foreach (glob(escapeshellcmd($searchDirectory).'/*') as $folderitem) {
		if (is_dir($folderitem)) {
			globr($folderitem,$searchPattern);
		} elseif (substr($folderitem,-strlen($searchPattern)) == $searchPattern) {
			echo '<script type="text/javascript" src="'.$path.str_replace($search_path.'/','',$folderitem).'"></script>';
		}
	}
}
