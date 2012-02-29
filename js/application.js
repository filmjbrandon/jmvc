$().ready(function() {

	$("#start").click(function(){
		var test;
		var match;

		out('Start Unit Test');

		out('** Test Cookies');
		test = $.cookie('mycookie','oreo');
		utest('Write Cookie',test,'mycookie=oreo');
		
		test = $.cookie('mycookie');
		utest('Read Cookie',test,'oreo');
			
    $.cookie('mycookie',null);
		test = $.cookie('mycookie');
		utest('Clear Cookie',test,null);
				
    test = $.cookie('mycookielong','value',{ expires: 7, path: '/' });
    var days = 7, t = expires = new Date();
    t.setDate(t.getDate() + days);
		utest('Save with options',test,'mycookielong=value; expires=' + expires.toUTCString() + '; path=/');
	
		out('** Test mvcForm');
		$('#addons').mvcFormHidden('hiddenvalue','oreo');
		test = $('#hiddenvalue').val();
		utest('From Hidden Add',test,'oreo');
		
		$('#addons').mvcFormHidden('hiddenvalue','peanuts');
		test = $('#hiddenvalue').val();
		utest('From Hidden Change',test,'peanuts');
	
		$('#addons').html('<form id="ourform" action="debug.php"><input type="text" name="txtone" value="txtone"><input type="text" name="txttwo" value="txttwo"></form>');
		test = $('#ourform').mvcForm2Obj();
		match = {"txtone":"txtone","txttwo":"txttwo","mvcForm2Obj":{"mvc_post_selector":"#ourform","mvc_url":"http://localhost/jmvc/","mvc_application_folder":"jmvc/"}};		
		utest('mvc Form 2 Obj',obj2string(test),obj2string(match));
		
		test = $('#ourform').mvcFormValidate();
		
		
		
		
	
	});

});