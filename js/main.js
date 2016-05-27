var c, ctx;
var param = window.location.search;
var paused = false;


var winHeight, winWidth;
// CANVAS use height and width attributes on html tag

function Star() {
    
    this.size = 3.5;
    this.scale = 1;

    this.coords = new Point();
    this.velX = 0;
    this.velY = 0;

    this.generate = function() {
        this.coords.z = 1;
        this.coords.x = 0;
        this.coords.y = 0;
        this.velX = Math.random() < 0.5 ? Math.random() * 40 : -Math.random() * 40;
        this.velY = Math.random() < 0.5 ? Math.random() * 40 : -Math.random() * 40;
        
    }

    this.update = function() {
        
        this.coords.translate(this.velX, this.velY, 0.01);

        if ((this.coords.getCoords().x > winWidth) || (this.coords.getCoords().y > winHeight) || (this.coords.getCoords().y < 0)) {
            this.generate();
            
        }
    }
}

var stars = new Array();
var HOWMANYstars = 100;

window.addEventListener("load", function() {

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
        stars[i].generate();
    }

    setInterval(function() {
        if (!paused) {
            draw(ctx, c);
        }
    }, 50);

});


function draw(context, canvas, x, y) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#FFFFFF";


    for (var i = 0; i < stars.length; i++) {
        context.fillStyle = "#FFFFFF";
        
        context.beginPath();
        context.arc(stars[i].coords.getCoords().x, stars[i].coords.getCoords().y,
         stars[i].size, 0, 2 * Math.PI, false);
        context.fill();

        stars[i].update();
    }
}


$(function() {



    KeyboardManager(function(code) {
        if (code == keys.SPACE) {
            paused = !paused;
        }
    });
});
