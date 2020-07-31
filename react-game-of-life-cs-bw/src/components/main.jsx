import React, { useState, useRef } from 'react'
import produce from 'immer'
import Header from './header'
import {
    generateEmptyGrid,
    pickColor
} from '../functions'


const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [1, 1],
    [1, 0],
    [-1, 0],
]



const App = () => {
    let numRows = 30
    let numCols = 30
    const [generation, setGeneration] = useState(0)
    const [running, setRunning] = useState(false)
    const [speed, setSpeed] = useState(3)
    const [settings, setSettings] = useState({
        numRows: numRows,
        numColss: numCols,
        speed: speed
    })
    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid(numRows, numCols)
    })
    const runningRef = useRef(running)
    runningRef.current = running

    const runSimulation = () => {
        if (!runningRef.current) {
            return
        }
        setGrid((g) => {

            return produce(g, (gridCopy) => {
                for (let i = 0; i < numRows; i++) {
                    for (let k = 0; k < numCols; k++) {
                        let neighbors = 0
                        operations.forEach(([x, y]) => {
                            const newI = i + x
                            const newK = k + y
                            if (
                                newI >= 0 &&
                                newI < numRows &&
                                newK >= 0 &&
                                newK < numCols
                            ) {
                                neighbors += g[newI][newK]
                            }
                        })

                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][k] = 0
                        } else if (g[i][k] === 0 && neighbors === 3) {
                            gridCopy[i][k] = 1
                        }
                    }
                }
            })
        })
        setGeneration(prevGeneration => {
            return prevGeneration + 1
        })
        setTimeout(runSimulation, Math.floor(1000 / speed))
    }

    const stepSim = () => {
        setGrid((g) => {

            return produce(g, (gridCopy) => {
                for (let i = 0; i < numRows; i++) {
                    for (let k = 0; k < numCols; k++) {
                        let neighbors = 0
                        operations.forEach(([x, y]) => {
                            const newI = i + x
                            const newK = k + y
                            if (
                                newI >= 0 &&
                                newI < numRows &&
                                newK >= 0 &&
                                newK < numCols
                            ) {
                                neighbors += g[newI][newK]
                            }
                        })

                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][k] = 0
                        } else if (g[i][k] === 0 && neighbors === 3) {
                            gridCopy[i][k] = 1
                        }
                    }
                }
            })
        })
        setGeneration(prevGeneration => {
            return prevGeneration + 1
        })
    }

    const handleUpdate = (e) => {
        setRunning(false)
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            {/* component housing play buttons and about section  */}
            <Header 

                setRunning={setRunning} 
                running={running}
                runningRef={runningRef}
                runSimulation={runSimulation}
                stepSim={stepSim}
                setGrid={setGrid}
                numRows={numRows}
                numCols={numCols}
                generation={generation}
                setGeneration={setGeneration}
                settings={settings}
                handleUpdate={handleUpdate}
                speed={speed}
                setSpeed={setSpeed}

            />
            {/* component housing the grid itself  */}
            <div
                className='grid'
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${numCols}, 20px)`,
                }}
            >
                {grid.map((rows, i) =>
                    rows.map((col, k) => (
                        <div
                            key={`${i}-${k}`}
                            onClick={() => {
                                if (!running) {

                                    const newGrid = produce(grid, (gridCopy) => {
                                        gridCopy[i][k] = grid[i][k] ? 0 : 1
                                    })
                                    setGrid(newGrid)
                                }
                            }}
                            style={{
                                width: 20,
                                height: 20,
                                // backgroundColor: grid[i][k] ? 'dodgerblue' : undefined,
                                backgroundColor: pickColor(grid[i][k], generation),

                                border: 'solid 1px black',
                            }}
                        />
                    ))
                )}
            </div>
        </>
    )
}

export default App