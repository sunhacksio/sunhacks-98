maxZ = 29;

eggs = Array.prototype.slice.call(document.querySelectorAll('.easter'));

eggs.forEach(egg => {
    button = egg.querySelectorAll('button')[0];
    button.addEventListener("click", function() {
        egg.style.display = 'none';
    });
});

eggs.forEach(egg => {
    egg.addEventListener("click", function(event) {
        if(!(event.target instanceof HTMLButtonElement)) {
            focus(egg);
        }
    });
});

alive = [];
function spawn(egg) {
    if(!alive.includes(egg)) {
        alive.forEach(div => {
            div.style.zIndex -= 1
        });
        egg.style.display = 'initial';
        egg.style.left = Math.floor(Math.random() * (window.innerWidth - egg.offsetWidth)) + "px";
        egg.style.top  = Math.floor(Math.random() * (window.innerHeight - egg.offsetHeight)) + "px";
        egg.style.zIndex = maxZ;
        alive.unshift(egg);
    }
}
function focus(egg) {
    if(alive.includes(egg)) {
        index = alive.indexOf(egg);
        for (let i = 0; i < index; i++) {
            alive[i].style.zIndex -= 1;
        }
        alive.splice(index,1);
        alive.unshift(egg);
        egg.style.zIndex = maxZ;
    }
}

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  
var to = null;
function scramble() {
    if(to) {
        clearTimeout(to);
    }
    eggs.forEach(egg => {
        egg.style.display = 'none'
        alive = [];
    });
    shuffle(eggs);
    function loop(i, n) {
        spawn(eggs[i]);
        if (i < n) {
            to = setTimeout(function() {
                loop(i+1, n);
            }, 500);
        }
    };
    loop(0, eggs.length - 1);
}

document.getElementById('task-bar-logo').addEventListener("click", function(){
    scramble();
});

