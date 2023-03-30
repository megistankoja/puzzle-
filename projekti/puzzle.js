var rows = 3;
var columns = 3;

var currTile; //pjeseza qe do te nderrosh
var otherTile; // pjesa bosh 

var turns = 0;

var imgOrderSolved = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3",];


window.onload = function() {
   
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {

            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();

             $(document).ready(function(){
                $("#button").click(function(){
                    tile.src = imgOrderSolved.shift() + ".jpg";
                });
              });

            tile.src = imgOrder.shift() + ".jpg";
            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles

            document.getElementById("board").append(tile);
            
        }
    }
   
}


function dragStart() {
    currTile = this; //referon ne imazhin e klikuar
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //referon te pjesa qe po "dropped on "
}

function dragEnd() {
    if (!otherTile.src.includes("7.jpg")) { //kusht nqs pjeset jan ngjitur me njera tjetren
        return;
    }

    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1; 
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    //mjafton te plotesohet njeri prej ketyre kushteve qe te jene ngjitur
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown; 

    if (isAdjacent) { 
        // ben swapp mes imazhit te klikuar dhe atij bosh (qe eshte gjithmone nr 7)
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns ++;
        document.getElementById("turns").innerText = turns;
    }


}
