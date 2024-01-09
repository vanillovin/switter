import { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalContextValue {
  isOpen: boolean;
  title: string;
  content: string;
  navigateToAuth: () => void;
  openModal: (title: string, content: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [onConfirm, setOnConfirm] = useState<(...args: unknown[]) => void>(() => {});

  const openModal = (title: string, content: string) => {
    setIsOpen(true);
    setTitle(title);
    setContent(content);
    // setOnConfirm(() => onConfirm);
  };

  const closeModal = () => setIsOpen(false);

  const navigateToAuth = () => navigate('/auth');

  return (
    <ModalContext.Provider
      value={{ isOpen, title, content, openModal, closeModal, navigateToAuth }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
