let ZINDEX = 0;

Node.prototype.AddChild = function (nodeType, id, class_) {
    try {
        var node = document.createElement(nodeType);
        node.setAttribute("style", `z-index: ${ZINDEX}; position: relative;`);
        if (id != null) {
            node.setAttribute("id", id)
        }
        if (class_ != null) {
            node.setAttribute("class", class_)
        }
        this.appendChild(node);
        ZINDEX++;
        return node;
    } catch (error) {
        console.error("nodeType invalid");
    }
}

Node.prototype.Style = function (styleProp, styleOpt, mode) {
    try {
        if (styleOpt == null) {
            return this.style[styleProp];
        }
        if (mode == "a") {
            this.style[styleProp] += styleOpt;
        }
        else {
            this.style[styleProp] = styleOpt;
        }
    }
    catch (error) {
        console.error(error);
    }
}

function ElemById(id) {
    return document.getElementById(id);
}

function Dist(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
}

Number.prototype.ConvertToVH = function () {
    return Math.round(this / window.innerHeight * 10000) / 100;
}

Number.prototype.ConvertToVW = function () {
    return Math.round(this / window.innerWidth * 10000) / 100;
}

Number.prototype.ConvertFromVH = function () {
    return Math.round(this * window.innerHeight / 100 * 100) / 100;
}

Number.prototype.ConvertFromVW = function () {
    return Math.round(this * window.innerWidth / 100 * 100) / 100;
}

Node.prototype.Width = function () {
    return this.getBoundingClientRect().width;
}

Node.prototype.Height = function () {
    return this.getBoundingClientRect().height;
}

Node.prototype.PosX = function (posX) {
    if (posX == null) {
        return this.getBoundingClientRect().left
    }

    let coordX = Number(posX) - this.getBoundingClientRect().left;

    if (posX == "center") {
        coordX = (this.parentElement.getBoundingClientRect().left + (this.parentElement.Width()/2 - this.Width()/2)) - this.getBoundingClientRect().left;
    }
    
    this.Style("transform", `translateX(${coordX.ConvertToVH()}vh)`, "a");
}

Node.prototype.PosY = function (posY) {
    if (posY == null) {
        return this.getBoundingClientRect().top;
    }
    
    let coordY = Number(posY) - this.getBoundingClientRect().top;
    
    if (posY == "center") {
        coordY = (this.parentElement.getBoundingClientRect().top + (this.parentElement.Height()/2 - this.Height()/2)) - this.getBoundingClientRect().top;
        if (this.parentElement == document.body) {
            coordY = (window.innerHeight/2 - this.Height()/2) - this.getBoundingClientRect().top;
        }
    }
    
    this.Style("transform", `translateY(${coordY.ConvertToVH()}vh)`, "a");
}

Node.prototype.BringForward = function () {
    this.style.zIndex++;
}

Node.prototype.SendBackward = function () {
    this.style.zIndex--;
}

document.body.Style("overflow", "hidden");

const outer_table = document.body.AddChild("div", "outer_table");
outer_table.Style("background", "brown");
outer_table.Style("height", "50vh");
outer_table.Style("width", "100vh");
outer_table.Style("borderRadius", "2vh");
outer_table.PosX("center");
outer_table.PosY("center");

const inner_table = outer_table.AddChild("div", "inner_table");
inner_table.Style("background", "green");
inner_table.Style("height", "44vh");
inner_table.Style("width", "94vh");
inner_table.PosX("center");
inner_table.PosY("center");

for (let i = 0; i < 4; i++) {
    const holeN = inner_table.AddChild("div", `hole${i}`, "hole cornerhole");
    holeN.Style("background", "black");
    holeN.Style("height", "4vh");
    holeN.Style("width", "4vh");
    holeN.Style("borderRadius", "100%");
    holeN.PosX(outer_table.PosX() + (i%2)*(outer_table.Width() - Number(6).ConvertFromVH()) + Number(1).ConvertFromVH());
    holeN.PosY(outer_table.PosY() + Math.floor(i/2)*(outer_table.Height() - Number(6).ConvertFromVH()) + Number(1).ConvertFromVH());
    
    const carpetN = inner_table.AddChild("div", `carpet${i}`, "carpet cornercarpet");
    carpetN.Style("background", "green");
    carpetN.Style("height", "4vh");
    carpetN.Style("width", "4vh");
    carpetN.PosX(inner_table.PosX() + (i%2)*(inner_table.Width() - Number(2).ConvertFromVH()) - Number(1).ConvertFromVH());
    carpetN.PosY(inner_table.PosY() + Math.floor(i/2)*(inner_table.Height() - Number(2).ConvertFromVH()) - Number(1).ConvertFromVH());
    carpetN.Style("transform", "rotate(45deg)", "a");
    carpetN.SendBackward();
    carpetN.SendBackward();
}

