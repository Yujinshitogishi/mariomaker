enchant()

window.onload = function (){
    var game = new Core();

    game.onload = function (){
        var world = PhysicsWorld(0,9.8);

        game.rootScene.onenterframe = function (){
            wolrd.step(game.fps);
        }

    }
    game.start();
}
    

