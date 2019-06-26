import React from 'react';
import './Game.css';
import {EASY, MEDIUM, HARD} from '../../const/Modes'

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            maxPow: 0,
            items: [],
            resultHorizontal: [],
            resultVertical: [],
            currentTotalVertical: [],
            currentTotalHorizontal: [],
            isTrueVertical: [],
            isTrueHorizontal: [],
            isFinish: 0
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
            isTrueHorizontal,
            maxPow
        } = this.state;


        let column = index % maxPow;
        let row = Math.floor(index / maxPow);


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
        this.isFinish();
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

    isFinish = () => {

        let {isTrueHorizontal, isTrueVertical, maxPow} = this.state;
        let isCompleteHorizontal = 0;
        let isCompleteVertical = 0;

        isTrueHorizontal.map(x => {
            isCompleteHorizontal += x;
        });

        isTrueVertical.map(x => {
            isCompleteVertical += x;
        });

        let isFinish = isCompleteVertical + isCompleteHorizontal === maxPow * 2 ? 1 : 0;

        this.setState({
            isFinish
        })
    };

    setItems = () => {
        let items = [];
        let maxPow = 0;
        let resultHorizontal = [];
        let currentTotalVertical = [];
        let currentTotalHorizontal = [];
        let resultVertical = [];

        switch (this.props.mode) {
            case 'easy':
                items = EASY;
                maxPow = 4;
                break;

            case 'medium':
                items = MEDIUM;
                maxPow = 6;
                break;

            case 'hard':
                items = HARD;
                maxPow = 8;
                break;
        }


        for (let i = 0; i < maxPow; i++) {
            resultVertical[i] = 0;
            resultHorizontal[i] = 0;
            currentTotalHorizontal[i] = 0;
            currentTotalVertical[i] = 0;
        }

        do { // 0 sonucunun gelmesini istemiyoruz
            for (let i = 0; i < maxPow; i++) {
                resultVertical[i] = 0;
                resultHorizontal[i] = 0;
            }
            items.map((item, index) => {
                let randomBinary = this.randomBinary();
                item.binaryValue = randomBinary;
                let column = index % maxPow;
                let row = Math.floor(index / maxPow);
                if (randomBinary) {
                    resultVertical[column] += Math.pow(2, items[index].rowValue);
                    resultHorizontal[row] += Math.pow(2, items[index].colValue);
                }

            });


        } while (this.isItZero(resultHorizontal, resultVertical, maxPow)) ;


        this.setState({
            items,
            resultVertical,
            resultHorizontal,
            maxPow,
            currentTotalVertical,
            currentTotalHorizontal
        })
    };


    giveUpHandler = () => {
        let {items} = this.state;

        items.map(item => {
            item.isActive = 0;
            if (item.binaryValue !== 0) {
                item.isActive = 1
            }
        });


        this.setState({
            isFinish: 1,
            items
        })
    };

    turnBackHandler = () => {
        let {items} = this.state;

        items.map(item => {
            item.isActive = 0;
        });
        this.props.screen();
    };


    isItZero(resultHorizontal, resultVertical, maxPow) {

        for (let i = 0; i < maxPow; i++) {
            if (resultHorizontal[i] === 0 || resultVertical[i] === 0) {
                return 1;
            }
        }

        return 0;
    };


    componentDidMount() {

        this.setItems()


    }


    render() {
        const {
            items,
            resultHorizontal,
            isTrueVertical,
            resultVertical,
            isTrueHorizontal,
            maxPow,
            isFinish
        } = this.state;
        const {mode} = this.props;
        return (
            <div>
                <div className={"container " + mode + "Container"}>
                    {
                        items.map((item, index) => {
                            if (index % maxPow === maxPow - 1) {
                                return (
                                    <div style={{display: "flex"}}>
                                        <div
                                            className={"item " + mode + "Item " + (items[index].isActive ? "activeItem" : "inactiveItem")}
                                            onClick={this.clickHandler} id={index} key={index}>
                                            {item.isActive}
                                        </div>
                                        <div
                                            className={"item " + mode + "Item " + (isTrueHorizontal[Math.floor(index / maxPow)] ? "resultItemTrue" : "resultItemFalse")}>
                                            {resultVertical[Math.floor(index / maxPow)]}
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div
                                        className={"item " + mode + "Item " + (items[index].isActive ? "activeItem" : "inactiveItem")}
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
                                    className={"item " + mode + "Item " + (isTrueVertical[index % maxPow] ? "resultItemTrue " : "resultItemFalse ")}
                                    key={index}>
                                    {resultHorizontal}
                                </div>
                            )
                        })
                    }


                </div>
                <div className="gameButtonArea">
                    {
                        //eğer oyun bitmişse geri dön ve baştan başlat butonları.
                        //eğer oyun bitmemişse pes et (give up) butonu olacak.
                        isFinish ?
                            (
                                <div className="button gameButton" onClick={this.turnBackHandler}>
                                    Turn Back
                                </div>
                            )
                            :
                            (
                                <div className="button gameButton" onClick={this.giveUpHandler}>
                                    Give Up
                                </div>
                            )
                    }
                </div>
            </div>


        );
    }
}


export default Game;
