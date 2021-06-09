import React, {Component} from 'react'
import Node from './Node'

const noOfRows = 20
const noOfCols = 40

export default class Game extends Component {
    constructor() {
        super();

        const grid = []
        for (let rowIdx=0; rowIdx<noOfRows; rowIdx++) {
            const row = [];
            for (let nodeIdx=0; nodeIdx<noOfCols; nodeIdx++) {
                row.push({
                    isAlive: false,
                });
            }
            grid.push(row); 
        }

        grid[9][18].isAlive=true;
        grid[9][19].isAlive=true;
        grid[9][20].isAlive=true;
        grid[9][21].isAlive=true;

        this.state = {
            grid,
        }
    }

    componentDidMount = () => {
        setInterval(() => {
            this.update()
        }, 100);
    }

    isValidIdx = (row, col) => (row >= 0 && row < noOfRows && col >= 0 && col < noOfCols)

    countNeighbours = (row, col) => {
        const {grid} = this.state;

        let count = 0;

        if ( this.isValidIdx(row-1, col-1) && grid[row-1][col-1].isAlive ) {
            count++;
        }
        if ( this.isValidIdx(row-1, col) && grid[row-1][col].isAlive ) {
            count++;
        }
        if ( this.isValidIdx(row-1, col+1) && grid[row-1][col+1].isAlive ) {
            count++;
        }
        if ( this.isValidIdx(row, col-1) && grid[row][col-1].isAlive ) {
            count++;
        }
        if ( this.isValidIdx(row, col+1) && grid[row][col+1].isAlive ) {
            count++;
        }
        if ( this.isValidIdx(row+1, col-1) && grid[row+1][col-1].isAlive ) {
            count++;
        }
        if ( this.isValidIdx(row+1, col) && grid[row+1][col].isAlive ) {
            count++;
        }
        if ( this.isValidIdx(row+1, col+1) && grid[row+1][col+1].isAlive ) {
            count++;
        }

        return count;
    }

    update = () => {
        const {grid} = this.state;
        
        const newGrid = [];
        for (let rowIdx=0; rowIdx<noOfRows; rowIdx++) {
            const row = [];
            for (let nodeIdx=0; nodeIdx<noOfCols; nodeIdx++) {
                
                let isAlive = grid[rowIdx][nodeIdx].isAlive;
                const neighbours = this.countNeighbours(rowIdx, nodeIdx);

                if (neighbours < 2 || neighbours > 3) {
                    isAlive = false;
                }
                else if (neighbours === 3) {
                    isAlive = true;
                }

                row.push({
                    isAlive
                })
            }
            newGrid.push(row);
        }

        this.setState({
            grid: newGrid,
        })
    }

    toggleIsAlive = (row, col) => {
        const {grid} = this.state;
        grid[row][col].isAlive = !grid[row][col].isAlive;
        this.setState({
            grid
        })
    }

    render() {
        const {grid} = this.state;

        return(
            <div className="node-board">
                {grid.map((row, rowIdx) => (
                    row.map((node, nodeIdx) => (
                        <Node
                            key={nodeIdx}
                            row={rowIdx}
                            col={nodeIdx}
                            toggleIsAlive={this.toggleIsAlive}
                            isAlive={node.isAlive} 
                        ></Node>
                    ))
                ))}
            </div>
        )
    }
}