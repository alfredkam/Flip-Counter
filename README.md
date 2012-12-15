FlipClock
=========

FlipClock in HTML5

Demo
====
http://alfredkam.com/apps/flipClock/

Usage
====
initalize:
	flipClock.init();

	//options
	flipClock.init({
		type : "default", //you are given small or default size
		id : <element ID>, 
		digitLength : <integer>, //display x length of grids, default at 5
	});

to change the value:
	flipClock.change(<value>);

