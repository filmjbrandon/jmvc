<?php
class index_controller {

  function __construct() {}
  
  function index() {
    start_html();

    echo '<p><a class="link" href="'.$this->path.'mvc">MVC Test</a></p>';
    echo '<p><a class="link" href="'.$this->path.'form">Form Test</a></p>';
    echo '<p><a class="link" href="'.$this->path.'model">Model Test</a></p>';
    echo '<p><a class="link" href="'.$this->path.'jstorage">jstorage Test</a></p>';
    echo '<p><a class="link" href="'.$this->path.'session">Session Test</a></p>';
    echo '<p><a class="link" href="'.$this->path.'cookie">Cookie Test</a></p>';
    
    end_html();
  }
}