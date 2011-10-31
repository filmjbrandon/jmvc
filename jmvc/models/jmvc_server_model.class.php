<?php
/*
this of course pushes back json and is a simple
wrapper to except the mvc call and respond
this could include the MVC model classes / validation etc...
*/

$debug_logs = true;
  
class jmvc_server_model {

  var $dbtable = '';
  var $dbcolumns = array();
  var $primary_name = '';
  var $primary_id = null;

  var $output = array(); /* json output */
  var $record = array(); /* single record */
  var $records = array(); /* 1 or more records */

  var $where = '';
  var $POST = array();
  var $debug_sql = true;

  function __construct($table_name='',$columns='',$primary_name='id') {
    $this->dbtable = $table_name;
    $this->dbcolumns = $columns;
    $this->primary_name = $primary_name;
    
    logger(print_r($_POST,true),'input');
  }

  function process($POST = null,$send = true) {
    $this->POST = ($POST == null) ? $_POST : $POST;
    
    $action = $this->POST['action'];

    $this->build_where();

    if (method_exists($this,'action_'.$action)) call_user_func(array($this,'action_'.$action)); /* call the action */
    else $this->_error(3);

    $this->output['row_affected'] = mysql_affected_rows();
    $this->output['record'] = $this->record;
    $this->output['records'] = $this->records;

    if ($send) {
    	$this->send($this->output);
    } else {
	    return $this->output;
	  }
  }

  function build_where() {
    $extra = $this->POST['extra']['where'];
    
    /* setup the where */
    /* is _string set? if yes then let's use that */
    if (!empty($extra)) {
      /* if it's a single string it's a primary = string */
      if (strpos($extra,' ') === false) {
        $this->where = "`".$this->primary_name."` = '".mysql_real_escape_string($extra)."'";
      } else {
        /* must be a where statement */
        /* this needs a lot better security */
        $parts = explode(' ',$extra);

        $column_name = str_replace('`','',$parts[0]);
        $operator = (!in_array(strtolower($parts[1]),array('=','>','<','<>','>=','<=','like'))) ? '=' : strtolower($parts[1]);

        unset($parts[0]);
        unset($parts[1]);

        $this->where = "`".$column_name."` ".$operator." '".mysql_real_escape_string(implode(' ',$parts))."'";
      }
    } else {
      /* is the primary id set? if yes let's use that */
      if (!empty($this->POST['record'][$this->primary_name])) {
        $this->where = "`".$this->primary_name."` = '".mysql_real_escape_string($this->POST['record'][$this->primary_name])."'";
      }
    }
  }

  /* action load record / records */
  function action_load() {
    if (!empty($this->where)) {
      $dbc = $this->query('select '.implode($this->dbcolumns,',').' from '.$this->dbtable.' where '.$this->where);

      if (!$this->_error()) {
        if (@mysql_num_rows($dbc) > 0) {
          while ($dbr = mysql_fetch_assoc($dbc))
            $this->records[] = $dbr;

          $this->record = $this->records[0];
        }
      }
    }
  }

  function action_save() {
    foreach ($this->dbcolumns as $key) {
      $insertfields[] = '`'.$key.'`';
      $insertvalues[] = "'".mysql_real_escape_string($this->POST['record'][$key])."'";
      $updatesql[] = "`".$key."`='".mysql_real_escape_string($this->POST['record'][$key])."'";
    }

    if (empty($this->where)) $sql = 'insert into `'.$this->dbtable.'` ('.implode($insertfields,',').') values ('.implode($insertvalues,',').')';
    else $sql = 'update `'.$this->dbtable."` set ".implode($updatesql,',')." where ".$this->where;

    $this->query($sql);

    if (!$this->_error()) {
      if (empty($this->where)) $this->record[$this->primary_name] = mysql_insert_id();
    }
  }

  function action_remove() {
    if (!empty($this->where)) {
      $this->query('delete from '.$this->dbtable.' where '.$this->where);
      if (!$this->_error()) {
        $this->record = array_fill_keys($this->dbcolumns,'');
        $this->records = array();
      }
    } else {
      $this->_error(2);
    }
  }

  function _error($error_number=0) {
    $dberror = false;

    /* custom errors */
    $errors[0] = 'No Error';
    $errors[1] = 'No Records Founds';
    $errors[2] = 'No Where Clause Given';
    $errors[3] = 'Action Not Found';

    $error_text = $errors[$error_number];

    /* if there is a mysql_errno then override all */
    if (mysql_errno() > 0) {
      $error_number = mysql_errno();
      $error_text  = mysql_error();
      $yeserror = true;
    }

    $this->output['error'] = $error_text;
    $this->output['error_no'] = $error_number;

    return $dberror;
  }

  function query($sql) {
    logger($sql,'sql');
    if ($this->debug_sql) $this->output['sql'] = $sql;
    return mysql_query($sql);
  }
  
  static function send($output) {
    if (headers_sent()) die();
    header('Content-type: text/json');
    
    logger(print_r($output,true),'output');
    
    echo json_encode($output);
  }

}
