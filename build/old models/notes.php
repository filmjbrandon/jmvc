<?php
/* sync back to server */
/* see input log & output log for samples on incoming/out going data */
/* this of course is sent via JSON */

require('functions.inc.php');
require('jmvc_server_model.class.php');

dbconnect();

/* table name, columns, primary id */
$people = new jmvc_server_model('notes',array('id','title','tags','note'),'id');

/* this used $_POST if no variable passed */
/* send json out if false not passed */
$people->process();