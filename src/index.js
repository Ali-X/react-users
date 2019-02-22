import * as ReactDOM from "react-dom";
import * as React from "react";
import {Switch, Route, BrowserRouter, Link} from 'react-router-dom';
import Redirect from "react-router-dom/es/Redirect";
import './404.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Main/>
      </div>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/contacts' component={Contact}/>
          <Route path='/users' component={Users}/>
          <Route path='/404' component={Page404}/>
          <Redirect to="/404"/>
        </Switch>
      </main>
    );
  }
}

const Page404 = () => (
  <div>
    <h1>404 Page is not found!</h1>
    <section className="error-container">
      <span>4</span>
      <span><span className="screen-reader-text">0</span></span>
      <span>4</span>
    </section>
  </div>
);

const Contact = () => (
  <div>
    <section className="error-container">
      <span>I'm The best Full Stack Developer</span>
    </section>
  </div>
);

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersFile: "",
      dataIsLoaded: false
    }
  }

  componentDidMount() {
    this.sendRequest();
  }

  sendRequest() {
    fetch('https://swapi.co/api/people')
      .then(function(response) {
        if (response.status === 200) {
          this.setState({
            usersFile: response.json(),
            dataIsLoaded: true
          });
        }
      }.bind(this));
  }

  render() {
    if (!this.state.dataIsLoaded) {
      return <div>USERS_FILE2</div>;
    } else {
      let count = this.state.usersFile['count'];

      return (<select>
        <option value="jack">jack</option>
        <option value="lucy">lucy</option>
        <option value="yiminghe">yiminghe</option>
      </select>);
    }
  }
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Practice - JS15 - react-router</h1>
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/contacts'>Contacts</Link></li>
            <li><Link to='/users'>Users List</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}


ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root'));