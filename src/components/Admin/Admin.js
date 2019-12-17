import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import axios from "../../axios-tablefootball";
import AdminTeam from "./AdminTeam/AdminTeam";
import Modal from "./Modal/Modal";
import firebase from 'firebase';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionsTypes';
import * as actions from '../../store/actions/index';


class Admin extends Component {
    state = {
        teams: null,
        teamsTable: null,
        newPlayer: null,
        rounds: [],
        edit: false,
        activeMatch: {},
        loged: false,
        objLog: {
            returnSecureToken: true,
            user: '',
            email: ''
        }
    }

    componentDidMount() {
        const resultRef = firebase.database().ref().child('round')
        resultRef.on('value', this.getRounds);
    }

    getRounds = (snap) => {

        if (snap.val()) {
            let tmpObj = snap.val();
            let tmpArr = [];
            for (let i in tmpObj) {
                for (let j = 0; j < tmpObj[i].length; j++) {
                    tmpObj[i][j].round = i;
                    tmpObj[i][j].match = j;
                    tmpArr.push(tmpObj[i][j])
                }
            }
            this.setState({ rounds: tmpArr })
        }

    }

    getTeams = () => {
        axios.get('teamsToPlay.json').then(response => {
            const teams = response.data;
            const teamsArr = [];
            for (let key in teams) {
                if (teams.hasOwnProperty(key)) {
                    teamsArr.push({ ...teams[key], id: key })
                }
            }
            this.setState({ teamsTable: response.data })
            const pairs = this.schedule(teamsArr.length, teamsArr)
            for (let i = 0; i < pairs.length; i++) {
                for (let j = 0; j < pairs[i].length; j++) {
                    pairs[i][j]['p1'] = pairs[i][j][0].name;
                    pairs[i][j]['p2'] = pairs[i][j][1].name;
                    pairs[i][j]['p1id'] = pairs[i][j][0].id;
                    pairs[i][j]['p2id'] = pairs[i][j][1].id;
                    pairs[i][j]['played'] = false;
                    pairs[i][j].splice(0, 2);
                }
            }
            this.setState({ teams: pairs })
        })
    }

