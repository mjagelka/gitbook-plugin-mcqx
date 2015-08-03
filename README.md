GitBook Multiple Choice Plugin
===

## Demo

See the plugin at work here: [Click Here](http://ymcatar.gitbooks.io/gitbook-test/content/testing_mcqx.html)

## Code generator

Syntax too complicated? Use the code generator in the [plugin homepage](http://ymcatar.github.io/gitbook-plugin-mcqx/).

![](http://i.imgur.com/AD1C50h.gif)

## Feature List

This is a multiple choice plugin developed for GitBook, packed with interactive features including:

* Hints for the questions.
* Cookies support: answered question will be disabled when page load.
* Integration with my other plugin ```gitbook-plugin-sectionx``` to allow you to toggle new section once the correct answer is chosen (use ```target``` paramater to control it, see below).
* Randomize order of choice.
* Allow adding 2-8 options.
* Allow addition of answer description.
* Dark theme support.
* .pdf, .mobi, .epub export supported.

Another version of the plugin featuring analytics are also in the works. This version will not include this feature. It will be published as a separate plugin.

Please not that the plugin is still in active development, so the syntax is subjected to changed.

## Changelog

* 0.4 releases:
	* **0.4.2:** Fixed choppy animation.
	* **0.4.1:** Fixed bug that make text in ```{%message%}``` not appearing.
	* **0.4.0:**
		* Improved looks.
		* Added animation back.


* 0.3 releases:
	* **0.3.2:** Fixed font size too big / cookies not saving.
	* **0.3.1:** Fixed css issue.
	* **0.3.0:**
		* No need to enter a id now. It is now auto-generated.
		* Simplified code, the plugin will now work quicker.
		* Improved looks in website.
		* Improved looks in .pdf - answer will now be displayed upside down.
		* Added markdown support for question title.


* 0.2 releases:
	* **0.2.2:** Updated looks when exported to .pdf.
	* **0.2.1:** Updated README only. No need to upgrade the plugin.
	* **0.2.0:** Added code generator, no more need to learn the syntax!


* 0.1 releases:
	* **0.1.4:** Fixed animation.
	* **0.1.3:** Allow addition of answer description. Improved dark theme appearance.
	* **0.1.2:** Fixed a terrible typo in ```package.json``` that cause 0.1.1 to be not working.
	* **0.1.1:** Improved options shuffling algorithm.
	* **0.1.0:** You can now randomize order of options and include questions with up to 8 options.


* 0.0 releases:
	* **0.0.4:** Fixed bug related to ```gitbook-plugin-sectionx``` integration.
	* **0.0.3:** Integration with my other plugin ```gitbook-plugin-sectionx``` to allow you to toggle new section once the correct answer is chosen (use ```target``` paramater to control it, see below).
	* **0.0.2:** Added cookies support: answered question will be disabled.
	* **0.0.1:** Initial release.

## Usage

### Code generator

Syntax too complicated? Use the code generator in the [plugin homepage](http://ymcatar.github.io/gitbook-plugin-mcqx/).

### Basic syntax

Each multiple choice question has this basic syntax, they are **not optional**:

```
{%mcq ans="o1"%}
{%title%} This is a question?
{%o1%} First option
{%o2%} Second option
{%o3%} Third option
{%o4%} Fourth option
{%endmcq%}
```

The ```{%mcq%}``` tag (line 1) must have the following arguments for it to work:

* **```ans```**: the id of correct option (possible values: ```o1```,```o2```,```o3```,```o4```,```o5```,```o6```,```o7```,```o8```)

The content of the multiple choice question is included in the book as a sub-block for the mcq tag (line 2 - 7).

* **```title```**: question title (no markdown support for now).
* **```o1```, ```o2```, ```o3```, ```o4```, ```o5```, ```o6```, ```o7```, ```o8```**: text for each options (you can include up to eight optio).

### Display hints

You can add a ```{%hint%}``` sub-block to display a hint message. They will be shown when the user click the "Hint" button.

```
{%mcq ans="o1", count=2%}
{%title%} This is a question?
{%o1%} First option
{%o2%} Second option
{%o3%} Third option
{%o4%} Fourth option
{%hint%} This is a hint.
{%endmcq%}
```

### Display only a certain number of options

You can add an optional ```count``` parameter to the ````{%mcq%}``` tag to show only a certain number of options.

```
{%mcq ans="o1", count=2%}
{%title%} This is a question?
{%o1%} First option
{%o2%} Second option
{%o3%} Third option
{%o4%} Fourth option
{%o5%} Fourth option
{%o6%} Fourth option
{%o7%} Fourth option
{%o8%} Fourth option
{%endmcq%}
```

In this case, only two options will be displayed for the user to choose (the correct answer will always be included). The order of the options will be random (no matter you set the ```random=true``` argument for not).

### Random

You can add an optional ```random=true``` parameter to the ```{%mcq%}``` tag to let the order of the options to be randomized.

```
{%mcq ans="o1", random=true%}
{%title%} This is a question?
{%o1%} First option
{%o2%} Second option
{%o3%} Third option
{%o4%} Fourth option
{%endmcq%}
```

### Integration with gitbook-plugin-sectionx plugin

You can add an optional ```target``` parameter to the ```{%mcq%}``` tag to make a section visible after the user answer a question correctly.

This feature is used in [this page](http://ymcatar.gitbooks.io/gitbook-test/content/testing_mcqx.html), you can see the source code at the end of the page.

You must first install ```gitbook-plugin-sectionx``` before you can use this feature.

```
{%mcq ans="o1", target="q2"%}
{%title%} This is a question?
{%o1%} First option
{%o2%} Second option
{%o3%} Third option
{%o4%} Fourth option
{%endmcq%}
```

In the above example, ```q2``` is id of the section to be toggled.
