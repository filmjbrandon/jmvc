<?php
/*
this is a really basic serverside model handler 
Of course since javascript can't talk directly to your servers database
additional server-side code is needed
*/
require('jmvc_server_model.class.php');

if ($_POST['mvc_model_action'] == 'jump') {
  $people = new jmvc_server_model('people',array('id','name','age'));
  $people->fill_record();
  $people->record['name'] = 'jump';
  $people->record['age'] = 'jump';
  $people->send();
}

/* connect to your db however you like */
$db_link_local = @mysql_connect('localhost','root','root') or die('could not connect - local'.chr(10));
@mysql_select_db('jmvc') or die('could not select database - local'.chr(10));

/* table name, columns, primary id */
$people = new jmvc_server_model('people',array('id','name','age'));

/* this used $_POST if no variable passed */
$people->process();
