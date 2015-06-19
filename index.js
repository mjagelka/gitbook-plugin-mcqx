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
            blocks: ["title", "a", "b", "c", "d", "e", "f", "g", "h"],
            process: function(blk) {
                var mcqView = fs.readFileSync(path.resolve(__dirname, "./views/mcq.jade"));
                var question = {id:'', ans:'', option:[]};

                question.id = blk.kwargs.id.trim();
                question.ans = blk.kwargs.ans.trim();

                blk.blocks.forEach(function(item){
                    question[item.name] = item.body.trim();

                    if(item.name == 'a' )       question.option['a'] = item.body.trim();
                    else if(item.name == 'b' )  question.option['b'] = item.body.trim();
                    else if(item.name == 'c' )  question.option['c'] = item.body.trim();
                    else if(item.name == 'd' )  question.option['d'] = item.body.trim();
                    else if(item.name == 'e' )  question.option['e'] = item.body.trim();
                    else if(item.name == 'f' )  question.option['f'] = item.body.trim();
                    else if(item.name == 'g' )  question.option['g'] = item.body.trim();
                    else if(item.name == 'h' )  question.option['h'] = item.body.trim();
                });

                return jade.render(mcqView, {question: question});
            }
        }
    }
};
