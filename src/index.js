import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import dragon from './dragon.png';
import warrior from './breadwarrior.png';
import './App.css';

//verify that submitted poem fits profile of a haiku, and includes a word related to bread
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
    return {success: true,
            line1:syllable(haiku.line1),
            line2:syllable(haiku.line1),
            line3:syllable(haiku.line1)};
  }
  return {success: false,
          line1:syllable(haiku.line1),
          line2:syllable(haiku.line1),
          line3:syllable(haiku.line1)};
}

function Title(props) {
  return (<div>
            <h1>breadhaiku</h1>
            <span><Buttons writing = {props.writing}
                           switch = {props.switch}/></span>
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
      if(this.props.validHaiku == false)
      {
        let errorParameters = verifyHaiku({
          line1: this.state.input1,
          line2: this.state.input2,
          line3: this.state.input3,
          author: this.state.input4,
        });
        errorMessage = (<div className = "error">
                          <br></br>
                          <p>Your first line has {errorParameters.line1} syllables.</p>
                          <p>Your second line has {errorParameters.line2} syllables.</p>
                          <p>Your third line has {errorParameters.line3} syllables.</p>
                          <br></br>
                          <p>Your poem must contain the word bread, and follow the form of a haiku.
                          The first and last lines of a Haiku have 5 syllables and the middle line has 7 syllables.</p>


                        </div>

                      );
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
      <div>{errorMessage}</div>
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
    }).success )
    {
      this.props.submit({
        line1: this.state.input1,
        line2: this.state.input2,
        line3: this.state.input3,
        author: this.state.input4,
      })
      this.setState({input1:"",
                     input2:"",
                     input3:"",
                     input4:""})
      }
      else{

        this.props.setErr();
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
  /*
  componentDidMount() {
    fetch("localhost:5000/haikus").then(results => {
      this.setState({poemList:results});
    })
  }
  */

  constructor()
  {
    super();
    this.switchMode = this.switchMode.bind(this);
    this.state = {
      writing:true,
      error:false,
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
    this.setError = this.setError.bind(this);
  }
  render() {
    return (
      <div className="App">
        <Title writing={this.state.writing}
               switch = {this.switchMode}
        />
        <InputField writing={this.state.writing}
                    submit = {this.submitHaiku}
                    haikuSub = {this.state.haikuSubmitted}
                    setErr = {this.setError}
                    resetErr = {this.resetError}
                    validHaiku = {!(this.state.error)}/>
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

  setError(){
    this.setState({error:true});
  }



  switchMode() {
    this.setState({error:false});
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
