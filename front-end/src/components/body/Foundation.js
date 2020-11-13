import React, { useContext, useEffect, useState } from 'react';
import superagent from  'superagent';
import { ModelContext } from '../context';
import {If,Then} from '../If'
import Modal from '../modal';

function ColorCircle (props){
    return(
        <span style={{width:'20px', height:'20px', backgroundColor:props.color, borderRadius:'50%'}}></span>
    )
}

function Foundation(props) {
    const context = useContext(ModelContext);
    const [foundationData, setFoundationData] = useState([]);
    const getData = () =>{
        superagent.get('http://makeup-api.herokuapp.com/api/v1/products.json?product_type=foundation')
        .then(response=>{
            setFoundationData(response.body)
        })
    }

    const handleCardClick =(onefoundation) =>{
        context.setModalData(onefoundation);
        context.setShowModal(true) 
    }
     useEffect(()=>{
         getData();
     },[])

    return (
        <section className='blush card-container'>
            {foundationData.map((foundation,index)=>(
                <div key={index} className='card'onClick={() => handleCardClick(foundation)}>
                    <img alt={foundation.nfoundationame} src={foundation.image_link} />
                   <h2>{foundation.brand}</h2>
                   <h3>{foundation.name}</h3>
                   <h3>{foundation.category}</h3>
                   <p>{foundation.price_sign} {foundation.price}</p>
                   <div className='color-container'>
                       {foundation.product_colors.map((color,idx)=>(
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

export default Foundation;