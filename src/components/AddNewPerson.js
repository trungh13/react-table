import React, { Component } from 'react';
import _ from 'lodash';
export default class AddNewPerson extends Component {
    constructor(props){
        super(props);

        this.state={
          error:null
        }
      }
    render() {
    return (
        <div className="addNewPerson">
            <form onSubmit={this.handleCreate.bind(this)}>
                <input  type="text"  placeholder="Full name" ref="nameInput"></input>
                <input  type="text"  placeholder="Email address"ref="emailInput"></input>                
                <input  type="text" placeholder="Phone number" ref="phoneInput"></input>
                <button className="btnAddNew"type="submit">Add new</button>
                {this.renderError()}
            </form>
        </div>
        
    );
  }

renderError(){
    if(!this.state.error){return null;}
    return <div className="popup"><span className="popuptext" >{this.state.error}</span></div>;
    // return alert(this.state.error);
}

handleCreate(event){
    event.preventDefault();

    const input = {name :this.refs.nameInput,
                   email:this.refs.emailInput,
                   phoneNumber: this.refs.phoneInput};

    const validateInput = this.validateInput(input.name.value,input.email.value,input.phoneNumber.value);
    if(validateInput){
        this.setState({error:validateInput});
        return;
    }

    this.setState({error:null});
    this.props.addPerson(input.name.value,
                         input.email.value,
                         input.phoneNumber.value)
    input.name.value='';                         
    input.email.value='';
    input.phoneNumber.value='';
  }

  validateInput(name,email,phoneNumber){    
    if(!name){
        return 'Please enter name!';
    } else if(_.find(this.props.Plists, Plist=>Plist.name === name)){
        return 'This participants already exists in list';
    }
    var emailFilter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!email){
        return 'Please enter email address!';    
    }  else if (!emailFilter.test(email)){
        return 'Invalid input email';
    }
    var phoneFilter=/^\+?[0-9]{10,12}$/;
    if(!phoneNumber){
        return 'Please enter phone number!';
    } else if(!phoneFilter.test(phoneNumber)){
        return 'Invalid input phone number';        
    } else return null;
    
  }

}
