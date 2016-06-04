var c, ctx;
var param = window.location.search;
var paused = false;


var winHeight, winWidth;
// CANVAS use height and width attributes on html tag




function Ship() {
    this.speed = 40;

    this.changeSpeed = function (speed) {
        if (speed > 0) {
            this.speed = speed;
        }
    }
}

var myShip = new Ship();



function Star() {
    this.direction = DIRECTIONS.LEFT;
    this.size = 3.5;
    this.scale = 1;
    this.isDead = false;


    this.coords = new Point();

    this.generate = function (i) {
        this.coords.z = 5 * (Math.random() < 0.5 ? 1 : -1);
        this.coords.x = (Math.random() * winWidth / 2) * (Math.random() < 0.5 ? 1 : -1);
        this.coords.y = (Math.random() * winHeight / 2) * (Math.random() < 0.5 ? 1 : -1);
        this.i = i;
    }

    this.update = function () {
        if(this.isDead) {
            var backtolife = (Math.random() < 0.1 ? true : false);

            if(backtolife) {
                this.isDead = false;
                this.generate();
                return;
            }
        }

        this.coords.z -= 0.1 * sign(this.coords.z);

        if ((this.coords.getCoords().x > winWidth) || (this.coords.getCoords().y > winHeight) || (this.coords.getCoords().x < 0) || (this.coords.x < 0)) {
            this.isDead = true;
        }
    }
}

var stars = new Array();
var HOWMANYstars = 200;



function draw(context, canvas, x, y) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#FFFFFF";


    for (var i = 0; i < stars.length; i++) {
        if (!stars[i].isDead) {
            context.fillStyle = "#FFFFFF";

            context.beginPath();
            context.arc(stars[i].coords.getCoords().x, stars[i].coords.getCoords().y,
                stars[i].size, 0, 2 * Math.PI, false);
            context.fill();
        }
        stars[i].update();
    }
}


$(function () {
    winHeight = $(window).height() - 15;
    winWidth = $(window).width() - 15;

    $("canvas").attr("width", winWidth);
    $("canvas").attr("height", winHeight);


    c = document.getElementById("demo");
    ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    ctx.fillStyle = "#FFFFFF";




    // Build array of stars
    for (var i = 0; i < HOWMANYstars; i++) {
        stars[i] = new Star();
        stars[i].generate(i);
    }

    setInterval(function () {
        if (!paused) {
            draw(ctx, c);
        }
    }, 50);


    KeyboardManager(function (code) {
        if (code == keys.SPACE) {
            paused = !paused;
        } else if (code == keys.UP) {
            myShip.changeSpeed(myShip.speed + 10);
        } else if (code == keys.DOWN) {
            myShip.changeSpeed(myShip.speed - 10);
        }
    });
});
