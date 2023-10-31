const spreadSheetContainer = document.querySelector("#spreadsheet-container");
const ROWS = 10;
const COLUMNS = 10;
const spreadsheet = [];
const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

class Cell {
  constructor(isHeader, disabled, data, row, column,rowName,columnName, active = false) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.rowName = rowName;
    this.column = column;
    this.columnName = columnName;
    this.active = active;
  }
}

initSpreadSheet();

function initSpreadSheet() {
  for (let i = 0; i < ROWS; i++) {
    let spreadsheetRow = [];
    for (let j = 0; j < COLUMNS; j++) {
        let cellData='';
        let isHeader = false;
        let disabled = false;

        if (j===0) {
            cellData = i;
            isHeader = true;
            disabled = true;
        }

        if (i===0) {
            cellData = alphabets[j-1];
            isHeader = true;
            disabled = true;
        }

        if (!cellData){
            cellData = '';
        }

        const rowName = i;
        const columnName = alphabets[j-1]; 

      const cell = new Cell(isHeader, disabled, cellData , i, j,rowName,columnName, false);
      spreadsheetRow.push(cell);
    }
    spreadsheet.push(spreadsheetRow);
  }

  drawSheet();

  console.log("spreadsheet", spreadsheet);
}
function createCellEl(cell) {
  const cellEl = document.createElement("input");
  cellEl.className = "cell";
  cellEl.id = "cell_" + cell.row + cell.column;
  cellEl.value = cell.data;
  cellEl.disabled = cell.disabled;

  if (cell.isHeader) {
    cellEl.classList.add("header");
  }

  cellEl.onclick = () => handleCellClick(cell);

  return cellEl;
}

function handleCellClick(cell) {
    clearHeaderActiveStates();
    const columnHeader = spreadsheet[0][cell.column];
    const rowHeader = spreadsheet[cell.row][0];
    
    const columHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);
    const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
    
    columHeaderEl.classList.add('active');
    rowHeaderEl.classList.add('active');

    console.log('clicked cell', columHeaderEl,rowHeaderEl);
    
}

function clearHeaderActiveStates() {
    const headers = document.querySelectorAll('.header');

    headers.forEach((header) => {
        header.classList.remove('active');
    })
}

function getElFromRowCol(row,col){
    return document.querySelector("#cell_" + row + col);
}


function drawSheet() {
  for (let i = 0; i < spreadsheet.length; i++) {
    const rowContainerEl = document.createElement("div");
    rowContainerEl.className = "cell-row";

    for (let j = 0; j < spreadsheet[i].length; j++) {
    const cell = spreadsheet[i][j];
    rowContainerEl.append(createCellEl(cell));

    }
    spreadSheetContainer.append(rowContainerEl);
  }
}
