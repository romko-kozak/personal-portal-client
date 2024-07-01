import Modal from 'components/modal';
import Button from 'components/button';
import IconButton from 'components/icon-button';
import {ReactComponent as No} from 'assets/icons/no.svg';
import './styles.scss';

const ConfirmationModal = ({children, visible, submit, cancel, submitText, cancelText}) => {
  return (
    <Modal visible={visible} closeModal={cancel} className='confirmation-modal'>
      <IconButton
        icon={No}
        tooltipText='Close'
        onClick={cancel}
        className='confirmation-modal-close-icon'
      />
      {children}
      <div className='confirmation-modal-controls-container'>
        <Button
          text={submitText}
          onClick={submit}
          background='glass'
        />
        <Button
          text={cancelText}
          onClick={cancel}
          background='glass'
        />
      </div>
    </Modal>
  );
};

export default ConfirmationModal;