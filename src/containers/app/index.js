import React from 'react'
import logo from './logo_fff.png';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Login from '../login/Login'
import Profile from '../profile/Profile'
import Journal from '../profile/Journal'

import Footer from './Footer';
import Office from './Office'
import './App.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { gate } from '../../modules/counter';
import Service from '../../service/service';



class App extends React.Component {
  constructor(props){
    super(props);
    this.handleAcc = this.handleAcc.bind(this);
  }
  async handleAcc(){
    const getAcc = await Service.getReq('acc/');
    console.log(getAcc);
    if(getAcc.user_id !== 'None'){
      let birthday = new Date(Date.parse(getAcc.birthday));
      console.log('Gateeeeeeeeeeeee');
      this.props.gate(
        'Выход', 
        getAcc.Name, 
        getAcc.user_id,
        getAcc.first_name,
        getAcc.last_name,
        getAcc.email,
        getAcc.Group,
        birthday
      );
    }
  }
  componentDidMount(){
    console.log("componentDidMount()");
    this.handleAcc();
  }
  render(){
    return(
        <div className="App">
          <header>
            <Link to="/" className="panel"> 
                < img src={logo} className="logo" alt="logo" />
            </Link>
            <Link to="/about-us" className="fixheader">About</Link>
            <div className="entering"><Office/></div>
          </header>
          <main>
                <Route exact path="/" component={Home} />
                <Route exact path="/about-us" component={About} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/Journal" component={Journal} />
          </main>
          <Footer/>
        </div>
    )
  };
}

//Умные компоненты <button onClick={this.handlelogOut}>logout</button>
const mapStateToProps = ({ counter }) => ({ 
  entering: counter.entering
}) 

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      gate,
    }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)