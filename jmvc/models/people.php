<?php
/*
Input (JSON) *Will Always Have

Array

[*filename] => notes
[*record] => Array
  (
      [id] => 17
  )
[*payload] => Array
  (
  )
[*mvc_posturl] => http://localhost/overflow_auto/jmvc/models/notes.js
[*mvc_type] => json
[*mvc_timestamp] => 1309364807177


Output (JSON) *MUST Return

[*error] => No Error
[*error_no] => 0
[*row_affected] => 1
[*record] => Array
  (
    [id] => 17
    [title] => womenfolk
    [tags] => palmature
    [note] => galvanograph
unsanguineous
standard
  )
[*records] => Array
  (
    [0] => Array
      (
        [id] => 17
        [title] => womenfolk
        [tags] => palmature
        [note] => galvanograph
unsanguineous
standard
      )
  )
[sql] => ""
*/

logger(print_r($_POST,true),'input');

/* dummy */
$action = $_POST['payload'][0];

$json = array();

switch ($action) {
  case 'load': /* load based on primary id or all if none */
    $json['error'] = 'No Error';
    $json['error_no'] = 0;
    $json['row_affected'] = 1;
    $json['record'] = array('id' => 17,'title' => 'womenfolk','tags' => 'palmature','note' => 'galvanograph'.chr(10).'unsanguineous'.chr(10).'standard');
    $json['records'][0] = $json['record'];
  break;

  case 'load_all': /* custom _sync action */
    $json['error'] = 'No Error';
    $json['error_no'] = 0;
    $json['row_affected'] = 2;
    $json['record'] = array('id' => 17,'title' => 'womenfolk','tags' => 'palmature','note' => 'galvanograph'.chr(10).'unsanguineous'.chr(10).'standard');
    $json['records'][0] = $json['record'];
    $json['records'][1] = array('id' => 18,'title' => 'person','tags' => 'dancing','note' => 'test'.chr(10).'test1'.chr(10).'test2');
  break;

  case 'save': /* handles insert & update */
    $json['error'] = 'No Error';
    $json['error_no'] = 0;
    $json['row_affected'] = 1;
    /* return full record */
    $json['record'] = array('id' => 17,'title' => 'womenfolk','tags' => 'palmature','note' => 'galvanograph'.chr(10).'unsanguineous'.chr(10).'standard');
    $json['records'][0] = $json['record'];
  break;

  case 'remove': /* remove based on primary id */
    $json['error'] = 'No Error';
    $json['error_no'] = 0;
    $json['row_affected'] = 1;
    /* return empty record */
    $json['record'] = array('id' => '','title' => '','tags' => '','note' => '');
    $json['records'][0] = $json['record'];
  break;
  
  case 'error': /* custom _sync action */
    $json['error'] = 'Big Bad Error';
    $json['error_no'] = 333;
    $json['row_affected'] = 0;
  break;
}

header('Content-type: text/json');
logger(print_r($json,true),'output');
die(json_encode($json));

function logger($v,$name) {
  if ($log_handle = fopen($name.'.log','a')) {
    fwrite($log_handle,$v.chr(10));
    fclose($log_handle);
  }
}
