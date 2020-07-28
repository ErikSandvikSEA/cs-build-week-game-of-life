import React from 'react'
import Box from './box'

const Grid = ({
    //pull in props from the Main component
    gridFull,
    cols,
    rows,
    selectBox
}) => {
    const width = cols * 20
    const rowsArr = []

    let boxClass = ""
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            let boxId = i + '_' + j

            if(gridFull[i][j]){
                boxClass = 'box on'
            } else {
                boxClass = 'box off'
            }

            rowsArr.push(
                <Box 
                    boxClass={boxClass}
                    key={boxId}
                    boxId={boxId}
                    row={i}
                    col={j}
                    selectBox={selectBox}
                />

            )
        }
    }


    return(
        <>
        <div 
            className="grid"
            style={{width: width}}
        >
            {rowsArr}
        </div>
        </>
    )
}

export default Grid