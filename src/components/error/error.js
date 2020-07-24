import React from 'react';

import './error.css';

const Error = ({message = 'Неопознанная ошибка!'}) => {
    return <div className="error">`Error: ${message}`</div>
}

export default Error;