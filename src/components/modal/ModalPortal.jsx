import reactDom from 'react-dom';

const ModalPortal = ({ children }) => {
  const modalElement = document.getElementById('modal');
  return reactDom.createPortal(children, modalElement);
};

export default ModalPortal;
