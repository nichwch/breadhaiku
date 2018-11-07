import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './App.css';

function Title(props) {
  return (<div>
            <h1>breadhaiku</h1>
            <span><Buttons writing = {props.writing} switch = {props.switch}/></span>
          </div>
  )

}

function Buttons(props){
  //if app is in browse mode, show the write button
  if(props.writing == false)
  {
    return(
      <span>
      <p className = "inline">
        browse
      </p>
      <button onClick = {props.switch}>
        //write
      </button>
      </span>
    )
  }
  //if app is in writing mode, show the browse button
  else{
    return(
      <span>
      <button onClick = {props.switch}>
        browse
      </button>
      <p className = "inline">
        //write
      </p>
      </span>
    )
  }
}

class InputField extends Component {
  constructor()
  {
    super();
    this.state = {
      writtenpoem:{
        line1:"",
        line2:"",
        line3:"",
        author:"",
      }
    }

  }

  render() {
    if(this.props.writing == false)
    {
      return null;
    }
    else if (this.props.writing == true){
      return (
      <div>
      <form>
        <input
        onChange={this.handleChange1}
        value={this.state.message}
        placeholder="line 1"
        type="text" />
        <input
        onChange={this.handleChange2}
        value={this.state.message}
        placeholder="line 2"
        type="text" />
        <input
        onChange={this.handleChange3}
        value={this.state.message}
        placeholder="line 3"
        type="text" />
        <input
        onChange={this.handleChange4}
        value={this.state.message}
        placeholder="your name"
        type="text" />
      </form>
      <button>
        submit
      </button>
      </div>)
    }
  }
}

class App extends Component {
  constructor()
  {
    super();
    this.switchMode = this.switchMode.bind(this);
    this.state = {
      writing:true,
      poemlist:[
        {
          line1:"bread",
          line2:"is",
          line3:"good",
          author:"nick",
        },
        {
          line1:"bread",
          line2:"is",
          line3:"good",
          author:"nick",
        },
        {
          line1:"bread",
          line2:"is",
          line3:"good",
          author:"nick",
        },

      ]
    };
  }
  render() {
    return (
      <div className="App">
        <Title writing={this.state.writing}
               switch = {this.switchMode}
        />
        <InputField writing={this.state.writing} />
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
