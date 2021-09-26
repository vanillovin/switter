import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const Message = ({ userName = '♥' }) => {
  const [open, setOpen] = useState(true);
  const [msg, setMsg] = useState(`${userName} click me :)`);

  const msgArr = [
    "Don't dwell on the past",
    'Believe in yourself',
    'Seize the day',
    'You only live once',
    'Past is just past',
    'Love yourself',
    "Don't dream, Be it",
    'No sweat, No sweet',
    'Be brave',
    'Good luck',
    'Hang in there',
    'Live positive',
    'Time is gold',
    'You deserve to be loved',
    'Love what you do',
    'Live live there is no tommorrow',
    'Time waites for no one',
    "Don't waste your youth",
    'Life is all about timing',
    'Rome is not built in a day',
  ];

  const onOpen = () => setOpen(!open);

  const randomMsg = () =>
    setMsg(msgArr[Math.floor(Math.random() * msgArr.length)]);

  return (
    <div className="container">
      <div className="msg-container">
        <div className="msgh">
          <span>Message</span>
        </div>

        {open ? (
          <div className="msgs" onClick={onOpen}>
            <div className="chat">
              <div style={{ fontWeight: 'bold', marginBottom: 12 }}>
                <FontAwesomeIcon icon={faUser} /> {'user'}
              </div>
              <span>{msg}</span>
            </div>
          </div>
        ) : (
          <>
            <div className="back" onClick={onOpen}>
              {open ? '' : '←'}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: 20,
              }}
            >
              <div style={{ marginRight: 10 }}>
                <FontAwesomeIcon icon={faUser} color="black" />
              </div>
              <div className="mymsg" onClick={randomMsg}>
                <span>{msg}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Message;
