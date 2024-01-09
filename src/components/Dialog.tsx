import * as Dialog from '@radix-ui/react-dialog';

import './styles.css';
import { useModal } from '../contexts/ModalContext';

const DialogDemo = () => {
  const { isOpen, title, content, closeModal, navigateToAuth } = useModal();

  return (
    <Dialog.Root open={isOpen} onOpenChange={closeModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
          <Dialog.Description className="DialogDescription">{content}</Dialog.Description>
          {/* <fieldset className="Fieldset">
          <label className="Label" htmlFor="name">
            Name
          </label>
          <input className="Input" id="name" defaultValue="Pedro Duarte" />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="username">
            Username
          </label>
          <input className="Input" id="username" defaultValue="@peduarte" />
        </fieldset>
        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
          <Dialog.Close asChild>
            <button className="Button green">Save changes</button>
          </Dialog.Close>
        </div> */}
          <button onClick={navigateToAuth} className="" aria-label="Close">
            로그인·가입하기
          </button>
          <Dialog.Close asChild>
            <button style={{ cursor: 'pointer' }} className="" aria-label="Close">
              닫기
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogDemo;
