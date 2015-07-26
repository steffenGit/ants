"use strict";
/**
 * Created by stfn on 25.07.15.
 */

class QueenEggs extends Component
{
    constructor(rate)
    {
        super("queenEggs");
        this.rate = rate;
        this.ticks = 0;
    }

    update()
    {
        this.ticks++;
        if(this.ticks/FPS > this.rate)
        {
            var t = this.entity.getComponent("transform").position;
            new Ant(t.x, t.y);
            this.ticks = 0;
        }
    }
}

class Queen extends Entity
{
    constructor(x, y)
    {
        super();
        this.addComponent(new Transform(x, y));
        this.addComponent(new QueenEggs(2));
        this.addComponent(new CircleRenderer(25, "brown"));

    }
}