import React from 'react';
import './App.css';
import Home from './components/Home/Home'
import Game from './components/Game/Game'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            screen: 'home',
            mode: ''
        }
    }


    getMode = (mode) => {
        this.setState({
            mode: mode,
            screen: 'game'
        })
    };

    getHomeScreen=()=>{
        this.setState({
            screen: 'home'
        })
    };


    render() {
        let {screen, mode} = this.state;
        return (
            <div className="App">

                {{
                    ['game']: <Game mode={mode} screen={this.getHomeScreen}/>,
                    ['home']: <Home mode={this.getMode}/>,
                }[screen]}

            </div>
        );
    }
}


export default App;
