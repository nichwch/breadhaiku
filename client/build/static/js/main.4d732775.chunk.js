(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,function(e,t,n){e.exports=n(10)},function(e,t,n){"use strict";n.r(t);var a=n(2),i=n(3),l=n(5),r=n(4),s=n(6),u=n(1),c=n(0),h=n.n(c),o=n(8),p=n.n(o);n(15),n(16),n(17);function m(e){var t=n(19),a=5==t(e.line_1),i=7==t(e.line_2),l=5==t(e.line_3),r=e.line_1.includes("bread"),s=e.line_2.includes("bread"),u=e.line_3.includes("bread"),c=e.line_1.length<300,h=e.line_2.length<300,o=e.line_3.length<300,p=e.line_1.includes("bread")||e.line_2.includes("bread")||e.line_3.includes("bread");return(r||s||u)&&a&&i&&l&&c&&h&&o?{success:!0,bread:p,line_1:t(e.line_1),line_2:t(e.line_2),line_3:t(e.line_3)}:{success:!1,bread:p,line_1:t(e.line_1),line_2:t(e.line_2),line_3:t(e.line_3)}}function d(e){return h.a.createElement("div",null,h.a.createElement("h1",null,"breadhaiku"),h.a.createElement("span",null,h.a.createElement(b,{writing:e.writing,switch:e.switch})))}function b(e){return 0==e.writing?h.a.createElement("span",null,h.a.createElement("p",{className:"inline"},"browse"),h.a.createElement("button",{onClick:e.switch},"//write")):h.a.createElement("span",null,h.a.createElement("button",{onClick:e.switch},"browse"),h.a.createElement("p",{className:"inline"},"//write"))}var g=function(e){function t(){var e;return Object(a.a)(this,t),(e=Object(l.a)(this,Object(r.a)(t).call(this))).state={input1:"",input2:"",input3:"",input4:"",writtenpoem:{line_1:"a",line_2:"a",line_3:"a",author:"a"}},e.handleChange1=e.handleChange1.bind(Object(u.a)(Object(u.a)(e))),e.handleChange2=e.handleChange2.bind(Object(u.a)(Object(u.a)(e))),e.handleChange3=e.handleChange3.bind(Object(u.a)(Object(u.a)(e))),e.handleChange4=e.handleChange4.bind(Object(u.a)(Object(u.a)(e))),e.submitChange=e.submitChange.bind(Object(u.a)(Object(u.a)(e))),e}return Object(s.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){if(0==this.props.writing)return null;if(1==this.props.writing){var e="";if(0==this.props.validHaiku){var t=m({line_1:this.state.input1,line_2:this.state.input2,line_3:this.state.input3,author:this.state.input4});e=h.a.createElement("div",{className:"error"},h.a.createElement("br",null),h.a.createElement("p",null,t.bread?"":"Your poem does not mention bread..."),5==t.line_1&&7==t.line_2&&5==t.line_3?"":h.a.createElement("div",null,h.a.createElement("p",null,"Your first line_ has ",t.line_1," syllables."),h.a.createElement("p",null,"Your second line_ has ",t.line_2," syllables."),h.a.createElement("p",null,"Your third line_ has ",t.line_3," syllables.")),h.a.createElement("br",null),h.a.createElement("p",null,"Your poem must contain the word bread, and follow the form of a haiku. The first and last line_s of a Haiku have 5 syllables and the middle line_ has 7 syllables."))}return 0==this.props.haikuSub?h.a.createElement("div",null,h.a.createElement("form",null,h.a.createElement("input",{onChange:this.handleChange1,value:this.state.message,placeholder:"line 1 (5 syllables)",type:"text"}),h.a.createElement("input",{onChange:this.handleChange2,value:this.state.message,placeholder:"line 2 (7 syllables)",type:"text"}),h.a.createElement("input",{onChange:this.handleChange3,value:this.state.message,placeholder:"line 3 (5 syllables)",type:"text"}),h.a.createElement("input",{onChange:this.handleChange4,value:this.state.message,placeholder:"your name",type:"text"})),h.a.createElement("button",{onClick:this.submitChange},"submit"),h.a.createElement("div",null,e)):h.a.createElement(E,null)}}},{key:"handleChange1",value:function(e){this.setState({input1:e.target.value}),this.props.resetErr()}},{key:"handleChange2",value:function(e){this.setState({input2:e.target.value}),this.props.resetErr()}},{key:"handleChange3",value:function(e){this.setState({input3:e.target.value}),this.props.resetErr()}},{key:"handleChange4",value:function(e){this.setState({input4:e.target.value}),this.props.resetErr()}},{key:"submitChange",value:function(){m({line_1:this.state.input1,line_2:this.state.input2,line_3:this.state.input3,author:this.state.input4}).success?(this.props.submit({line_1:this.state.input1,line_2:this.state.input2,line_3:this.state.input3,author:this.state.input4}),this.setState({input1:"",input2:"",input3:"",input4:""})):this.props.setErr()}}]),t}(c.Component);function E(e){return h.a.createElement("div",null,h.a.createElement("p",null,"Let's get this bread! Your poem has been submitted."))}function _(e){if(0==e.writing){var t=e.poemList.map(function(e){return h.a.createElement(f,{poem:e,key:e.id})});return h.a.createElement("ul",null,t)}return null}function f(e){return h.a.createElement("div",{className:"poemBlock"},h.a.createElement("li",null,h.a.createElement("p",null,e.poem.line_1),h.a.createElement("p",null,e.poem.line_2),h.a.createElement("p",null,e.poem.line_3),h.a.createElement("p",{className:"authorSign"},"Written by ",e.poem.author)))}var v=function(e){function t(){var e;return Object(a.a)(this,t),(e=Object(l.a)(this,Object(r.a)(t).call(this))).switchMode=e.switchMode.bind(Object(u.a)(Object(u.a)(e))),e.state={writing:!0,error:!1,haikuSubmitted:!1,poemList:[]},e.submitHaiku=e.submitHaiku.bind(Object(u.a)(Object(u.a)(e))),e.setError=e.setError.bind(Object(u.a)(Object(u.a)(e))),e.resetError=e.resetError.bind(Object(u.a)(Object(u.a)(e))),e}return Object(s.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("http://localhost:5000/haikus").then(function(e){return e.json()}).then(function(t){e.setState({poemList:t}),console.log(t)})}},{key:"render",value:function(){return h.a.createElement("div",{className:"App"},h.a.createElement(d,{writing:this.state.writing,switch:this.switchMode}),h.a.createElement(g,{writing:this.state.writing,submit:this.submitHaiku,haikuSub:this.state.haikuSubmitted,setErr:this.setError,resetErr:this.resetError,validHaiku:!this.state.error}),h.a.createElement(_,{writing:this.state.writing,poemList:this.state.poemList}))}},{key:"submitHaiku",value:function(e){var t=this;console.log("new haiku"),console.log(JSON.stringify(e)),fetch("http://localhost:5000/addhaiku",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)}).then(function(n){var a=e.concat(t.state.poemList);t.setState({poemList:a}),t.setState({haikuSubmitted:!0})})}},{key:"setError",value:function(){this.setState({error:!0})}},{key:"resetError",value:function(){this.setState({error:!1})}},{key:"switchMode",value:function(){this.setState({error:!1}),0==this.state.writing?(this.setState({writing:!0}),this.setState({haikuSubmitted:!1})):this.setState({writing:!1})}}]),t}(c.Component);p.a.render(h.a.createElement(v,null),document.getElementById("root"))},,,,,function(e,t,n){e.exports=n.p+"static/media/dragon.0d4a19cf.png"},function(e,t,n){e.exports=n.p+"static/media/breadwarrior.34ba0109.png"},function(e,t,n){}],[[9,2,1]]]);
//# sourceMappingURL=main.4d732775.chunk.js.map