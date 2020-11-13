import React, { useContext } from 'react';
import { ModelContext } from './context';
import styles from './modal.module.scss';

const Modal = props => {
    const context = useContext(ModelContext);

  return (
    <div className={styles.modal}>
        <div>
        <h2 onClick={()=>context.setShowModal(false)}>close</h2>
         {props.children}
        </div>
    </div>
  );
};
export default Modal;
