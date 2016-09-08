import React, {PropTypes} from 'react';
import isString from 'lodash/isString';

function ConfirmWrapper({
  isVisible,
  ConfirmationModal,
  Content: ConfirmContentComponent,
  handleCancel: cancelHandler,
  handleConfirm: confirmHandler,
  ...contentProps
}){
  const ConfirmContent = isString(ConfirmContentComponent) ? (() => <span>{ConfirmContentComponent}</span>) : ConfirmContentComponent;
  return isVisible ? <ConfirmationModal open cancelHandler={cancelHandler} confirmHandler={confirmHandler} {...contentProps}>{ConfirmContent ? <ConfirmContent /> : null}</ConfirmationModal> : null;
}

ConfirmWrapper.propTypes = {
  isVisible: PropTypes.bool,
  ConfirmationModal: PropTypes.func,
  ConfirmContentComponent: PropTypes.func,
  cancelHandler: PropTypes.func,
  confirmHandler: PropTypes.func
};

ConfirmWrapper.defaultProps = {
  isVisible: false,
  ConfirmationModal: props => <div style={{border: 'dashed tomato 3px', textAlign: 'center'}}>
    <h3>{'Default Modal'}</h3>
    <p style={{backgroundColor: 'tomato', color: 'white'}}>{`Even if this modal is really wonderfull, it may be a better idea to provide a ModalComponent of your own design or focus-components/confirm to this <ConfirmWrapper> component.`}</p>
    {props.children}
    <p>
      <button onClick={props.cancelHandler}>{'Cancel'}</button>
      <button onClick={props.confirmHandler}>{'OK'}</button>
    </p>
  </div>
};

export default ConfirmWrapper;
