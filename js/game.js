"use strict";
/**
 * Created by stfn on 23.07.15.
 */
let stage;

let FPS = 20;




function init() {
    // code here.
    stage = new createjs.Stage("demoCanvas");



    for(var i = 0; i < 20; i++)
    {
        var y = Math.floor((Math.random() * 500) + 1);
        var x = Math.floor((Math.random() * 500) + 1);
        new Food(x,y);
    }

    new Queen(300, 300);


    //a.getComponent("antHealth").addWound(5);
    stage.update();
    createjs.Ticker.addEventListener("tick", update);



}


function update(event)
{
    for(let e in entities)
    {
        entities[e].update();
    }
    stage.update(event);
}



