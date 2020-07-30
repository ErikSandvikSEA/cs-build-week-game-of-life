import React, { useState } from 'react'
import About from './about'
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
            <div className='buttons'>

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
                    setRunning(false)
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
            </div>
            {
                showAbout ?
                <About />
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