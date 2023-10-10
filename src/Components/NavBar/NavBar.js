import React, { useContext } from 'react'
import Arrow from '../../Assets/Arrow'
import './NavBar.css'
import { CategoryContext } from '../../Store/CategoriesContext'
import { useNavigate } from 'react-router-dom';
function NavBar() {
    const {setCategory} = useContext(CategoryContext);
    const navigate =useNavigate();
  return (
        <div className="menuBar">
          <div className="categoryMenu" onClick={()=>{
            navigate('/products');
          }}>
            <span>ALL CATEGORIES</span>
          </div>
          <div className="otherQuickOptions">
            <div onClick={()=>{
                setCategory("best-sellers");
                navigate('/:Best-Sellers');
            }}>Best Sellers</div>
            <div onClick={()=>{
                setCategory("new-releases");
                navigate('/:New-Releases');
            }}>New Releases</div>
            <div onClick={()=>{
                setCategory("mobiles");
                navigate('/:Mobiles');
            }}>Mobiles</div>
            <div onClick={()=>{
                setCategory("electronics");
                navigate('/:Electronics');
            }}>Electronics</div>
            <div onClick={()=>{
                setCategory("fashion");
                navigate('/:Fashion');
            }}>Fashion</div>
          </div>
        </div>
  )
}

export default NavBar