"use strict";
/**
 * Created by stfn on 25.07.15.
 */



class CircleRenderer extends Component
{
    constructor(r, color)
    {
        super("circleRenderer");
        this.r = r;
        this.color = color;
        this.circle = new createjs.Shape();
        this.t = null;

    }
    update()
    {
        super.update();

        if(this.t == null)
        {
            this.t = this.entity.getComponent("transform");
            this.circle.x = this.t.position.x + this.r;
            this.circle.y = this.t.position.y + this.r;
            this.circle.graphics.beginFill(this.color).drawCircle(0,0, this.r);
            stage.addChild(this.circle);
        }

        this.circle.x = this.t.position.x + this.r;
        this.circle.y = this.t.position.y + this.r;

    }
    kill()
    {
        stage.removeChild(this.circle);
    }
}