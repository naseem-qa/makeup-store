import React, { useContext, useEffect, useState } from 'react';
import superagent from  'superagent';
import { ModelContext } from '../context';
import {If,Then} from '../If'
import Modal from '../modal';

function ColorCircle(props){
    return(
        <span style={{width:"20px", height:"20px", backgroundColor:props.color, borderRadius:"50%"}}></span>
    )
}

function Eyebrow(props) {
    const context = useContext(ModelContext);
    const [eyebrowData, setEyebrowData]=useState([]);

    const getData = ()=>{
        superagent.get('http://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyebrow')
        .then(response =>{
            console.log(response.body)
            setEyebrowData(response.body)
        })
    }

    const handleCardClick =(oneEyebrow) =>{
        context.setModalData(oneEyebrow);
        context.setShowModal(true)
        
    }

    useEffect(()=>{
        getData();
    },[]);
    
    return (
        <section className='blush card-container' >
            {eyebrowData.map((eyebrow,index) => (
                <div key={index} className="card" onClick={() => handleCardClick(eyebrow)}
                >
                    <img  alt={eyebrow.name} src={eyebrow.image_link} />
                    <h2>{eyebrow.brand}</h2>
                    <h3>{eyebrow.name}</h3>
                    <h3>{eyebrow.category}</h3>
                    <p>{eyebrow.price_sign} {eyebrow.price}</p>
                    <div className='color-container'>
                    {eyebrow.product_colors.map((color,idx)=>(
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

export default Eyebrow;