import React from 'react';
import './Home.css'

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: ''
        }
    }


    buttonClickHandler = (e) => {
        let id = e.target.id;
        this.props.mode(id);
    };

    goToGithub = () => {
        window.location.href = 'https://github.com/bilalkocak/decimalgame';
    };

    componentDidMount() {

    }


    render() {

        return (
            <div className="home">

                <div className="homeHeader">
                    Decimal Game
                </div>
                <div className="buttonContainer">
                    <div className="button" id={'easy'} onClick={this.buttonClickHandler}>
                        EASY (4x4)
                    </div>
                    <div className="button" id={'medium'} onClick={this.buttonClickHandler}>
                        MEDIUM (6x6)
                    </div>
                    <div className="button" id={'hard'} onClick={this.buttonClickHandler}>
                        HARD (8x8)
                    </div>
                    <div className="button" id={'github'} onClick={this.goToGithub}>
                        GITHUB
                    </div>
                </div>

            </div>
        );
    }
}


export default Home;
