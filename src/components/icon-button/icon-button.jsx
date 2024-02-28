import {Link} from 'react-router-dom';
import './styles.scss';

const IconButton = ({
  icon: Icon,
  tooltipText,
  tooltipPosition = 'bottom', // TODO: Add styles for all positions
  link,
  onClick,
  className
}) => {
  if (link) {
    return (
      <Link to={link} className='icon-button-link'>
        <div
          role='presentation'
          className={`icon-button-container ${className || ''} ${tooltipText ? `tooltip-${tooltipPosition}` : ''}`}
          onClick={onClick}
          onKeyDown={onClick}
          data-tooltip-text={tooltipText}
        >
          <Icon />
        </div>
      </Link>
    );
  }

  return (
    <div
      role='presentation'
      className={`icon-button-container ${className || ''} ${tooltipText ? `tooltip-${tooltipPosition}` : ''}`}
      onClick={onClick}
      onKeyDown={onClick}
      data-tooltip-text={tooltipText}
    >
      <Icon />
    </div>
  );
};

export default IconButton;