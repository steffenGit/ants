"use strict";
/**
 * Created by stfn on 25.07.15.
 */
class Transform extends Component
{
    constructor(x, y)
    {
        super("transform");
        this.position = new Vec2(x,y);
        this.delta = new Vec2(0.0, 0.0);
    }
    update()
    {
        super.update();
        this.position.addLocal(this.delta);
        //this.position.log();
    }
}

var colliders = [];

class Collider extends Component
{
    constructor(w, h, name, targets)
    {
        super("collider");
        this.t = null;
        this.rect = new Rect(0, 0,  w, h);
        this.name = name;
        this.targets = targets;
    }

    update()
    {
        super.update();

        if(this.t == null)
        {
            this.t = this.entity.getComponent("transform");
            colliders.push(this);
        }

        this.rect.set(this.t.position.x, this.t.position.y);
        //console.log (" " + this.rect.x+ " " + this.rect.y);
        for(let col in colliders)
        {
            var c = colliders[col];
            if(c == this)
            {
                return;
            }
            else if (this.rect.intersects(c.rect))
            {
                for(let i in this.targets)
                {
                    if(this.targets[i] == c.name)
                    {
                        this.onCollision(c.entity);
                    }
                }

            }
        }
    }

    onCollision(e)
    {
        //var t = e.getComponent("collider").rect;
        //console.log("collision x:" + this.rect.x + " y: " + this.rect.y + " target x: " + t.x + " target y: " + t.y);
        //this.entity.kill();

    }

    kill()
    {
        var i = colliders.indexOf(this);
        colliders.splice(i,1);
    }
}