import PropTypes from 'prop-types';

const ErrorLogin = ({message, style}) =>{
    return(
        <div style={style}>
            <strong>Error! {message}</strong>
        </div>
    );
};

ErrorLogin.prototype = {
    message: PropTypes.string.isRequired,
    style: PropTypes.object
};

export default ErrorLogin;