    setPairs = () => {
        const obj = Object.assign({}, this.state.teams)
        for (let i in obj) {
            for (let j = 0; j < obj[i].length; j++) {
                const a = Object.assign({}, obj[i][j]);
                obj[i][j] = { ...a }
            }
        }
        axios.put('https://ivfootball-fd9bf.firebaseio.com/round.json?auth=' + this.props.token, obj)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            });
    }

    deleteTable = (url) => {
        axios.delete(url)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            });
    }

    setTeamsTable = () => {
        const copyPlayers = { ...this.state.teamsTable }
        const tmpArr = []
        for (let i in copyPlayers) {
            copyPlayers[i].wins = 0;
            copyPlayers[i].lose = 0;
            copyPlayers[i].score = 0;
            copyPlayers[i].id = i;
            tmpArr.push(copyPlayers[i])
        }
        axios.put('https://ivfootball-fd9bf.firebaseio.com/teams.json?auth=' + this.props.token, copyPlayers)
            .then(response => {
                console.log(response.data)

            })
            .catch(error => {
                console.log(error)
            });
    }

    inputHandler = (event) => {
        this.setState({ newPlayer: event.target.value })
    }

    loginHandler = (event, type) => {
        let copyObj = { ...this.state.objLog }
        if (type === 'email') {
            copyObj.email = event.target.value;
        }
        else {
            copyObj.password = event.target.value;
        }
        this.setState({ objLog: copyObj })

    }

    inputChangeScore = (event, team) => {
        let copyState = { ...this.state.activeMatch }
        if (team === 'p1') {
            copyState.p1r = event.target.value;
            this.setState({ activeMatch: copyState })
        }
        else {
            copyState.p2r = event.target.value;
            this.setState({ activeMatch: copyState })
        }
    }
    logIn = (event) => {
        event.preventDefault();
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAMpAhWo9RXv_Y4bWR-PEWwRnPMTaiyF_E", this.state.objLog)
            .then(response => {
                this.props.setToken(response.data.idToken)
                this.setState({ loged: true })
            })
            .catch(error => {
                console.log(error)
            });

    }

    saveUser = (event) => {
        event.preventDefault();
        const teamObj = {
            name: this.state.newPlayer
        }
        axios.post('https://ivfootball-fd9bf.firebaseio.com/teamsToPlay.json?auth=' + this.props.token, teamObj)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            });
    }

    selectActiveMatch = (team) => {
        this.setState({ activeMatch: team })
        this.setState({ edit: true })
    }

    editMatch = () => {
        let tmpObj = { ...this.state.activeMatch }
        const round = tmpObj.round;
        const match = tmpObj.match;
        tmpObj.winner = 'p1';
        if (tmpObj.p1r < tmpObj.p2r) {
            tmpObj.winner = 'p2'
        }
        tmpObj.played = true;
        delete tmpObj.round;
        delete tmpObj.match;
        delete tmpObj.id;
        this.setMatch(round, match, tmpObj)
        this.updateTeam(tmpObj.p1id, tmpObj.p2id, tmpObj)

    }

    setMatch = (round, match, tmpObj) => {
        axios.put('/round/' + round + '/' + match + '.json?auth=' + this.props.token, tmpObj)
            .then(response => {
                console.log(response.data)
                this.setState({ edit: false })
            })
            .catch(error => {
                console.log(error)
            });
    }

    updateTeam = (p1id, p2id, tmpObj) => {
        let win = p1id;
        let lose = p2id;
        if (tmpObj.winner !== 'p1') {
            win = p2id;
            lose = p1id
        }
        //win
        axios.get('/teams/' + win + '.json')
            .then(response => {
                let data = response.data;
                data.wins += 1;
                data.score += 3;
                axios.put('/teams/' + win + '.json?auth=' + this.props.token, data)
                    .then(response => {
                        console.log(response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
            .catch(error => {
                console.log(error)
            });


        //lose
        axios.get('/teams/' + lose + '.json')
            .then(response => {
                let data = response.data;
                data.lose += 1;
                axios.put('/teams/' + lose + '.json?auth=' + this.props.token, data)
                    .then(response => {
                        console.log(response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    });

            })
            .catch(error => {
                console.log(error)
            });
    }

    schedule(number, playersArr) {
        var resultArr = [];
        if (!playersArr) {
            playersArr = [];
            for (var i = 1; i <= number; i += 1) {
                playersArr.push(i);
            }
        } else {
            playersArr = playersArr.slice();
        }

        if (number % 2 === 1) {
            playersArr.push(this.def);
            number += 1;
        }
        for (var j = 0; j < number - 1; j += 1) {
            resultArr[j] = [];
            for (var k = 0; k < number / 2; k += 1) {
                if (playersArr[k] !== this.def && playersArr[number - 1 - k] !== this.def) {
                    resultArr[j].push([playersArr[k], playersArr[number - 1 - k]]);
                }
            }
            playersArr.splice(1, 0, playersArr.pop());
        }
        return resultArr;
    };

    render() {
        let editForm = this.state.edit ? (<Modal>
            <div>
                <div className="form-holder">
                    <label>{this.state.activeMatch.p1}</label>
                    <input type="number" onChange={(event) => this.inputChangeScore(event, 'p1')} />
                </div>
                <div className="form-holder">
                    <label>{this.state.activeMatch.p2}</label>
                    <input type="number" onChange={(event) => this.inputChangeScore(event, 'p2')} />
                </div>

                <button onClick={this.editMatch}>OK</button>
                <button className="cancel" onClick={() => this.setState({ edit: false })}>CANCEL</button>
            </div>
        </Modal>
        ) : null;
        let content = <button onClick={this.getTeams} className="regularButton">Get Teams</button>
        if (this.state.teams) {
            content = (<Aux><button className="regularButton" onClick={this.setPairs}>Set Pairs</button>
                <button className="regularButton" onClick={() => this.deleteTable('/round.json?auth=' + this.props.token)}>Delete Pairs</button>
                <button className="regularButton" onClick={this.setTeamsTable}>Set Table</button>
                <button className="regularButton" onClick={() => this.deleteTable('/teams.json?auth=' + this.props.token)}>Delete Table</button></Aux>)
        }
        let copyRound = this.state.rounds;
        let roundTeams = copyRound.map(team => {
            return <AdminTeam team={team} key={team.p1id + team.p2id} clicked={() => this.selectActiveMatch(team)} />
        })
        let mainContent = this.state.loged ? (
            <div className="adminPanel">

                <div className="buttonHolder">
                    {content}
                    <br />
                    <form onSubmit={this.saveUser}>
                        <input type='text' onChange={this.inputHandler} className="regularInput" />
                        <button className="regularButton">Add</button>
                        <button className="regularButton" onClick={() => this.deleteTable('/teamsToPlay.json?auth=' + this.props.token)}>Delete Teams</button>
                    </form>
                </div>
                <div className="resultsHolder">
                    {roundTeams}
                </div>
                {editForm}
            </div>
        ) : (
                <div className="adminPanel">
                    <form className="login" onSubmit={this.logIn}>

                        <input type='email' onChange={(event) => this.loginHandler(event, 'email')} placeholder="email" />
                        <input type='text' onChange={(event) => this.loginHandler(event, 'password')} placeholder="password" />
                        <button className="regularButton">Log in</button>
                    </form></div>
            );
        return (
            <Aux>
                {mainContent}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}
const mapDispatchToState = dispatch => {
    return {
        setToken: (token) => dispatch(actions.setToken(token))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(Admin);