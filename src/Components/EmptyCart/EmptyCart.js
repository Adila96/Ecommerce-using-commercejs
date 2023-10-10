import React from 'react';
import './EmptyCart.css';
import { useNavigate } from 'react-router-dom';

function EmptyCart() {
    const navigate = useNavigate();
  return (
    <div className='parentContainer'>
        <img src="../../../Images/emptyCart.png" alt="emptyCart image" />
        <div>
            <span>To Add Products</span>
            <button onClick={()=>{
                navigate('/products');
            }}>Go to Products</button>
        </div>
    </div>
  )
}

export default EmptyCart