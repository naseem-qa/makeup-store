import React, { useState } from 'react';


export const ModelContext = React.createContext();

 
 function ModelProvider(props){
    const [modalData, setModalData] = useState({});
    const [showModal,setShowModal] = useState(false);

    const state = { 
        showModal,
        modalData,

        setShowModal,
        setModalData,
    }

    return(
        <ModelContext.Provider value={state} >
            {props.children}
        </ModelContext.Provider>
    )
}

export default ModelProvider;