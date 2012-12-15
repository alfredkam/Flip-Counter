(function(){

	function g() {};
	g.prototype.successfullInit = false;
	g.prototype.settings = {
			small : {
				height : 25,
				width : 45,
				gap : 45,
				step : 5,
				yTopLeft : 5,
				xTopLeft : 10,
				xBottomRight : 40,
				yBottomRight : 20,
				xBottomLeft: 45,
				yBottomLeft : 15,
				fontSize : 40,
				fontCenter : 15,
				fontTopAxis : 38,
				fontBottomAxis : 11,
			},
			default : {
				height : 50,
				width : 90,
				gap : 85,
				step : 10,
				yTopLeft : 10,
				xTopLeft : 20,
				xBottomRight : 80,
				yBottomRight : 40,
				xBottomLeft: 90,
				yBottomLeft : 30,
				fontSize : 70,
				fontCenter : 33,
				fontTopAxis : 73,
				fontBottomAxis : 24,
			},
		};
	g.prototype.init = function(json) {
			var self = this;
			var isJson = true;
			self.type = "default";
			//check for user input bugs
			try {
				eval(json);
			} catch(err) {
				isJson = false;
			}
			if(!isJson) {
				console.log("Bad Json");
				console.log("Require at least Element ID");
				return;
			}
			if(json.id == undefined) {
				console.log("Missing Element ID");
				return;
			}
			if(json.type != undefined ^ json.type != "small" ^ json.type != "default") {
				console.log("Type must be either small or default");
				return;
			} else if(json.type != undefined) {
				self.type = json.type;
			}
			if(json.digitLength != undefined && isNaN(json.digitLength)) {
				console.log("Must be int");
				return;
			} else if(json.digitLength != undefined) {
				self.digitLength = json.digitLength;
			} else {
				self.digitLength = 5;
			}

			//settings
			self.successfullInit = true;
			self.height = self.settings[self.type].height*2;
			self.width = self.settings[self.type].width*self.digitLength;
			self.gap = self.settings[self.type].gap;
			self.id = json.id;
			self.numList = [];
			self.stack = [];
			//creating canvas
			var top = document.createElement("canvas");
			top.height = this.height/2;
			top.width = this.width;	
			top.id = self.id+"-canvas-top";
			top.style.display = "block";
			var bottom = document.createElement("canvas");
			bottom.height = this.height/2;
			bottom.width = this.width;
			bottom.id = self.id+"-canvas-bottom";
			bottom.style.display = "block";
			
			document.getElementById(self.id).appendChild(top);
			document.getElementById(self.id).appendChild(bottom);
			self._top = document.getElementById(self.id+"-canvas-top").getContext('2d');
			self._bottom = document.getElementById(self.id+"-canvas-bottom").getContext('2d');
			self.draw(self._top, self._bottom);
		};
	g.prototype.draw = function(_top, _bottom) {
			var self = this;
			self.setup(_top, _bottom);	
		};
	g.prototype.demo = function() {
			var self = this;
			if(!self.successfullInit)
				return;
			for(var i=0;i<100;i++) {
				self.change(i);
			}
		};
	g.prototype.change = function(value) {
			var self = this;
			self.stack.push(value);	
			if(self.stack.length-1 == 0)
				self.listener();
		};
	g.prototype.listener = function () {
			var self = this;
			window.setTimeout(function() {
				self.feeder(self.stack.shift());
				if(self.stack.length > 0)
					self.listener();
			},1000);
		};
	g.prototype.feeder = function(value) {
			var self = this;
			var _top = self._top;
			var _bottom = self._bottom;
			
			var str = value.toString();
			var length = str.length;
			var list = self.numList;
			var j=0;	
			for(var i=length-1; i >= 0; i--,j++) {
				if(list[self.digitLength-1-j].toString() == str.charAt(i)) 
					continue;
				self.updatePosition(_top,_bottom, self.digitLength-1-j,str.charAt(i));	
			}
			for(;j < self.digitLength;j++) {
				if(list[ self.digitLength-1-j].toString() != "0")
					self.updatePosition(_top,_bottom, self.digitLength-1-j, 0);	
			}
	
		};
	g.prototype.setup = function(_top, _bottom) {
			var self = this;
			var gap = self.gap;
			for(var i=0;i<self.digitLength;i++) {
				self.numList.push(0);
				var lingrad = _top.createLinearGradient(0,3,0,self.settings[self.type].height);
				lingrad.addColorStop(0,"#ccc");
				lingrad.addColorStop(1,"#000");
				_top.beginPath();
				_top.moveTo(i*gap + self.settings[self.type].xTopLeft, self.settings[self.type].yTopLeft);
				_top.lineTo(i*gap + self.settings[self.type].xBottomRight, self.settings[self.type].yTopLeft);
				_top.quadraticCurveTo(i*gap+self.settings[self.type].xBottomLeft, self.settings[self.type].yTopLeft, i*gap+self.settings[self.type].xBottomLeft, self.settings[self.type].xTopLeft);
				_top.lineTo(i*gap+self.settings[self.type].xBottomLeft, self.settings[self.type].height);
				_top.lineTo(i*gap+self.settings[self.type].yTopLeft, self.settings[self.type].height);
				_top.lineTo(i*gap+self.settings[self.type].yTopLeft, self.settings[self.type].xTopLeft);
				_top.quadraticCurveTo(i*gap+self.settings[self.type].yTopLeft, self.settings[self.type].yTopLeft, i*gap+self.settings[self.type].xTopLeft, self.settings[self.type].yTopLeft);
				_top.stroke();	
				_top.fillStyle = lingrad;
				_top.fill();
				_top.font = self.settings[self.type].fontSize+"px Ariel";
				_top.fillStyle = "white";
				_top.fillText("0",i*gap + self.settings[self.type].fontCenter, self.settings[self.type].fontTopAxis);
				_top.strokeStyle = "white";
				_top.moveTo(i*gap + self.settings[self.type].yTopLeft,self.settings[self.type].height);
				_top.lineTo(i*gap + self.settings[self.type].xBottomLeft,self.settings[self.type].height);
				_top.stroke();
				_top.closePath();
				var lingrad = _bottom.createLinearGradient(0,self.settings[self.type].yTopLeft,0,self.settings[self.type].height);
				lingrad.addColorStop(1,"#ccc");
				lingrad.addColorStop(0,"#000");
				_bottom.beginPath();
				_bottom.moveTo(i*gap+self.settings[self.type].yTopLeft,0);
				_bottom.lineTo(i*gap+self.settings[self.type].xBottomLeft,0);
				_bottom.lineTo(i*gap+self.settings[self.type].xBottomLeft,self.settings[self.type].yBottomLeft);	
				_bottom.quadraticCurveTo(i*gap+self.settings[self.type].xBottomLeft, self.settings[self.type].yBottomRight, i*gap+self.settings[self.type].xBottomRight, self.settings[self.type].yBottomRight);
				_bottom.lineTo(i*gap+self.settings[self.type].xTopLeft,self.settings[self.type].yBottomRight);
				_bottom.quadraticCurveTo(i*gap+self.settings[self.type].yTopLeft, self.settings[self.type].yBottomRight, i*gap+self.settings[self.type].yTopLeft, self.settings[self.type].yBottomLeft);
				_bottom.lineTo(i*gap+self.settings[self.type].yTopLeft,0);
				_bottom.stroke();
				_bottom.fillStyle = lingrad;
				_bottom.fill();
				_bottom.fillStyle = "white";
				_bottom.font = self.settings[self.type].fontSize+"px Ariel";
				_bottom.fillText("0",i*gap+self.settings[self.type].fontCenter, self.settings[self.type].fontBottomAxis);
				_bottom.closePath();
			}
		};
		//updates the position
	g.prototype.updatePosition = function(_top, _bottom, pos, digit) {
			var self = this;
			var gap = self.gap;
			var prev = self.numList[pos];
			self.numList[pos] = digit;
			var animateBottom = function(step) {
				var lingrad = _bottom.createLinearGradient(0,self.settings[self.type].yTopLeft,0,self.settings[self.type].height);
				lingrad.addColorStop(1,"#ccc");
				lingrad.addColorStop(0,"#000");
				_bottom.beginPath();
				_bottom.moveTo(pos*gap+self.settings[self.type].yTopLeft,0);
				_bottom.lineTo(pos*gap+self.settings[self.type].xBottomLeft,0);
				_bottom.lineTo(pos*gap+self.settings[self.type].xBottomLeft,self.settings[self.type].yBottomLeft);	
				_bottom.quadraticCurveTo(pos*gap+self.settings[self.type].xBottomLeft, self.settings[self.type].yBottomRight, pos*gap+self.settings[self.type].xBottomRight, self.settings[self.type].yBottomRight);
				_bottom.lineTo(pos*gap+self.settings[self.type].xTopLeft,self.settings[self.type].yBottomRight);
				_bottom.quadraticCurveTo(pos*gap+self.settings[self.type].yTopLeft, self.settings[self.type].yBottomRight, pos*gap+self.settings[self.type].yTopLeft, self.settings[self.type].yBottomLeft);
				_bottom.lineTo(pos*gap+self.settings[self.type].yTopLeft,0);
				_bottom.stroke();
				_bottom.fillStyle = lingrad;
				_bottom.fill();
				_bottom.textBaseline = "alphabetic";
				_bottom.fillStyle = "white";
				_bottom.font = self.settings[self.type].fontSize+"px Ariel";
				_bottom.fillText(prev,pos*gap+self.settings[self.type].fontCenter,self.settings[self.type].fontBottomAxis);
				_bottom.closePath();
				//the to be animated part
				var lingrad = _bottom.createLinearGradient(0,self.settings[self.type].yTopLeft,0,self.settings[self.type].height);
				lingrad.addColorStop(1,"#ccc");
				lingrad.addColorStop(0,"#000");
				_bottom.beginPath();
				_bottom.moveTo(pos*gap+self.settings[self.type].yTopLeft, 0);
				_bottom.lineTo(pos*gap+self.settings[self.type].xBottomLeft, 0);
				_bottom.lineTo(pos*gap+self.settings[self.type].xBottomLeft, step-self.settings[self.type].xTopLeft);
				_bottom.quadraticCurveTo(pos*gap+self.settings[self.type].xBottomLeft, step-self.settings[self.type].yTopLeft, pos*gap+self.settings[self.type].xBottomRight, step-self.settings[self.type].yTopLeft);
				_bottom.lineTo(pos*gap+self.settings[self.type].xTopLeft, step-self.settings[self.type].yTopLeft);
				_bottom.quadraticCurveTo(pos*gap+self.settings[self.type].yTopLeft, step-self.settings[self.type].yTopLeft, pos*gap+self.settings[self.type].yTopLeft, step-self.settings[self.type].xTopLeft);
				_bottom.lineTo(pos*gap+self.settings[self.type].yTopLeft, 0);
				_bottom.strokeStyle = "white";
				_bottom.stroke();
				_bottom.fillStyle = lingrad;
				_bottom.fill();
				_bottom.fillStyle = "white";
				_bottom.textBaseline = "bottom";
				_bottom.fillText(digit, pos*gap+self.settings[self.type].fontCenter, self.settings[self.type].height * Math.sin(step/self.settings[self.type].height));
				_bottom.closePath();
				if(step+self.settings[self.type].step > self.height/2)
					return;	
				else
					window.setTimeout(function() { animateBottom(step+self.settings[self.type].step);},100);
			};
			var animateTop = function(step) {
				var lingrad = _top.createLinearGradient(0,3,0,self.settings[self.type].height);
				lingrad.addColorStop(0,"#ccc");
				lingrad.addColorStop(1,"#000");
				_top.beginPath();
				_top.moveTo(pos*gap + self.settings[self.type].xTopLeft, self.settings[self.type].yTopLeft);
				_top.lineTo(pos*gap + self.settings[self.type].xBottomRight, self.settings[self.type].yTopLeft);
				_top.quadraticCurveTo(pos*gap+self.settings[self.type].xBottomLeft, self.settings[self.type].yTopLeft, pos*gap+self.settings[self.type].xBottomLeft, self.settings[self.type].xTopLeft);
				_top.lineTo(pos*gap+self.settings[self.type].xBottomLeft, self.settings[self.type].height);
				_top.lineTo(pos*gap+self.settings[self.type].yTopLeft, self.settings[self.type].height);
				_top.lineTo(pos*gap+self.settings[self.type].yTopLeft, self.settings[self.type].xTopLeft);
				_top.quadraticCurveTo(pos*gap+self.settings[self.type].yTopLeft, self.settings[self.type].yTopLeft, pos*gap+self.settings[self.type].xTopLeft, self.settings[self.type].yTopLeft);
				_top.stroke();	
				_top.fillStyle = lingrad;
				_top.fill();
				_top.font = self.settings[self.type].fontSize+"px Ariel";
				_top.fillStyle = "white";
				_top.textBaseline = "alphabetic";
				_top.fillText(digit,pos*gap + self.settings[self.type].fontCenter, self.settings[self.type].fontTopAxis);
				_top.closePath();
				
				//the to be animated part	
				var lingrad = _top.createLinearGradient(0,self.settings[self.type].yTopLeft*Math.sin(step/self.settings[self.type].height),0,60*Math.sin((self.settings[self.type].height-step)/self.settings[self.type].height));
				lingrad.addColorStop(0,"#ccc");
				lingrad.addColorStop(1,"#000");
				_top.beginPath();
				_top.moveTo(pos*gap+self.settings[self.type].xTopLeft, step+self.settings[self.type].yTopLeft);
				_top.lineTo(pos*gap+self.settings[self.type].xBottomRight, step+self.settings[self.type].yTopLeft);
				_top.quadraticCurveTo(pos*gap+self.settings[self.type].xBottomLeft,step+self.settings[self.type].yTopLeft, pos*gap+self.settings[self.type].xBottomLeft,step+self.settings[self.type].xTopLeft);
				_top.lineTo(pos*gap+self.settings[self.type].xBottomLeft,self.settings[self.type].height);
				_top.lineTo(pos*gap+self.settings[self.type].yTopLeft,self.settings[self.type].height);
				_top.lineTo(pos*gap+self.settings[self.type].yTopLeft,step+self.settings[self.type].xTopLeft);
				_top.quadraticCurveTo(pos*gap+self.settings[self.type].yTopLeft,step+self.settings[self.type].yTopLeft, pos*gap+self.settings[self.type].xTopLeft, step+self.settings[self.type].yTopLeft);
				_top.strokeStyle = "#ccc";
				_top.stroke();
				_top.fillStyle = lingrad;
				_top.fill();
				_top.fillStyle = "white";
				_top.textBaseline = "top";	
				_top.fillText(prev, pos*gap+self.settings[self.type].fontCenter, self.settings[self.type].fontTopAxis*Math.sin((step)/self.settings[self.type].height) );
				_top.fillStyle = "white";
				_top.moveTo(pos*gap + self.settings[self.type].yTopLeft,self.settings[self.type].height);
				_top.lineTo(pos*gap + self.settings[self.type].xBottomLeft,self.settings[self.type].height);
				_top.stroke();
				_top.closePath();
				if(step > self.height/2)
					animateBottom(0);
				else 
					window.setTimeout(function() { animateTop(step+self.settings[self.type].step);},100);
			}
			animateTop(0);

		};

	var exportSingleton = function(name, obj, attr) {
		if(!window[name]) {
			var g = window[name] = new obj;
			for(var i=0;i<attr.length;i++) {
				try {
				g[attr[i][0]] = attr[i][1];
				} catch(err) {
				}
			}
		}
	}
	var proto = g.prototype,
		attr = [
			["init",proto.init],
			["change",proto.change],
			["demo",proto.demo]
		];
	exportSingleton("flipCounter", g, attr);

})();
