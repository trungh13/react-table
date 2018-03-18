import React from 'react';

export default class ParticipantsList extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isEditing:false
    }
  }

  renderParticipants(){
    const {name, email, phoneNumber} = this.props;
    if (this.state.isEditing){
      return(        
          <form className="formItem"onSubmit={this.onSaveClick.bind(this) }>
            <input type="text" defaultValue={name} ref="editNameInput"/>
            <input type="text" defaultValue={email} ref="editEmailInput"/>
            <input type="text" defaultValue={phoneNumber} ref="editPhoneInput"/>
          </form>
      );
    }

    return(      
      <div>
        <span className="name">{name}</span>
        <span className="email">{email}</span>
        <span className="phone">{phoneNumber}</span>
      </div>
    );

  }

  renderActionSection(){
    if (this.state.isEditing){
      return(
        <span className="icons spanItem">
          <button className="btnCancel" onClick={this.onCancelClick.bind(this)} >Cancel</button>
          <button className="btnSave" onClick={this.onSaveClick.bind(this)}>Save</button>
      </span>
      );
    }
    return(
      <span className="icons">
        <i className="material-icons" onClick={this.onEditClick.bind(this)}>create</i>
        <i className="material-icons" onClick={this.props.deletePerson.bind(this,this.props.name)}>delete</i>
      </span>
    );
  }

onEditClick() {
  this.setState({ isEditing: true });
}

onCancelClick() {
  this.setState({ isEditing: false });
}


onSaveClick(event){
  event.preventDefault();
  const oldPerson=this.props.name;
  const newPerson={name:this.refs.editNameInput.value,
                   email:this.refs.editEmailInput.value,
                   phoneNumber:this.refs.editPhoneInput.value};
  this.props.savePerson(oldPerson,newPerson);
  this.setState({isEditing:false});
}

  render() {
    return (
      <div className="items">
        <div className="item">
          {this.renderParticipants()}
          {this.renderActionSection()}
        </div>        
      </div>
    );
  }  
}