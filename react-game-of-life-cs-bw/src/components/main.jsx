import React, { useState } from 'react'
import Grid from './grid'



const Main = () => {
    let speed = 100
    let rows = 30
    let cols = 30
    const [generation, setGeneration] = useState(0)
    const [gridFull, setGridFull] = useState(Array(rows).fill().map(() => Array(cols).fill(false)))

    const selectBox = (row, col) => {
        let gridCopy = arrayClone(gridFull)
        gridCopy[row][col] = !gridCopy[row][col]
        setGridFull(gridCopy)
    }


    return(
        <>
        <h1>
            GAME OF LIFE
        </h1>
        <Grid
            gridFull={gridFull}
            rows={rows}
            cols={cols}
            selectBox={selectBox}
        />
        <h2>
            Generations: {generation}
        </h2>
        </>
    )
}

function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr));
}

export default Main