window.onload = function () {
    btnIndex();
    colorHandler();
    saveToLs();
}

function btnIndex() {
    var btns = document.querySelectorAll('#rectangle, #oval');
    for (var i in btns) {
        var btn = btns[i];
        btn.onclick = function () {
            var btnId = this.getAttribute("id");
            createShape(btnId);
        };
    }
}

function createShape(shape) {
    var board = document.getElementById("container");
    board.appendChild(divStyle(shape));
    selectShapes();
}

function divStyle(shape, width, height, backgroundColor, top, left) {
    var div = document.createElement("div");
    div.classList.add("shape");
    div.style.width = width || (Math.floor(Math.random() * 300) + 1) + 'px';
    div.style.height = height || (Math.floor(Math.random() * 600) + 1) + 'px';
    div.style.backgroundColor = backgroundColor || getRandomColor();
    div.style.position = "absolute";
    div.style.opacity = Math.random();

    var x = left || (Math.floor(Math.random() * 1000) + 1) + 'px';//window.innerWidth=1377px
    var y = top || (Math.floor(Math.random() * 400) + 1) + 'px';

    div.style.left = x;
    div.style.top = y;
    div.classList.add(shape);
    return div;
}

function selectShapes() {
    var shapeArr = document.querySelectorAll(".shape");
    for (var j = 0; j < shapeArr.length; j++) {
        var singleShape = shapeArr[j];
        singleShape.draggable = true;
        singleShape.onclick = function (e) {
            if (e.ctrlKey) {
                this.classList.toggle("selected");
                var selected = document.querySelectorAll(".selected");
                selectionMarking();
            } else {
                var wasSelected = this.classList.contains("selected");
                deselectAll();
                if (!wasSelected) {
                    this.classList.add("selected");
                    selectionMarking();
                };
            };

            deleteBtn = document.querySelector('#delete');
            deleteBtn.onclick = function () {
                deleteSelectedShape();
            };
        };
        singleShape.addEventListener("drag", function (e) {

            var offsetX;
            var offsetY;
            // mydivshape.style.top = 0;
            // mydivshape.style.left = 0;
            singleShape.addEventListener("dragstart", function (e) {
                offsetX = e.clientX;
                offsetY = e.clientY;
            }, false);
            singleShape.addEventListener("dragend", function (e) {
                this.style.top = e.pageY - offsetY + "px";
                this.style.left = e.pageX - offsetX + "px";
            }, false);

        });
    };
}

function selectionMarking() {

    selectedItems = document.querySelectorAll('.selected');

    if (!checkIfContainsSelected()) {

        handleClass = document.querySelectorAll('.handle');
        for (var i = 0; i < handleClass.length; i++) {
            handleClass[i].classList.remove('handle');
        };
    } else if (selectedItems !== []) {
        for (var i = 0; i < selectedItems.length; i++) {
            var handles = [];
            for (var x = 0; x < 4; x++) { //create 4 handle-divs
                var handle = document.createElement("div");
                selectedItems[i].appendChild(handle);
                handle.classList.add("handle");
                handles.push(handle);
            }; styleHandles(handles);
        };
    };
}

function checkIfContainsSelected() {
    shapes = document.querySelectorAll('.shape');
    for (var z = 0; z < shapes.length; z++) {
        if (shapes[z].classList.contains('selected')) {
            return true;
        } false;
    }
}

function deselectAll() {
    var arr = document.querySelectorAll('.selected');
    for (var i = 0; i < arr.length; i++) {
        arr[i].classList.remove('selected');
        selectionMarking();
    }
}

function styleHandles(arr) {
    if (arr === null) {
        return;
    } else {
        arr[0].style.left = '-5px';
        arr[0].style.top = '-5px';
        arr[1].style.right = '-5px';
        arr[1].style.top = '-5px';
        arr[2].style.left = '-5px';
        arr[2].style.bottom = '-5px';
        arr[3].style.right = '-5px';
        arr[3].style.bottom = '-5px';
    }
}

function deleteSelectedShape() {
    var board = document.getElementById("container");
    var selected = document.querySelectorAll(".selected");
    for (var i = 0; i < selected.length; i++) {
        board.removeChild(selected[i]);
    }
}

function colorHandler() {
    var colorBtn = document.querySelector("#color");
    var colorPalette = document.querySelector("#color-palette");
    var palette = ["#FF4B4B", "#89294A", "#4A274C", "#DB7D8B", "#8C6D8E", "#4A4878", "#DDDDDD", "#7DB3D0", "#106FAC"];
    colorPalette.style.display = "none";
    createColorQubes(palette, colorPalette);
    colorBtn.onclick = function () {
        togglePalette(colorPalette);
    }
}

function createColorQubes(arr, main) {
    for (var i = 0; i < arr.length; i++) {
        div = document.createElement("div");
        div.classList.add('qube');
        div.style.backgroundColor = arr[i];
        main.appendChild(div);
    };
    qubes = document.querySelectorAll('.qube');
    for (var i = 0; i < qubes.length; i++) {
        qubes[i].onclick = function () {
            changeShapeColor(this);
        }
    }

}

function changeShapeColor(div) {
    selectedArr = document.querySelectorAll('.selected');
    if (selectedArr !== []) {
        for (var x = 0; x < selectedArr.length; x++) {
            selectedArr[x].style.backgroundColor = div.style.backgroundColor;
        };
    };
}

function togglePalette(div) {
    if (div.style.display === 'none') {
        div.style.display = "flex";
    } else {
        div.style.display = "none";
    };
}

function getRandomColor() {
    var letters = 'ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function saveToLs() {
    saveBtn = document.querySelector('#save');
    saveBtn.onclick = function () {
        var name = prompt('Please give a unique name: ');
        var shapeArr = document.querySelectorAll('.shape');
        var board = document.querySelector('#container');
        var arr = [];
        // if (localStorage.getItem(name) === null) { //check if this name was given before

            for (var i=0; i<shapeArr.length; i++) {
                board.removeChild(shapeArr[i]);
                var key = window.getComputedStyle(shapeArr[i]);
                var styleVal = shapeArr[i].style.value;
                var obj = {};
                obj[key] = styleVal;
                arr.push(obj);

            }
        // }
        //  else { //add to existing arr under that name
        //     arr.push(localStorage.getItem(name));
        // };
            localStorage.setItem(name, JSON.stringify(arr));//make a function saveToDb()
            console.log(localStorage);
    }
}

function loadFromLs () {
    loadBtn = document.querySelector('#load');
    loadBtn.onclick = function () {
        var key = prompt('What is the key? ');
        if(key) {
            JSON.parse(localStorage.getItem(key));
        }
    }
}

// for(var key in objects) {
//     var value = objects[key];
// }
