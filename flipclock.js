(function(){

	var clock = {
		init : function() {
			var self = this;
			//settings
			this.digitLength = 5;
			this.height = 100;
			this.width = 1000;
			//creating canvas
			var canvas = document.createElement("canvas");
			canvas.height = "100px";
			canvas.width = "1000px";	
			canvas.id = "flipClock-canvas";
			document.getElementById("flipClock").appendChild(canvas);
			var ctx = document.getElementById("flipClock-canvas").getContext('2d');
			self.draw(ctx);
		},
		draw : function(ctx) {
			var self = this;
			ctx.beginPath();
			for(var i=0;i<self.digitLength;i++) {
				ctx.moveTo(20, 10);
				ctx.lineTo(80, 10);
				ctx.quadraticCurveTo(90, 10, 90, 20);
				ctx.lineTo(90, 80);
				ctx.quadraticCurveTo(90, 90, 80, 90);
				ctx.lineTo(20, 90);
				ctx.quadraticCurveTo(10, 90, 10, 80);
				ctx.lineTo(10, 20);
				ctx.quadraticCurveTo(10, 10, 20, 10);
				ctx.stroke();	
			}
			ctx.closePath();
		},
	}

})();
