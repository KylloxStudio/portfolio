import Img from "next/image";

export default function Modal({ children }) {
  return (
    <>
      <div className="modal-overlay"></div>
      <div className="modal-container modal-dismiss">
        <div className="popup">
          <div className="modal">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}