import React, {PropTypes} from 'react';

function ConfirmWrapper({
  isVisible,
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
  ConfirmContentComponent: PropTypes.func,
  cancelHandler: PropTypes.func,
  confirmHandler: PropTypes.func
}


export default ConfirmWrapper;
