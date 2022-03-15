$(document).ready(function () {
  $('#autoWidth').lightSlider({
    autoWidth: true,
    loop: true,
    controls: true,
    keyPress: true,

    onSliderLoad: function () {
      $('#autoWidth').removeClass('cs-hidden');
    }
  });
});

const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  //Toggle nav
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');

    //Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ''
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index /7 + 0.4}s`

      }
    });

    //Burger animation
    burger.classList.toggle('toggle');

  });
}

const sendMail = async (mail) => {
  console.log(axios.post({ mail }));
  try {
    
     await axios.post({ mail })
  } catch (error) {
    print('An error occured')
  }
};


/**
 * Displays countdown timer
 */
const countdown = () => {
  const countDate = new Date('May 17, 2022 00:00:00').getTime()
  const now = new Date()
  const gap = countDate - now

  const second = 1000
  const minute = second * 60
  const hour = minute * 60
  const day = hour * 24

  const textDay = Math.floor(gap / day)
  const textHour = Math.floor((gap % day) / hour)
  const textMinute = Math.floor((gap % hour) / minute)
  const textSecond = Math.floor((gap % minute) / second)

  document.querySelector('.day').innerHTML = textDay
  document.querySelector('.hour').innerHTML = textHour
  document.querySelector('.minute').innerHTML = textMinute
  document.querySelector('.second').innerHTML = textSecond

}

const app = () => {
  navSlide();
  //setInterval(countdown, 1000);
}

app()