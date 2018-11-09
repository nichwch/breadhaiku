import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import dragon from './dragon.png';
import warrior from './breadwarrior.png';
import './App.css';

function verifyHaiku(haiku)
{
  let syllable = require('syllable')
  let syllable1 = (syllable(haiku.line1)==5);
  let syllable2 = (syllable(haiku.line2)==7);
  let syllable3 = (syllable(haiku.line3)==5);

  let bread1 = haiku.line1.includes("bread");
  let bread2 = haiku.line2.includes("bread");
  let bread3 = haiku.line3.includes("bread");

  if(bread1&&bread2&&bread3&&syllable1&&syllable2&&syllable3)
  {
    return true;
  }
  return false;
}

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
      input1:"",
      input2:"",
      input3:"",
      input4:"",
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
      let errorMessage = "";
      if(this.props.input1==""&&this.props.input2==""&&this.props.input3==""&&this.props.input4=="")
      {
        errorMessage = "";
        this.setState({validHaiku:true});
      }
      else if(this.state.validHaiku == false)
      {
        errorMessage = "error";
      }
      if(this.props.haikuSub==false)
      {
      return (
      <div>
      <form>
        <input
        onChange={this.handleChange1}
        value={this.state.message}
        placeholder="line 1 (5 syllables)"
        type="text" />
        <input
        onChange={this.handleChange2}
        value={this.state.message}
        placeholder="line 2 (7 syllables)"
        type="text" />
        <input
        onChange={this.handleChange3}
        value={this.state.message}
        placeholder="line 3 (5 syllables)"
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
      <p className = "error">{errorMessage}</p>
      </div>)
    }
    else{
      return (<ThankYou/>);
    }
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
    if(verifyHaiku({
      line1: this.state.input1,
      line2: this.state.input2,
      line3: this.state.input3,
      author: this.state.input4,
    }))
    {
      this.props.submit({
        line1: this.state.input1,
        line2: this.state.input2,
        line3: this.state.input3,
        author: this.state.input4,
      })
      }
      else{
        this.setState({validHaiku:false});
      }
    }
  }
  function ThankYou(props) {
    return(
      <div>
        <p>Let's get this bread! Your poem has been submitted.</p>
      </div>
    )
  }


  function Feed(props) {
    if(props.writing == false)
    {
      let poems = props.poemList.map(currentpoem => {
        return <Poem poem = {currentpoem} />
      })
      return (<ul>
        {poems}
      </ul>)
    }
    return null;
  }

  function Poem(props) {
    return (
      <div className = "poemBlock">
      <li key={props.poem.line1}>
        <p>{props.poem.line1}</p>
        <p>{props.poem.line2}</p>
        <p>{props.poem.line3}</p>
        <p className = "authorSign">Written by {props.poem.author}</p>
      </li>
      </div>

    )
  }

class App extends Component {
  componentDidMount() {
    fetch("localhost:5000/haikus").then(results => {
      this.setState({poemList:results});
    })
  }

  constructor()
  {
    super();
    this.switchMode = this.switchMode.bind(this);
    this.state = {
      writing:true,
      haikuSubmitted:false,
      poemList:[
        /*
        {
          line1:"i like to eat bread",
          line2:"bread is very good and nice",
          line3:"i am happy boy",
          author:"nick",
        },
        {
          line1:"let us get this bread",
          line2:"we will accomplish our goals",
          line3:"to the moon with us",
          author:"nick",
        },
        {
          line1:"bread bread bread bread bread",
          line2:"bread bread bread bread bread bread bread",
          line3:"bread bread bread bread bread",
          author:"nick",
        },
        */
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
                    submit = {this.submitHaiku}
                    haikuSub = {this.state.haikuSubmitted}/>
        <Feed writing={this.state.writing}
              poemList = {this.state.poemList}/>
      </div>
    );
  }
  submitHaiku(newHaiku) {
    newHaiku = [newHaiku];
    let newPoemList = newHaiku.concat(this.state.poemList);
    this.setState({poemList: newPoemList})
    this.setState({haikuSubmitted:true});
  }

  switchMode() {
    if(this.state.writing == false)
    {
      this.setState({writing:true});
      this.setState({haikuSubmitted:false});
    }
    else {
      this.setState({writing:false});
    }
  }

}


ReactDOM.render(<App />, document.getElementById('root'));
