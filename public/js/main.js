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

var dummy_data = {
	head: {
		hp: 100,
		skill: {
			name: 'charge',
			cost: -50,
			dmg: 0
		}
	},
	rarm: {
		hp: 10,
		skill: {
			name: 'axe',
			cost: 15,
			dmg: 15
		}
	},
	larm: {
		hp: 10,
		skill: {
			name: 'laser',
			cost: 50,
			dmg: 50
		}
	},
	body: {
		hp: 25,
		skill: {
			name: 'slam',
			cost: 100,
			dmg: 80
		},
		speed: -5
	},
	legs: {
		hp: 50,
		speed: 10
	}
};


function Robot(parts){
	//var parts = [new Head(), new Arm(), new Arm(), new Leg(), new Leg()];
	/*
	var head = new Head(),
		lArm = new Arm(),
		rArm = new Arm(),
		body = new body(),
		Legs = new Legs();
	*/
	
	this.Head = parts.head;
	this.Larm = parts.larm;
	this.Rarm = parts.rarm;
	this.Legs = parts.legs;
	
	this.Skills = [
		parts.larm.skill,
		parts.rarm.skill,
		parts.body.skill,
		parts.head.skill	
	];	
	
	//total robot health
	var total_hp = 0;
	_.each(parts, function(part){
		total_hp+=Number(part.hp);
	});
	this.total_hp = total_hp;
	
	//draw robot onto screen
	this.Render = function(element){
		$(element).html(this.total_hp);
	};
}

function Game(){//maintains game state
	var robotA = new Robot(),
		robotB = new Robot();
}


(function($){
	//$('#test').html('Hello World!');
	var Bob = new Robot(dummy_data);
	Bob.Render($('#test'));
	
})(jQuery);