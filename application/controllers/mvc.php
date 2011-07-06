<?php
class mvc_controller {

  function __construct() {}
  
  function index() {
    start_html();
    
    show_header();

    $tests[] = array('mvcClick','Auto Attach Simple Click');

    $tests[] = array('mvcController1','Load Controller by Name');
    $tests[] = array('mvcController2','Load Controller by Name when finished run function');
    $tests[] = array('mvcController3','Get Default Controller when finished run function');
    
    $tests[] = array('change_event1','Manually attach click action');
    $tests[] = array('change_event2','Manually attach click action and more data');
    $tests[] = array('change_event3','Manual Actions Added to Me');
    
    $tests[] = array('mvcView','Load a View');
    $tests[] = array('mvcUpdate','Load a View and Update');
    
    $tests[] = array('readall','Read all values on a element');
    $tests[] = array('readone','Read a single value on a element');
    $tests[] = array('writeall','Write all values on a element');
    $tests[] = array('writeone','Write one value to a element');
    $tests[] = array('cleardata','Clear all values');
    
    $tests[] = array('getallevents','Get all events - as array');
    $tests[] = array('doeseventexist','Test if a event exist');
    $tests[] = array('clearevent','Clear single event');
    $tests[] = array('clearevents','Clear all events');

    $tests[] = array('seteventandfunciton','set a event and function');
    
    $tests[] = array('mvcAjax','Making Blocking Ajax Call');
    
    $tests[] = array('execstring','Execute a function by string');
    $tests[] = array('execfunction','Execute a function by function');
    
    $tests[] = array('redirect','Client Side redirect');
    
    $tests[] = array('exists','does a element exists by id');
    
    show_left_block($tests);
    show_right_block();
    
    show_footer();

    end_html();

    end_html();
  }
}