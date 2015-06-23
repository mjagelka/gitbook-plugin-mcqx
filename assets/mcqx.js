(function(){

	function MultipleChoice(input){ //a class for each multiple choice questions
		this.qid = input.id;
		this.ans = input.ans;

		this.title = input.title;
		this.option = input.option;

		if(input.hint)	this.hint = input.hint;
		if(input.target) this.target = input.target;
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

			if(Cookies.get(question.qid)) { //check if the question is already answered before

				//disable the question if it is already answered
				$mcqBox.find('.btn.submitMCQ').removeClass('btn-primary').addClass('btn-default disabled');
				if(question.hint)	$mcqBox.find('.btn.hintMCQ').removeClass('btn-info').addClass('btn-default disabled');
				$mcqBox.find('input[name=' + question.qid + '_group]').attr('disabled', true);

				$mcqBox.find('.MCQmessage').text('You had already answered this question.').show('slow');

				if(question.target && typeof sectionToggle === "function")	sectionToggle(question.target);//toggle the target section
			}

			//enable the submit button
			$mcqBox.find('.btn.submitMCQ').click(function(){

				if(question.checkAns($('input[name=' + question.qid + '_group]:checked').val())){

					Cookies.set(question.qid, true);//planting a cookie

					$mcqBox.find('.MCQmessage').text("Correct.").show('slow');
					$(this).removeClass('btn-primary').addClass('btn-default disabled');

					if(question.hint)
						$(this).siblings('.hintMCQ').removeClass('btn-info').addClass('btn-default disabled');

					$mcqBox.find('input[name=' + question.qid + '_group]').attr('disabled', true);
					if(question.target && typeof sectionToggle === "function")	sectionToggle(question.target);
				}
				else {
					$mcqBox.find('.MCQmessage').text("Wrong answer, try again.").show('slow').delay(1000).hide('slow');
				}
			});

			if(question.hint)
				$mcqBox.find('.btn.hintMCQ').click(function(){
					$(this).removeClass('btn-info').addClass('btn-default disabled');
					$mcqBox.find('.hint_message').text('('+question.hint+')').show('slow');
				});
		});
	};

	require(["gitbook"], function(gitbook) {
		gitbook.events.bind("page.change", function(){
			init();
		});
	});

})();
