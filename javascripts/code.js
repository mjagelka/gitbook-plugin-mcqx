var codeUpdate = function(){

	var code = [];

	code.push({id:'start', body:'{%mcq%}'});
	code.push({id:'title', body:'{%title%}'});
	code.push({id:'hint', body: ''})
	code.push({id:'message', body: ''})
	code.push({id:'end', body:'{%endmcq%}'});

	var replaceInCode = function(id, replace){
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
		$('#output').text("Insufficient information (please fill in all the required boxes)");

		if(!$('#output_copy').hasClass('disabled'))
			$('#output_copy').addClass('disabled');
		return;
	}
	else
	{
		replaceInCode('start', "{%mcq id='" + getContent('input_id') + "'%}");
		replaceInCode('title', "{%title%} " + getContent('input_title'));

		if(hasContent('input_hint'))
			replaceInCode('hint', '{%hint%} ' + getContent('input_hint'));

		if(hasContent('input_message'))
			replaceInCode('message', '{%message%} ' + getContent('input_message'));

		var count = getContent('input_count option:selected');
		if(count != 'auto')
			replaceInCode('start', "{%mcq id='" + getContent('input_id')
				+ "', count=" + count + " %}")

		var output = code.map(function(a){
			return a.body;
		}).reduce(function(a, b){
			if(b)
				return a + '\n' + b;
			else
				return a;
		});

		$('#output').text(output);
		$('#output_copy').removeClass('disabled');
	}
};

var init = function(){

	codeUpdate();
	$('.form-control').keyup(codeUpdate);
	 $('#input_count').change(codeUpdate);

	$('#output_selectAll').click(function(){
		$('#output').select();
	});
};

$(document).ready(init);