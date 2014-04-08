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
			name: 'Charge',
			cost: -50,
			dmg: 0
		}
	},
	rarm: {
		hp: 10,
		skill: {
			name: 'Chop',
			cost: 15,
			dmg: 15
		}
	},
	larm: {
		hp: 10,
		skill: {
			name: 'Lase',
			cost: 50,
			dmg: 50
		}
	},
	body: {
		hp: 25,
		skill: {
			name: 'Slam',
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


function Robot(parts_data){
	var _this = this;
	this.hp = 0;
	this.parts = {};
	this.skills = {};

	var constructor = function(parts_data){
		for(var p in parts_data){
			var part = new Part(_this, parts_data[p]);
			_this.parts[p] = part;
			_this.hp += part.hp;
			if (parts_data[p].skill != undefined){
				_this.skills[parts_data[p].skill.name] = new Skill(_this, parts_data[p].skill);
			}
		}
	}
	constructor(parts_data);


	this.use = function(skill_name, part){
		var skill;
		if (skill = this.skills[skill_name]){
			skill.use(part);
		}
		return false;
	}

	// this.hp = function(){
	// 	var total_hp = 0;
	// 	_.each(this.parts, function(part){
	// 		total_hp+=Number(part.hp);
	// 	});
	// 	return total_hp;
	// }

	function Skill(robot, skill_data){
		var _robot = robot, _this = this;
		this.dmg = skill_data.dmg;
		this.cost = skill_data.cost;

		this.use = function(part){
			//console.log(part, typeof part);
			if (part instanceof Object){
				//console.log("using skill!", this);
				part.takeDamage(this.dmg);
				return true;
			}
			return false;//error...
		}
	}

	function Part(robot, part_data){
		var _robot = robot, _this = this;
		this.hp = part_data.hp;

		this.takeDamage = function(amount){
			this.hp -= amount;
			robot.hp -= amount;
		}
	}
	
	//draw robot onto screen
	this.Render = function(element){
		$(element).html(this.total_hp);
	};
}

function Game(){//maintains game state
	var robotA = new Robot(dummy_data),
		robotB = new Robot(dummy_data);

	for (var i = 0; i<5; i++){
		console.log('game iteration ', i);
		var aSkill = _.sample(Object.keys(robotA.skills));
		var bSkill = _.sample(Object.keys(robotB.skills));

		robotA.use(aSkill, robotB.parts.head);
		robotB.use(bSkill, robotA.parts.head);
		console.log("Robot A uses: ", aSkill, "Robot B has " + robotB.hp + " life left.");
		console.log("Robot B uses: ", bSkill, "Robot A has " + robotA.hp + " life left.");
	}
}


(function($){
	//$('#test').html('Hello World!');
	// var Bob = new Robot(dummy_data);
	// Bob.Render($('#test'));
	new Game();
	
})(jQuery);