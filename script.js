const spreadSheetContainer = document.querySelector("#spreadsheet-container");
const ROWS = 10;
const COLUMNS = 10;
const spreadsheet = [];

class Cell {
  constructor(isHeader, disabled, data, row, columns, active = false) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.columns = columns;
    this.active = active;
  }
}

initSpreadSheet();

function initSpreadSheet() {
  for (let i = 0; i < ROWS; i++) {
    let spreadsheetRow = [];
    for (let j = 0; j < COLUMNS; j++) {
      const cell = new Cell(false, false, i + "-" + j, i, j, false);
      spreadsheetRow.push(cell);
    }
    spreadsheet.push(spreadsheetRow);
  }

  drawSheet();

  console.log("speradsheet", spreadsheet);
}
function createCellEl(cell) {
  const cellEl = document.createElement("input");
  cellEl.className = "cell";
  cellEl.id = "cell_" + cell.row + "-" + cell.columns;
  cellEl.value = cell.data;
  cellEl.disabled = cell.disabled;
  return cellEl;
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