const hole4 = inner_table.AddChild("div", `hole4`, "hole cornerhole");
hole4.Style("background", "black");
hole4.Style("height", "4vh");
hole4.Style("width", "4vh");
hole4.Style("borderRadius", "100%");
hole4.PosX("center");
hole4.PosY(outer_table.PosY());

const carpet4 = inner_table.AddChild("div", `carpet4`, "carpet cornercarpet");
carpet4.Style("background", "green");
carpet4.Style("height", "4vh");
carpet4.Style("width", "4vh");
carpet4.PosX("center");
carpet4.PosY(outer_table.PosY() + Number(1).ConvertFromVH());
carpet4.Style("transform", "rotate(45deg)", "a");
carpet4.SendBackward();
carpet4.SendBackward();


const hole5 = inner_table.AddChild("div", `hole5`, "hole cornerhole");
hole5.Style("background", "black");
hole5.Style("height", "4vh");
hole5.Style("width", "4vh");
hole5.Style("borderRadius", "100%");
hole5.PosX("center");
hole5.PosY(outer_table.PosY() + inner_table.Height() + Number(2).ConvertFromVH());

const carpet5 = inner_table.AddChild("div", `carpet5`, "carpet cornercarpet");
carpet5.Style("background", "green");
carpet5.Style("height", "4vh");
carpet5.Style("width", "4vh");
carpet5.PosX("center");
carpet5.PosY(outer_table.PosY() + inner_table.Height() + Number(1).ConvertFromVH());
carpet5.Style("transform", "rotate(45deg)", "a");
carpet5.SendBackward();
carpet5.SendBackward();


const white_ball = inner_table.AddChild("div", "ball0", "ball");
white_ball.Style("width", "3vh");
white_ball.Style("height", "3vh");
white_ball.Style("border", "black solid 1px");
white_ball.Style("borderRadius", "100%");
white_ball.Style("background", "white");
white_ball.PosX("center");
white_ball.PosY("center");
white_ball.BringForward();
white_ball.BringForward();
white_ball.BringForward();
white_ball.BringForward();


const stick = white_ball.AddChild("div", "stick");
stick.Style("width", "40vh");
stick.Style("height", "40vh");
stick.Style("background", "url('stick.png')");
stick.Style("backgroundSize", "cover");
stick.Style("backgroundRepeat", "no-repeat");
stick.Style("transformOrigin", "bottom left");
stick.BringForward();
stick.BringForward();
stick.BringForward();


let mouseIsDown = false;
let datasAreLocked = false;
let locked_pos_x;
let locked_pos_y;
let locked_cursor_x;
let locked_cursor_y;
let locked_rotation;
let speed = 0;
let speed_angle;

document.body.addEventListener('mousedown', (e)=>{
    mouseIsDown = true;
})

document.body.addEventListener('mouseup', (e)=>{
    mouseIsDown = false;
    datasAreLocked = false;
    if (power > 1) {
        stick.Style("display", "none");
        speed = power/max_power*4;
        speed_angle = locked_rotation;
    }
    power = 0;
})

let max_power = 200;
let power = 0;
document.body.addEventListener('mousemove', (e)=>{
    let cursor_angle = Math.atan2(white_ball.PosY() + Number(1.5).ConvertFromVH() - e.clientY, white_ball.PosX() + Number(1.5).ConvertFromVH() - e.clientX);
    if (!mouseIsDown) {
        stick.Style("transform", "");
        stick.PosX(white_ball.PosX() + Number(1.5).ConvertFromVH());
        stick.PosY(white_ball.PosY() - Number(40).ConvertFromVH() + Number(1.5).ConvertFromVH());
        stick.Style("transform", `rotate(${cursor_angle + Math.PI/4}rad)`, "a");        
    }
    else{
        if (!datasAreLocked) {
            locked_pos_x = white_ball.PosX() + Number(1.5).ConvertFromVH();
            locked_pos_y = white_ball.PosY() - Number(40).ConvertFromVH() + Number(1.5).ConvertFromVH();
            locked_cursor_x = e.clientX.valueOf();
            locked_cursor_y = e.clientY.valueOf();
            locked_rotation = cursor_angle.valueOf();
            datasAreLocked = true;            
        }
        let distance = Dist(e.clientX, white_ball.PosX()+Number(1.5).ConvertFromVH(), e.clientY, white_ball.PosY()+Number(1.5).ConvertFromVH());
        
        power = distance*Math.sin(locked_rotation+Math.PI/2-cursor_angle+Math.PI);
        if (0 > power){
            power = 0;
        }
        else if (power > max_power) {
            power = max_power;
        }
        
        stick.Style("transform", "");
        stick.PosX(locked_pos_x+power*Math.cos(locked_rotation));
        stick.PosY(locked_pos_y+power*Math.sin(locked_rotation));
        stick.Style("transform", `rotate(${locked_rotation+Math.PI/4}rad)`, "a");  
    }
});

