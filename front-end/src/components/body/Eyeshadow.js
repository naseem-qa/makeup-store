import React, { useContext, useEffect, useState } from 'react';
import superagent from  'superagent';
import { ModelContext } from '../context';
import {If,Then} from '../If'
import Modal from '../modal';

function ColorCircle (props){
    return(
        <span style={{width:"20px", height:"20px", backgroundColor:props.color, borderRadius:"50%"}}></span>
    )
}

function Eyeshadow(props) {
    const context = useContext(ModelContext);
    const [eyeshadowData, setEyeshadowData] = useState([]);
    const getData = ()=>{
        superagent.get('http://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeshadow')
        .then(response=>{
            console.log(response.body)
            setEyeshadowData(response.body)
        })
    }


    const handleCardClick =(oneEyeshadow) =>{
        context.setModalData(oneEyeshadow);
        context.setShowModal(true) 
    }

    useEffect(()=>{
        getData();
    },[])

    return (
       <section className='blush card-container' >
           {eyeshadowData.map((eyeshadow,index) =>(
               <div key={index} className="card" onClick={() => handleCardClick(eyeshadow)}>
                   <img alt={eyeshadow.name} src={eyeshadow.image_link} />
                   <h2>{eyeshadow.brand}</h2>
                   <h3>{eyeshadow.name}</h3>
                   <h3>{eyeshadow.category}</h3>
                   <p>{eyeshadow.price_sign} {eyeshadow.price}</p>
                   <div className='color-container'>
                       {eyeshadow.product_colors.map((color,idx)=>(
                           <ColorCircle color={color.hex_value} />
                       ))}
                   </div>

               </div>
           ))}
            <If condition={context.showModal}>
            <Then>
                <Modal>
                        <h1>{context.modalData.name}</h1>
                        {/* <img  alt={context.modalData.name} src={context.modalData.image_link} /> */}
                        <h2>{context.modalData.brand}</h2>
                        <p>{context.modalData.price_sign} {context.modalData.price}</p>
                        <h3><a href={context.modalData.product_link}>Buy Now</a></h3>
                        <p>Description:{context.modalData.description}</p>
                        {/* <p>Tags:{context.modalData.tag_list.map((item,index)=>(item.value))}</p> */}
                </Modal>
            </Then>
        </If> 

       </section>
    );
}

export default Eyeshadow;