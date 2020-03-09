import React, { Component } from 'react';

class Products extends Component {
    state = {
            products:[],
            product: {
                name:'',
                price:''
            }
        }
    
    componentDidMount() {
        this.getProducts();
    }

        getProducts = _ =>{
        fetch('/products')
        .then(res => res.json())
        .then(response => this.setState({products:response.data}))
        .catch(err => console.error(err))
    }
    addProduct = _ => {
        const {product} = this.state;
        fetch(`/products/add?name=${product.name}&price=${product.price}`)
        .then(this.getProducts)
        .catch(err => console.error(err))

    }

    renderProduct = ({ product_id , name }) => <div key={product_id}>{name}</div>
    render() {
        const {products, product} = this.state;
        return (
          <div className="App">
            {products.map(this.renderProduct)}
            <div>
              <input
                value={product.name}
                onChange={e => this.setState({product:{...product, name: e.target.value }})}
              />
              <input
                value={product.price}
                onChange={e => this.setState({product:{...product, price: e.target.value }})}
              />
              <button onClick={this.addProduct}>Add product</button>
            </div>
          </div>
        );
    }
}
export default Products;
