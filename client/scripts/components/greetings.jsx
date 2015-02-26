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
var ProductCategoryRow = React.createClass({
    render: function() {
        return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
});

var ProductRow = React.createClass({
    render: function() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
                {this.props.product.name}
            </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
});

var ProductTable = React.createClass({
    render: function() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function(product) {
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

var SearchBar = React.createClass({
    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Search..." />
                <p>
                    <input type="checkbox" />
                    Only show products in stock
                </p>
            </form>
        );
    }
});

var FilterableProductTable = React.createClass({
    render: function() {
        return (
            <div>
                <SearchBar />
                <ProductTable products={PRODUCTS} />
            </div>
        );
    }
});

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];


//########### Tästä alkaa koodit jotka tekee jotaki atm #####################

var EventInfo = React.createClass({
    render: function() {
        return (
            <div className="EventInfoContainer">
                <div className="box">
                    {/*<img src={this.props.image} height="150" width="150" />*/}
                    <img src="images/KappaHD.jpg" height="150" width="150" />                 
                </div>
                <div className="box">
                    {/*<h3>Täs ois tää tapahtuma</h3>
                    <div>Sielon kaikkia hienoja juttuja</div>*/}
                    <h3>{this.props.event.title}</h3>
                    <div>{this.props.event.description}</div>
                </div>
            </div>
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
                <thead>
                    <div className="ListTitle"><h1>Täs ois näitä tapahtumia</h1>
                    <BS.Button> bootstrapin nappula</BS.Button>
                    <button> normi</button>
                    </div>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});
 
//React.renderComponent(<FilterableProductTable products={PRODUCTS} />, document.body);
//module.exports = EventInfo;
module.exports = EventInfoList;
//module.exports = GreetingsComponent;
