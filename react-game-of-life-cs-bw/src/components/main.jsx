import React, { useState, useCallback, useRef } from 'react'
import produce from 'immer'
import { useEffect } from 'react'

const numRows = 50
const numCols = 50

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

const generateEmptyGrid = () => {
	const rows = []
	for (let i = 0; i < numRows; i++) {
		rows.push(Array.from(Array(numCols), () => 0))
	}
	return rows
}


const App = () => {
	const [grid, setGrid] = useState(() => {
		return generateEmptyGrid()
	})
    const [generation, setGeneration] = useState(0)
    const [running, setRunning] = useState(false)
    const [speed, setSpeed] = useState(0)
    const [settings, setSettings] = useState({
        numberOfRows: numRows,
        numberOfColums: numCols,
        speed: speed
    })


	const runningRef = useRef(running)
    runningRef.current = running
    
    const deadEdges = (row, col, previous) => {
        previous[0] = Array.from(Array(col), () => 0)
        previous[row - 1] = Array.from(Array(col), () => 0)
        for(let i = 1; i < row -1; i++){
            previous[i][0] = 0
            previous[i][col - 1] = 0
        }
        return previous
    }

    const random = () => {
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
    
    const handleUpdate = e => {
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
				{running ? 'stop' : 'start'}
			</button>
			<button
				onClick={() => {
                    setGrid(generateEmptyGrid())
                    setGeneration(0)
				}}
			>
				clear
			</button>
			<button
				onClick={() => {
                    random()    
                }
                }
			>
				random
			</button>
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
                                if(!running){

                                    const newGrid = produce(grid, (gridCopy) => {
                                        gridCopy[i][k] = grid[i][k] ? 0 : 1
                                    })
                                    setGrid(newGrid)
                                }
							}}
							style={{
								width: 20,
								height: 20,
								backgroundColor: grid[i][k] ? 'dodgerblue' : undefined,
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