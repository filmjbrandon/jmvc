<?php
/*
this of course pushes back json and is a simple
wrapper to except the mvc call and respond
this could include the MVC model classes / validation etc...

Content Posted
[_string] => name = "don"
[mvc_model_action] => load
[record] => Array
    (
        [_model_name] => people
        [_model_filename] => people
        [_error] => 'No Error'
        [_error_number] => 0
        [_records] => Array()
        [_row_affected] => 1
        [_count] => 1
        [_action] = ''
        
        [id] = 12
        [name] => Andrew
        [age] => 13
        
        [_sql] => query (if debug on)
        [_string] => '';
    )
[mvc_posturl] => http://localhost/jmvc/jmvc/models/people.js
[mvc_type] => json
[mvc_timestamp] => 1308239559404
[cookie] => Array()
*/
class jmvc_server_model {

  var $dbtable = '';
  var $dbcolumns = array();
  var $primary_name = '';
  var $primary_id = null;

  var $dbcolumns_empty = array();
  var $record = array();

  var $where = '';
  var $POST = array();
  var $debug = true;

  function __construct($table_name='',$columns='',$primary_name='id') {
    $this->dbtable = $table_name;
    $this->dbcolumns = $columns;
    $this->primary_name = $primary_name;
    
    $this->dbcolumns_empty = array_fill_keys($this->dbcolumns,'');
    
    $this->record['_error'] = '';
    $this->record['_error_number'] = '';
    $this->record['_row_affected'] = '';
    $this->record['_count'] = '';
    $this->record['_records'] = '';
    $this->record['_string'] = '';
    $this->record['_action'] = '';
  }

  function fill_record() {
    foreach ((array)$this->POST['record'] as $key => $value) {
      if (in_array($key,$this->dbcolumns)) {
        $this->record[$key] = $value;
      }
    }
  }

  function process($POST = null) {
    $this->POST = ($POST == null) ? $_POST : $POST;

    $this->record['_action'] = $this->POST['mvc_model_action'];

    $this->fill_record();

    /* setup the where */
    /* is _string set? if yes then let's use that */
    if (!empty($this->POST['_string'])) {
      /* if it's a single string it's a primary = string */
      if (strpos($this->POST['_string'],' ') === false) {
        $this->where = "`".$this->primary_name."` = '".mysql_real_escape_string($this->POST['_string'])."'";
      } else {
        /* must be a where statement */
        /* this needs a lot better security */
        $parts = explode(' ',$this->POST['_string']);

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

    if (method_exists($this,'action_'.$this->POST['mvc_model_action']))
      call_user_func(array($this,'action_'.$this->POST['mvc_model_action'])); /* call the action */
    else 
      $this->_error(3);

    $this->record['_row_affected'] = mysql_affected_rows();
    $this->record['_count'] = count($this->records);
    $this->record['_records'] = $this->records;

    $this->send();
  }

  function send() {
    if (headers_sent()) die();
    header('Content-type: text/json');
    header('Content-type: application/json');
    die(json_encode($this->record));
  }

  /* action load record / records */
  function action_load() {
    if (!empty($this->where)) {
      $dbc = $this->query("select ".implode($this->dbcolumns,',')." from ".$this->dbtable." where ".$this->where);

      if (!$this->_error()) {
        if (mysql_num_rows($dbc) > 0) {
          while ($dbr = mysql_fetch_assoc($dbc))
            $this->records[] = array_merge($this->dbcolumns_empty,$dbr);
            
          $this->record = $this->records[0];
        }
      }
    }
  }

  function action_save() {
    foreach ($this->dbcolumns as $key) {
      $insertfields[] = '`'.$key.'`';
      $insertvalues[] = "'".mysql_real_escape_string($this->record[$key])."'";
      $updatesql[] = "`".$key."`='".mysql_real_escape_string($this->record[$key])."'";
    }

    if (empty($this->where)) $sql = "insert into `".$this->dbtable."` (".implode($insertfields,',').") values (".implode($insertvalues,',').")";
    else $sql = 'update `'.$this->dbtable."` set ".implode($updatesql,',')." where ".$this->where;

    $this->query($sql);

    if (!$this->_error()) {
      if (empty($this->where)) $this->record[$this->primary_name] = mysql_insert_id();
    }
  }

  function action_remove() {
    if (!empty($this->where)) {
      $this->query("delete from ".$this->dbtable." where ".$this->where);
      if (!$this->_error()) {
        $this->record[$this->primary_name] = '';
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

    $this->record['_error'] = $error_text;
    $this->record['_error_number'] = $error_number;

    return $dberror;
  }
  
  function query($sql) {
    if ($this->debug) $this->record['_sql'] = $sql;
    return mysql_query($sql);
  }

}
