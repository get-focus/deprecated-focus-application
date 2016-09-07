import React, {PropTypes} from 'react';
import isString from 'lodash/isString';

function ConfirmWrapper({
  isVisible,
  ConfirmationModal,
  ConfirmContentComponent,
  cancelHandler,
  confirmHandler,
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
  ConfirmationModal: props => <div>
    <h1>{'Great Modal'}</h1>
    {props.children}
    <button onClick={props.cancelHandler}>{'Cancel'}</button>
    <button onClick={props.confirmHandler}>{'OK'}</button>
  </div>
};

export default ConfirmWrapper;
