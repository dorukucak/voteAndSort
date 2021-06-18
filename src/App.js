import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import logo from './hepsiburada-logo.png';

// App creation

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {options: [],
      filters: 'Asc',
      selectedOption: undefined};
  };
  
  // Handles deletion of website entry - Remove button

  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option, index) => optionToRemove !==  index + 1)
    }));
  };
 
  // Handles website addition - Add Link button at /create

  handleAddOption = (option) => {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }
    alert(option[0] + ' is added');
    this.setState((prevState) => ({
      options: prevState.options.concat([option])
    }));
  };

  // Up vote handler

   handleUpVote = (siteCount, siteVote) => {     
    this.state.options.map((site, index) => {
      if(index + 1 == siteCount)
      {
      //  const newOptions = this.state.options.slice() //copy the array
        this.state.options[index][2] = siteVote + 1; //execute the manipulations
        
        this.setState((prevState) => 
            ({options: prevState.options.concat([])})) //set the new state
            
    }})    
   };

   // Down vote handler

   handleDownVote = (siteCount, siteVote) => {     
    this.state.options.map((site, index) => {
      if(siteVote == 0) {return}
      else if(index + 1 == siteCount)
      {
      //  const newOptions = this.state.options.slice() //copy the array
        this.state.options[index][2] = siteVote - 1; //execute the manipulations
        
        this.setState((prevState) => 
            ({options: prevState.options.concat([])})) //set the new state
            
    }})    
   };

  // Sets new state of options(website entries) when a new entry is placed

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // Do nothing at all
    }
  }

  // Updates localstorage upon change in state from componentDidMount

  componentDidUpdate(prevProps, prevState) {
  
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  };

// Dropdown list that toggles sort on change

onSortChange = (e) => {    
    if (e.target.value === 'Asc') {
    this.setState({
    options: [...this.state.options].sort(function(a, b) {
    if (a[2] < b[2]) {
      return -1;
    }
    if (a[2] < b[2]) {
      return 1;
    }
    return 0;
    })
  });} else if (e.target.value === 'Desc')  {
    this.setState({
    options: [...this.state.options].sort(function(a, b) {
      if (a[2] > b[2]) {
        return -1;
      }
      if (a[2] > b[2]) {
        return 1;
      }
      return 0;
    })
  });}
  };    

 render() { return (
   <div>
      <BrowserRouter>
      <div className='outer'>
          <Header />            
          <Switch>
              <Route path="/" render={() => 
                <Main {...this.state} 
                handleDeleteOption={this.handleDeleteOption}  
                handleUpVote={this.handleUpVote}
                handleDownVote={this.handleDownVote}
                onSortChange={this.onSortChange}                          
                />} exact={true} />
              <Route path="/create"  render={() => <AddLinkPage {...this.state} handleAddOption={this.handleAddOption} />}/>        
          </Switch>
             
          </div> 
   </BrowserRouter>
   </div>
  )};
  
};

// Adding website entries -- appears at /create page

export class AddLinkPage extends React.Component {

  render() {
    return (
      <div>
      <NavLink to="/" activeClassName="is-active">Return to homepage</NavLink>
      <AddOption
      handleAddOption={this.props.handleAddOption}
    />
    </div>
    )
  }
}

// Text inputs for add website -- AddLinkPage child

class AddOption extends React.Component {
    state = {
      error: undefined
    };
    handleAddOption = (e) => {
      e.preventDefault();
      const title = e.target.elements.title.value.trim();
      const link =  e.target.elements.link.value.trim();
      const vote = 0;
      const option = [title, link, vote]
      const error = this.props.handleAddOption(option);
  
      this.setState(() => ({ error }));
  
      if (!error) {
        e.target.elements.title.value = '';
        e.target.elements.link.value = '';
      }
    };
    render() {
      return (
        <div class="c">
          {this.state.error && <p className='add-option-error'>{this.state.error}</p>}
          <form className='add-option' onSubmit={this.handleAddOption}>
            <p class="exp">Link Name:</p>
            <input className='add-option__input' type="text" name="title" placeholder="Add Website Name"/>
            <p class="exp">Link Name:</p>
            <input className='add-option__link' type="text" name="link" placeholder="URL"/>
            <button className='button'>Add Link</button>
          </form>
        </div>
      );
    }
  }

  // Header - logo rendering
  
  const Header = (props) => (
  
    <div className='header'>
      <div className='container'>
      <img src={logo} alt="hepsiburada-logo" width="200" height="125"/>
      </div>      
    </div>
  
  );

// Website entry

const Option = (props) => (
  <div className='option'>
    <p className='option__text'>{props.vote} {props.optionText} {props.link}</p>
    <div className="actionDiv">
    <button className='vote'
      onClick={(e) => {
        props.handleDeleteOption(props.count);
      }}>remove</button>    
      <button className='vote'
      onClick={(e) => {
        props.handleUpVote(props.count, props.vote);
      }}>Up Vote</button>
      <button className='vote'
      onClick={(e) => {
        props.handleDownVote(props.count, props.vote);
      }}>Down Vote</button>
      </div>
  </div>
);

//Websites entry list

export const Options = (props) =>  (
  <div>  
  {props.options.length === 0 && <p className='widget__message'>Please submit a link to get started!</p>}
  <list className='list'>{
    props.options.map((option, index) => (
      <Option 
        key={index}
        optionText={option[0]}
        link={option[1]}
        vote={option[2]}
        count={index + 1}
        handleUpVote={props.handleUpVote}
        handleDownVote={props.handleDownVote}
        handleDeleteOption={props.handleDeleteOption}
      />
    ))
  }</list>
  </div>);

//Main page

export class Main extends React.Component {
 
  render() {
    return (
      <div className='main'>       
        <div className='container'>
          <Link className='big-button' to="/create" activeClassName="is-active">
          <button className='big-button'>SUBMIT A LINK</button>
          </Link>
          <div className='widget'>
            <select
            value={this.props.filters.sortBy}
            onChange={this.props.onSortChange}
            >
            <option value='Asc' >Desc</option>  {/* reverse value due to flex-direction: column-reverse at App.css */}
            <option value='Desc'>Asc</option>
            </select>
            <Options
            options={this.props.options}
            handleUpVote={this.props.handleUpVote}
            handleDownVote={this.props.handleDownVote}
            handleDeleteOptions={this.props.handleDeleteOptions}
            handleDeleteOption={this.props.handleDeleteOption}
            />    
          </div>      
        </div>
      </div>
    );
  }
}


export default App;


