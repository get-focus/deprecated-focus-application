import React, {PropTypes} from 'react'

export function ProgressBar({completed}){
  return <div>{Array.from({length: 100}, (v, k) =>  k < completed ? '⬛' : '⬜').join('')}</div>;
}

function LoadingBarComponent({total, pending}){
  const completed = +((total - pending)/total)*100;
  const isVisible = completed < 100;
  return <div data-focus='loading-bar'>{isVisible && <ProgressBar completed={completed} />}</div>;
}

LoadingBarComponent.defaultProps = {
  ProgressBar: ProgressBar
}



export default LoadingBarComponent;
