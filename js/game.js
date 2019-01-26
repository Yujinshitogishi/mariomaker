enchant();
window.onload = function () {
    var config = {
        apiKey: "AIzaSyBQiAvFBdOC-EMi0pwWkRLgLby8pW8RKLY",
        authDomain: "mariomaker-15e12.firebaseapp.com",
        databaseURL: "https://mariomaker-15e12.firebaseio.com",
        projectId: "mariomaker-15e12",
        storageBucket: "mariomaker-15e12.appspot.com",
        messagingSenderId: "89587172319"
    };
    var blocks = [];
    var middle_blocks = [];
    firebase.initializeApp(config);
    const keys = localStorage.getItem("key");
    const count = localStorage.getItem("count");
    const newPostRef = firebase.database().ref();
    const secondPostRef = firebase.database().ref(keys);;
    secondPostRef.on("child_added", function (data) {
        var v = data.val();
        var k = data.key;
        // console.log(count);
    })
    newPostRef.on("child_added", function (data) {
        var v = data.val();
        var k = data.key;

        for (let x = 0; x < 16; x++) {
            if (typeof blocks[x] == "undefined") {
                blocks[x] = v.key;
                // console.log(v.key);
                middle_blocks[x] = v.key_middle;
                // console.log(middle_blocks[x]);
                x++;
                break;
            }

        }     // console.log(data.val());
        console.log(v.key);


        //画面生成
        const core = new Core(624, 256);
        //画像読み込み
        core.preload('imgs/IMG_4383.png', 'imgs/background.png', 'imgs/gameover.png', 'imgs/1224677279 (1) (1) (1).png');
        core.fps = 24;
        //background
        core.onload = function () {

            let blocks_stage = [
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            ];



            // console.log(count);
            console.log(blocks[count]);
            console.log(blocks);
            console.log(middle_blocks);
            console.log(middle_blocks[count]);
            blocks_stage[2] = middle_blocks[count];
            blocks_stage[3] = blocks[count];
            blocks_floor = blocks_stage[3];
            block_middle = blocks_stage[2];
            console.log(blocks_floor);
            console.log(block_middle);
            // console.log(data.val());
            // console.log(blocks[3]);
            // console.log(v.key);
            var label = new Label();
            label.x = 280;
            label.y = 5;
            label.color = 'red';
            label.font = '14px "Arial"';
            label.text = '0';
            label.on('enterframe', function () {
                label.text = (core.frame / core.fps).toFixed(2);
            });
            core.rootScene.addChild(label);

            console.log(blocks_stage);
            var map = new Map(64, 64);
            map.image = core.assets["imgs/background.png"];
            map.loadData(blocks_stage);


            var mario = new Sprite(32, 32);
            mario.image = core.assets['imgs/IMG_4383.png'];
            mario.vx = 0;

            mario.y = 270;
            core.rootScene.addChild(mario);
            var kuribo = new Sprite(32, 32);
            kuribo.image = core.assets['imgs/1224677279 (1) (1) (1).png'];
            // kuribo.x = 200;
            kuribo.y = 163;
            kuribo.vx = 0;
            // core.rootScene.addChild(kuribo);
            mario.vx = 0;
            mario.vy = 0;
            mario.zy =
                mario.jumping = false;
            mario.frame = 1
            // mario.collision = false;

            mario.on('enterframe', function () {
                var ax = 0;


                //マリオ操作
                if (core.input.right) ax += 0.3;
                if (core.input.left) ax -= 0.3;
                if (mario.vx > 0.1) ax -= 0.2;
                else if (mario.vx > 0) ax -= mario.vx;
                if (mario.vx < 0.1) ax += 0.1;
                else if (mario.vx < 0) ax -= mario.vx;
                mario.vx += ax;
                map.loadData(blocks_stage);
                this.frame = this.age % 3;

                if (mario.vx > 5) {

                }

                //ジャンプ時
                if (core.input.up && !mario.jumping) {
                    mario.vy = -5;
                    mario.jumping = true;
                }
                mario.vy += 0.15;
                // console.log(mario.vy);
                mario.x += mario.vx;
                mario.y += mario.vy;

                if (mario.y > 163) {
                    mario.y = 163;
                    mario.jumping = false;
                }
                //  && !mario.collision
                //kuribo-hello速さ
                if (mario.x > 107) {
                    // kuribo.x -= 3;
                }




                const gameOverScene = new Scene(); //新しいシーンを生成 
                gameOverScene.backgroundColor = 'black';
                gameOverScene.image = core.assets['imgs/gameover.png'];
                gameOverScene.addChild(gameOverScene.image);
                const endScene = new Scene();
                endScene.backgroundColor = "black";
                //衝突判定i
                if (this.x > 770) {
                    core.stop();
                    core.pushScene(endScene);
                    setTimeout(function () {
                        alert(label.text + 'です');
                    }, 500)

                }

                // if (endScene == true) {
                //     alert(label.text);
                // }
                if (this.within(kuribo, 20)) {
                    core.pushScene(gameOverScene); //新しいシーン埋め込み
                    // core.stop(); //シーンストップ

                    mario.collision = true;
                    core.stop();
                    setTimeout(function () {
                        core.pushScene(gameOverScene);
                    }, 1000);
                }
                let z = 0;
                // console.log(this.x);
                console.log(z);
                for (let z = 0; z < 24; z++) {
                    if (64 * z - 12 > this.x && this.x > 64 * z - 76) {
                        z++;
                        if (blocks_floor[z - 2] == 3) {


                            if (!mario.jumping) {
                                for (let fllow = 0; fllow < 10; fllow++) {
                                    mario.vy += 20;
                                    mario.y = !163;
                                    mario.y = 220;
                                    core.pushScene(gameOverScene);
                                    // setTimeout(function (){
                                    //     core.pushScene(gameOverScene); //
                                    // },1000)
                                }
                                // break;
                            }
                            break;

                        }
                        break;
                    }
                    if (blocks_floor[z - 2] == 0 || blocks_floor[z - 2] == 1 || blocks_floor[z - 2] == 2) {
                        z++

                        if (block_middle[z - 2] == 4) {
                            core.rootScene.addChild(kuribo);

                        }
                        else if (block_middle[z - 2] == 5) {
                            core.rootScene.addChild(kuribo);

                        }
                        else if (block_middle[z] == 6 && mario.y == 163) {
                            core.rootScene.addChild(kuribo);
                            console.log(block_middle[z - 2]);
                            core.stop();
                        }
                        // else if (block_middle[z-1] == 6 && mario.y == 163) {
                        //     core.rootScene.addChild(kuribo);
                        //     console.log(block_middle[z-2]);
                        //     core.stop();
                        //     setTimeout(function (){
                        //         core.pushScene(gameOverScene);
                        //     },500);
                        // }
                    }



                }

            });





            core.rootScene.on('touchstart', function (e) {
                mario.x = e.x;
                mario.y = e.y;
                // console.log(mario.x);
            });

            kuribo.on('enterframe', function () {

                if (this.x < 3) {
                    core.rootScene.addChild(kuribo);
                    this.x = 320;
                    this.x -= 1.5;
                } else {
                    this.x -= 1.5;

                }
            });

            var stage = new Group();


            function addStage() {
                stage.addChild(map);
                if (mario.x > 100) {
                    stage.addChild(map);
                    core.stop();
                }
                stage.addChild(mario);
                stage.addChild(kuribo);
                stage.addEventListener(Event.ENTER_FRAME, function (e) {
                    //マップスクロール
                    if (stage.x > 70 - mario.x) {
                        var ax = 0;
                        stage.x = 70 - mario.x;
                        if (core.input.right) ax += 0.01;
                        if (core.input.left) ax -= 0.01;
                        if (mario.vx > 0.1) ax -= 0.01;
                        else if (mario.vx > 0) ax -= mario.vx;
                        if (mario.vx < 0.1) ax += 0.01;
                        else if (mario.vx < 0) ax -= mario.vx;
                        mario.vx += ax;
                        // mario.y = mario.vy //土管発射みたいのができる

                        if (12 > mario.vx && mario.vx > 5) {
                            mario.vx = 4.0;
                        }

                    }

                });

            }
            addStage();
            core.rootScene.addChild(stage);

        }
        core.start();
    });
}
