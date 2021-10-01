import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const Message = ({ userName }) => {
  const [open, setOpen] = useState(true);
  const [msg, setMsg] = useState(`${userName || 'hey'} 클릭해봐 :)`);

  const msgArr = [
    '누군가를 사랑하고자 한다면 너 자신을 먼저 사랑해야 해',
    '앞이 보이지 않을 때는 지금 할 수 있는 일을 하면 돼',
    '진정한 아름다움은 내면에 있어',
    '그렇게 구경만 하다가는 네 인생이 너 없이 흘러가는 걸 구경하게 될걸',
    '마음만을 가지고 있어서는 안 된다. 반드시 실천해야 한다',
    '소심해질 시간 없어 용감하고 대담하게 해',
    '기억해 너는 세상을 빛으로 가득 채울 수 있는 존재란 걸',
    '사랑은 누군가를 나보다 먼저 두는 거야',
    '용기를 내',
    '행운을 빌어',
    '너에게는 아직 꿈을 이루기 위한 충분한 시간이 있어',
    '힘내. 인생은 한순간에 바뀌기도 하는 거니까',
    '큰 희망이 큰 사람을 만든다',
    '가끔은 옳은 길이 가장 쉬운 길이 아닐 때도 있지',
    '절대로 고개를 떨구지 말라 고개를 치켜들고 세상을 똑바로 보라',
    '시간은 아무도 기다려주지 않아',
    '아름다움은 사라져 버리지만 마음에서 우러나는 것은 사라지지 않아. 유머, 친절함, 용기',
    '중요한 건 겉모습이 아닌 마음이야',
    '간절히 바라는 마음이 있어야 마법이 일어날 수 있어',
    '역경을 이겨내고 핀 꽃이 가장 아름다운 꽃이란다',
    '눈을 감지 말고 똑바로 봐. 두려움의 실체는 생각과 다를 수 있어',
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
                <FontAwesomeIcon icon={faUser} /> {'익명'}
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
