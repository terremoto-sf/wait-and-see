let bg;
let font;
let firstTouch = true;
let stopped = true;
let playing = false;
let ffwd = false;
let rwind = false;
let playbackPos = 0;
let playbackDir = 1;
let posMod = 0;
let midX;
let midY;
let angle = 0;
let buffer = new Tone.ToneAudioBuffer("tp_short.mp3", () => {
    console.log('buffer loaded');
})
const player = new Tone.Player(buffer).toDestination();
player.loop = true;
document.querySelector("div").addEventListener("click", async() => {
    if (firstTouch) {
        await Tone.start();
        console.log("audio is ready");
        if (player.loaded) {
            playbackPos = Math.random() * buffer.duration;
            player.start(0, playbackPos);
            stopped = false;
            playing = true;
            console.log('play')
        }
        firstTouch = false;
    }
});

function preload() {
    bg = loadImage('tp_05.jpg');
    font = loadFont('MabryPro-Regular.ttf');
}

function setup() {
    cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.parent('canvas-holder');
    background(0);
    // rectMode(CENTER);
    imageMode(CENTER);
    midX = window.innerWidth / 2;
    midY = window.innerHeight / 2;
    image(bg, midX, midY);
    noStroke();
    fill(255, 60);
    rect(0, 0, window.innerWidth, window.innerHeight);
    textFont(font, 48)
}

function draw() {
    if (player.loaded) {
        image(bg, midX, midY);
        noStroke();
        fill(255, 60);
        rect(0, 0, window.innerWidth, window.innerHeight);
        stroke(0);
        strokeWeight(2);
        fill(0)
        textSize(48)
        text('wait & see', 10, 40);
        textSize(36)
        text('TERRE', windowWidth - 255, windowHeight - 25);
        text('MOTO', windowWidth - 130, windowHeight - 10);
        strokeWeight(10)
        if (stopped || ffwd || rwind) {
            fill(0, 100);
        } else {
            fill(250, 200);
        }
        triangle(midX - 50, midY - 75, midX + 50, midY, midX - 50, midY + 75)
        if (ffwd) {
            fill(250, 200);
        } else {
            fill(0, 100)
        }
        triangle(window.innerWidth - 100, midY - 50, window.innerWidth - 50, midY, window.innerWidth - 100, midY + 50)
        triangle(window.innerWidth - 75, midY - 50, window.innerWidth - 25, midY, window.innerWidth - 75, midY + 50)
        if (rwind) {
            fill(250, 200);
        } else {
            fill(0, 100)
        }
        triangle(100, midY - 50, 50, midY, 100, midY + 50)
        triangle(75, midY - 50, 25, midY, 75, midY + 50)
    } else {
        fill(0);
        circle((midX - 100) + frameCount % 200, midY, 30)
        if (frameCount % 200 == 0) {
            image(bg, midX, midY);
            noStroke();
            fill(255, 60);
            rect(0, 0, window.innerWidth, window.innerHeight);
        }
    }
    if (playing) {
        if (frameCount % 60 == 0) {
            playbackPos += (player.playbackRate * playbackDir) % buffer.duration;
        }
    }
}


function touchStarted() {
    if (!firstTouch) {
        if (touches.length > 0) {
            let x = touches[0].x;
            let y = touches[0].y;
            if (player.loaded) {
                if (y < midY + 200 && y > midY - 200) {
                    if (x > (midX - 50) && x < (midX + 50)) {
                        if (stopped) {
                            player.start(0, playbackPos);
                            stopped = false;
                            playing = true;
                            console.log('play');
                        } else if (ffwd || rwind) {
                            player.playbackRate = 1;
                            ffwd = false;
                            rwind = false;
                            player.reverse = false;
                            playbackDir = 1;
                        } else {
                            player.stop();
                            stopped = true;
                            playing = false;
                            console.log('stop');
                        }
                    } else if (x > (window.innerWidth - 100) && x < window.innerWidth) {
                        player.playbackRate = 5;
                        player.reverse = false;
                        ffwd = true;
                        playbackDir = 1;
                    } else if (x < 100 && x > 0) {
                        player.playbackRate = 5;
                        player.reverse = true;
                        rwind = true;
                        playbackDir = -1;
                    }
                }
            }
        }
    }
}