const ball1 = inner_table.AddChild("div", "ball1", "ball");
    
ball1.Style("width", "3vh");
ball1.Style("height", "3vh");
ball1.Style("borderRadius", "100% 100%");
ball1.Style("background", "red");

ball1.PosX(inner_table.PosX() + inner_table.Width()*3/4);
ball1.PosY("center");

let ball1_velocityX = 0;
let ball1_velocityY = 0;



const ball2 = inner_table.AddChild("div", "ball2", "ball");
    
ball2.Style("width", "3vh");
ball2.Style("height", "3vh");
ball2.Style("borderRadius", "100% 100%");
ball2.Style("background", "red");

ball2.PosX(inner_table.PosX() + inner_table.Width()*4/5);
ball2.PosY("center");

let ball2_velocityX = 0;
let ball2_velocityY = 0;



setInterval(()=>{
    if (speed > 0) {
        let posX = white_ball.PosX();
        let posY = white_ball.PosY();
        white_ball.Style("transform", "");
        white_ball.PosX(posX-speed*Math.cos(speed_angle));
        white_ball.PosY(posY-speed*Math.sin(speed_angle));
        speed = speed*0.998;
        if (speed < 0.2) {
            speed = 0;
        }
        if (white_ball.getBoundingClientRect().top < inner_table.getBoundingClientRect().top) {
            speed_angle = -speed_angle;
        }
        if (white_ball.getBoundingClientRect().left < inner_table.getBoundingClientRect().left) {
            speed_angle = Math.PI-speed_angle
        }
        if (white_ball.getBoundingClientRect().bottom > inner_table.getBoundingClientRect().bottom) {
            speed_angle = -speed_angle
        }
        if (white_ball.getBoundingClientRect().right > inner_table.getBoundingClientRect().right) {
            speed_angle = Math.PI-speed_angle
        }
    }
    else{
        stick.Style("display", "inherit");
    }

    let hit = simulate_collision(white_ball.PosX(), white_ball.PosY(), -speed*Math.cos(speed_angle), -speed*Math.sin(speed_angle), ball1.PosX(), ball1.PosY(), ball1_velocityX, ball1_velocityY);
    if (hit) {
        speed = Math.sqrt(hit[2]*hit[2] + hit[3]*hit[3]);
        speed_angle = Math.atan2(-hit[3], -hit[2]);
        ball1_velocityX = hit[6];
        ball1_velocityY = hit[7];
    }

    let ball1_speed = Math.sqrt(ball1_velocityX*ball1_velocityX + ball1_velocityY*ball1_velocityY);

    if (ball1_speed > 0) {
        let ball1_posX = ball1.PosX();
        let ball1_posY = ball1.PosY();
        ball1.Style("transform", "");
        ball1.PosX(ball1_posX+ball1_velocityX);
        ball1.PosY(ball1_posY+ball1_velocityY);
        ball1_velocityX = ball1_velocityX*0.998;
        ball1_velocityY = ball1_velocityY*0.998;
        if (ball1_speed < 0.2) {
            ball1_velocityX = 0;
            ball1_velocityY = 0;
        }
        if (ball1.getBoundingClientRect().top < inner_table.getBoundingClientRect().top) {
            ball1_velocityY = -ball1_velocityY;
        }
        if (ball1.getBoundingClientRect().left < inner_table.getBoundingClientRect().left) {
            ball1_velocityX = -ball1_velocityX;
        }
        if (ball1.getBoundingClientRect().bottom > inner_table.getBoundingClientRect().bottom) {
            ball1_velocityY = -ball1_velocityY;
        }
        if (ball1.getBoundingClientRect().right > inner_table.getBoundingClientRect().right) {
            ball1_velocityX = -ball1_velocityX;
        }
    }


    hit = simulate_collision(white_ball.PosX(), white_ball.PosY(), -speed*Math.cos(speed_angle), -speed*Math.sin(speed_angle), ball2.PosX(), ball2.PosY(), ball2_velocityX, ball2_velocityY);
    if (hit) {
        speed = Math.sqrt(hit[2]*hit[2] + hit[3]*hit[3]);
        speed_angle = Math.atan2(-hit[3], -hit[2]);
        ball2_velocityX = hit[6];
        ball2_velocityY = hit[7];
    }

    hit = simulate_collision(ball1.PosX(), ball1.PosY(), ball1_velocityX, ball1_velocityY, ball2.PosX(), ball2.PosY(), ball2_velocityX, ball2_velocityY);
    if (hit) {
        ball1_velocityX = hit[2];
        ball1_velocityY = hit[3];
        ball2_velocityX = hit[6];
        ball2_velocityY = hit[7];
    }

    let ball2_speed = Math.sqrt(ball2_velocityX*ball2_velocityX + ball2_velocityY*ball2_velocityY);

    if (ball2_speed > 0) {
        let ball2_posX = ball2.PosX();
        let ball2_posY = ball2.PosY();
        ball2.Style("transform", "");
        ball2.PosX(ball2_posX+ball2_velocityX);
        ball2.PosY(ball2_posY+ball2_velocityY);
        ball2_velocityX = ball2_velocityX*0.998;
        ball2_velocityY = ball2_velocityY*0.998;
        if (ball2_speed < 0.2) {
            ball2_velocityX = 0;
            ball2_velocityY = 0;
        }
        if (ball2.getBoundingClientRect().top < inner_table.getBoundingClientRect().top) {
            ball2_velocityY = -ball2_velocityY;
        }
        if (ball2.getBoundingClientRect().left < inner_table.getBoundingClientRect().left) {
            ball2_velocityX = -ball2_velocityX;
        }
        if (ball2.getBoundingClientRect().bottom > inner_table.getBoundingClientRect().bottom) {
            ball2_velocityY = -ball2_velocityY;
        }
        if (ball2.getBoundingClientRect().right > inner_table.getBoundingClientRect().right) {
            ball2_velocityX = -ball2_velocityX;
        }
    }

    if (ballInHole(ball1) != null){
        ball1.Style("display", "none");
    }
    if (ballInHole(ball2) != null){
        ball2.Style("display", "none");
    }
    if (ballInHole(white_ball) != null){
        onPocket(white_ball);
    }

}, 5)

