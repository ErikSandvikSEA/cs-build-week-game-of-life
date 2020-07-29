import React, { useState } from 'react'
import {
    revealAbout,
    generateEmptyGrid,
    deadEdges,
    random,
} from '../functions'


const Header = ({
    setRunning,
    running,
    runningRef,
    runSimulation,
    stepSim,
    setGrid,
    numRows,
    numCols,
    generation,
    setGeneration,
    settings,
    handleUpdate,
    speed,
    setSpeed
}) => {
    const [showAbout, setShowAbout] = useState(false)
    const adjustSpeed = e => {
        e.preventDefault()
        console.log(settings.speed)
        setSpeed(Number(settings.speed))
    }


    return (
        <>
            <h1>Conway's Game of Life</h1>
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
                <label htmlFor='speed'>Speed (generations per second): </label>
                <input 
                    type='number'
                    min='0'
                    max='10'
                    id='speed' 
                    name='speed' 
                    value={settings.speed} 
                    onChange={handleUpdate} />
                <button
                    onClick={adjustSpeed}
                >
                    Change Speed!
                </button>
            </div>
            </>
    )
}


export default Header