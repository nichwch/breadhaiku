import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import dragon from './dragon.png';
import warrior from './breadwarrior.png';
import './App.css';

//verify that submitted poem fits profile of a haiku, and includes a word related to bread
function verifyHaiku(haiku)
{
  let syllable = require('syllable')
  let syllable1 = (syllable(haiku.line_1)==5);
  let syllable2 = (syllable(haiku.line_2)==7);
  let syllable3 = (syllable(haiku.line_3)==5);

  let bread1 = haiku.line_1.toUpperCase().includes("BREAD");
  let bread2 = haiku.line_2.toUpperCase().includes("BREAD");
  let bread3 = haiku.line_3.toUpperCase().includes("BREAD");

  let max1 = haiku.line_1.length < 300;
  let max2 = haiku.line_2.length < 300;
  let max3 = haiku.line_3.length < 300;
  let containsBread = (haiku.line_1.includes("bread")||haiku.line_2.includes("bread")||haiku.line_3.includes("bread"));

  if((bread1||bread2||bread3)&&syllable1&&syllable2&&syllable3&&max1&&max2&&max3)
  {
    return {success: true,
            bread: containsBread,
            line_1:syllable(haiku.line_1),
            line_2:syllable(haiku.line_2),
            line_3:syllable(haiku.line_3)};
  }
  return {success: false,
          bread: containsBread,
          line_1:syllable(haiku.line_1),
          line_2:syllable(haiku.line_2),
          line_3:syllable(haiku.line_3)};
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
        line_1:"a",
        line_2:"a",
        line_3:"a",
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
          line_1: this.state.input1,
          line_2: this.state.input2,
          line_3: this.state.input3,
          author: this.state.input4,
        });
        errorMessage = (<div className = "error">
                          <br></br>
                          <p>{errorParameters.bread ? "":"Your poem does not mention bread..."}</p>
                          {errorParameters.line_1==5&&errorParameters.line_2==7&&errorParameters.line_3==5 ?
                          "":
                          <div>
                          <p>Your first line_ has {errorParameters.line_1} syllables.</p>
                          <p>Your second line_ has {errorParameters.line_2} syllables.</p>
                          <p>Your third line_ has {errorParameters.line_3} syllables.</p>
                          </div>
                          }
                          <br></br>
                          <p>Your poem must contain the word bread, and follow the form of a haiku.
                          The first and last line_s of a Haiku have 5 syllables and the middle line_ has 7 syllables.</p>


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
    this.props.resetErr();
  }
  handleChange2(event){
    this.setState({input2: event.target.value});
    this.props.resetErr();
  }
  handleChange3(event){
    this.setState({input3: event.target.value});
    this.props.resetErr();
  }
  handleChange4(event){
    this.setState({input4: event.target.value});
    this.props.resetErr();
  }
  submitChange(){
    if(verifyHaiku({
      line_1: this.state.input1,
      line_2: this.state.input2,
      line_3: this.state.input3,
      author: this.state.input4,
    }).success )
    {
      this.props.submit({
        line_1: this.state.input1,
        line_2: this.state.input2,
        line_3: this.state.input3,
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
        return <Poem poem = {currentpoem}  key={currentpoem.id}/>
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
      <li>
        <p>{props.poem.line_1}</p>
        <p>{props.poem.line_2}</p>
        <p>{props.poem.line_3}</p>
        <p className = "authorSign">Written by {props.poem.author}</p>
      </li>
      </div>
    )
  }
class App extends Component {



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
          line_1:"i like to eat bread",
          line_2:"bread is very good and nice",
          line_3:"i am happy boy",
          author:"nick",
        },
        {
          line_1:"let us get this bread",
          line_2:"we will accomplish our goals",
          line_3:"to the moon with us",
          author:"nick",
        },
        {
          line_1:"bread bread bread bread bread",
          line_2:"bread bread bread bread bread bread bread",
          line_3:"bread bread bread bread bread",
          author:"nick",
        },
        */
      ]
    };
    this.submitHaiku = this.submitHaiku.bind(this);
    this.setError = this.setError.bind(this);
    this.resetError = this.resetError.bind(this);
    this.updateHaikus = this.updateHaikus.bind(this);
  }
  updateHaikus()
  {
    fetch('http://18.188.62.242:5000/haikus')
    .then(response => response.json())
    .then(json => {
      this.setState({poemList:json})
      console.log(json) // access json.body here
    })
  }

  componentDidMount() {
    this.updateHaikus();
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

  //this should do a post/update request
  submitHaiku(newHaiku) {
//    newHaiku = [newHaiku];
    console.log('new haiku')
    console.log(JSON.stringify(newHaiku))
    fetch('http://18.188.62.242:5000/addhaiku',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(newHaiku),
    })
    .then(res =>{

    //let newPoemList = newHaiku.concat(this.state.poemList);
    //this.setState({poemList: newPoemList})
    this.setState({haikuSubmitted:true});
    }
  );
}
  setError(){
    this.setState({error:true});
  }
  resetError(){
    this.setState({error:false});
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
    this.updateHaikus();
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