function ballInHole(ball) {
    const b = ball.getBoundingClientRect();
    const bx = b.left + b.width / 2;
    const by = b.top + b.height / 2;

    for (const hole of document.getElementsByClassName("hole")) {
        const h = hole.getBoundingClientRect();
        const hx = h.left + h.width / 2;
        const hy = h.top + h.height / 2;

        if (Dist(bx, hx, by, hy) < h.width) {
            return hole;
        }
    }
    return null;
}

function onPocket(ball) {
    if (ball === white_ball) {
        // Respawn the cue ball in the center
        speed = 0;
        white_ball.Style("transform", "");
        white_ball.PosX("center");
        white_ball.PosY("center");
    } else {
        // Remove the object ball from play
        ball.Style("display", "none");
        if (ball === ball1) {
            ball1_velocityX = 0;
            ball1_velocityY = 0;
        }
    }
}

function simulate_collision(x1, y1, velx1, vely1, x2, y2, velx2, vely2) {
    //Vector between the centers of the two balls
    let distance = Dist(x1, x2, y1, y2);

    if (distance === 0) {
        return;
    }
    else if (distance < Number(3).ConvertFromVH()){
        let normalized_x = (x1 - x2) / distance;
        let normalized_y = (y1 - y2) / distance;
    
        let relativeVelocityX = velx1 - velx2;
        let relativeVelocityY = vely1 - vely2;
    
        //Projection to the normal vector by dot product
        let velocityAlongNormal = relativeVelocityX * normalized_x + relativeVelocityY * normalized_y;
    
        if (velocityAlongNormal > 0) {
            return;
        }
    
        velx1 -= velocityAlongNormal * normalized_x;
        vely1 -= velocityAlongNormal * normalized_y;

        velx2 += velocityAlongNormal * normalized_x;
        vely2 += velocityAlongNormal * normalized_y;
    
        // Correct overlapping positions
        let overlap = Number(3).ConvertFromVH() - distance;
        if (overlap > 0) {
            let correctionX = normalized_x * overlap;
            let correctionY = normalized_y * overlap;
    
            x2 -= correctionX;
            y2 -= correctionY;
    
            x1 += correctionX;
            y1 += correctionY;
        }
        return [x1, y1, velx1, vely1, x2, y2, velx2, vely2];
    }
}