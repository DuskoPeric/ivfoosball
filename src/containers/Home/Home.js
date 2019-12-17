import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Table from "../../components/Table/Table";
import Schedule from "../../components/Schedule/Schedule";
import firebase from 'firebase';
import Spinner from '../../components/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';



class Home extends Component {
    state = {
        loading: true
    }

    changeTab = (cD) => {
        if (this.props.table !== cD) {
            this.setState({ table: cD })
        }
    }

    componentDidMount() {
        const teamsRef = firebase.database().ref().child('teams')
        const resultRef = firebase.database().ref().child('round')
        teamsRef.on('value', this.getTable);
        resultRef.on('value', this.getResults);
    }

    getTable = (snap) => {
        let teams = snap.val();
        const teamsArr = [];
        let index = 0;
        for (let key in teams) {
            if (teams.hasOwnProperty(key)) {
                index++
                teamsArr.push({ ...teams[key], id: index })
            }
        }
        teamsArr.sort((a, b) => (a.score < b.score) ? 1 : -1);
        this.props.setTable(teamsArr)
        this.setState({ loading: false })
    }
    getResults = (snap) => {
        let results = snap.val();
        this.props.setResults(results)
    }

    render() {
        let activeContent = '';
        let table = this.state.loading ? <Spinner /> : <Table teams={this.props.teamOrder} />

        if (this.props.table === 'table') {
            activeContent = table;
        }
        else {
            activeContent = <Schedule results={this.props.results} />
        }
        return (
            <Aux>
                {activeContent}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        teamOrder: state.home.teamOrder,
        results: state.home.results,
    }
}
const mapDispatchToState = dispatch => {
    return {
        setTable: (obj) => dispatch(actions.setTable(obj)),
        setResults: (res) => dispatch(actions.setResults(res))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(Home);