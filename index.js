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
            "js.cookie.js",
            "mcqx.js"
        ]
    },

    // Extend templating blocks
    blocks: {

        mcq: {
            blocks: ["title", "o1", "o2", "o3", "o4", "o5", "o6", "o7", "o8", "hint"],
            process: function(blk) {

                var question = {id:'', ans:'', count: 0, option:[]};

                question.id = blk.kwargs.id.trim();
                question.ans = blk.kwargs.ans.trim();
                question.random = blk.kwargs.random || false;

                if(blk.kwargs.target) question.target = blk.kwargs.target.trim();

                blk.blocks.forEach(function(item){
                    var alphabet = ['o1','o2','o3','o4','o5','o6','o7','o8'];
                    if(item.body && alphabet.indexOf(item.name) >= 0)
                        question.option.push({'id':item.name, 'body':item.body.trim()});
                    else
                        question[item.name] = item.body.trim();
                });

                question.count = blk.kwargs.count || question.option.length;
                
                // select different template for website / pdf
                var mcqView = (this.generator === 'website'? 
                    fs.readFileSync(path.resolve(__dirname, "./views/mcq.jade")):
                    fs.readFileSync(path.resolve(__dirname, "./views/mcq_pdf.jade")));

                return jade.render(mcqView, {question: question});
            }
        }
    }
};
