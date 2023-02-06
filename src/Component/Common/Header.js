import React, { useEffect, useState } from 'react';
import EosLogo from '../../Assets/Logo/eos2logo.png'
import Micon from '../../Assets/Icons/shopping_cart_black_24dp.svg'
import ProfileIcon from '../../Assets/Icons/personCircle.svg'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Header.css'
import { Button, Badge } from 'reactstrap';
import { getAllAddtoCartItemStart } from '../../Redux/Actions/addToCartActions';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = sessionStorage.getItem('userId')
    
    const [flag, setflag] = useState(false)
    const [localdata, setLocaldata] = useState()
    const estdata = useSelector((state) => state?.userData?.user?.status);
    const cartData = useSelector((state) => state?.cartItems?.cartItems?.userData?.addTocarts);
  
  

    useEffect(() => {
        dispatch(getAllAddtoCartItemStart(userId));
      }, [])

    const handleLogo = (e) => {
        e.preventDefault()
        navigate('/')
    }

    const handleClickForRap = () => navigate('/register-as-professional');
    const handleClickForSignup = () => navigate('/signup');
    const handleClickForLogin = () => navigate('/login');
    const handleClickForProjectEstimation = (e) => {
        e.preventDefault();
        navigate('/project-estimation');
    }
    const handleClickForLogout = () => {
        sessionStorage.clear();
        navigate("/login")
        setflag(true)
    }
    const handlleUserProfile = () => {
        navigate("/user-profile")
    }
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand cstm_logo" href="#" onClick={handleLogo} ><img className="navlogo_img" src={EosLogo} /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link project_Estimation_cstm cstmhover ProjectEstimation" href="#" onClick={handleClickForProjectEstimation}>Project Estimation</a>

                        </li>
                    </ul>
                    <div className="form-inline my-2 my-lg-0">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item cstm_btn_space">
                                <a className="nav-link border border-primary rounded mr-sm-4 text-primary text-center cstm_phone" href="tel:+91 884986 2403">+91 884986 2403</a>
                            </li>
                            <li className="nav-item cstm_btn_space">
                                <button type="button" className="btn btn-outline mr-sm-2 cstmhover" onClick={handleClickForRap}>Register As Professional</button>
                            </li>

                            {localdata == null && estdata !== 200 && <>                                
                                <li className="nav-item cstm_btn_space">
                                    <button type="button" className="btn btn-outline mr-sm-2 cstmhover" onClick={handleClickForSignup}>Signup</button>
                                </li>
                                <li className="nav-item cstm_btn_space">
                                    <button type="button" className="btn btn-outline mr-sm-2 cstmhover" onClick={handleClickForLogin}>Login</button>
                                </li>
                            </>
                            }

                            {localdata !== null && <>
                                <li className="nav-item cstm_btn_space">
                                    <button type="button" className="btn btn-outline mr-sm-2 cstmhover" onClick={handleClickForLogout}>Logout</button>
                                </li>
                            </>}

                            <li className="nav-item cstm_btn_space">
                                <Button type="button" outline color='white' className="btn btn-outline mr-sm-2 cstmhover" onClick={() => navigate('/view-cart')}>
                                        <img src={Micon} />
                                        <Badge style={{color:'black' }} color='warning'>{userId && cartData?.length}</Badge>
                                </Button>
                            </li>
                            
                            {localdata !== null && <>
                                <li className="nav-item cstm_btn_space ">
                                    <button type="button" className="btn btn-outline mr-sm-2 cstmhover" onClick={handlleUserProfile}><img src={ProfileIcon} /></button>
                                </li>
                            </>}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header