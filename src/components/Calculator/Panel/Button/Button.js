import React from 'react';

const Button = (props) => {
  let color = ['Button', props.color].join(" ");

  return (
    <div className={color} onClick={() => props.clicked(props.text, props.type)}>
      {props.children}
    </div >
  );
}

export default Button;