import React from 'react';

import './menu-list-item.scss';
import { Link } from 'react-router-dom';

const MenuListItem = ({menuItem, onAddToCart, isOpenCard, onBack, styleProps, details}) => {
    const {title, price, url, category} = menuItem;
    
    return (
            <li 
                className="menu__item"
                style={styleProps || {}}    
            >
                <LinkTitle propsTitle={menuItem} isOpenCard={isOpenCard} />
                <img className="menu__img" src={url} alt={title}></img>
                <div className="menu__category">Category: <span>{category}</span></div>
                <div className="menu__price">Price: <span>{price}$</span></div>
                <div className="menu__price">{details}</div>
                <button onClick={() => onAddToCart()} className="menu__btn">Add to cart</button>
                {isOpenCard && <BtnBack onBack={onBack} />} 
            </li>
    )
}

export default MenuListItem;

const LinkTitle = ({propsTitle, isOpenCard}) => {
    const {title, id} = propsTitle;
    
    return isOpenCard 
    ?   (
            <div className="menu__title">{title}</div>
        )
    :   (
            <Link to={`/menu/${id}`}>
                <div className="menu__title">{title}</div>
            </Link>
        );
}

const BtnBack = ({onBack}) => {
    return (
        <button
            className="menu__btn back"
            onClick={() => onBack()}
        >
            Назад
        </button>
    )
}