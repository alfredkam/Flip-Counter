FlipClock
=========

FlipClock in HTML5

Demo
====
http://alfredkam.com/apps/flipCounter/

Usage
====
initalize:
	flipCounter.init();

	//options
	flipCounter.init({
		type : "default", //you are given small or default size
		id : <element ID>, 
		digitLength : <integer>, //display x length of grids, default at 5
	});

to change the value:

	flipCounter.change(<value>);

