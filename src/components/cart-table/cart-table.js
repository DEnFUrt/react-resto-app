import React from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import {deleteFromCard, reCountFromCard, addedToCard, clearCart} from '../../actions';
import BtnSend from '../btn-send/btn-send';

import './cart-table.scss';

const CartTable = ({items, deleteFromCard, reCountFromCard, addedToCard, RestoService, clearCart}) => {
    
    const createOrder = items => items.map(
        item => ({
            id: item.id,
            title: item.title,
            count: item.count,
        })
    );

    const onSendOrder = () => {

        if (items.length === 0) {
            return
        }

        RestoService.sendOrder(createOrder(items))
        .then(res => res.json())
        .then(json => alert(`Заказ № ${json.id} отправлен`))
        .then(() => clearCart())
        .catch(err => {
            throw new Error(`Could not send order, status: ${err.message}`)
        });
    };

    const carts = items.map(item => {
        const {title, price, url, id, count} = item;
        return (
            <div key={id} className="cart__item">
                <img src={url} className="cart__item-img" alt={title}></img>
                <div className="cart__item-title">{title}</div>
                <div className="cart__item-price">
                    <button onClick={() => reCountFromCard(id)} className="cart__recount">−</button>
                    <button onClick={() => addedToCard(id)} className="cart__recount">✚</button>
                    : {count} x {price}$ = {(+count * +price).toFixed(0)}$
                </div>
                <div onClick={() => deleteFromCard(id)} className="cart__close">&times;</div>
            </div>
        )
    });

    return (
        <>
            <BtnSend onSendOrder={onSendOrder} />
            <Carts carts={carts} />
        </>
    )
};

const mapStateToProps = ({items}) => {
    return {
        items
    }
}

const mapDispatchToProps = {
    deleteFromCard,
    reCountFromCard,
    addedToCard,
    clearCart,
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));

const Carts = ({carts}) => {
    return (
        <>
            <div className="cart__title">
                Ваш заказ:
            </div>
            <div className="cart__list">
                {carts.length !== 0 ? carts : <h1 className="cart__text"> ☹ Корзина пуста... </h1>}
            </div>
        </>
    )
}