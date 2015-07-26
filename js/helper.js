"use strict";
/**
 * Created by stfn on 25.07.15.
 */


class Vec2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    copy(vec2)
    {
        this.x = vec2.x;
        this.y = vec2.y;
    }

    clone()
    {
        return new Vec2(this.x, this.y);
    }

    log()
    {
        console.log("x: " + this.x + " y: " + this.y);
    }

    setZero()
    {
        this.x = 0.0;
        this.y = 0.0;
    }

    set(x, y)
    {
        this.x = x;
        this.y = y;
    }

    abs()
    {
        return new Vec2(Math.abs(this.x), Math.abs(this.y));
    }

    add(vec2)
    {
        return new Vec2(this.x+vec2.x, this.y+vec2.y);
    }

    sub(vec2)
    {
        return new Vec2(this.x-vec2.x, this.y-vec2.y);
    }

    mul(scalar)
    {
        return new Vec2(this.x*scalar, this.y*scalar);
    }

    dot(vec2)
    {
        return (this.x*vec2.x + this.y*vec2.y);
    }

    cross(vec2)
    {
        return this.x*vec2.y - this.y*vec2.x;
    }

    negate()
    {
        return new Vec2(-this.x, -this.y);
    }

    absLocal()
    {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
    }

    addLocal(vec2)
    {
        this.x += vec2.x;
        this.y += vec2.y;
    }

    subLocal(vec2)
    {
        this.x -= vec2.x;
        this.y -= vec2.y;
    }

    mulLocal(scalar)
    {
        this.x *= scalar;
        this.y *= scalar;
    }

    negateLocal()
    {
        this.x = -this.x;
        this.y = -this.y;
    }

    get length()
    {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    get lengthSquared()
    {
        return (this.x*this.x + this.y*this.y);
    }

    normalize()
    {
        let invL = 1 / this.length;
        this.x *= invL;
        this.y *= invL;
        return this.length;
    }

}


class Rect
{
    constructor(x, y, w, h)
    {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;

    }

    intersects(targetRect)
    {

        if ((targetRect.x < this.x + this.w) && (this.x < targetRect.x + targetRect.w) && (targetRect.y < this.y + this.h))
        {
            if (this.y < targetRect.y + targetRect.h) {
                return true;
            }
            else {
                return false
            }
        }
        else
        {
            return false;
        }
    }

    set(x, y)
    {
        this.x = x;
        this.y = y;
    }
}