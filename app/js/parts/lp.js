document.addEventListener('DOMContentLoaded', () => {

    const merchiImgLonggrid = document.querySelector('.merch__section-imglonggridwrap');
    const vplayerSC = document.querySelector('.vplayer__section-container');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        merchiImgLonggrid.style.left = `-${scrollPosition}px`;
        vplayerSC.style.right = `-${scrollPosition}px`;
    });
    
});