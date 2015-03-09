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
    


    remove: function () {
      EventInfo.destroy(this.props.event.id);
    },



    render: function() {
        return (
           
                

                <BS.Panel fluid bsStyle="primary" backdrop={true} header={this.props.event.title}>


                    <img src="images/KappaHD.jpg" height="150" width="150" />
                    

                    {this.props.event.description} 


                    <button className="btn btn-xs btn-danger" onClick={this.remove}>
                        
                        Perus-Bootstrap -Delete-namiska
                    
                    </button>


                    <BS.Button onClick={this.enroll}>
                       
                        React-Bootstrap -Ilmoittaudu-nappi
                   
                    </BS.Button>


                    <button>HTML -Edit-nabbula</button>
                    

                </BS.Panel>

          
            

        );
    }
});

var EventInfoList = React.createClass({
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
