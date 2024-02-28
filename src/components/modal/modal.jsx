import {createPortal} from 'react-dom';
import './styles.scss';

const Modal = ({children, closeModal, visible, ...props}) => {
  const {className} = props;
  const clickModalContainer = e => {
    e.stopPropagation();
  };

  return visible ? createPortal(
    <div role='presentation' className='modal-overlay' onClick={closeModal}>
      <div role='presentation' className={`modal-container ${className}`} onClick={clickModalContainer}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-container')
  ) : null;
};

export default Modal;