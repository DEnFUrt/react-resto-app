import React from 'react';

import './btn-send.scss';

const BtnSend = ({onSendOrder}) => {
  return (
    <div className="btn__wrap">
      <button onClick={() => onSendOrder()} className="btn__wrap-btn">
        Оформить заказ
      </button>
    </div>
  )
}

export default BtnSend;

