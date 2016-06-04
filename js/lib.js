var DIRECTIONS = {
    LEFT: -1,
    RIGHT: 1
};

function Point(x, y, z) {
    this.cartesian = true;
    this.x = x;
    this.y = y;
    this.z = z;

    this.move = function (x, y, z) {
        this.x = x;
        this.y = y;
        if (z) {
            this.z = z;
        }
    }

    this.translate = function (dx, dy, dz) {
        this.x += dx;
        this.y += dy;

        if (dz) {
            this.z += dz;
        }
    }

    this.toString = function () {
        console.log("Point {x:" + this.x + ", y:" + this.y + ", z:" + this.z + "}");
    }

    // Copies one points properties
    this.copyPoint = function (point) {
        this.point.x = this.x;
        this.point.y = this.y;
        this.point.z = this.z;
    }



    // Distance from two points (in 3D!!)
    this.distance = function (point) {
        var dx = Math.abs(point.x - this.x);
        var dy = Math.abs(point.y - this.y);
        var dz = Math.abs(point.z - this.z);

        var c = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2));
        return c;
    }


    this.getCoords = function () {
        if (this.cartesian) {
            return {
                x: winWidth / 2 + this.x / this.z,
                y: winHeight / 2 + this.y / this.z,
                z: this.z
            };
        } else {
            return {
                x: this.x,
                y: this.y,
                z: this.z
            };
        }
    }
}

var keys = {
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
}

function KeyboardManager(keyDownEvent) {
    //Navigation
    $("body").on('keydown', function (e) { //for arrow keys

        /* left = 37, up = 38, right = 39, down = 40 */
        var Code = e.keyCode || e.which;

        keyDownEvent(Code);
    });

}


function sign(num) {
    if(num == 0) {return 0;}
    return (num > 0) ? 1 : -1;
}
