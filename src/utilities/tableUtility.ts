export function addCellToRow(row: HTMLTableRowElement, input: string): HTMLTableRowElement {
    const cell = createCell(input)
    row.appendChild(cell);
    return row;
}

export function generateRow(cellTexts: string[]) {
    const row = document.createElement("tr");
    cellTexts.forEach( (cellText) => {
        addCellToRow(row, cellText)
    })
    return row
  }

function createCell(input: string): HTMLTableCellElement {
    const cell = document.createElement("td");
    const cellText = document.createTextNode(input);
    cell.appendChild(cellText);
    return cell;
}