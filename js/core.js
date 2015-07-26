"use strict";
/**
 * Created by stfn on 23.07.15.
 */

var _entity_id = 0;
var _component_id = 0;
var entities = [];

class Entity
{
    static get _id()
    {
        return _entity_id++;
    }
    constructor()
    {
        this.components = [];
        this.id = Entity._id;
        entities.push(this);

    }

    addComponent(component)
    {
        component.entity = this;
        this.components[component.name] = component;
    }

    getComponent(name)
    {
        return this.components[name];
    }

    update()
    {
        for(let comp in this.components)
        {
            this.components[comp].update();
        }
    }

    kill()
    {
        console.log("kill");
        for(let comp in this.components)
        {
            this.components[comp].kill();
        }
        var i = entities.indexOf(this);
        entities.splice(i, 1);
    }
}


class Component
{
    static get _id()
    {
        return _component_id++;
    }

    constructor(name)
    {
        this.id = Component._id;
        this.name = name;
    }

    get entity()
    {
        return this._entity;
    }

    set entity(entity)
    {
        this._entity = entity;
    }

    update()
    {
       //console.log("update entity " + this.entity.id + " comp " + this.id);
    }

    kill()
    {

    }
}



