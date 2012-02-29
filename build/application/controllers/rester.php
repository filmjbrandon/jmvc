<?php
class rester_controller {

	/* 
	mine mvc framework doesn't have a catch all so we much send everything to index
	codeigniter (my framework of choice) has a catch all so this would be a lot cleaner
	*/

	public $start = 4;
	public $method = null;
	public $table = null;
	public $resource = null;
	public $user = 'dmyers';
	public $password = 'password';

  function __construct() {}
  
  function index() {
		$this->method = strtolower($_SERVER['REQUEST_METHOD']);
		$uri = $_SERVER['REQUEST_URI'];
		$segs = explode('/',$uri);
		
		$this->table = (!@$segs[$this->start]) ? null : $segs[$this->start];
		$this->resource = (!@$segs[$this->start + 1]) ? null : $segs[$this->start + 1];
		
		echo $this->method.' '.$this->table.' '.$this->resource;
			
		$call_method = 'rest_'.$this->method;
		if (!is_callable(array($this,$call_method)))
		  die_hard('method '.$method.' in '.$this.' is not callable');
		
		/* open db connection */
		dbconnect();
		
		$this->{$call_method}();
  }
  
  function rest_get() {
  	if ($this->table) {
			$this->_output($this->_rest_get_tables());
  	}
		if ($this->resource) {
			$this->_output($this->_rest_get_table($this->table));
		}
  
  }
  
  function rest_put() {
  
  }
  
  function rest_post() {
  
  }
  
  function rest_delete() {
  
  }
  
  function rest_merge() {
  
  }
  
  function _rest_get_tables() {
  	$data = array();
  	$sql = 'SHOW TABLES';
  	$dbc = $this->safe_query($sql);
		while ($dbr = mysql_fetch_array($dbc)) {
			$ary['uri'] = '/'.$dbr[0];
			$ary['name'] = $dbr[0];
			$data[] = $ary;
		}
		return $data;
  }
  
  function _rest_get_table($table) {
		$data = array();
		$sql = 'select * from '.$table;
		$dbc = $this->safe_query($sql);
		while ($dbr = mysql_fetch_array($dbc)) {
			$ary['uri'] = '/'.$dbr[0];
			$ary['name'] = $dbr[0];
			$data[] = $ary;
		}
		return $data;
  }
  
  function _rest_get_record() {
  
  }
  
  function _output($data) {
  	die(json_encode($data));
  }
  
	function safe_query($query) {
	  if (empty($query)) $this->_output(array('err'=>0,'err_txt'=>'Query Missing'));
	  $result = @mysql_query($query);
	  if (mysql_errno() > 0) $this->_output(array('err'=>mysql_errno(),'err_txt'=>mysql_error(),'query'=>$query));
	  return $result;
	}
  
}