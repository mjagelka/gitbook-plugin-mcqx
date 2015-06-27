var codeUpdate = function(){

	var code = [];

	code.push({id:'start', body:''});
	code.push({id:'title', body:'{%title%}'});
	code.push({id:'end', body:'{%endmcq%}'});

	var ReplaceInCode = function(id, replace){
		$.grep(code, function(e){ return e.id == id; })[0].body = replace;
	}

	var hasContent = function(id){
		id = '#' + id;
		return $(id).val().length > 0;
	}

	var getContent = function(id){
		id = '#' + id;
		return $(id).val().trim();
	}

	if( !hasContent('input_id') || !hasContent('input_title') )
	{
		$('#output').text("Insufficient information");

		if(!$('#output_copy').hasClass('disabled'))
			$('#output_copy').addClass('disabled');
		return;
	}
	else
	{
		ReplaceInCode('start', "{%mcq id='" + getContent('input_id') + "'%}");
		ReplaceInCode('title', "{%title%} " + getContent('input_title'));

		var output = code.map(function(a){
			return a.body;
		}).reduce(function(a, b){
			return a + '\n' + b;
		});

		$('#output').text(output);
		$('#output_copy').removeClass('disabled');
	}
};

var init = function(){

	codeUpdate();
	$('.form-control').keyup(function(){
		codeUpdate();
	})

};

$(document).ready(init);