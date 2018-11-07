import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './App.css';

function Title(props) {
  return (<div>
            <h1>breadhaiku</h1>
            <span><Buttons writing = {props.writing} switch = {props.switch}/></span>
          </div>
  )

};

function Buttons(props){
  //if app is in browse mode, show the write button
  if(props.writing == false)
  {
    return(
      <span>
      <p>
        browse
      </p>
      <button onClick = {props.switch}>
      <p>
        //write
      </p>
      </button>
      </span>
    )
  }
  //if app is in writing mode, show the browse button
  else{
    return(
      <span>
      <button onClick = {props.switch}>
      <p>
        browse
      </p>
      </button>
      <p>
        //write
      </p>
      </span>
    )
  }
}

class App extends Component {
  constructor()
  {
    super();
    this.switchMode = this.switchMode.bind(this);
    this.state = {
      writing:false,
    };
  }
  render() {
    return (
      <div className="App">
        <Title writing={this.state.writing}
               switch = {this.switchMode}
        />
      </div>
    );
  }

  switchMode() {
    if(this.state.writing == false)
    {
      this.setState({writing:true});
    }
    else {
      this.setState({writing:false});
    }

  }
}

ReactDOM.render(<App />, document.getElementById('root'));
