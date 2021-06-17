import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
// import Modal from 'react-modal';
// Modal.setAppElement('#app');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {options: [],
      selectedOption: undefined};
  };

  
  handleDeleteSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  };
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  };
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({selectedOption: option}));
  };
  handleAddOption = (option) => {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState((prevState) => ({
      options: prevState.options.concat(option)
    }));
  };
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
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

 render() { return (
      <BrowserRouter>
      <div>
          <Header />        
          <Switch>
              <Route path="/" render={() => <Main {...this.state}/>} exact={true} />
              <Route path="/create"  render={() => <AddLinkPage {...this.state}/>}/>        
          </Switch>
          </div> 
   </BrowserRouter>
  )};
  
};

class AddLinkPage extends React.Component {

  render() {
    return (
      <AddOption
      handleAddOption={this.handleAddOption}
    />
    )
  }
}

const Action = (props) =>(
    <div>
      <button
        className='big-button'
        onClick={props.handlePick}
        disabled={!props.hasOptions}
      >
        What should I do?
      </button>
    </div>
  );

class AddOption extends React.Component {
    state = {
      error: undefined
    };
    handleAddOption = (e) => {
      e.preventDefault();
      const option = e.target.elements.option.value.trim();
      const error = this.props.handleAddOption(option);
  
      this.setState(() => ({ error }));
  
      if (!error) {
        e.target.elements.option.value = '';
      }
    };
    render() {
      return (
        <div>
          {this.state.error && <p className='add-option-error'>{this.state.error}</p>}
          <form className='add-option' onSubmit={this.handleAddOption}>
            <input className='add-option__input' type="text" name="option" />
            <button className='button'>Add Option</button>
          </form>
        </div>
      );
    }
  }
  
  const Header = (props) => (
  
    <div className='header'>
      <div className='container'>
      <h1 className='header__title'>{props.title}</h1>
      {props.subtitle && <h2 className='header__subtitle'>{props.subtitle}</h2>}
      </div>
      
    </div>
  
);

Header.defaultProps = {
  title: 'Indecision'
};

const Option = (props) => (
  <div className='option'>
    <p className='option__text'>{props.count}.{props.optionText}</p>
    <button className='button button--link'
      onClick={(e) => {
        props.handleDeleteOption(props.optionText);
      }}
    >
      remove
    </button>
  </div>
);



// const OptionModal = (props) => (
//   <Modal
//     isOpen={!!props.selectedOption}
//     onRequestClose={props.handleDeleteSelectedOption}
//     contentLabel="Selected Option"
//     closeTimeoutMS={200}
//     className="modal"
//   >
//    <h3 className='modal__title'>Selected Option</h3>
//    {props.selectedOption && <p className='modal-body'>{props.selectedOption}</p>}
//    <button className='button' onClick={props.handleDeleteSelectedOption}>Okay</button>
//   </Modal>
  
// );



const Options = (props) =>  (
  <div>
    <div className='widget-header'>
      <h3 className='widget-header__title'>Your Options</h3>
      <button className='button button--link'
      onClick={props.handleDeleteOptions}>Remove All</button>
    </div>
  
  {props.options.length === 0 && <p className='widget__message'>Please add an option to get started!</p>}
  {
    props.options.map((option, index) => (
      <Option 
        key={option}
        optionText={option}
        count={index + 1}
        handleDeleteOption={props.handleDeleteOption}
      />
    ))
  }
  </div>);


class Main extends React.Component {
  
  render() {
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
      <NavLink to="/create" activeClassName="is-active">SUBMIT A LINK</NavLink>
        <Header subtitle={subtitle} />
        <div className='container'>
        
        <Action
        hasOptions={this.props.options.length > 0}
        handlePick={this.props.handlePick}
      />
      <div className='widget'>
      <Options
      options={this.props.options}
      handleDeleteOptions={this.props.handleDeleteOptions}
      handleDeleteOption={this.props.handleDeleteOption}
    />
    
      </div>
      
        </div>
        
       {/* <OptionModal 
        selectedOption={this.state.selectedOption}
        handleDeleteSelectedOption={this.handleDeleteSelectedOption}
    />*/}
      </div>
    );
  }
}


export default App;
