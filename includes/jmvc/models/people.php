<?php
$db_link_local = @mysql_connect('localhost','root','root') or die('could not connect - local'.chr(10));
@mysql_select_db('dbTest') or die('could not select database - local'.chr(10));

$dbtable = 'jmvc';
$dbcolumns = array('id','name','age');
$dbcolumns_empty = array_fill_keys($dbcolumns,'');

$primary_name = 'id';
$primary_id = $_POST['record'][$primary_name];

$record = makerecord();

/* create where if string is filled in */
$where = '';
$string = $_POST['_string'];
if (!empty($string)) {
  if (strpos($string,' ') === false) { /* must be a value of somekind */
    $where = "`".$primary_name."` = '".mysql_real_escape_string($string)."'";
  } else { /* must be a where statement */
    $parts = explode(' ',$string); 
    $where = "`".$parts[0]."` ".$parts[1]." '".mysql_real_escape_string($parts[2])."'"; /* let's clean this up for a little security */
  }
} else {
  if (!empty($primary_id)) { /* is primary name filled in? */
    $where = "`".$primary_name."` = '".mysql_real_escape_string($primary_id)."'";
  }
}

$action = $_POST['mvc_model_action'];
switch ($action) {
  case 'load':
    if (!empty($where)) $record = get($where);
  break;
  case 'save':
    $record = upsert($record,$where);
  break;
  case 'remove':
    $record = delete($where);
  break;
}

send($record); /* return the db record(s) */
/* end */

/* functions */
function get($where) {
  global $dbcolumns,$dbcolumns_empty,$dbtable;

  $record = makerecord();

  $dbc = mysql_query("select ".implode($dbcolumns,',')." from ".$dbtable." where ".$where);

  if (mysql_errno() > 0) {
    fill_in_error($record,mysql_errno($dbc),mysql_error($dbc));
  } else {
    if (mysql_num_rows($dbc) > 0) {
      while ($dbr = mysql_fetch_assoc($dbc)) $records[] = $dbr;
      $record = array_merge($dbcolumns_empty,$records[0]);
      $record['_row_affected'] = mysql_affected_rows();
      $record['_count'] = count($records);
      $record['_records'] = $records;
    }
  }
  
  return $record;
}

function upsert($record,$where) {
  global $dbcolumns,$dbtable,$primary_name;
  
  foreach ($dbcolumns as $key) {
    $insertfields .= '`'.$key.'`, ';
    $insertvalues .= "'".mysql_real_escape_string($record[$key])."', ";
    $updatesql .= "`".$key."`='".mysql_real_escape_string($record[$key])."', "
  }

  if (empty($where)) $sql = 'insert into '.$dbtable.' ('.rtrim($insertfields,', ').') values ('.rtrim($insertvalues,', ').')';
  else $sql = 'update '.$dbtable.' set '.rtrim($updatesql,', ').' where '.$where;
  
  $dbc = mysql_query($sql);
  
  if (mysql_errno() > 0) {
    $record = makerecord(); /* error empty record */
    fill_in_error($record,mysql_errno($dbc),mysql_error($dbc));
  } else {
    if (empty($where)) $record[$primary_name] = mysql_insert_id();
    $record['_row_affected'] = mysql_affected_rows();
  }

  return $record;
}

function delete($where) {
  global $dbtable;
  
  $record = makerecord(false); /* do not merge sent in */

  if (!empty($where)) {
    $dbc = mysql_query("delete from ".$dbtable." where ".$where);
    if (mysql_errno() > 0) fill_in_error($record,mysql_errno($dbc),mysql_error($dbc));
    $record['_row_affected'] = mysql_affected_rows();
  } else {
    fill_in_error($record,2);
  }

  return $record;
}

function send($record) {
  if (headers_sent()) die();
  header('Content-type: text/json');
  header('Content-type: application/json');
  die(json_encode($record));
}

function fill_in_error(&$record,$error_number=0,$error_text='') {
  $errors[0] = 'No Error';
  $errors[1] = 'No Records Founds';
  $errors[2] = 'No Where Clause Given';

  $error_text = ($error_text == '') ? $error_text = $errors[$error_number] : $error_text;

  $record['_error'] = $error_text;
  $record['_error_number'] = $error_number;
}

function makerecord($merge=true) {
  global $dbcolumns_empty,$primary_name;

  if ($merge) $record = array_diff_key($dbcolumns_empty,$_POST['record']) + array_intersect_key($_POST['record'],$dbcolumns_empty);
  else $record = $dbcolumns_empty;

  $record['_count'] = 0;
  $record['_records'] = array();
  $record['_row_affected'] = 0;
  $record['_model_primary'] = $primary_name;

  fill_in_error($record);

  return $record;
}
