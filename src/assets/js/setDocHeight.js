function setDocHeight() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);
    };

addEventListener('resize', setDocHeight);
addEventListener('orientationchange', setDocHeight);
