import React, { Component } from 'react';
import _ from 'lodash';
import ParticipantsList from './ParticipantsList';

export default class List extends Component {
  
  
    renderParticipants(){
        const props=_.omit(this.props,'Plists')
        return _.map(this.props.Plists,(Plist,index)=><ParticipantsList key={index}{...Plist} {...props}/>);
    }
    
    render() {
      return (
        <div className="list">
            <div className="tableHeader">
                <h3 onClick={this.props.sortByName.bind(this)}>Name  <i class="arrow">arrow_downward</i></h3>
                <h3 onClick={this.props.sortByEmail.bind(this)}>Email</h3>
                <h3 onClick={this.props.sortByPhone.bind(this)}>Phone number</h3>

            </div>
          {this.renderParticipants()}
        </div>                  
      )
    }
    

    

}
