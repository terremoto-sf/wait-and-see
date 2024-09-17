let bg;
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
let buffer = new Tone.ToneAudioBuffer("tp_short_2.mp3", () => {
    console.log('buffer loaded');
})
const player = new Tone.Player(buffer).toDestination();
player.loop = true;
document.querySelector("div").addEventListener("click", async() => {
    if (firstTouch) {
        await Tone.start();
        console.log("audio is ready");
        if (player.loaded) {
            player.start(0, posMod);
            stopped = false;
            playing = true;
            console.log('play')
        }
        firstTouch = false;
    }
});

function preload() {
    bg = loadImage('tp_05.jpg')
}

function setup() {
    cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.parent('canvas-holder');
    background(0);
    rectMode(CENTER);
    imageMode(CENTER);
    noFill();
    stroke(0);
    strokeWeight(10)
    midX = window.innerWidth / 2;
    midY = window.innerHeight / 2;
    image(bg, midX, midY);
}

function draw() {
    if (player.loaded) {
        image(bg, midX, midY);
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
        fill(255);
        circle((midX - 100) + frameCount % 200, midY, 30)
        if (frameCount % 200 == 0) {
            image(bg, midX, midY);
        }

    }
    if (playing) {
        if (frameCount % 60 == 0) {
            playbackPos += player.playbackRate * playbackDir;
            posMod = (buffer.duration + playbackPos) % buffer.duration
        }
    }
}

// function mousePressed() {
//     if (player.loaded) {
//         if (mouseX > (window.innerWidth / 2 - 50) && mouseX < (window.innerWidth / 2 + 50)) {
//             if (stopped) {
//                 player.start(0, posMod);
//                 stopped = false;
//                 playing = true;
//             } else if (ffwd || rwind) {
//                 player.playbackRate = 1;
//                 ffwd = false;
//                 rwind = false;
//                 player.reverse = false;
//                 playbackDir = 1;
//                 player.start(0, posMod);
//             } else {
//                 player.stop();
//                 stopped = true;
//                 playing = false;
//             }
//         } else if (mouseX > (window.innerWidth / 2 + 200) && mouseX < window.innerWidth) {
//             player.playbackRate = 5;
//             player.reverse = false;
//             ffwd = true;
//             playbackDir = 1;
//         } else if (mouseX < (window.innerWidth / 2 - 200) && mouseX > 0) {
//             player.playbackRate = 5;
//             player.reverse = true;
//             rwind = true;
//             playbackDir = -1;
//         }
//     }
// }


function touchStarted() {
    if (!firstTouch) {
        if (touches.length > 0) {
            let x = touches[0].x;
            let y = touches[0].y;
            if (player.loaded) {
                if (y < midY + 200 && y > midY - 200) {
                    if (x > (midX - 50) && x < (midX + 50)) {
                        if (stopped) {
                            player.start(0, posMod);
                            stopped = false;
                            playing = true;
                            console.log('play');
                        } else if (ffwd || rwind) {
                            player.playbackRate = 1;
                            ffwd = false;
                            rwind = false;
                            player.reverse = false;
                            playbackDir = 1;
                            player.start(0, posMod);
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