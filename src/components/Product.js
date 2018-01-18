import React, {Component} from 'react';
import Counter from './Counter';

class Product extends Component{
	constructor(props){
		super(props);
        this.state = {
            selectedProduct: {},
            quickViewProdcut: {},
            buttonLabel: "COMPRAR LIVRO",
        }
    }
    resetQuantity(){

    }
    addToCart(image, name, price, id, quantity){
        this.setState({
            selectedProduct: {
                image: image,
                name: name,
                price: price,
                id: id,
                quantity: quantity
            }
        }, function(){
            this.props.addToCart(this.state.selectedProduct);
        })
        this.setState({
            buttonLabel: "✔ ADICIONADO"
        }, function(){
            setTimeout(() => {
                this.setState({ 
                    buttonLabel: "COMPRAR LIVRO",
                    selectedProduct: {} 
                });
            }, 5000);
        });
    }
    quickView(image, name, price, id){
        this.setState({
            quickViewProdcut: {
                image: image,
                name: name,
                price: price,
                id: id
            }
        }, function(){
            this.props.openModal(this.state.quickViewProdcut);
        })
    }
    render(){
        let image = this.props.image;
        let name = this.props.name;
        let price = this.props.price;
        let description = this.props.description;
        let id = this.props.id;
        let quantity = this.props.productQuantity;
        return(
            <div className="product">
                <div className="product-image">
                    <img src={image} alt={this.props.name} onClick={this.quickView.bind(this, image, name, price, id, quantity)}/>
                </div>
                <h4 className="product-name">{this.props.name}</h4>
                <p className="product-price">{this.props.price}</p>
                <p className="product-description">{this.props.description}</p>
                <Counter productQuantity={quantity} updateQuantity={this.props.updateQuantity} resetQuantity={this.resetQuantity}/>
                <div className="product-action">
                    <button type="button" onClick={this.addToCart.bind(this, image, name, price, id, quantity)}>{this.state.buttonLabel}</button>
                </div>
            </div>
        )
    }
}

export default Product;
