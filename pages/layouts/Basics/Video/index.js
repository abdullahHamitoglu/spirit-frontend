import React, { Fragment, useEffect } from 'react';
import HeaderTwale from '../../../../components/headers/Header-twale';
import FooterNine from '../../../../components/footers/Footer-nine';

const Video = () => {
    useEffect(() => {
        document.documentElement.style.setProperty('--theme-deafult', '#00c2b5');
    })
    return (
        <Fragment>
            <HeaderTwale logoName={'logo.png'} />
                <video className="videoClass" autoPlay playsInline muted src={'/assets/video/2.mp4'} />
            <FooterNine />
        </Fragment>
    )
}

export default Video;