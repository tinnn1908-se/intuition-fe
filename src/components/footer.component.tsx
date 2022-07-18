import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/footer.style.scss'

const Footer = () => {

    const [scrollBtnToggle, setScrollBtnToggle] = useState<Boolean>(false);

    async function onClickHandler(event: React.MouseEvent) {
        const scrollButton = document.getElementById('scrollToTopBtn');
        if (event.currentTarget.getAttribute('id') === 'scrollToTopBtn') {
            if (scrollBtnToggle) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
                if (scrollButton) {
                    scrollButton.style.transform = "rotate(180deg)";
                }
                setScrollBtnToggle(!scrollBtnToggle);
            } else {
                window.scrollTo({
                    top: 5224,
                    behavior: 'smooth',
                });
                if (scrollButton) {
                    scrollButton.style.transform = "rotate(360deg)";
                }
                setScrollBtnToggle(!scrollBtnToggle);
            }
        }
    }

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 812) {
            setScrollBtnToggle(true);
            const scrollButton = document.getElementById('scrollToTopBtn');
            if (scrollButton) {
                scrollButton.style.transform = "rotate(180deg)";
            }
        } else {
            setScrollBtnToggle(false);
            const scrollButton = document.getElementById('scrollToTopBtn');
            if (scrollButton) {
                scrollButton.style.transform = "rotate(360deg)";
            }
        }
    })

    return (
        <div className='footer'>
            <div className='footer__container'>
                <div className='footer__container__sectionOne'>
                    <p>Fashion brand founded in 2021 <br />
                        Address : 6119 S Overlook TRL, Springfield, Missouri 65810 <br />
                        Phone Number : (+1) 417-379-6168</p>
                </div>
                <div className='footer__container__sectionTwo'>
                    <p>Công ty</p>
                    <Link to="/">Home</Link>
                    <Link to="/about-us">About Us</Link>
                    <Link to="/service">Products<br />& Services</Link>
                    <Link to="/team">Teams</Link>
                    <Link to="#">Opportunities<br />& Career</Link>
                </div>
                <div className='footer__container__sectionThree'>
                    <p>Khác</p>
                    <Link to="/contact">Liên hệ</Link>
                    <Link to="#">Blog</Link>
                    <Link to="#">Báo giá</Link>
                    <Link to="#">Hỗ trợ trực tuyến</Link>
                </div>
                <div className='footer__container__sectionFour'>
                    <p>Yêu cầu cuộc gọi <br /> tư vấn</p>
                    <input id="phoneNumber" type="text" placeholder='SĐT của bạn' />
                    <button id='btnConsulting' >Nhận tư vấn</button>
                </div>
            </div>
            <button className='footer__container__pageUp' id='scrollToTopBtn' onClick={onClickHandler} >
                &#8595;
            </button>
            <div className='footer__copyright' >
                <p>© Developed by : tinnn1908.se@gmail.com</p>
                <Link to="#">Terms of use</Link>
                <p>|</p>
                <Link to="#">Privacy Policy</Link>
            </div>
        </div>
    )

}

export default Footer