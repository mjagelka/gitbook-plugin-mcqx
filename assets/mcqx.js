(function(){

	function MultipleChoice(input){ //a class for each multiple choice questions
		this.qid = input.id;
		this.ans = input.ans;

		this.title = input.title;
		this.option = input.option;

		if(input.hint)	this.hint = input.hint;
		if(input.target) this.target = input.target;
		if(input.count) this.count = input.count;
		if(input.random) this.random = input.random;
	};

	MultipleChoice.prototype.checkAns = function(input){
		if(input === this.ans)
			return true;
		else
			return false;
	};

	Array.prototype.shuffle = function() { // Durstenfeld shuffle, thanks stack overflow for this part
	    for (var i = this.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = this[i];
	        this[i] = this[j];
	        this[j] = temp;
	    }
	    return this;
	}

	var init = function(){

		$('.mcqBox').each(function(){

			var question = new MultipleChoice($(this).data('config'));
			var $mcqBox = $(this);

			// prepare options  ---------------------------

			if(question.random || question.count < question.option.length){
				var optionsToShow = [], randomIndex = [];
				for(var i=0; i<question.option.length; i++)
					randomIndex.push(i);

				randomIndex = randomIndex.shuffle().slice(0, question.count+1);
				console.log(randomIndex);

				question.option.forEach(function(option, i){
					if(option.id === question.ans)
						optionsToShow.push(option);
					else if(optionsToShow.length < question.count && randomIndex.indexOf(i) >= 0)
						optionsToShow.push(option);
				});

				optionsToShow = optionsToShow.shuffle();
			}
			else
				optionsToShow = question.option;

			// display the option to html
			optionsToShow.forEach(function(option, i){
				$mcqBox.find('.ansHere'+i).text(option.body);
				$mcqBox.find('.ansHere'+i).siblings('input').val(option.id);
			});

			// dark theme handler ---------------------------
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

			// add the button  ---------------------------


			// check if the question is already answered before  ---------------------------
			if(Cookies.get(question.qid)) {

				//disable the question if it is already answered
				$mcqBox.find('.btn.submitMCQ').removeClass('btn-primary').addClass('btn-default disabled');
				if(question.hint)	$mcqBox.find('.btn.hintMCQ').removeClass('btn-info').addClass('btn-default disabled');
				$mcqBox.find('input[name=' + question.qid + '_group]').attr('disabled', true);

				$mcqBox.find('.MCQmessage').text('You had already answered this question.').show('slow');

				if(question.target && typeof sectionToggle === "function")	sectionToggle(question.target);//toggle the target section
			}

			// hint handler for hint button ---------------------------
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

			// click handler for hint button ---------------------------
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
