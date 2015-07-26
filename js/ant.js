"use strict";
/**
 * Created by stfn on 23.07.15.
 */


var ants = [];
class AntHealth extends Component
{
    constructor(maxHealth)
    {
        super("antHealth");
        this.maxHealth = maxHealth;
        this._age = 0.0;
        this._wounds = 0.0;
    }

    get age()
    {
        return this._age;
    }
    set age(age)
    {
        this._age = age;
    }

    get wounds()
    {
        return this._wounds;
    }

    set wounds(wound)
    {
        this._wounds = wound;
    }

    addWound(wound)
    {
        this.wounds += wound;
        //console.log(this.health);
    }
    get health()
    {
        return this.maxHealth - this.wounds - this.age;
    }
    update()
    {
        super.update();
        //this.age += 1/FPS;
        if(this.health < 0)
        {
            this.entity.kill();
        }
    }
}


class AntLeg extends Component
{
    constructor(maxSpeed)
    {
        super("antLeg");
        this.maxSpeed = maxSpeed;
        this._target = null;
    }

    set target(vec2)
    {
        this._target = vec2;
    }
    get target()
    {
        return this._target;
    }

    update()
    {
        super.update();
        var t = this.entity.getComponent("transform");
        if(this.target != null)
        {
            var d = this.target.sub(t.position);
            if(d.length < this.maxSpeed)
            {
                this.target = null;
                t.delta.setZero();
                return;
            }
            d.normalize();
            t.delta = d.mul(this.maxSpeed);
        }
    }
}

class AntStomach extends Component
{
    constructor(maxFood)
    {
        super("antStomach");
        this.maxFood = maxFood;
        this._food = maxFood;
    }

    get food()
    {
        return this._food;
    }

    set food(food)
    {
        this._food = food;
    }

    get deltaFood()
    {
        return this.maxFood - this.food;
    }

    eat(food)
    {
        this.food += food;
        if(this.food > this.maxFood)
        {
            this.food = this.maxFood;
        }
    }

    update()
    {
        this.food -= 1/FPS;
        //console.log("food: " + this.food);
        if(this.food <= 0)
        {
            this.food = 0.0;
            this.entity.getComponent("antHealth").addWound(1/FPS)
        }
    }


}

class AntBrain extends Component{
    constructor()
    {
        super("antBrain");
    }


    update()
    {
        var leg = this.entity.getComponent("antLeg");
        if(leg.target == null)
        {

            var dx = Math.floor((Math.random() * 500) + 1);
            var dy = Math.floor((Math.random() * 500) + 1);
            leg.target = new Vec2(dx, dy);
        }
    }
}

class AntFoodCollider extends Collider
{
    constructor(w, h)
    {
        super(w, h, "ant", ["food"]);
    }

    onCollision(e)
    {
        var f = e.getComponent("foodProducer");
        console.log(f.food);
        var s =  this.entity.getComponent("antStomach");
        if(s.deltaFood < f.food)
        {
            f.food -= s.deltaFood;
            s.eat(s.deltaFood);
        }
        else
        {
            s.eat(f.food);
            f.food = 0;
        }
    }
}

class Ant extends Entity
{
    constructor(x, y)
    {
        super();
        this.addComponent(new Transform(x, y));
        this.addComponent(new AntLeg(8));
        this.addComponent(new AntBrain());
        this.addComponent(new AntHealth(10));
        this.addComponent(new AntStomach(5));
        this.addComponent(new CircleRenderer(15, "orange"));
        this.addComponent(new AntFoodCollider(30,30));

        ants.push(this);

    }
    set target(vec2)
    {
        this.getComponent("antLeg").target = vec2;
    }

    kill()
    {
        var i = ants.indexOf(this);
        ants.splice(i, 1);
        super.kill();
    }


}