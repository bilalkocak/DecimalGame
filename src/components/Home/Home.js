import React from 'react';

class Home extends React.Component {


    componentDidMount() {

    }


    render() {

        return (
            <div className="home">

                <div className="header">

                </div>
                <div className="buttonContainer">
                    <div className="button" id={'easy'}>
                        EASY (4x4)
                    </div>
                    <div className="button" id={'medium'}>
                        MEDIUM (6x6)
                    </div>
                    <div className="button" id={'hard'}>
                        HARD (8x8)
                    </div>
                    <div className="button" id={'github'}>
                        GITHUB
                    </div>
                </div>

            </div>
        );
    }
}


export default Home;
