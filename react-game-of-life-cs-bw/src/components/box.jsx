import React from 'react'

const Box = ({
    boxClass,
    boxId,
    selectBox,
    row,
    col
}) => {
    const boxSelectBox = () =>{
        selectBox(row, col)
    }


    return(
        <div
            className={boxClass}
            id={boxId}
            onClick={boxSelectBox}
        />
    )
}

export default Box