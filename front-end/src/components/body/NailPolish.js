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
function NailPolish(props) {
    const context = useContext(ModelContext);
    const [ nailPolishData, setNailPolishData] = useState([]);
    const getData = () =>{
        superagent.get('http://makeup-api.herokuapp.com/api/v1/products.json?product_type=nail_polish')
        .then(response=>{
            setNailPolishData(response.body)
        })
    }

    const handleCardClick =(oneNailPolish) =>{
        context.setModalData(oneNailPolish);
        context.setShowModal(true) 
    }

    useEffect(()=>{
        getData()
    },[])
    return (
        <section className='blush card-container'>
            {nailPolishData.map((nailPolish,index)=>(
                <div key={index} className='card'  onClick={() => handleCardClick(nailPolish)}>
                    <img alt={nailPolish.name} src={nailPolish.image_link} />
                   <h2>{nailPolish.brand}</h2>
                   <h3>{nailPolish.name}</h3>
                   <h3>{nailPolish.category}</h3>
                   <p>{nailPolish.price_sign} {nailPolish.price}</p>
                   <div className='color-container'>
                       {nailPolish.product_colors.map((color,idx)=>(
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

export default NailPolish;