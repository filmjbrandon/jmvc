<?php
class session_controller {

  function __construct() {}
  
  function index() {
    start_html();

    echo '<p>My Original session handler modeled after PHP sessions</p>';
    echo '<p>Written by Don Myers</p>';
    echo '<p>I also found jstorage by Andris Reinman (see demo and license)</p>';
    echo '<p>which does the same types of things</p>';
    echo '<p>Like PHP always start the session</p>';
    echo '<p>In this case I put that in the pages jmvc construct</p>';
    
    $tests[] = array('session_start','Session Start');
    $tests[] = array('session_uuid','Session uuid');
    $tests[] = array('session_id','Session id');
    $tests[] = array('session_writedm','Session Write Don Myers');
    $tests[] = array('session_writetm','Session Write Tyson Myers');
    $tests[] = array('session_read','Session Read');
    $tests[] = array('session_read_all','Session Read All');
    $tests[] = array('session_regenerate_id','Session Regenerate Id');
    $tests[] = array('session_regenerate_id2','Session Regenerate Id With Clear');
    $tests[] = array('session_destroy','Session Destroy');
    $tests[] = array('uid','uid');
    
    echo show($tests);

    end_html();
  }
}