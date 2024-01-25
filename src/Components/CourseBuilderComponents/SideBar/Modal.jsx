import { useEffect } from 'react';
import './Modal.css';

const Modal = ({children}) => {

    useEffect(()=>{
        document.body.style.overflowY = 'hidden';

        return ()=>{
            document.body.style.overflowY = 'auto';
        }
    })

    return ( <>
        <div className="modal_wrapper"></div>
        <div className="modal_container">
            {children}
        </div>
    
    </> );
}
 
export default Modal;