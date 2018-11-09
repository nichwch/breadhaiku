import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import dragon from './dragon.png';
import warrior from './breadwarrior.png';
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
        line1:"a",
        line2:"a",
        line3:"a",
        author:"a",
      }
    }
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.submitChange = this.submitChange.bind(this);
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
      <button onClick = {this.submitChange}>
        submit
      </button>
      </div>)
    }
  }

  handleChange1(event){
    this.setState({input1: event.target.value});
  }
  handleChange2(event){
    this.setState({input2: event.target.value});
  }
  handleChange3(event){
    this.setState({input3: event.target.value});
  }
  handleChange4(event){
    this.setState({input4: event.target.value});
  }
  submitChange(){
    this.props.submit({
      line1: this.state.input1,
      line2: this.state.input2,
      line3: this.state.input3,
      author: this.state.input4,
    })
  }
}

  function Feed(props) {
    if(props.writing == false)
    {
      let poems = props.poemList.map(poem => {
        return (
          <li key={poem.line1}>
            <p>{poem.line1}</p>
            <p>{poem.line2}</p>
            <p>{poem.line3}</p>
            <p>Written by {poem.author}</p>
          </li>
        )
      })
      return (<ul>
        {poems}
      </ul>)
    }
    return null;
  }

class App extends Component {
  constructor()
  {
    super();
    this.switchMode = this.switchMode.bind(this);
    this.state = {
      writing:true,
      poemList:[
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

    this.submitHaiku = this.submitHaiku.bind(this);
  }
  render() {
    return (
      <div className="App">
        <Title writing={this.state.writing}
               switch = {this.switchMode}
        />
        <InputField writing={this.state.writing}
                    submit = {this.submitHaiku}/>
        <Feed writing={this.state.writing}
              poemList = {this.state.poemList}/>
      </div>
    );
  }
  submitHaiku(newHaiku) {
    console.log(this.state.poemList);
    let newPoemList = this.state.poemList.concat(newHaiku);
    this.setState({poemList: newPoemList})
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
