import './styles.scss';

const Switch = ({
  background = 'light',
  switchText = '',
  turnedOn = false,
  handleSwitch,
  id = 'switch',
  ...props
}) => {
  return (
    <div className='switch-container'>
      <input
        type='checkbox'
        id={id}
        className={background === 'light' ? 'light-bg' : 'dark-bg'}
        checked={turnedOn}
        onChange={handleSwitch}
        {...props}
      />
      <label className={`switch-label ${props.disabled ? 'disabled' : ''}`} htmlFor={id}></label>
      <span className='switch-text'>{switchText}</span>
    </div>
  );
};

export default Switch;