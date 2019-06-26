import React from 'react';
import './App.css';
class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            maxPow: 4,
            items: [//daha sonra komponent yap
                {
                    rowValue: 3,
                    colValue: 3,
                    isActive: 0,
                    binaryValue: 0
                }, {
                    rowValue: 3,
                    colValue: 2,
                    isActive: 0,
                    binaryValue: 0
                }, {
                    rowValue: 3,
                    colValue: 1,
                    isActive: 0,
                    binaryValue: 0
                }, {
                    rowValue: 3,
                    colValue: 0,
                    isActive: 0,
                    binaryValue: 0
                }, {
                    rowValue: 2,
                    colValue: 3,
                    isActive: 0,
                    binaryValue: 0
                }, {
                    rowValue: 2,
                    colValue: 2,
                    isActive: 0,
                    binaryValue: 0
                }, {
                    rowValue: 2,
                    colValue: 1,
                    isActive: 0,
                    binaryValue: 0
                }, {
                    rowValue: 2,
                    colValue: 0,
                    isActive: 0,
                    binaryValue: 0
                }, {
                    rowValue: 1,
                    colValue: 3,
                    isActive: 0,
                    binaryValue: 0
                }, {
                    rowValue: 1,
                    colValue: 2,
                    isActive: 0,
                    binaryValue: 0
                }, {
                    rowValue: 1,
                    colValue: 1,
                    isActive: 0,
                    binaryValue: 0
                }, {
                    rowValue: 1,
                    colValue: 0,
                    isActive: 0,
                    binaryValue: 0
                }, {
                    rowValue: 0,
                    colValue: 3,
                    isActive: 0,
                    binaryValue: 0
                }, {
                    rowValue: 0,
                    colValue: 2,
                    isActive: 0,
                    binaryValue: 0
                }, {
                    rowValue: 0,
                    colValue: 1,
                    isActive: 0,
                    binaryValue: 0
                }, {
                    rowValue: 0,
                    colValue: 0,
                    isActive: 0,
                    binaryValue: 0
                },
            ],
            resultHorizontal: [],
            resultVertical: [],
            currentTotalVertical: [],
            currentTotalHorizontal: [],
            isTrueVertical: [],
            isTrueHorizontal: [],
        }
    }


    clickHandler = (e) => {
        let index = e.target.id;
        let {
            items,
            resultHorizontal,
            currentTotalVertical,
            currentTotalHorizontal,
            isTrueVertical,
            resultVertical,
            isTrueHorizontal
        } = this.state;


        let column = index % 4;
        let row = Math.floor(index / 4);


        if (items[index].isActive) {
            items[index].isActive = 0;
            currentTotalVertical[column] -= Math.pow(2, items[index].rowValue);
            currentTotalHorizontal[row] -= Math.pow(2, items[index].colValue);
        } else {
            items[index].isActive = 1;
            currentTotalVertical[column] += Math.pow(2, items[index].rowValue);
            currentTotalHorizontal[row] += Math.pow(2, items[index].colValue);
        }

        if (resultHorizontal[column] === currentTotalVertical[column]) {
            isTrueVertical[column] = 1;
        } else {
            isTrueVertical[column] = 0
        }

        if (resultVertical[row] === currentTotalHorizontal[row]) {
            isTrueHorizontal[row] = 1;
        } else {
            isTrueHorizontal[row] = 0
        }

        this.setState({
            items,
            resultHorizontal,
            currentTotalVertical,
            currentTotalHorizontal,
            isTrueVertical,
            resultVertical,
            isTrueHorizontal,
        })
    };

    randomBinary() {
        return Math.floor(Math.random() * 10) % 2
    }

    componentDidMount() {
        let {
            items,
            resultHorizontal,
            currentTotalVertical,
            currentTotalHorizontal,
            resultVertical,
            maxPow
        } = this.state;


        for (let i = 0; i < maxPow; i++) {
            resultVertical[i] = 0;
            resultHorizontal[i] = 0;
            currentTotalHorizontal[i] = 0;
            currentTotalVertical[i] = 0;
        }


        items.map((item, index) => {
            let randomBinary = this.randomBinary();
            item.binaryValue = randomBinary;
            let column = index % 4;
            let row = Math.floor(index / 4);
            console.log(resultVertical);
            if (randomBinary) {
                resultVertical[column] += Math.pow(2, items[index].rowValue);
                resultHorizontal[row] += Math.pow(2, items[index].colValue);
            }
        });


        this.setState({
            items,
            resultVertical,
            resultHorizontal
        })


    }


    render() {
        const {items, resultHorizontal, isTrueVertical, resultVertical, isTrueHorizontal} = this.state;
        return (

                <div className="container">
                    {
                        items.map((item, index) => {
                            if (index % 4 === 3) {
                                return (
                                    <div style={{display: "flex"}}>
                                        <div
                                            className={"item " + (items[index].isActive ? "activeItem" : "inactiveItem")}
                                            onClick={this.clickHandler} id={index} key={index}>
                                            {item.isActive}
                                        </div>
                                        <div
                                            className={"item " + (isTrueHorizontal[Math.floor(index / 4)] ? "resultItemTrue" : "resultItemFalse")}>
                                            {resultVertical[Math.floor(index / 4)]}
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div
                                        className={"item " + (items[index].isActive ? "activeItem" : "inactiveItem")}
                                        onClick={this.clickHandler} id={index} key={index}>
                                        {item.isActive}
                                    </div>
                                )
                            }

                        })
                    }
                    {
                        resultHorizontal.map((resultHorizontal, index) => {
                            return (
                                <div
                                    className={"item " + (isTrueVertical[index % 4] ? "resultItemTrue" : "resultItemFalse")}
                                    key={index}>
                                    {resultHorizontal}
                                </div>
                            )
                        })
                    }
                </div>

        );
    }
}


export default Game;
