import './styles.scss';

const Button = ({
  background = 'light',
  className = '',
  onClick,
  disabled,
  text = '',
  error = null,
  noHover = false,
  ...props
}) => {
  return (
    <>
      <button
        className={`button ${background === 'light' ? 'light-bg' : ''} ${background === 'dark' ? 'dark-bg' : ''} ${background === 'glass' ? 'glass' : ''} ${disabled ? 'disabled' : ''} ${noHover ? 'no-hover' : ''} ${className}`}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {text}
      </button>
      {error && <p className='button-error'>{error}</p>}
    </>
  );
};

export default Button;