var codeUpdate = function(){

	var code = [];

	code.push({id:'start', body:''});
	code.push({id:'title', body:'{%title%}'});
	code.push({id:'o1', body:''});
	code.push({id:'o2', body:''});
	code.push({id:'o3', body:''});
	code.push({id:'o4', body:''});
	code.push({id:'o5', body:''});
	code.push({id:'o6', body:''});
	code.push({id:'o7', body:''});
	code.push({id:'o8', body:''});
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

	var insufficientInfo = function(){
		$('#output').text("Insufficient information (please fill in all the required boxes)");

		if(!$('#output_copy').hasClass('disabled'))
			$('#output_copy').addClass('disabled');
	}

	if( !hasContent('input_id') || !hasContent('input_title') || getContent('input_qCount option:selected')=='auto')
	{
		insufficientInfo();
		return;
	}
	else
	{
		var start = []; // string builder for {%mcq%} tag

		// construct the {%mcq% tag} ----------

		start.push("id='" + getContent('input_id') + "'");

		if(getContent('input_count option:selected') != 'auto')
			start.push("count=" + getContent('input_count option:selected'))

		if($('#input_shuffle').is(':checked'))
			start.push("random=true")

		if(hasContent('input_sectionx'))
			start.push("target='" + getContent('input_sectionx') + "'")

		replaceInCode('start', '{%mcq ' + start.join(', ') + ' %}')

		// handle all the sub-blocks ----------

		replaceInCode('title', "{%title%} " + getContent('input_title'));

		if(hasContent('input_hint'))
			replaceInCode('hint', '{%hint%} ' + getContent('input_hint'));

		if(hasContent('input_message'))
			replaceInCode('message', '{%message%} ' + getContent('input_message'));

		for(var i=1; i<= $('#input_qCount option:selected').val() ; i++)
			if(hasContent('input_o'+i))
				replaceInCode('o'+i, '{%o'+i+'%} ' + getContent('input_o'+i));
			else
			{
				insufficientInfo();
				return;
			}

		// construct the output from code  ----------

		var output = code.map(function(a){
			return a.body;
		}).reduce(function(a, b){
			if(b)
				return a + '\n' + b;
			else
				return a;
		});

		// put the output to the box  ----------

		$('#output').text(output);
		$('#output_copy').removeClass('disabled');
	}
};

var init = function(){

	codeUpdate();

	$('.form-control').keyup(codeUpdate);
	$('.form-control-select, .form-control-check').change(codeUpdate);

	$('#input_qCount').change(function(){
		var count = $('#input_qCount option:selected').val();
		for(var i=1; i<=8; i++){
			if(i<=count)
			{
				$('#q'+i).removeAttr('disabled');
				$('#input_o'+i).removeAttr('disabled');
			}
			else
			{
				$('#q'+i).attr('disabled','disabled');
				$('#input_o'+i).attr('disabled','disabled');
			}
		}
	});

	$('#output_selectAll').click(function(){
		$('#output').select();
	});
};

$(document).ready(init);