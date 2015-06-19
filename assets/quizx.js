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

	function MultipleChoiceAttempt(qid, choice){ //a class for each attempt of submission of M.C.Q.
		this.qid = qid;
		this.choice = choice;
	};

	MultipleChoice.prototype.checkAns = function(input){
		if(input === this.ans)
			return true;
		else
			return false;
	};

	var init = function init(){

		//initialize Parse and all the parse classes and objects
		Parse.initialize("3zSfVGmxh558RHMqf8y1Yq2sv0nvPxBfg8yd0iGr", "K8J2Qut32rUIfz1CRQsIfw0PknacDU0L0ibhzLhS");
		var ParseMultipleChoice = Parse.Object.extend("MultipleChoice");
		var ParseMultipleChoiceAttempt = Parse.Object.extend("MultipleChoiceAttempt");

		var parseMultipleChoice = new ParseMultipleChoice();
		var parseMultipleChoiceAttempt = new ParseMultipleChoiceAttempt();

		$('.mcqBox').each(function(){

			var question = new MultipleChoice($(this).data('config'));

			//check if the questions exists in parse database, if not, submit it to database
			var query = new Parse.Query(ParseMultipleChoice);
			query.equalTo("qid", question.qid);

			query.find({
				success: function(results) {
					console.log(results.length);
			  		if(results.length == 0){
			  			console.log("There is nothing");
			  			parseMultipleChoice.save(question);
			  		}
			  	},
			  	error: function(error) {
			    	console.log("Error had occured while searching for match.");
			  	}
			});

			//enable the submit button
			$(this).find('button.submitMCQ').click(function(){

				var parseMultipleChoiceAttempt = new ParseMultipleChoiceAttempt();
				var attempt = new MultipleChoiceAttempt(question.qid, $('input[name=' + question.qid + '_group]:checked').val());

				parseMultipleChoiceAttempt.save(attempt);

				if(question.checkAns(attempt.choice)){
					$(this).parent().find('.MCQmessage').removeClass('MCQwrong').addClass('MCQright').text("Correct!");
					$(this).removeClass('btn-primary').addClass('btn-default').addClass('disabled');
					$('input[name=' + question.qid + '_group]').attr('disabled',true);
					if(question.target)
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
