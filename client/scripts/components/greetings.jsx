'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default.jsx');
var BS = require('react-bootstrap');


//#################  testikoodailuja  ##########################

var GreetingsComponent = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <DefaultLayout>
        asdasd
      </DefaultLayout>
      /* jshint ignore:end */
    );
  }
});

//module.exports = GreetingsComponent;


/** @jsx React.DOM */


//########### Tästä alkaa koodit jotka tekee jotaki atm #####################

var EventInfo = React.createClass({
    
/*

    remove: function () {
      EventInfo.destroy(this.props.event.id);
    },
*/


    render: function() {
        return (
           
                

                <BS.Panel bsStyle="primary" header={this.props.event.title}>



                    <img src="images/KappaHD.jpg" height="150" width="150" />
                    

                    {this.props.event.description} 



                    <BS.Button onClick={this.removeListItem}>
                       
                    Delete 
                   
                    </BS.Button>






                   
                    <p>

                    <BS.Button onClick={this.enroll} bsSize="large">
                       
                    React-Bootstrap -Ilmoittaudu-nappi
                   
                    </BS.Button>

                    </p>
                    

                <p>

                <BS.DropdownButton bsStyle="info" title="Ilmoittautuneet">
                    
                <BS.Input type="checkbox" label="Checkbox" />

                </BS.DropdownButton>
                    
                </p>


                </BS.Panel>

          
            

        );
    }
});

var EventInfoList = React.createClass({
    
/*

    updateList: function (events) {
    this.setState({
      events: events
    });
  },

  

    removeListItem: function (event) {
    var events = this.state.events;

    delete rows[event];

    this.updateList(events);
  },
*/

/*
updateListItem: function (event) {
    var list = this.state.list;
    list[event.id] = item;

    this.updateList(list);
  },
*/




    render: function(){
       
        var rows = []
        
        this.props.events.forEach(function(event){
            
            {/*rows.push(<div>asd</div>);    //test*/}
           
            rows.push(<EventInfo event={event} key={event.id} />);
        
        });
        
        return(
            
               
            <table> {/*tähän on varmaan järkevämpiki ratkasu*/}
                
             <DefaultLayout>
                <thead>
                   
                    <div className="ListTitle"><h1>Täs ois näitä tapahtumia</h1>
                    
                    
                    
                    </div>

                     
                </thead>
            </DefaultLayout>
      

                <tbody>{rows}</tbody>
            </table>
       

        );
    }
});
 
//React.renderComponent(<FilterableProductTable products={PRODUCTS} />, document.body);
//module.exports = EventInfo;
module.exports = EventInfoList;
//module.exports = GreetingsComponent;
