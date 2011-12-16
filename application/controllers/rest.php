<?php
$segs = explode('/',$_SERVER["REQUEST_URI"]);

$table = $segs[3];
$method = strtoupper($_SERVER["REQUEST_METHOD"]);
$data = array();

$records[] = array('name'=>'Peter','age'=>30);
$records[] = array('name'=>'John','age'=>34);
$records[] = array('name'=>'Mark','age'=>18);
$records[] = array('name'=>'Matt','age'=>12);
$records[] = array('name'=>'Don','age'=>41);
$records[] = array('name'=>'Laurie','age'=>24);
$records[] = array('name'=>'Mia','age'=>18);

switch($method) {
	case 'GET':
		$idx = 0;
		$data['id'] = $idx;
		$data['name'] = $records[$idx]['name'];
		$data['age'] = $records[$idx]['age'];
		$data['_records'] = $records;
		$data['_rows_affected'] = count($records);
		$data['_error'] = '';
		$data['_error_no'] = 0;
		$data['_internal_id'] = -1;
	break;
	case 'POST':
		$idx = 6;
		$data['id'] = $idx;
		$data['name'] = $records[$idx]['name'];
		$data['age'] = $records[$idx]['age'];
		$data['_records'][] = $records[$idx];
		$data['_rows_affected'] = 1;
		$data['_error'] = '';
		$data['_error_no'] = 0;
		$data['_internal_id'] = -1;	
	break;
	case 'PUT':
		$idx = 7;
		$data['id'] = $idx;
		$data['name'] = $data['_records'][$idx]['name'];
		$data['age'] = $data['_records'][$idx]['age'];
		$data['_records'][] = $records[$idx];
		$data['_rows_affected'] = 1;
		$data['_error'] = '';
		$data['_error_no'] = 0;
		$data['_internal_id'] = -1;
	break;
	case 'DELETE':
		$data['_records'] = array();
		$data['_rows_affected'] = 1;
		$data['_error'] = '';
		$data['_error_no'] = 0;
		$data['_internal_id'] = -1;
	break;
}

header("HTTP/1.0 200 OK");
die(json_encode($data));
