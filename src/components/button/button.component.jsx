import './button.styles.scss'

const BUTTON_TYPES_CLASSES = {
google: 'google-sign-in',
iverted: 'inverted'
}

const Button = ({ label, buttonType, ...otherProps }) => {
  return (
    <button className={`button-container ${BUTTON_TYPES_CLASSES}`} {...otherProps}>
      {label}
    </button>
  );
}

export default Button;