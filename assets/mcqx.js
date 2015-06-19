(function(){

	function MultipleChoice(input){ //a class for each multiple choice questions
		this.qid = input.id;
		this.ans = input.ans;
		this.target = input.target;

		this.title = input.title;
		this.a = input.a;
		this.b = input.b;
		this.c = input.c;
		this.d = input.d;
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
					$(this).parent().find('.MCQmessage').removeClass('MCQwrong').addClass('MCQright').text("Correct!");
					$(this).removeClass('btn-primary').addClass('btn-default').addClass('disabled');
					$('input[name=' + question.qid + '_group]').attr('disabled',true);
					if(question.target && sectionToggle)
						sectionToggle(question.target);
				}
				else {
					$(this).parent().find('.MCQmessage').addClass('MCQwrong').text("Wrong answer, try again.");
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
