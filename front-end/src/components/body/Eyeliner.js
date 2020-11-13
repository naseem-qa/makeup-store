import React,{useEffect, useState, useContext} from 'react';
import superagent from 'superagent';
import { ModelContext } from '../context';
import {If,Then} from '../If'
import Modal from '../modal';

function ColorCircle(props){
    return(
        <span style={{width:"20px", height:"20px", backgroundColor:props.color, borderRadius:"50%"}}></span>
    )
}

function Eyeliner(props) {
    const context = useContext( ModelContext);
    const [eyelinerData, setEyelinerDatat] = useState([]);
    const getData= ()=>{
        superagent.get('http://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeliner')
        .then(response =>{
            console.log(response.body)
            setEyelinerDatat(response.body)
        })
    }
        

    const handleCardClick =(oneEyeliner) =>{
        context.setModalData(oneEyeliner);
        context.setShowModal(true) 
    }
    useEffect(()=>{
        getData();
    },[])
    return (
        <section className='blush card-container' >
        {eyelinerData.map((eyeliner,index) => (
            <div key={index} className="card" onClick={() => handleCardClick(eyeliner)}>
                <img  alt={eyeliner.name} src={eyeliner.image_link} />
                <h2>{eyeliner.brand}</h2>
                <h3>{eyeliner.name}</h3>
                <h3>{eyeliner.category}</h3>
                <p>{eyeliner.price_sign} {eyeliner.price}</p>
                <div className='color-container'>
                {eyeliner.product_colors.map((color,idx)=>(
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

export default Eyeliner;