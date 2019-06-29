import React from 'react';

import './Display.css';

const Display = (props) => {
  let operator = null;

  if (props.operator) {
    operator = (<span>{props.operator}</span>);
  }

  return (
    <React.Fragment>
      {operator}
      <div className="Display">
        {props.number}&nbsp;
      </div>
    </React.Fragment>
  );
}

export default Display;