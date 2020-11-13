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
function LipLiner(props) {
    const context = useContext(ModelContext);
    const [liplinerData,setLiplinerData] = useState([]);
    const getData = () =>{
        superagent.get('http://makeup-api.herokuapp.com/api/v1/products.json?product_type=lip_liner')
        .then(response=>{
            setLiplinerData(response.body)
        })
    }
    const handleCardClick =(oneLipLiner) =>{
        context.setModalData(oneLipLiner);
        context.setShowModal(true) 
    }
    useEffect(()=>{
        getData()
    },[])

    return (
      <section className='blush card-container'>
            {liplinerData.map((lipliner,index)=>(
                <div key={index} className='card'  onClick={() => handleCardClick(lipliner)}>
                    <img alt={lipliner.name} src={lipliner.image_link} />
                   <h2>{lipliner.brand}</h2>
                   <h3>{lipliner.name}</h3>
                   <h3>{lipliner.category}</h3>
                   <p>{lipliner.price_sign} {lipliner.price}</p>
                   <div className='color-container'>
                       {lipliner.product_colors.map((color,idx)=>(
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

export default LipLiner;