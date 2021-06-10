import React, {Component} from 'react'
import Node from './Node'


export default class Game extends Component {
    constructor() {
        super();

        this.state = {
            grid : [],
            height : null,
            width : null,
            noOfRows : null,
            noOfCols : null
        }
    }

    componentDidMount = () => {
        this.createGrid()
        window.addEventListener('resize', this.createGrid);
        setInterval(() => {
            this.update()
        }, 100);
    }

    createGrid = () => {
        const height = window.innerHeight;
        const width = window.innerWidth;
        
        const sizeOfNode = width*0.025
        const noOfRows = Math.ceil(height / sizeOfNode);
        const noOfCols = 40;

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

        this.addBlinker(grid, noOfRows, noOfCols)

        this.setState({
            grid,
            noOfRows,
            noOfCols
        })
    }

    addBlinker = (grid, noOfRows, noOfCols) => {
        const x = Math.floor(noOfRows/2);
        const y = Math.floor(noOfCols/2);

        grid[x][y-1].isAlive=true;
        grid[x][y].isAlive=true;
        grid[x][y+1].isAlive=true;
    }

    isValidIdx = (row, col) => (row >= 0 && row < this.state.noOfRows && col >= 0 && col < this.state.noOfCols)

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
        const {grid, noOfRows, noOfCols} = this.state;
        
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