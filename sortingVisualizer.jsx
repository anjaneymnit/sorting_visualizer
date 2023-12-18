import React from 'react';
import './sortingVisualizer.css';
import { getMergeSortAnimations } from './sortingAlgo/mergeSort';

// Change this value for the speed of the animations.
// const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 200;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'white';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 600));
        }
        this.setState({ array });
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                // console.log(barOneIdx , barTwoIdx);
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * this.state.ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * this.state.ANIMATION_SPEED_MS);
            }
        }
    }

    testSortingAlgorithms() {
        // Test the sorting algorithms
    }
    speedChange =(event) =>{
        const newSpeed = parseInt(event.target.value);
        this.setState({ANIMATION_SPEED_MS:newSpeed});
    };

    render() {
        const { array } = this.state;
        return (
            <>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{ height: `${value}px` }}
                        ></div>
                    ))}
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    {/* Other sorting algorithm buttons */}
                    {/* <button onClick={() => this.testSortingAlgorithms()}>Test Algorithms</button> */}
                    <label htmlFor="ANIMATION_SPEED_MS">SPEED</label>
                    <input 
                    type="range"
                    min="5"
                    max ="100"
                    value={this.state.ANIMATION_SPEED_MS}
                    className='slider'
                    onChange={this.speedChange}
                     />
                </div>
            </>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
