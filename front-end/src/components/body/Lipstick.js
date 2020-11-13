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

function Lipstick(props) {
    const context = useContext(ModelContext);
    const [lipstickData, setLipstickData] = useState([]);
    const getData = () =>{
        superagent.get('http://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick')
        .then(response=>{
            setLipstickData(response.body)
        })
    }


    const handleCardClick =(oneLipstick) =>{
        context.setModalData(oneLipstick);
        context.setShowModal(true) 
    }
    useEffect(()=>{
        getData()
    },[])
    return (
        <section className='blush card-container'>
            {lipstickData.map((lipstick,index)=>(
                <div key={index} className='card' onClick={() => handleCardClick(lipstick)}>
                    <img alt={lipstick.name} src={lipstick.image_link} />
                   <h2>{lipstick.brand}</h2>
                   <h3>{lipstick.name}</h3>
                   <h3>{lipstick.category}</h3>
                   <p>{lipstick.price_sign} {lipstick.price}</p>
                   <div className='color-container'>
                       {lipstick.product_colors.map((color,idx)=>(
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

export default Lipstick;