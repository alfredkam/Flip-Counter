(function(){

	var clock = {
		init : function() {
			var self = this;
			//settings
			this.digitLength = 5;
			this.height = 100;
			this.width = 1000;
			this.gap = 85;
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
			var _top = document.getElementById("flipClock-canvas-top").getContext('2d');
			var _bottom = document.getElementById("flipClock-canvas-bottom").getContext('2d');
			self.draw(_top, _bottom);
		},
		draw : function(_top, _bottom) {
			var self = this;
			self.setup(_top, _bottom);	
			self.updatePosition(_top,_bottom,3, 1);

		},
		feeder : function(ctx, value) {

		},
		setup : function(_top, _bottom) {
			var self = this;
			var gap = self.gap;
			self.numList = [];
			for(var i=0;i<self.digitLength;i++) {
				self.numList.push(0);
				_top.beginPath();
				_top.moveTo(i*gap + 20, 10);
				_top.lineTo(i*gap + 80, 10);
				_top.quadraticCurveTo(i*gap+90, 10, i*gap+90, 20);
				_top.lineTo(i*gap+90, 50);
				_top.lineTo(i*gap+10, 50);
				_top.lineTo(i*gap+10, 20);
				_top.quadraticCurveTo(i*gap+10, 10, i*gap+20, 10);
				_top.stroke();	
				_top.fillStyle = "black";
				_top.fill();
				_top.font = "70px Ariel";
				_top.fillStyle = "white";
				_top.fillText("0",i*gap + 33, 73);
				_top.strokeStyle = "white";
				_top.moveTo(i*gap + 10,50);
				_top.lineTo(i*gap + 90,50);
				_top.stroke();
				_top.closePath();
				_bottom.beginPath();
				_bottom.moveTo(i*gap+10,0);
				_bottom.lineTo(i*gap+90,0);
				_bottom.lineTo(i*gap+90,30);	
				_bottom.quadraticCurveTo(i*gap+90, 40, i*gap+80, 40);
				_bottom.lineTo(i*gap+20,40);
				_bottom.quadraticCurveTo(i*gap+10, 40, i*gap+10, 30);
				_bottom.lineTo(i*gap+10,0);
				_bottom.stroke();
				_bottom.fillStyle = "black";
				_bottom.fill();
				_bottom.fillStyle = "white";
				_bottom.font = "70px Ariel";
				_bottom.fillText("0",i*gap+33,23);
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
				_bottom.beginPath();
				_bottom.moveTo(pos*gap+10,0);
				_bottom.lineTo(pos*gap+90,0);
				_bottom.lineTo(pos*gap+90,30);	
				_bottom.quadraticCurveTo(pos*gap+90, 40, pos*gap+80, 40);
				_bottom.lineTo(pos*gap+20,40);
				_bottom.quadraticCurveTo(pos*gap+10, 40, pos*gap+10, 30);
				_bottom.lineTo(pos*gap+10,0);
				_bottom.stroke();
				_bottom.fillStyle = "black";
				_bottom.fill();
				_bottom.textBaseline = "alphabetic";
				_bottom.fillStyle = "white";
				_bottom.font = "70px Ariel";
				_bottom.fillText(prev,pos*gap+33,23);
				_bottom.closePath();
				//the to be animated part
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
				_bottom.fillStyle = "black";
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
				_top.beginPath();
				_top.moveTo(pos*gap + 20, 10);
				_top.lineTo(pos*gap + 80, 10);
				_top.quadraticCurveTo(pos*gap+90, 10, pos*gap+90, 20);
				_top.lineTo(pos*gap+90, 50);
				_top.lineTo(pos*gap+10, 50);
				_top.lineTo(pos*gap+10, 20);
				_top.quadraticCurveTo(pos*gap+10, 10, pos*gap+20, 10);
				_top.stroke();	
				_top.fillStyle = "black";
				_top.fill();
				_top.font = "70px Ariel";
				_top.fillStyle = "white";
				_top.textBaseline = "alphabetic";
				_top.fillText(digit,pos*gap + 33, 73);
				_top.closePath();
				
				//the to be animated part	
				_top.beginPath();
				_top.moveTo(pos*gap+20, step+10);
				_top.lineTo(pos*gap+80, step+10);
				_top.quadraticCurveTo(pos*gap+90,step+10, pos*gap+90,step+20);
				_top.lineTo(pos*gap+90,50);
				_top.lineTo(pos*gap+10,50);
				_top.lineTo(pos*gap+10,step+20);
				_top.quadraticCurveTo(pos*gap+10,step+10, pos*gap+20, step+10);
				_top.strokeStyle = "white";
				_top.stroke();
				_top.fillStyle = "black";
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
