import React from 'react';
import cartIcon from './shopping-cart-solid.svg';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import './app-header.scss';

const AppHeader = ({items}) => {
    
    const getCost = (arr) => arr.reduce((acc, item) => acc + (+item.price * +item.count), 0);
    
    return (
        <header className="header">
            <Link className="header__link" to="/menu/">
                Menu
            </Link>
            <Link className="header__link" to="/cart/">
                <img className="header__cart" src={cartIcon} alt="cart"></img>
                Total: {getCost(items)} $
            </Link>
        </header>
    )
};

const mapStateToProps = ({items}) => {
    return {
        items
    }
}

export default connect(mapStateToProps)(AppHeader);