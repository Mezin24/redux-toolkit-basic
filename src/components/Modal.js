import React from 'react';
import { closeModal } from '../features/modal/modalSlice';
import { clearCart } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const Modal = () => {
  const dispatch = useDispatch();

  const confirmHandler = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  const cancelHandler = () => {
    dispatch(closeModal());
  };

  return (
    <aside
      className='modal-container'
      onClick={(e) =>
        e.target.classList.contains('modal-container') && dispatch(closeModal())
      }
    >
      <div className='modal'>
        <h4>remove all items from your shopping cart</h4>
        <div className='btn-container'>
          <button
            type='button'
            className='btn confirm-btn'
            onClick={confirmHandler}
          >
            Confirm
          </button>
          <button
            type='button'
            className='btn clear-btn'
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
