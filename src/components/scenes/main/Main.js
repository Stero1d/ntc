/**
 * Created by smalkov on 04/09/2018.
 */
import React from "react";

/*Custom components*/
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import WorkSpaceRouting from "../../../components/workspace/WorkSpaceRouting";
/*css*/
import "./main.css";
import "../../../styles/mediaScreen(960-1920).css";
import "../../../styles/mobileScreen.css";

/**
 * Рендеринг
 */

const Main = (props) => {
    return (
        <div className="App"
             onScroll = { () => {
                 let app = document.getElementsByClassName('App')[0];
                 if (app) {
                     let scrollTop = app.scrollTop;
                     let head = document.getElementsByClassName('menu-navigation-search')[0];
                     if(head && scrollTop > 113) {
                         head.classList.add('header_fixed');
                         head.style.borderBottom = "border: 1px solid rgba(0, 0, 0, 0.1);";
                     } else{
                         head.classList.remove('header_fixed');
                         head.style.borderBottom = "";
                     }
                 }
             }}>
            <div id="main-container">
                <Header/>
                <div id="bgw" style={{background: 'url(/images/bgw.png) no-repeat center', height: '100vh',
                    width: 'calc(100% - 10px)', position: 'absolute', backgroundSize: 'cover!important'}}>
                </div>
                <div id="workspace">
                    <WorkSpaceRouting/>
                </div>
                <Footer/>
            </div>
        </div>

    )
};

export default Main;
