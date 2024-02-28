import './styles.scss';

const Input = ({
  background = 'light',
  placeholder = '',
  value = '',
  handleInput,
  error,
  ...props
}) => (
  <>
    <input
      className={`input ${background === 'glass' ? 'glass' : ''} ${background === 'light' ? 'lite-bg' : ''} ${background === 'dark' ? 'dark-bg' : ''} ${error ? 'error' : ''}`}
      placeholder={placeholder}
      type='text'
      value={value}
      onChange={handleInput}
      {...props}
    />
    {error && <p className='input-error'>{error}</p>}
  </>
);

export default Input;