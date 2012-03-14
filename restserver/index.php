<?php
dbconnect();

$method = strtolower($_SERVER['REQUEST_METHOD']);

if (!in_array($method,array('get','post','delete'))) {
	methodNotAllowed('GET, POST, DELETE');
}

$uri = urldecode($_SERVER["REQUEST_URI"]);
$segs = explode('/',trim($uri,'/'));

// shift off the beginning
$parts = 3;
for ($p = 1;$p <= ($parts - 1);$p++) array_shift($segs);

$tables = show_tables();

if (count($segs) < 1 && $method == 'get') {
	output($tables);
} elseif (count($segs) < 1) {
	notAcceptable('no table specified');
}

$table = $segs[0];
$tables = show_tables();

if (array_search($table,$tables) === false) {
	notAcceptable('table name fail');
}

$dtable = describe_table($table);
$primary_key = get_primary($dtable);

// Shift off the Table
array_shift($segs);

$segc = count($segs);

call_user_func('rest_'.$method);

function rest_get() {
	global $segs, $segc, $table, $primary_key;
	$calc_ary = array('eq'=>'=','lt'=>'<','gt'=>'>','lk'=>'like');
	$dir_ary = array('a'=>'asc','d'=>'desc');
	
	$sql = "select * from `".$table."`";
	
	$arg = 0;
	$where = '';
	// single id
	if ($segc == 1) {
		if (@$segs[$arg] == 'key') {
			$data['_key'] = $primary_key;
			output($data);
		}
		$where = "`".$primary_key."` = '".mysql_real_escape_string($segs[$arg++])."'";
	} elseif ($segc > 1) {
		// bunch of argments
		// where + 3 = column + lt,gt,eq,like + value
		// orderby + 2 = column + a,d
		while ($arg <= $segc) {
			if (@$segs[$arg++] == 'search') {
				// where
				$field = $segs[$arg++];
				$calc = $calc_ary[$segs[$arg++]];
				$val = $segs[$arg++];
				
				$where .= ' '.$field.' '.$calc." '".(($calc == 'like') ? '%' : '').mysql_real_escape_string($val).(($calc == 'like') ? '%' : '')."'";
			}
			if (@$segs[$arg++] == 'sort') {
				// sort order by
				$field = $segs[$arg++];
				$dir = $dir_ary[$segs[$arg++]];
				
				$where .= ' order by '.$field.' '.$dir;
			}
		}
	}
	
	if (!empty($where))
		$sql .= ' where '.$where;
	
	$result = safe_query($sql);
	
	$rows = array();
	$idx = 0;
	while ($row = mysql_fetch_assoc($result)) {
		if (!$idx++) $data = $row;
		 
		$data['_records'][] = $row;
	}
	
	$data['_rows_affected'] = mysql_affected_rows();
	$data['_internal_id'] = -1;
	$data['_key'] = $primary_key;
	
	output($data);
}

function rest_post() {
	global $segs, $segc, $table, $primary_key;
	
	// validate here
	
	$data = array();
	
	$mode = 'insert';
	if (!empty($segs[0]))	$mode = 'update';

	$sql_columns = array();
	foreach ($_POST as $key => $value) {
		$sql_columns[] = "`".mysql_real_escape_string($key)."` = '".mysql_real_escape_string($value)."'"; 
		$data[$key] = $value;
	}
	
	$sql = $mode.' '.$table.' set '.implode(', ',$sql_columns);
	
	if ($mode == 'update') {
		$primary = $segs[0];
		$sql .= " where ".$primary_key." = '".mysql_real_escape_string($primary)."'";
	}
	
	safe_query($sql);
	
	$data['_records'][] = $data;
	$data['_rows_affected'] = mysql_affected_rows();
	
	if ($mode == 'insert') {
		$data['_internal_id'] = mysql_insert_id();
		if ($data['_internal_id'] == 0) {
			$data['_internal_id'] = $_POST[$primary_key];
		}
	} else {
		$data['_internal_id'] = $primary;
	}

	output($data);
}

function rest_delete() {
	global $segs, $segc, $table, $primary_key;
	$data = array();
	
	foreach ($segs as $id) {
		$id = trim($id);
		$sql = "delete from `".$table."` where ".$primary_key."= '".mysql_real_escape_string($id)."'";
		//$result = safe_query($sql);
		
		$data['_records'] = array();
		$data['_rows_affected'] = mysql_affected_rows();
		$data['_internal_id'] = -1;
		
		output($data);
	}
}

function show_tables() {
	$result = safe_query("SHOW TABLES");

	if (mysql_num_rows($result) > 0) {
		while ($row = mysql_fetch_array($result)) {
			$rtn[] = $row[0];
		}
	}
	return $rtn;
}

function describe_table($table) {
	$result = safe_query("SHOW COLUMNS FROM `".$table."`");

	if (mysql_num_rows($result) > 0) {
		while ($row = mysql_fetch_assoc($result)) {
			$rtn[] = $row;
		}
	}
	return $rtn;
}

function get_primary($table_ary) {
	foreach ($table_ary as $column) {
		if ($column['Key'] == 'PRI') return $column['Field'];
	}
}

function safe_query($query) {
  if (empty($query)) return FALSE;
  $result = @mysql_query($query);
  if (mysql_errno() > 0) badRequest(mysql_errno(),mysql_error());
  return $result;
}

function test_table_name($name) {
	return (!preg_match('#^[a-zA-Z0-9_]+$#i', $name)) ? false : true;
}

function dbconnect() {
	$db_link_local = @mysql_connect('localhost','root','stevejobs') or die('could not connect - local'.chr(10));
	@mysql_select_db('pyro21') or die('could not select database - local'.chr(10));
}

function output($json) {
	die(json_encode($json));
}

/**
 * Send a HTTP 201 response header.
 */
function created($url = FALSE) {
    header('HTTP/1.0 201 Created');
    if ($url) {
        header('Location: '.$url);   
    }
}

/**
 * Send a HTTP 204 response header.
 */
function noContent() {
    header('HTTP/1.0 204 No Content');
}

/**
 * Send a HTTP 400 response header.
 */
function badRequest($errno,$errtxt) {
    header('HTTP/1.0 400 Bad Request');
		echo $errno.chr(10).$errtxt;
		die();
}

/**
 * Send a HTTP 401 response header.
 */
function unauthorized($realm = 'PHPRestSQL') {
    header('WWW-Authenticate: Basic realm="'.$realm.'"');
    header('HTTP/1.0 401 Unauthorized');
}

/**
 * Send a HTTP 404 response header.
 */
function notFound() {
    header('HTTP/1.0 404 Not Found');
}

/**
 * Send a HTTP 405 response header.
 */
function methodNotAllowed($allowed = 'GET, HEAD') {
    header('HTTP/1.0 405 Method Not Allowed');
    header('Allow: '.$allowed);
    die();
}

/**
 * Send a HTTP 406 response header.
 */
function notAcceptable($input) {
    header('HTTP/1.0 406 Not Acceptable');
    echo $input;
    die();
}

/**
 * Send a HTTP 411 response header.
 */
function lengthRequired() {
    header('HTTP/1.0 411 Length Required');
}

/**
 * Send a HTTP 500 response header.
 */
function internalServerError() {
    header('HTTP/1.0 500 Internal Server Error');
}