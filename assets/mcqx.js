(function(){

	function MultipleChoice(input){ //a class for each multiple choice questions
		this.qid = input.id;
		this.ans = input.ans;
		this.target = input.target;

		this.title = input.title;
		this.option = input.option;
	};

	MultipleChoice.prototype.checkAns = function(input){
		if(input === this.ans)
			return true;
		else
			return false;
	};

	var init = function init(){

		$('.mcqBox').each(function(){

			var question = new MultipleChoice($(this).data('config'));

			//enable the submit button
			$(this).find('button.submitMCQ').click(function(){

				if(question.checkAns($('input[name=' + question.qid + '_group]:checked').val())){
					$(this).parent().find('.MCQmessage').removeClass('MCQwrong').addClass('MCQright').text("Correct!").fadeIn('fast').delay(1000).fadeOut('slow');
					$(this).removeClass('btn-success').addClass('btn-default').addClass('disabled');
					$('input[name=' + question.qid + '_group]').attr('disabled',true);
				}
				else {
					$(this).parent().find('.MCQmessage').addClass('MCQwrong').fadeIn('fast').text("Wrong answer, try again.").delay(1000).fadeOut('slow');
				}
			});
		});

	};

	require(["gitbook"], function(gitbook) {

		gitbook.events.bind("page.change", function(){
			init();
		});
		
	});

})();
