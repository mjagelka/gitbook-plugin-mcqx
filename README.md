GitBook Multiple Choice Plugin
===

## Feature List

This is a multiple choice plugin developed for GitBook, packed with features including:

* Completed:
	* Include hints for the questions.
	* Cookies support: answered question will be disabled.

* To be implemented:
	* Randomize order of choice. (optional)
	* Include markdown support for question title and choices.
	* Allow addition of answer description.
	* Allow adding 2-8 options (currently fixed to 4).
	* Allow only showing a few of the inputted option.
	* Integration with my other plugin ```gitbook-plugin-sectionx``` to allow you to toggle new section once the correct answer is chosen.
	* ...

Another version of the plugin featuring analytics are also in the works. This version will not include this feature. It will be published as a separate plugin.

The plugin is still in active development, so the syntax is subjected to changed. See the plugin at work here: [Click Here](http://ymcatar.gitbooks.io/gitbook-test/content/testing_mcqx.html)

## Changelog

* 0.1 releases:
	* 0.0.2: Added cookies support: answered question will be disabled.
	* 0.0.1: Initial release.

## Usage

Each multiple choice question has this basic syntax:

```
{%mcq id="quizx-01", ans="a"%}
{%title%} This is a question?
{%a%} First option
{%b%} Second option
{%c%} Third option
{%d%} Fourth option
{%hint%} I'll give you a hint: the answer is A. 
{%endmcq%}
```

The "mcq" tag (line 1) must have the following arguments for it to work:

* **id**: a *unique* identifier for each multiple chocie question (if it is not unique, horrible bugs awaits.)
* **ans**: the id of correct option (possible values: ```a```,```b```,```c```,```d```.)

The content of the multiple choice question is included in the book as a sub-block for the mcq tag (line 2 - 7).

* **title**: question title (no markdown support for now).
* **a, b, c, d**: the text for each choice (only four is supported for now).
* **hint (optional)**: hint given to user when he presses the hint button.