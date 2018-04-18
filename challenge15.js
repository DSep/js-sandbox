const GRID = [
    ["", "", "", "^", "", "", "", "", "", ""],
    ["", "", "", "", "~", "", "", "", "", ""],
    ["", "", "", "", "^", "^", "", "", "", ""],
    ["", "", "", "", "^", "^", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["~", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "^", "~", "~", "", "", "", "^", "", ""],
    ["", "^", "", "~", "~", "", "", "", "", ""],
    ["", "^", "", "", "~", "~", "", "", "", ""],
];

/*
Rules:

Target cell should not be dangerous.
Target cell should be 1 cell away in any direction.

Write a function called distressBeacon() that takes a coordinate in the format 'H2' and returns a different
coordinate in the same format. (Example: distressBeacon('E8') should return 'F7'.)

Additional Instructions:
A cell is considered dangerous if there is a rock or a strong current in it, OR in the cells immediately above, below,
left, or right of it. Write a function called isDangerous() that will take a cell in the format 'G7' and return a true
or a false value. (Example: isDangerous('E4') would return true, because there is a rock there. Similarly,
isDangerous('B9') would return true, because there are rocks and currents AROUND the cell. However, isDangerous('I6')
would return false because it is open water.)
 */

let findSafe = function findSafe(row, column)  {
    let columns = GRID[0].length;
    let rows = GRID.length + 1 - 1;
    let safeCell = "";

    //Clockwise from up-right
    //up-right check
    if (column + 1 < columns && row - 1 < rows &&
        isSafe(row - 1, column + 1)) {
        safeCell = cellNumToStr(row - 1, column + 1);
        return safeCell;
    }
    //right check
    if (column + 1 < columns && isSafe(row, column + 1)) {
        safeCell = cellNumToStr(row, column + 1);
        return safeCell;
    }
    //down-right check
    if (column + 1 < columns && row + 1 < rows &&
        isSafe(row + 1, column + 1)) {
        safeCell = cellNumToStr(row + 1, column + 1);
        return safeCell;
    }
    //down check
    if (row + 1 < rows && isSafe(row + 1, column)) {
        safeCell = cellNumToStr(row + 1, column);
        return safeCell;
    }
    //down-left check
    if (column - 1 < columns && row + 1 < rows &&
        isSafe(row + 1, column - 1)) {
        safeCell = cellNumToStr(row + 1, column - 1);
        return safeCell;
    }
    //left check
    if (column - 1 < columns && isSafe(row, column - 1)) {
        safeCell = cellNumToStr(row, column - 1);
        return safeCell;
    }
    //up-left check
    if (column - 1 < columns && row - 1 < rows &&
        isSafe(row - 1, column - 1)) {
        safeCell = cellNumToStr(row - 1, column - 1);
        return safeCell;
    }
    //up check
    if (row - 1 < rows && isSafeCell(row - 1, column)) {
        safeCell = cellNumToStr(row - 1, column);
        return safeCell;
    }

    return safeCell;
};

//Helper function to check if a given cell (string) and the cells
// touching it or diagonal from it are safe
//REQUIRES: Cell identification, as a string, with column letter then
// row number.
//EFFECTS: Checks whether the cell or surroundings have a rock or
// strong current
let isSafe = function isSafe(row, column)  {
    let columns = GRID[0].length;
    let rows = GRID.length + 1 - 1;

    //left check
    if (column - 1 < columns && !isSafeCell(row, column - 1))
        return false;
    //right check
    if (column + 1 < columns && !isSafeCell(row, column - 1))
        return false;
    //up check
    if (row - 1 < rows && !isSafeCell(row - 1, column))
        return false;
    //down check
    if (row + 1 < rows && !isSafeCell(row + 1, column))
        return false;

    // //up-left check
    // if (column - 1 < columns && row - 1 < rows &&
    //     !isSafeCell(row - 1, column - 1))
    //     return false;
    // //up-right check
    // if (column + 1 < columns && row - 1 < rows &&
    //     !isSafeCell(row - 1, column + 1))
    //     return false;
    // //down-right check
    // if (column + 1 < columns && row + 1 < rows &&
    //     !isSafeCell(row + 1, column + 1))
    //     return false;
    // //down-left check
    // if (column - 1 < columns && row + 1 < rows &&
    //     !isSafeCell(row + 1, column - 1))
    //     return false;

    return isSafeCell(row, column); //itself
};

let isSafeCell = function isSafeCell(row, column) {
    let cellContents = GRID[row][column] + "";
    return cellContents !== "~" && cellContents !== "^";
};



//Convert the Row of given string position to integer
let cellRowToInt = function cellRowToInt(string){
    let selecRow = Number(string[1]) - 1;
    return selecRow;
}

//Convert the Column of given string position to integer
let cellColumnToInt = function cellColumnToInt(string){
    let selecColumStr = string[0];
    let selecColumInt = selecColumStr.charCodeAt(0) - 65;
    return selecColumInt;
}

//Convert Integer RowColumn position to string
let cellNumToStr = function cellNumToStr(rowInt, columnInt){
    let row = String(rowInt + 1);
    let column = String.fromCharCode(65 + columnInt);
    let curPos = (column + "" + row);
    return curPos;
}

let distressBeacon = function distressBeacon(string) {
    // console.log('begin distress beacon');
    let row = cellRowToInt(string);
    // console.log('row: ' + row);
    let column = cellColumnToInt(string);
    // console.log('column: ' + column);
    let targetCell = findSafe(row, column);
    return targetCell;
};

console.log(distressBeacon('E8')); //'F7'
