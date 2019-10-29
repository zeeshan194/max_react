import React, { Component } from 'react';
import Person from './Person/Person';
import './App.css';

class App extends Component{
  state = {
    persons: [
      { id: 'p1', name: "Max", age: 28 },
      { id: 'p2', name: "Manu", age: 29},
      { id: 'p3', name: "Stephanie", age: 26 }
    ],
    otherState: 'Some other value',
    showPersons: false
  };

  nameChangedHanler = (event, id) => {
    const personIndex = this.state.persons.findIndex((person) => {
      return person.id === id;
    });

    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;
    const updatedPersonsArr = [...this.state.persons ];
    updatedPersonsArr[personIndex] = person;
    this.setState({
      persons: updatedPersonsArr
    })
  }

  deletePersonHandler = (personIndex) => {
    //const updatedPersons = this.state.persons.slice(); //copy the original array
    const updatedPersons = [...this.state.persons]; // copy persons array using spread operator
    updatedPersons.splice(personIndex, 1);
    this.setState({
      persons: updatedPersons
    });
  }

  togglePersons = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  }

  render() {
    const buttonStyle = {
      backgroundColor: 'green',
      color: 'white',
      // border: '1px solid blue',
      font: 'inherit',
      padding: '8px',
      cursor: 'pointer',
    };

    let persons = null;
    if(this.state.showPersons){
      persons = (
        <div>
          {
            this.state.persons.map((person, index) => {
              return <Person
                click={this.deletePersonHandler.bind(this,index)}
                change={(event) => { this.nameChangedHanler(event, person.id)}}
                name={person.name}
                age={person.age}
                key={person.id}
              />
            })
          }
        </div> 
      );

      buttonStyle.backgroundColor = 'red';
    }

    const classes = [];
    if(this.state.persons.length <= 2){
      classes.push('red');
    }
    if(this.state.persons.length <= 1){
      classes.push('bold');
    }

    return (
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is working</p>
          <button 
            style= { buttonStyle }
            onClick={this.togglePersons}>Toggle Persons</button>
          
          { persons }  
        </div>
    );
  }// end of render()
}// end of class

export default App;
