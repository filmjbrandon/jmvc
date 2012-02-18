var controller_template_method_index = new function() {

  this.__construct = function() {
    writeDebug('controller_controller_session_method_index construct');
  };

  this.run_template = new function() {
    this.click = function() {
	    jQuery('#movieList').html('x');
	    jQuery('#movieList2').html('c');
    
			// the data
			var movies = [
		  { Name: "The Red Violin", ReleaseYear: "1998", Director: "François Girard" },
		  { Name: "Eyes Wide Shut", ReleaseYear: "1999", Director: "Stanley Kubrick" },
		  { Name: "The Inheritance", ReleaseYear: "1976", Director: "Mauro Bolognini" }
		  ];
			
			// add directly in element
    	var output = jQuery.mvcView('template',movies);
    	jQuery("#movieList").html(output);
    	
    	
    	var movies = [
			    { Name: "Meet Joe Black", Languages: "French" },
			    { Name: "The Mighty" },
			    { Name: "City Hunter", Languages: "Mandarin and Cantonese" }
			];

			jQuery('#movieList2').mvcView('logic',movies);
			
			jQuery('#movieList3').mvcView('compiled',movies,true);
    	
    };
  };

};