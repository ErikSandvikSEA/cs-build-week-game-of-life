import React from 'react'
import '../index.css'

const About = () => {
    return (
    <div
        className="about"
    >
        <ol>
            <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
            <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
            <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
            <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
        </ol>
        <ul>
            <h3>Custom Features</h3>
            <li>User can generate a random assortement of live cells onto the grid.</li>
            <li>User can adjust speed of rendering generations.</li>
            <li>User can either auto play or view generations one at a time.</li>
            <li>Player can clear the grid.</li>
            <li>Every 5th generation will be indicated by all live cells turning blue.</li>
        </ul>
    </div>
    )
}

export default About