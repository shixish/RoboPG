/*
 * Dungeon selection
 */

// __hasProp = {}.hasOwnProperty;
// __extends = function(child, parent) { 
// 	for (var key in parent) { 
// 		if (__hasProp.call(parent, key)) child[key] = parent[key]; 
// 	} 
// 	function ctor() {
// 		this.constructor = child;
// 	} 
// 	ctor.prototype = parent.prototype; 
// 	child.prototype = new ctor(); 
// 	child.__super__ = parent.prototype;
// 	return child; 
// };

// function extend(B, A){
// 	A.prototype = Object.create (B.prototype);
// 	A.prototype.constructor = A;
// 	// A.prototype.super = function(){
// 	// 	B.call (this);
// 	// }
// 	return A;
// }

var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;
 
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }
    _.extend(child, parent, staticProps);
 
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;
 
    if (protoProps) _.extend(child.prototype, protoProps);
    child.__super__ = parent.prototype;
    return child;
  };


// function Thing(){
// 	this.herp = 12353;
// }

// var Part = extend(Thing, function(hp){
// 	Thing.call(this);
// 	//this.super();
// 	this.hp = hp||100;
// });

// var Arm = extend(Part, function (){
// 	Part.call(this);
// 	//this.super();//inherit parent properties n shit

// 	this.derp = 123;
// });

//__extends(Arm, Part);



// var a = new Arm();
// console.log(a);

function Robot(){
	//var parts = [new Head(), new Arm(), new Arm(), new Leg(), new Leg()];
	var head = new Head(),
		lArm = new Arm(),
		rArm = new Arm(),
		torso = new Torso(),
		Legs = new Legs();


	//robot actions
	this.attack = function(){
		
	}

	this.block = function(){

	}


	//component parts
	function Head(){
		var hp = new HealthBar();
	}
	function Arm(){

	}
	function Torso(){

	}
	function Legs(){

	}

}

function Game(){//maintains game state
	var robotA = new Robot(),
		robotB = new Robot();
	//robotA.attack(robotB.head());
}


(function($){
	$('#test').html('Hello World!');
})(jQuery);