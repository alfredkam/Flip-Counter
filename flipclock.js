(function(){

	var clock = {
		init : function() {
			var self = this;
			//settings
			self.digitLength = 5;
			self.height = 100;
			self.width = 1000;
			self.gap = 85;
			self.numList = [];
			//creating canvas
			var top = document.createElement("canvas");
			top.height = this.height/2;
			top.width = this.width;	
			top.id = "flipClock-canvas-top";
			var bottom = document.createElement("canvas");
			bottom.height = this.height/2;
			bottom.width = this.width;
			bottom.id = "flipClock-canvas-bottom";
			
			document.getElementById("flipClock").appendChild(top);
			document.getElementById("flipClock").appendChild(bottom);
			self._top = document.getElementById("flipClock-canvas-top").getContext('2d');
			self._bottom = document.getElementById("flipClock-canvas-bottom").getContext('2d');
			self.draw(self._top, self._bottom);
		},
		draw : function(_top, _bottom) {
			var self = this;
			self.setup(_top, _bottom);	
			self.demo();
		},
		demo : function() {
			var self = this;
			var trigger = function(i) {
				window.setTimeout(function() { self.feeder(i) } ,1000*i);
			};
			
			for(var i=0;i<100;i++) {
				trigger(i);
			}
		},
		feeder : function(value) {
			var self = this;
			var _top = self._top;
			var _bottom = self._bottom;
			
			var str = value.toString();
			var length = str.length;
			var list = self.numList;
			
			for(var i=length-1, j=0; i >= 0; i--,j++) {
				if(list[self.digitLength-1-j].toString() == str.charAt(i)) 
					continue;
				self.updatePosition(_top,_bottom, self.digitLength-1-j,str.charAt(i));	
			}
	
		},
		setup : function(_top, _bottom) {
			var self = this;
			var gap = self.gap;
			for(var i=0;i<self.digitLength;i++) {
				self.numList.push(0);
				var lingrad = _top.createLinearGradient(0,3,0,50);
				lingrad.addColorStop(0,"#ccc");
				lingrad.addColorStop(1,"#000");
				_top.beginPath();
				_top.moveTo(i*gap + 20, 10);
				_top.lineTo(i*gap + 80, 10);
				_top.quadraticCurveTo(i*gap+90, 10, i*gap+90, 20);
				_top.lineTo(i*gap+90, 50);
				_top.lineTo(i*gap+10, 50);
				_top.lineTo(i*gap+10, 20);
				_top.quadraticCurveTo(i*gap+10, 10, i*gap+20, 10);
				_top.stroke();	
				_top.fillStyle = lingrad;
				_top.fill();
				_top.font = "70px Ariel";
				_top.fillStyle = "white";
				_top.fillText("0",i*gap + 33, 73);
				_top.strokeStyle = "white";
				_top.moveTo(i*gap + 10,50);
				_top.lineTo(i*gap + 90,50);
				_top.stroke();
				_top.closePath();
				var lingrad = _bottom.createLinearGradient(0,10,0,50);
				lingrad.addColorStop(1,"#ccc");
				lingrad.addColorStop(0,"#000");
				_bottom.beginPath();
				_bottom.moveTo(i*gap+10,0);
				_bottom.lineTo(i*gap+90,0);
				_bottom.lineTo(i*gap+90,30);	
				_bottom.quadraticCurveTo(i*gap+90, 40, i*gap+80, 40);
				_bottom.lineTo(i*gap+20,40);
				_bottom.quadraticCurveTo(i*gap+10, 40, i*gap+10, 30);
				_bottom.lineTo(i*gap+10,0);
				_bottom.stroke();
				_bottom.fillStyle = lingrad;
				_bottom.fill();
				_bottom.fillStyle = "white";
				_bottom.font = "70px Ariel";
				_bottom.fillText("0",i*gap+33,24);
				_bottom.closePath();
			}
		},
		//updates the position
		updatePosition : function(_top, _bottom, pos, digit) {
			var self = this;
			var gap = self.gap;
			var prev = self.numList[pos];
			self.numList[pos] = digit;
			var animateBottom = function(step) {
				var lingrad = _bottom.createLinearGradient(0,10,0,50);
				lingrad.addColorStop(1,"#ccc");
				lingrad.addColorStop(0,"#000");
				_bottom.beginPath();
				_bottom.moveTo(pos*gap+10,0);
				_bottom.lineTo(pos*gap+90,0);
				_bottom.lineTo(pos*gap+90,30);	
				_bottom.quadraticCurveTo(pos*gap+90, 40, pos*gap+80, 40);
				_bottom.lineTo(pos*gap+20,40);
				_bottom.quadraticCurveTo(pos*gap+10, 40, pos*gap+10, 30);
				_bottom.lineTo(pos*gap+10,0);
				_bottom.stroke();
				_bottom.fillStyle = lingrad;
				_bottom.fill();
				_bottom.textBaseline = "alphabetic";
				_bottom.fillStyle = "white";
				_bottom.font = "70px Ariel";
				_bottom.fillText(prev,pos*gap+33,24);
				_bottom.closePath();
				//the to be animated part
				var lingrad = _bottom.createLinearGradient(0,10,0,50);
				lingrad.addColorStop(1,"#ccc");
				lingrad.addColorStop(0,"#000");
				_bottom.beginPath();
				_bottom.moveTo(pos*gap+10, 0);
				_bottom.lineTo(pos*gap+90, 0);
				_bottom.lineTo(pos*gap+90, step-20);
				_bottom.quadraticCurveTo(pos*gap+90, step-10, pos*gap+80, step-10);
				_bottom.lineTo(pos*gap+20, step-10);
				_bottom.quadraticCurveTo(pos*gap+10, step-10, pos*gap+10, step-20);
				_bottom.lineTo(pos*gap+10, 0);
				_bottom.strokeStyle = "white";
				_bottom.stroke();
				_bottom.fillStyle = lingrad;
				_bottom.fill();
				_bottom.fillStyle = "white";
				_bottom.textBaseline = "bottom";
				_bottom.fillText(digit, pos*gap+33, 50 * Math.sin(step/50));
				_bottom.closePath();
				if(step+10 > self.height/2)
					return;	
				else
					window.setTimeout(function() { animateBottom(step+10);},100);
			};
			var animateTop = function(step) {
				var lingrad = _top.createLinearGradient(0,3,0,50);
				lingrad.addColorStop(0,"#ccc");
				lingrad.addColorStop(1,"#000");
				_top.beginPath();
				_top.moveTo(pos*gap + 20, 10);
				_top.lineTo(pos*gap + 80, 10);
				_top.quadraticCurveTo(pos*gap+90, 10, pos*gap+90, 20);
				_top.lineTo(pos*gap+90, 50);
				_top.lineTo(pos*gap+10, 50);
				_top.lineTo(pos*gap+10, 20);
				_top.quadraticCurveTo(pos*gap+10, 10, pos*gap+20, 10);
				_top.stroke();	
				_top.fillStyle = lingrad;
				_top.fill();
				_top.font = "70px Ariel";
				_top.fillStyle = "white";
				_top.textBaseline = "alphabetic";
				_top.fillText(digit,pos*gap + 33, 73);
				_top.closePath();
				
				//the to be animated part	
				var lingrad = _top.createLinearGradient(0,10*Math.sin(step/50),0,60*Math.sin((50-step)/50));
				lingrad.addColorStop(0,"#ccc");
				lingrad.addColorStop(1,"#000");
				_top.beginPath();
				_top.moveTo(pos*gap+20, step+10);
				_top.lineTo(pos*gap+80, step+10);
				_top.quadraticCurveTo(pos*gap+90,step+10, pos*gap+90,step+20);
				_top.lineTo(pos*gap+90,50);
				_top.lineTo(pos*gap+10,50);
				_top.lineTo(pos*gap+10,step+20);
				_top.quadraticCurveTo(pos*gap+10,step+10, pos*gap+20, step+10);
				_top.strokeStyle = "#ccc";
				_top.stroke();
				_top.fillStyle = lingrad;
				_top.fill();
				_top.fillStyle = "white";
				_top.textBaseline = "top";	
				_top.fillText(prev, pos*gap+33, 73*Math.sin((step)/50) );
				_top.fillStyle = "white";
				_top.moveTo(pos*gap + 10,50);
				_top.lineTo(pos*gap + 90,50);
				_top.stroke();
				_top.closePath();
				if(step > self.height/2)
					animateBottom(0);
				else 
					window.setTimeout(function() { animateTop(step+10);},100);
			}
			animateTop(0);

		},
	}

	window.onload = function() {
		clock.init();
	};

})();
