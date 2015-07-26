"use strict";
/**
 * Created by stfn on 25.07.15.
 */


var foods = [];

class FoodProducer extends Component
{
    constructor(maxFood, rate)
    {
        super("foodProducer");
        this.maxFood = maxFood;
        this.rate = rate;
        this.food = maxFood;
    }

    update()
    {
        if(this.food <= 0)
        {
            this.entity.kill();
        }
        else
        {
            //this.food += this.rate/FPS;
        }
    }
}

class Food extends Entity
{
    constructor(x, y, maxFood, rate)
    {
        super();
        this.addComponent(new Transform(x, y));
        this.addComponent(new FoodProducer(5, 1));
        this.addComponent(new Collider(50,50, "food", []));
        this.addComponent(new CircleRenderer(25, "green"));
    }

    kill()
    {
        var i = foods.indexOf(this);
        foods.splice(i, 1);
        super.kill();
    }
}