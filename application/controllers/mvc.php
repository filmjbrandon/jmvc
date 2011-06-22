<?php
class mvc_controller {

  function __construct() {}
  
  function index() {
    start_html();
    
    $tests[] = array('mvcController','Load Controller by Name');
    $tests[] = array('mvcController2','Get a Controller Named my_controller');
    $tests[] = array('mvcController3','Get this Controller when finished run function');
    $tests[] = array('mvcController4','Get a Controller Named my_controller when finished run function');
    
    $tests[] = array('change_event','Manually attach a action');
    
    $tests[] = array('mvcView','Load a View');
    $tests[] = array('mvcUpdate','Refresh the screen (Update)');
    
    $tests[] = array('readall','Read Everything from MVC Element');
    $tests[] = array('readone','Read Single property from MVC Element');
    $tests[] = array('writeall','Write a entire Object to MVC Element');
    $tests[] = array('writeone','Write one Object to a MVC Element');
    $tests[] = array('cleardata','Clear  -Write a Empty Element to a MVC Element');
    
    $tests[] = array('clearallevents','Clear All Events');
    $tests[] = array('getallevents','Get All Events');
    $tests[] = array('doeseventexist','Does a Event Exist');
    $tests[] = array('clearevent','Clear a Event Function');
    $tests[] = array('seteventandfunciton','Set a Event and Function');
    
    $tests[] = array('mvcAjax','Making Blocking Ajax Call');
    
    $tests[] = array('execstring','Execute a function by string');
    $tests[] = array('execfunction','Execute a function by function');
    
    $tests[] = array('redirect','Client Side redirect');
    
    $tests[] = array('exists','does a element exists by id');
    $tests[] = array('testjsonpost','Post JSON via post');
    $tests[] = array('add_multi_clicks','Add Multi Clicks'); /* test */
    
    echo show($tests);
    
    end_html();
  }
}