<?php
class index_controller {

  function __construct() {}
  
  function index() {
    start_html();

    echo '<div><a href="'.$this->path.'mvc">MVC Test</a></div>';
    echo '<div><a href="'.$this->path.'form">Form Test</a></div>';
    echo '<div><a href="'.$this->path.'model">Model Test</a></div>';
    echo '<div><a href="'.$this->path.'jstorage">jstorage Test</a></div>';
    echo '<div><a href="'.$this->path.'session">Session Test</a></div>';
    echo '<div><a href="'.$this->path.'cookie">Cookie Test</a></div>';
    
    end_html();
  }
}