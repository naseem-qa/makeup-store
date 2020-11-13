import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header>
           <h1 className='logo' >NASA Makeup store</h1>
           <nav className='main__nav'>
               <ul>
                   <li><Link to='/'>Home</Link></li>
                   <li><Link to='/blush'>blush</Link></li>
                   <li><Link to='/bronzer'>bronzer</Link></li>
                   <li><Link to='/eyebrow'>eyebrow</Link></li>
                   <li><Link to='/eyeliner'>eyeliner</Link></li>
                   <li><Link to='/eyeshadow'>eyeshadow</Link></li>
                   <li><Link to='/foundation'>foundation</Link></li>
                   <li><Link to='/lipLiner'>lipLiner</Link></li>
                   <li><Link to='/lipstick'>lipstick</Link></li>
                   <li><Link to='/mascara'>mascara</Link></li>
                   <li><Link to='/nailPolish'>nailPolish</Link></li>
               </ul>
            </nav> 
        </header>
    );
}

export default Header;