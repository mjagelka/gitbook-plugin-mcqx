var jade = require('jade');

var path = require('path');
var fs = require('fs');

module.exports = {

    // Extend ebook resources and html
    website: {
        assets: "./assets",
        css: [
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css",
            "mcqx.css"
        ],
        js: [
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js",
            "mcqx.js"
        ]
    },

    // Extend templating blocks
    blocks: {

        mcq: {
            blocks: ["title", "a", "b", "c", "d"],
            process: function(blk) {
                var mcqView = fs.readFileSync(path.resolve(__dirname, "./views/mcq.jade"));
                var question = {id: '', ans:'', a:'', b:'', c:'', d:''};

                question.id = blk.kwargs.id.trim();
                question.ans = blk.kwargs.ans.trim();

                if(question.target)
                    question.target = blk.kwargs.target.trim();

                blk.blocks.forEach(function(item){

                    if(item.name == 'title')
                        question.title = item.body.trim();
                    else if(item.name == 'a')
                        question.a = item.body.trim();
                    else if(item.name == 'b')
                        question.b = item.body.trim();
                    else if(item.name == 'c')
                        question.c = item.body.trim();
                    else if(item.name == 'd')
                        question.d = item.body.trim();
                });

                return jade.render(mcqView, {question: question});
            }
        }
    }
};
