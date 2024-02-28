import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import Button from 'components/button';

import {ReactComponent as Logo} from 'assets/img/logo-r.svg';

import './styles.scss';

// js source https://codepen.io/moklick/pen/zKleC

const Application = (() => {
  let canvas, ctx, imgData, pix, WIDTH, HEIGHT;
  const flickering = () => {
    for (let i = 0; i < pix.length; i += 4) {
      const color = Math.random() * 255 + 50;

      pix[i] = color;
      pix[i + 1] = color;
      pix[i + 2] = color;
    }

    ctx.putImageData(imgData, 0, 0);
  };

  const init = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = WIDTH = 700;
    canvas.height = HEIGHT = 500;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fill();
    imgData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    pix = imgData.data;
    setInterval(flickering, 30);
  };

  return {init};
})();
const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Application.init();
  }, []);

  return (
    <div className='not-found-container'>
      <div className='box'>
        <Logo className='logo' alt='logo' />
        <h1 className='main-text'>404</h1>
        <div className='typewriter-container'>Requested page does not exist<div className='typewriter-border'></div></div>
        <div className='frame'>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
        </div>
        <canvas id='canvas'></canvas>
        <Button
          text='Back to homepage'
          onClick={() => navigate('/')}
          background='light'
          noHover
        />
      </div>
    </div>
  );
};

export default NotFoundPage;