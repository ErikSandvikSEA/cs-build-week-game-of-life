import React, { useState, useRef } from 'react'
import produce from 'immer'
import { 
    generateEmptyGrid, 
    deadEdges, 
    random,
    revealAbout,
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
    const [numRows, setNumRows] = useState(50)
    const [numCols, setNumCols] = useState(50)
    const [showAbout, setShowAbout] = useState(false)
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

    const adjustSpeed = e => {
        e.preventDefault()
        console.log(settings.speed)
        setSpeed(Number(settings.speed))
    }

    return (
        <>
            <button
                onClick={() => {
                    setRunning(!running)
                    if (!running) {
                        runningRef.current = true
                        runSimulation()
                    }
                }}
            >
                {running ? 'Pause' : 'Auto'}
            </button>
            <button
                onClick={stepSim}
            >
                Next Gen >
            </button>
            <button
                onClick={() => {
                    setGrid(generateEmptyGrid(numRows, numCols))
                    setGeneration(0)
                }}
            >
                clear
			</button>
            <button
                onClick={() => {
                    random(numRows, numCols, deadEdges, setGrid)
                }
                }
            >
                random
			</button>
            <button
                onClick={() => {
                    revealAbout(showAbout, setShowAbout)
                }}
            >
                About the game
            </button>
            {
                showAbout ?
                    <div
                        border='1px solid blue'
                    >
                        <ol>
                            <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                            <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                            <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                            <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                        </ol>
                        <ul>
                            <li><h3>Custom Features</h3></li>
                            <li>User can generate a random assortement of live cells onto the grid.</li>
                            <li>User can adjust speed of rendering generations.</li>
                            <li>User can either auto play or view generations one at a time.</li>
                            <li>Player can clear the grid.</li>
                        </ul>
                    </div>
                    : null}
            <div>
                Generation: {generation}
            </div>
            <div>
                <label htmlFor='speed'>Speed: </label>
                <input id='speed' name='speed' value={settings.speed} onChange={handleUpdate} />
                <button
                    onClick={adjustSpeed}
                >
                    Change Speed!
                </button>
            </div>

            <div
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