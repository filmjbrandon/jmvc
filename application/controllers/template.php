<?php
class template_controller {

  function __construct() {}
  
  function index() {
    start_html();

    show_header();

		echo '<ul id="movieList"></ul>';
		
		echo '<ul id="movieList2"></ul>';

		echo '<p>compiled</p><ul id="movieList3"></ul>';

		echo '<div id="area"></div>';

		echo '<input type="text" id="consoleoutput">';

    $tests[] = array('run_template','Run Template');

    
    show_left_block($tests);
    show_right_block();
    
    show_footer();

    end_html();
  }
}