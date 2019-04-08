export function getColor() {
  let colors = [
    {
      className: 'colorPurple',
      gradientClass: 'colorPurpleGradient',
      color: '#8114fb',
      gradient1: 'linear-gradient(0deg, rgb(129,20,251) 0%, rgb(164,85,255) 100%);',
      gradient2: 'linear-gradient(0deg, rgb(164,85,255) 0%, rgb(129,20,251) 100%);'
    },
    {
      className: 'colorPink',
      gradientClass: 'colorPinkGradient',
      color: '#f3306c',
      gradient1: 'linear-gradient(0deg, rgb(243, 48, 108) 0%, rgb(255,93,143) 100%);',
      gradient2: 'linear-gradient(0deg, rgb(164,85,255) 0%, rgb(243, 48, 108) 100%);'
    },
    {
      className: 'colorGreen',
      gradientClass: 'colorGreenGradient',
      color: '#0cac00',
      gradient1: 'linear-gradient(0deg, rgb(12, 172, 0) 0%, rgb(90, 204, 82) 100%);',
      gradient2: 'linear-gradient(0deg, rgb(90, 204, 82) 0%, rgb(12, 172, 0) 100%);'
    },
    {
      className: 'colorBlue',
      gradientClass: 'colorBlueGradient',
      color: '#049ff9',
      gradient1: 'linear-gradient(0deg, rgb(4, 159, 249) 0%, rgb(105, 200, 255) 100%);',
      gradient2: 'linear-gradient(0deg, rgb(105, 200, 255) 0%, rgb(4, 159, 249) 100%);'
    },
    {
      className: 'colorOrange',
      gradientClass: 'colorOrangeGradient',
      color: '#f97705',
      gradient1: 'linear-gradient(0deg, rgb(249, 119, 5) 0%, rgb(255, 160, 76) 100%);',
      gradient2: 'linear-gradient(0deg, rgb(255, 160, 76) 0%, rgb(249, 119, 5) 100%);'
    },
    {
      className: 'colorCyan',
      gradientClass: 'colorCyanGradient',
      color: '#1bcda9',
      gradient1: 'linear-gradient(0deg, rgb(27, 205, 169) 0%, rgb(65, 249, 213) 100%);',
      gradient2: 'linear-gradient(0deg, rgb(65, 249, 213) 0%, rgb(27, 205, 169) 100%);'
    }
  ];

  let length = colors.length - 1;

  let current = getRandomInt(0, length);

  return colors[current];

}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
