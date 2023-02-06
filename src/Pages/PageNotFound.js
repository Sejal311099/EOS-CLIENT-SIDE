import React from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Container } from 'reactstrap'
import NF from '../Assets/Images/404Img.jpg'
const PageNotFound = () => {
    const navigate = useNavigate();

    function HandleHomeBtn(){
        navigate("/") 
    }
    
    return (        
        <>
            <Container>
                <div>
                    <img className='nft_page_img' src={NF}/>
                </div>
                <div className='home_right'>                  
                    <button type="button" className=" btn btn-success btn btn-outline mr-sm-2 cstmhover" onClick={HandleHomeBtn}>Home </button>
                </div>
            </Container>
        </>
    )
}

export default PageNotFound