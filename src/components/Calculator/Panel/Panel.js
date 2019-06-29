import React from 'react';

import ButtonRow from './ButtonRow/ButtonRow';
import Button from './Button/Button';
import './Panel.css';

const Panel = (props) => {
  let buttons = [
    [
      { text: 'C', color: 'gray', type: 'C' },
      { text: '+/-', color: 'gray', type: 'plus/minus' },
      { text: '%', color: 'gray', type: 'operator' },
      { text: '÷', color: 'orange', type: 'operator' },
    ],
    [
      { text: 7, color: 'white', type: 'number' },
      { text: 8, color: 'white', type: 'number' },
      { text: 9, color: 'white', type: 'number' },
      { text: '×', color: 'orange', type: 'operator' }
    ],
    [
      { text: 4, color: 'white', type: 'number' },
      { text: 5, color: 'white', type: 'number' },
      { text: 6, color: 'white', type: 'number' },
      { text: '-', color: 'orange', type: 'operator' }
    ],
    [
      { text: 1, color: 'white', type: 'number' },
      { text: 2, color: 'white', type: 'number' },
      { text: 3, color: 'white', type: 'number' },
      { text: '+', color: 'orange', type: 'operator' }
    ],
    [
      { text: 0, color: 'big-white', type: 'number' },
      { text: '.', color: 'white', type: 'dot' },
      { text: '=', color: 'orange', type: 'equals' }
    ]
  ];

  return (
    <div className="Panel">
      {
        buttons.map((buttonRow, index) => {
          return (
            <ButtonRow key={index}>
              {
                buttonRow.map(button => {
                  return (
                    <Button
                      key={button.text}
                      text={button.text}
                      color={button.color}
                      type={button.type}
                      clicked={props.clicked}>
                      {button.text}
                    </Button>
                  )
                })
              }
            </ButtonRow>
          )
        })
      }
    </div>
  );
}

export default Panel;