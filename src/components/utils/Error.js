import React from 'react';
import PropTypes from 'prop-types';

const Error = ({mensaje}) => ( 
        <div className="alert alert-primary text-center">
            <p>{mensaje}</p>
        </div>
);

Error.prototype = {
    mensaje: PropTypes.string.isRequired
    
}

export default Error;
