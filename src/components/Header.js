import React, {Component} from 'react';
import CartScrollBar from './CartScrollBar';
import Counter from './Counter';
import EmptyCart from '../empty-states/EmptyCart';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {findDOMNode} from 'react-dom';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            showCart: false,
            cart: this.props.cartItems,
            mobileSearch: false
        };
    }
    handleCart(e){
        e.preventDefault();
        this.setState({
            showCart: !this.state.showCart
        })
    }
    handleSubmit(e){
        e.preventDefault();
    }
    handleMobileSearch(e){
        e.preventDefault();
        this.setState({
            mobileSearch: true
        })
    }
    handleSearchNav(e){
        e.preventDefault();
        this.setState({
            mobileSearch: false
        }, function(){
            this.refs.searchBox.value = "";
            this.props.handleMobileSearch();
        })
    }
    handleClickOutside(event) {
        const cartNode = findDOMNode(this.refs.cartPreview);
        const buttonNode = findDOMNode(this.refs.cartButton);
        if(cartNode.classList.contains('active')){
            if (!cartNode || !cartNode.contains(event.target)){
                this.setState({
                    showCart: false
                })
                event.stopPropagation();
            }
        } 
    }
    componentDidMount() {
      document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }
    componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    }
    render(){
        let cartItems;
        cartItems = this.state.cart.map(product =>{
			return(
				<li className="cart-item" key={product.name}>
                    <img className="product-image" src={product.image} />
                    <div className="product-info">
                        <p className="product-name">{product.name}</p>
                        <p className="product-price">{product.price}</p>
                    </div>
                    <div className="product-total">
                        <p className="quantity">{product.quantity} {product.quantity > 1 ?"livros" : "livro" } </p>
                        <p className="amount">{product.quantity * product.price}</p>
                    </div>
                    <a className="product-remove" href="#" onClick={this.props.removeProduct.bind(this, product.id)}>×</a>
                </li>
			)
		});
        let view;
        if(cartItems.length <= 0){
			view = <EmptyCart />
		} else{
			view = <CSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={300} component="ul" className="cart-items">{cartItems}</CSSTransitionGroup>
		}
        return(
            <header>
                <div className="container">
                    <div className="brand">
                        <img className="logo" src="https://i2.wp.com/www.cursosortografia.com/wp-content/uploads/2015/10/cropped-icono-gramatica-320x210.png?fit=512%2C512https://i2.wp.com/www.cursosortografia.com/wp-content/uploads/2015/10/cropped-icono-gramatica-320x210.png?fit=512%2C512" alt="Veggy Brand Logo"/>
                    </div>
                        
                    <div className="search">
                        <a className="mobile-search" href="#" onClick={this.handleMobileSearch.bind(this)}><img src="https://developer.x-plane.com/wp-content/themes/xplane/images/search-icon.svg" alt="search"/></a>
                        <form action="#" method="get" className={this.state.mobileSearch ? "search-form active" : "search-form"}>
                            <a className="back-button" href="#" onClick={this.handleSearchNav.bind(this)}><img src="http://www.vilassebastiao.com/imagens/circle_back.png" alt="back" className="back-circle"/></a>
                            <input type="search" ref="searchBox" placeholder="Pesquise pelos livros" className="search-keyword" onChange={this.props.handleSearch}/>
                            <button className="search-button" type="submit" onClick={this.handleSubmit.bind(this)}></button>
                        </form>
                    </div>

                    <div className="cart"> 
                        <div className="cart-info">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Número de livros</td>
                                        <td>:</td>
                                        <td><strong>{this.props.totalItems}</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>:</td>
                                        <td><strong>R$ {this.props.total}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <a className="cart-icon" href="#" onClick={this.handleCart.bind(this)} ref="cartButton">
                            <img className={this.props.cartBounce ? "tada" : " "} src="https://www.rosarosaflowers.com/img/7268/826.png" alt="Cart"/>
                            {this.props.totalItems ? <span className="cart-count">{this.props.totalItems}</span> : "" }
                        </a>
                        <div className={this.state.showCart ? "cart-preview active" : "cart-preview"} ref="cartPreview">
                            <CartScrollBar>
                                {view}
                            </CartScrollBar>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;
