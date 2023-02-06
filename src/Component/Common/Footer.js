import React from 'react'
import IconsTwitter from '../../Assets/Icons/iconsTwitter.svg'
import IconsTelephone from '../../Assets/Icons/telephone.svg'
import EnvelopeFillIcon from '../../Assets/Icons/envelopeFill.svg'
import EosLogo from '../../Assets/Logo/eos2logo.png'
import IconsInstagram from '../../Assets/Icons/iconsInstagram.svg'
import IconsFacebook from '../../Assets/Icons/iconsFacebook.svg'
import GetAltFillIcon from '../../Assets/Icons/getAltFill.svg'
import SendFillIcon from '../../Assets/Icons/sendFill.svg'


const Footer = () => {
    return (
        <>
            <footer className="footer-32892 pb-0">
                <div className="site-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md pr-md-5 mb-4 mb-md-0">
                                <h2>Have a Questions?</h2>
                                <ul className="list-unstyled quick-info mb-4">
                                    <li><a href="tel:+91 884986 2403" className="d-flex align-items-center"><span className="icon mr-3 icon-phone"><img src={GetAltFillIcon} /></span>Surat, Gujrat - 394210</a></li>

                                    <li><a href="tel:+91 884986 2403" className="d-flex align-items-center"><span className="icon mr-3 icon-phone"><img src={IconsTelephone} /></span> +91 884986 2403</a></li>
                                    
                                    <li><a href="#" className="d-flex align-items-center"><span className="icon mr-3 icon-envelope"><img src={SendFillIcon} /></span>
                                        easyonservices.info@gmail.com</a></li>
                                </ul>
                                <form action="#" className="subscribe">
                                    <input type="text" className="form-control" placeholder="Enter your e-mail" />
                                    <input type="submit" className="btn btn-submit" value="Send" />
                                </form>
                            </div>
                            <div className="col-md pr-md-5 mb-4 mb-md-0">
                            <h2>About Us</h2>
                                <p className="mb-4 text-justify">
                                    Focused on excellence for our clients, we are well established,
                                    with a reputation for great service and 
                                    high-quality finish.
                                </p>
                            </div>
                            <div className="col-md mb-4 mb-md-0">
                                <h2>Find Us</h2>
                                <ul className="list-unstyled tweets">
                                    <li className="d-flex">
                                        <div className="mr-4"><img src={IconsFacebook} /></div>
                                        <div>easyonservice-facebook.com</div>
                                    </li>
                                    <li className="d-flex">
                                        <div className="mr-4"><img src={IconsTwitter} /></div>
                                        <div>easyonservice-twitter.com</div>
                                    </li>
                                    <li className="d-flex">
                                        <div className="mr-4"><img src={IconsInstagram} /></div>
                                        <div>easyonservice-instagram.com</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3 mb-4 mb-md-0">
                                <h3></h3>
                                <div className="row gallery">
                                    <div className="col-6">
                                        <a href="#"><img src="https://as2.ftcdn.net/v2/jpg/04/07/23/31/1000_F_407233108_ISoxLWU08Xb5Hd8yK9QcOcI8iSxEAcRI.jpg" alt="Image" className="img-fluid" height="100%" width="100%" /></a>
                                        {/* <a href="#"><img src="https://as2.ftcdn.net/v2/jpg/03/14/42/73/1000_F_314427362_EecCUQTVwxhOKijplzdGhYsrFlbsSLJX.jpg" alt="Image" className="img-fluid"  height="100%" width="100%"/></a> */}
                                        <a href="#"><img src="https://as2.ftcdn.net/v2/jpg/00/43/62/11/1000_F_43621114_8X1JSGa9sXBRRsRi3t8niZSbytxJLzGJ.jpg" alt="Image" className="img-fluid"  height="100%" width="100%"/></a>
                                    </div>
                                    <div className="col-6">
                                        <a href="#"><img src="https://as2.ftcdn.net/v2/jpg/00/61/47/39/1000_F_61473917_qV9KXySxtMhPxhKZMI43bPutXVU375do.jpg" alt="Image" className="img-fluid"  height="100%" width="100%" /></a>
                                        <a href="#"><img src="https://as2.ftcdn.net/v2/jpg/02/63/80/61/1000_F_263806150_HatBKt7BhHxkYwberJ9rwDF8ay5mzbH6.jpg" className="img-fluid"  height="100%" width="100%"  /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="py-5 footer-menu-wrap d-md-flex align-items-center">
                                    <ul className="list-unstyled footer-menu mr-auto">
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">About</a></li>
                                        <li><a href="#">Our works</a></li>
                                        <li><a href="#">Services</a></li>
                                        <li><a href="#">Blog</a></li>
                                        <li><a href="#">Contacts</a></li>
                                    </ul>
                                    <div className="site-logo-wrap ml-auto">
                                        <a href="#" className="site-logo">
                                            <img src={EosLogo} className="navlogo_img custm_footer" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>          
        </>
    )
}

export default Footer