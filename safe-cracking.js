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
var dayTemp = [-1, -1, -1, -1];
var leapYear = false;
var dayExist = true;
var special = false;
var eventSpecial = "";

var done = true;
var startFlag = false;
var safeNum = 0;
var textReturn = "";
var a = 0;

var deltaMonth = 0;
var deltaDay = 0;
var year = 0;   

var sDay = [
    [1, 9, 1939, 2, 9, 1945, "Erikaaa"],
    [1, 11, 1955, 30, 4, 1975, "When the tree speaks Vietnamese"]
    // [14, 2, 2025, 15, 2, 2025, "Valentine"]
];

function specialDay(dd1, mm1, yyyy1, dd2, mm2, yyyy2, event) {
    if (a == 4) {
        if (year >= yyyy1 && year <= yyyy2) {
            console.log("Year is special");
            if ((year == yyyy1 && dayTemp[1] >= mm1) || (year == yyyy2 && dayTemp[1] <= mm2)) {
                console.log("Month is special v1");
                if (checkDelta(0, 0, mm1, dayTemp[1], yyyy1, year, false) <= checkDelta(0, 0, mm1, mm2, yyyy1, yyyy2, false)) {
                    console.log("Month is special");
                    if(checkDelta(dd1, dayTemp[0], mm1, dayTemp[1], yyyy1, year, true) <= checkDelta(dd1, dd2, mm1, mm2, yyyy1, yyyy2, true)) {
                        console.log("Day is special");
                        console.log(checkDelta(dd1, dayTemp[0], mm1, dayTemp[1], yyyy1, year, true), checkDelta(dd1, dd2, mm1, mm2, yyyy1, yyyy2, true));
                        eventSpecial = event;
                        special = true;
                    }
                }
            }
        } else {
            special = false;
        }
    }
}

function fleapYear(inputYear) {
    if (a == 4) {
        if (inputYear % 400 == 0) {
            leapYear = true;
        }
        else if (inputYear % 100 == 0) {
            leapYear = false;
        }
        else if (inputYear % 4 == 0) {
            leapYear = true;
        }
        else {
            leapYear = false;
        }
        return leapYear;
    }
}

function checkDelta(day1, day2, month1, month2, year1, year2, index ) { // index: input true for day, false for month
    if (a == 4) {
        if (index == false) {
            deltaMonth = 12*(year2 - year1 - 1) + (12 - month1) + month2;
            return deltaMonth;
        } else if (index == true) {
            // Initial year
            // Initial month
            if (month1 <= 7) {
                if (month1 == 2 && fleapYear(year1) == true) {
                    deltaDay += 29 - day1;
                } else if (month1 == 2 && fleapYear(year1) == false) {
                    deltaDay += 28 - day1;
                } else if (month1 % 2 == 0) {
                    deltaDay += 30 - day1;
                } else {
                    deltaDay += 31 - day1;
                }
            }
            if (month1 > 7) {
                if (month1 % 2 == 0) {
                    deltaDay += 31 - day1;
                } else {
                    deltaDay += 30 - day1;
                }
            }
            // In-between month
            for (let i = month1 + 1; i <= 7; i++) {
                if (i == 2 && fleapYear(year1) == true) {
                    deltaDay += 29;
                } else if(i == 2 && fleapYear(year1) == false) {
                    deltaDay += 28;
                } else if (i % 2 == 0) {
                    deltaDay += 31;
                } else {
                    deltaDay += 30;
                }
                
            }
            for (let i = month1 + 1; i > 7 && i <= 12; i++) {
                if (i % 2 == 0) {
                    deltaDay += 30;
                } else {
                    deltaDay += 31;
                }
            }
            // In-between year
            for (let i = 1; i <= (year2 - year1 - 2); i++) {
                if (fleapYear(year + i) == true) {
                    deltaDay += 366;
                } else {
                    deltaDay += 365;
                }
            }

            // Last year
            // In-between month
            for (let i = 1; i <= month2 - 1 && month2 <= 7; i++) {
                if (i == 2 && fleapYear(year1) == true) {
                    deltaDay += 29;
                } else if(i == 2 && fleapYear(year1) == false) {
                    deltaDay += 28;
                } else if (i % 2 == 0) {
                    deltaDay += 31;
                } else {
                    deltaDay += 30;
                }
            }
            for (let i = 8; i <= month2 - 1; i++) {
                if (i % 2 == 0) {
                    deltaDay += 30;
                } else {
                    deltaDay += 31;
                }
            }
            // Last month
            if (month2 <= 7) {
                if (month2 == 2 && fleapYear(year2) == true) {
                    deltaDay += 29 - day2;
                } else if (month2 == 2 && fleapYear(year2) == false) {
                    deltaDay += 28 - day2;
                } else if (month2 % 2 == 0) {
                    deltaDay += 30 - day2;
                } else {
                    deltaDay += 31 - day2;
                }
            }
            if (month2 > 7) {
                if (month2 % 2 == 0) {
                    deltaDay += 31 - day2;
                } else {
                    deltaDay += 30 - day2;
                }
            }
            return deltaDay;
        }
    }
}


function fdayExist() {
    if (a == 4) {
        if (dayTemp[1] > 12 || dayTemp[1] == 0 || dayTemp[0] == 0) {
            dayExist = false;
        }
        if (dayTemp[1] == 2) {
            if (fleapYear(year) == true && dayTemp[0] > 29) {
                dayExist = false;
            } else if (dayTemp[0] > 28) {
                dayExist = false;
            }
        }

        if (dayTemp[1] <= 7) {
            if (dayTemp[1] % 2 == 0 && dayTemp[0] > 30) {
                dayExist = false;
            } else if (dayTemp[1] % 2 != 0 && dayTemp[0] > 31) {
                dayExist = false;
            }
        }
        if (dayTemp[1] > 7) {
            if (dayTemp[1] % 2 == 0 && dayTemp[0] > 31) {
                dayExist = false;
            } else if (dayTemp[1] % 2 != 0 && dayTemp[0] > 30) {
                dayExist = false;
            }
        }
        return dayExist;
    }
}

function returnNum() {
    dayTemp[a] = safeNum;
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
        console.log(safeNum, a)
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
        console.log(safeNum, a)
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
        dayTemp[i] = -1;
    }
    done = true;
    dayExist = true;
    leapYear = false;
    deltaMonth = 0;
    deltaDay = 0;
    year = 0;
}


submit.onclick = function() {
    for (let i = 0; i < 4; i++) {
        if (dayTemp[i] == -1) {
            done = false;
            break;
        }
        done = true;
    }
    if (a == 4) {
        if (dayTemp[3] < 10) {
            year = Number(dayTemp[2].toString().concat("0").concat(dayTemp[3]));  
        } else {
            year = Number(dayTemp[2].toString().concat(dayTemp[3]));  
        }
    }

    for (let i = 0; i < sDay.length; i++) {
        console.log("Check special ran")
        specialDay(sDay[i][0], sDay[i][1], sDay[i][2], sDay[i][3], sDay[i][4], sDay[i][5], sDay[i][6]);
        if (special == true) {
            break;
        }
    }
    
    if (fdayExist() == false) {
        confirm("Oh hell nah DAY NOT EXIST");
    } else if (done == false) {
        confirm("Go back and select your date");
    } else if (special == true) {
        confirm(eventSpecial);
    } else {
        confirm("Your chosen date is " + dayNum[0].textContent + " / " + dayNum[1].textContent + " / " + dayNum[2].textContent + dayNum[3].textContent);
    }
}