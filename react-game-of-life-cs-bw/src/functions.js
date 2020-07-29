
const generateEmptyGrid = (numRows, numCols) => {
    const rows = []
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0))
    }
    return rows
}

const deadEdges = (row, col, previous) => {
    previous[0] = Array.from(Array(col), () => 0)
    previous[row - 1] = Array.from(Array(col), () => 0)
    for (let i = 1; i < row - 1; i++) {
        previous[i][0] = 0
        previous[i][col - 1] = 0
    }
    return previous
}

const random = (numRows, numCols, deadEdges, setGrid) => {
    const rows = []
    for (let i = 0; i < numRows; i++) {
        rows.push(
            Array.from(Array(numCols), () =>
                Math.random() > 0.9 ? 1 : 0
            )
        )
    }
    deadEdges(numRows, numCols, rows)
    setGrid(rows)
}

const revealAbout = (showAbout, setShowAbout) => {
    setShowAbout(!showAbout)
}

const pickColor = (cell, generation) => {
    if (cell && (generation % 5 === 0)) {
        return 'dodgerblue'
    } else if (cell) {
        return 'teal'
    } else {
        return undefined
    }
}

export {
    generateEmptyGrid,
    deadEdges,
    random,
    revealAbout,
    pickColor
}