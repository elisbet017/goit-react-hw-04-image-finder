import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalBlock } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onCloseModal, children }) => {
  const onClose = useCallback(
    e => {
      if (e.code === 'Escape' || e.currentTarget === e.target) {
        onCloseModal();
      }
    },
    [onCloseModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', onClose);

    return () => {
      window.removeEventListener('keydown', onClose);
    };
  }, [onClose]);

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalBlock>{children}</ModalBlock>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element.isRequired,
};

export default Modal;
