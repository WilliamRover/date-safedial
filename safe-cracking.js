var rotation = 0;
var right = document.getElementById("dialRight");
var left = document.getElementById("dialLeft");
var submit = document.getElementById("submit");
var reset = document.getElementById("reset");
var isLeft = true;
var r = document.querySelector(':root');
var date = document.getElementById("date");
var month = document.getElementById("month");
var year1 = document.getElementById("year1");
var year2 = document.getElementById("year2");
var dayNum = [date, month, year1, year2];

var startFlag = false;
var safeNum = 0;
var textReturn = "";
var a = 0;

function returnNum() {
    if (safeNum < 10) {
            textReturn = "0".concat(safeNum);
            dayNum[a].textContent = textReturn;
            a++;
            textReturn = "";
        } else {
            dayNum[a].textContent = safeNum;
            a++;
        }
}

function checkNum() {
    if (safeNum < 0) {
            safeNum = 99;
        } else if (safeNum > 99) {
            safeNum = 0;
        }
}

right.onclick = function() {
    if (startFlag == true && a < 4) {
        if(isLeft == true) {
            returnNum();
        }
        console.log(safeNum)
        isLeft = false;
        rotation += 3.6;
        safeNum -= 1;
        r.style.setProperty('--rotation', rotation + "deg");
        console.log(rotation + "deg");
        checkNum();
    }
}

left.onclick = function() {
    if (a < 4) {
        startFlag = true;
        if(isLeft == false) {
            returnNum();
        }
        console.log(safeNum)
        isLeft = true;
        rotation -= 3.6;
        safeNum += 1;
        r.style.setProperty('--rotation', rotation + "deg");
        console.log(rotation + "deg")
        checkNum();
    }
}

reset.onclick = function() {
    a = 0;
    rotation = 0;
    r.style.setProperty('--rotation', rotation + "deg");
    safeNum = 0;
    startFlag = false;
    isLeft = true;
    for (let i = 0; i < 4; i++) {
        dayNum[i].textContent = "--";
    }
}
submit.onclick = function() {
    confirm("Your chosen date is " + dayNum[0].textContent + " / " + dayNum[1].textContent + " / " + dayNum[2].textContent + dayNum[3].textContent);
}