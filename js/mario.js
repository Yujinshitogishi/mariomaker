var config = {
    apiKey: "AIzaSyBQiAvFBdOC-EMi0pwWkRLgLby8pW8RKLY",
    authDomain: "mariomaker-15e12.firebaseapp.com",
    databaseURL: "https://mariomaker-15e12.firebaseio.com",
    projectId: "mariomaker-15e12",
    storageBucket: "mariomaker-15e12.appspot.com",
    messagingSenderId: "89587172319"
};
var count = 0;
var blocks = [];
var middle_blocks = [];
firebase.initializeApp(config);
const newPostRef = firebase.database().ref();
newPostRef.on("child_added", function (data) {
    var v = data.val();
    var k = data.key;
    var s = k.split("-");
    var length = blocks.length;

    let str = "";
    str += '<div class="name">' + v.username + '</div>';
    str += '<div class="text">' + v.title + '</div>';
    str += '<a id="' + s[1] + '" href="#" >' + 'スタート' + '</a>';
    $('#output').append(str);

    $("#" + s[1]).on("click", function () {

        localStorage.setItem("key", k);
        localStorage.setItem("count", length)
        location.href = "game.html";
    });
    console.log(blocks.length);

    for (let x = 0; x < 16; x++) {
        if (typeof blocks[x] == "undefined") {
            blocks[x] = v.key;
            middle_blocks[x] = v.key_middle;
            console.log(middle_blocks[x]);
            break;
        }
    }
});
const secondPostRef = firebase.database().ref();
$('#count').on('click', function () {
    secondPostRef.push({

    });
});




