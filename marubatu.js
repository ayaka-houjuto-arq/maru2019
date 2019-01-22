


function game() {

    var table = document.querySelector("table");

    for(var a = 0; a < 3; a++) {

        var tr = document.createElement("tr");


        for(var j = 0; j < 3; j++) {

            var td = document.createElement("td");
            td.setAttribute("id", "" + a + "-" + j);
            td.setAttribute("onclick", "clickTd(this);");
            tr.append(td);
        }
        table.append(tr);
    }
}



var mode = true;
var isMaru = true;
var cellStatus = [
    null, null, null,
    null, null, null,
    null, null, null
];




function clickTd(target) {

    if(mode == true) {

        var [sx, sy] = target.id.split("-");
        var x = Number(sx);
        var y = Number(sy);


        if(target.innerHTML == '') {

            cellStatus[y * 3 + x] = isMaru;

            if(isMaru == true) {

                target.innerHTML = '<font color="#FF0000">〇</font>';

                isMaru = false;

            } else {

                target.innerHTML = '<font color="#0000FF">✕</font>';

                isMaru = true;
            }

            
            document.getElementById(target.id).style.cursor = 'not-allowed';

        
            checkGameOver();
        }
    }
}

function checkGameOver() {

    var count;

    var finishPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ]


    for(var a = 0; a < finishPatterns.length; a++) {

        var cell1 = cellStatus[finishPatterns[a][0]];
        var cell2 = cellStatus[finishPatterns[a][1]];
        var cell3 = cellStatus[finishPatterns[a][2]];


        if(cell1 != null && cell2 != null && cell3 != null && cell1 == cell2 && cell2 == cell3){
            
           mode = false;
        }
    }


    if(mode == false) {
        if (isMaru == true) {
            document.getElementById("result").innerText = "✕の勝利！👏";
        } else {
            document.getElementById("result").innerText = "〇の勝利！👏";
        }

        for(var a = 0; a < 3; a++) {
            for(var j = 0; j < 3; j++) {
                document.getElementById(a + "-" + j).style.cursor = 'not-allowed';
            }
        }

    } else {
        
        for(count = 0; count < 9; count++) {
            if(cellStatus[count] == null) {
                break;
            }
        }

        if(count == 9) {

            mode = false;
            document.getElementById("result").innerText = "😳引き分け😳";
        
        } else {

            if (isMaru == true) {
                document.getElementById("result").innerText = "次は、〇の番！";
            } else {
                document.getElementById("result").innerText = "次は、✕の番！";
            }
            
        }
    }
}