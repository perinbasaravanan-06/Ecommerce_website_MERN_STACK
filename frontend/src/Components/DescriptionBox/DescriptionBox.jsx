import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews(122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Temporibus, non. Dolorum, dolores. Autem, 
                cupiditate sequi ad beatae quam maxime 
                itaque, suscipit tempore ipsa quae atque quaerat 
                optio accusamus dolorem nesciunt.
            </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Temporibus, non. Dolorum, dolores. Autem, 
                cupiditate sequi ad beatae quam maxime 
                itaque, suscipit tempore ipsa quae atque quaerat 
                optio accusamus dolorem nesciunt.
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox