(function(){

	function MultipleChoice(input){ //a class for each multiple choice questions
		this.qid = input.id;
		this.ans = input.ans;
		this.target = input.target;

		this.title = input.title;
		this.option = input.option;
		this.hint = input.hint;
	};

	MultipleChoice.prototype.checkAns = function(input){
		if(input === this.ans)
			return true;
		else
			return false;
	};

	var init = function(){

		$('.mcqBox').each(function(){

			var question = new MultipleChoice($(this).data('config'));

			var $mcqBox = $(this);

			setTimeout(function(){
				if($('.book').hasClass('color-theme-2')){
					console.log($('.book').hasClass('color-theme-2'));
					$mcqBox.addClass('dark');
				}
			}, 1);

			$('#color-theme-preview-0, #color-theme-preview-1').click(function(){
				$mcqBox.removeClass('dark');
			});
			
			$('#color-theme-preview-2').click(function(){
				$mcqBox.addClass('dark');
			});

			$mcqBox.find('.MCQbutton').html('<button class="btn btn-primary submitMCQ"><b>Submit</b></button>');

			if(question.hint)
				$mcqBox.find('.MCQbutton').append('&nbsp;<button class="btn btn-info hintMCQ"><b>Hint</b></button>');

			//enable the submit button
			$mcqBox.find('.btn.submitMCQ').click(function(){

				if(question.checkAns($('input[name=' + question.qid + '_group]:checked').val())){
					$mcqBox.find('.MCQmessage').removeClass('MCQwrong').addClass('MCQright').text("Correct.").fadeIn('slow');
					$(this).removeClass('btn-primary').addClass('btn-default').addClass('disabled');

					if(question.hint)
						$(this).siblings('.hintMCQ').removeClass('btn-info').addClass('btn-default').addClass('disabled');
					$('input[name=' + question.qid + '_group]').attr('disabled',true);
				}
				else {
					$mcqBox.find('.MCQmessage').addClass('MCQwrong').fadeIn('slow').text("Wrong answer, try again.").delay(1000).fadeOut('slow');
				}
			});

			if(question.hint)
				$mcqBox.find('.btn.hintMCQ').click(function(){
					$(this).removeClass('btn-info').addClass('btn-default').addClass('disabled');
					$mcqBox.find('.hint_message').text(question.hint).show('slow');
				});
		});
	};

	require(["gitbook"], function(gitbook) {
		gitbook.events.bind("page.change", function(){
			init();
		});
	});

})();
