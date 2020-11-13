import React, {useState, useEffect, useContext} from 'react';
import superagent from 'superagent';
import { ModelContext } from '../context';
import {If,Then} from '../If'
import Modal from '../modal';

function ColorCircle(props){
    return(
        <span style={{width:"20px", height:"20px", backgroundColor:props.color, borderRadius:"50%"}}></span>
    )
}

function Bronzer(props) {
    const context = useContext(ModelContext);
    const [bronzerData, setBronzerDatat]=useState([]);
    const getData = ()=>{
        superagent.get('http://makeup-api.herokuapp.com/api/v1/products.json?product_type=bronzer')
        .then(response =>{
            console.log(response.body)
            setBronzerDatat(response.body)
        })
    }

    const handleCardClick =(oneBronzer) =>{
        context.setModalData(oneBronzer);
        context.setShowModal(true)   
    }

    useEffect(()=>{
        getData();
    },[]);
    
    return (
        <section className='blush card-container' >
            {bronzerData.map((bronzer,index) => (
                <div key={index} className="card"
                onClick={() => handleCardClick(bronzer)}>
                    <img  alt={bronzer.name} src={bronzer.image_link} />
                    <h2>{bronzer.brand}</h2>
                    <h3>{bronzer.name}</h3>
                    <h3>{bronzer.category}</h3>
                    <p>{bronzer.price_sign} {bronzer.price}</p>
                    <div className='color-container'>
                    {bronzer.product_colors.map((color,idx)=>(
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

export default Bronzer;