const maxZ = 29;
var alive = [];
var to = null;
const eggs = Array.prototype.slice.call(document.querySelectorAll('.easter'));

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


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (elmnt.querySelector(".title-bar")) {
      // if present, the header is where you move the DIV from:
      elmnt.querySelector(".title-bar").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      if(!(e.target instanceof HTMLButtonElement)){
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
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

eggs.forEach(egg => {
    button = egg.querySelectorAll('button')[0];
    button.addEventListener("click", function() {
        egg.style.display = 'none';
    });
    egg.addEventListener("mousedown", function(event) {
        if(!(event.target instanceof HTMLButtonElement)) {
            focus(egg);
        }
    });
    dragElement(egg);
});
  
document.getElementById('task-bar-logo').addEventListener("click", function(){
    scramble();
});