<?php
$db_link_local = @mysql_connect('localhost','root','root') or die('could not connect - local'.chr(10));
@mysql_select_db('dbTest') or die('could not select database - local'.chr(10));

$jmodel = new jmvc_server_model();

class jmvc_server_model {

  var $dbtable = 'jmvc';
  var $dbcolumns = array('id','name','age');
  var $primary_name = 'id';

  var $model_used_columns = array();

  var $primary_id;
  var $dbcolumns_empty;

  var $record = null;
  var $where = '';
  var $POST = array();

  function __construct($POST=null) {
    $this->POST = ($POST == null) ? $_POST : $POST;
    $this->dbcolumns_empty = array_fill_keys($this->dbcolumns,'');
    $this->primary_id = $this->POST['record'][$this->primary_name];

    $this->record = array();

    foreach ((array)$this->POST['record'] as $key => $value) {
      if ($key{0} != '_') {
        $this->record[$key] = $value;
        $this->model_used_columns[] = $key;
      }
    }

    $this->record['_count'] = 0;
    $this->record['_records'] = array();
    $this->record['_row_affected'] = 0;
    $this->record['_model_primary'] = $this->primary_name;

    $this->_error();

    /* setup the where */
    if (!empty($this->POST['_string'])) {
      if (strpos($this->POST['_string'],' ') === false) { /* must be a value of somekind */
        $this->where = "`".$this->primary_name."`='".mysql_real_escape_string($this->POST['_string'])."'";
      } else { /* must be a where statement */
        $parts = explode(' ',$this->POST['_string']);
        $this->where = "`".$parts[0]."` ".$parts[1]." '".mysql_real_escape_string($parts[2])."'"; /* let's clean this up for a little security */
      }
    } else {
      if (!empty($this->primary_id)) { /* is primary name filled in? */
        $this->where = "`".$this->primary_name."`='".mysql_real_escape_string($this->primary_id)."'";
      }
    }

    if (method_exists($this,'action_'.$this->POST['mvc_model_action']))
      call_user_func(array($this,'action_'.$this->POST['mvc_model_action'])); /* call the action */

    $this->record['_row_affected'] = mysql_affected_rows();
    $this->record['_count'] = count($this->records);
    $this->record['_records'] = $this->records;

    if (headers_sent()) die();
    header('Content-type: text/json');
    header('Content-type: application/json');
    die(json_encode($this->record));
  }

  /* action load record / records */
  function action_load() {
    if (!empty($this->where)) {
      $dbc = mysql_query("select ".implode($this->dbcolumns,',')." from ".$this->dbtable." where ".$this->where);

      if (!$this->_error()) {
        if (mysql_num_rows($dbc) > 0) {
          while ($dbr = mysql_fetch_assoc($dbc)) $this->records[] = $dbr;
          $this->record = array_merge($this->dbcolumns_empty,$this->records[0]);
        }
      }
    }
  }

  function action_save() {
    foreach ($this->model_used_columns as $key) {
      $insertfields .= '`'.$key.'`, ';
      $insertvalues .= "'".mysql_real_escape_string($this->record[$key])."', ";
      $updatesql .= "`".$key."`='".mysql_real_escape_string($this->record[$key])."', ";
    }

    if (empty($this->where)) $sql = 'insert into '.$this->dbtable.' ('.rtrim($insertfields,', ').') values ('.rtrim($insertvalues,', ').')';
    else $sql = 'update '.$this->dbtable.' set '.rtrim($updatesql,', ').' where '.$this->where;

    $dbc = mysql_query($sql);

    if (!$this->_error()) {
      if (empty($this->where)) $this->record[$this->primary_name] = mysql_insert_id();
    }
  }

  function action_remove() {
    if (!empty($this->where)) {
      $dbc = mysql_query("delete from ".$this->dbtable." where ".$this->where);
      if (!$this->_error()) {
        $this->record[$this->primary_name] = '';
        $this->record['_string'] = '';
      }
    } else {
      $this->_error(2);
    }
  }

  function _error($error_number=0) {
    $yeserror = false;
    
    /* custom errors */
    $errors[0] = 'No Error';
    $errors[1] = 'No Records Founds';
    $errors[2] = 'No Where Clause Given';

    $error_text = $errors[$error_number];

    /* if there is a mysql_errno then override all */
    if (mysql_errno() > 0) {
      $error_number = mysql_errno();
      $error_text  = mysql_error();
      $yeserror = true;
    }

    $this->record['_error'] = $error_text;
    $this->record['_error_number'] = $error_number;
    
    return $yeserror;
  }

}
