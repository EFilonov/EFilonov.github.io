'use strict'

//Slider
const slider = tns({
  container: '.slider__inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  center :true,
  controls: false,
  nav: false,
 });
document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
  });
document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
  });

const dots = document.querySelectorAll('.dots span');


dots.forEach((item, index) =>{
  item.addEventListener('click', () =>{
    dots.forEach(item => item.classList.remove('active'));
  slider.goTo(index);
  item.classList.add('active');
  });
});

//Cards flip
const cards = document.querySelectorAll('.catalog__card');
const tabButtons = document.querySelectorAll('.catalog__tab');
const cardsInner = document.querySelectorAll('.catalog__card_inner');
const frontLinks = document.querySelectorAll('.catalog__card_link_front');
const backLinks = document.querySelectorAll('.catalog__card_link_back');


function flipCard (arr){
    arr.forEach((card, index)=>{
    card.addEventListener( 'click', function(event) {
    event.preventDefault(); 
    cardsInner[index].classList.toggle('is-flipped');
   
    });
  });
}
flipCard(backLinks);
flipCard(frontLinks);

//Cards filter
cards.forEach(card => card.classList.add('active'))

tabButtons.forEach(button => {
  button.addEventListener('click', () =>{
    tabButtons.forEach(button => button.classList.remove('catalog__tab-active'));
    cards.forEach(card => card.classList.remove('active'))
    button.classList.add('catalog__tab-active');
    
    cards.forEach(card => {
      
      if (card.getAttribute('data-activity')
        .includes(button.dataset.activityBtn)){
            
          card.classList.add('active')
      }
    });
  });
});
//Modal

const consultButtons = document.querySelectorAll('button.consult_btn'),
      cardBtns = document.querySelectorAll('.button_small'),
      closeFormBtns = document.querySelectorAll('.modal__close'),
      overlay = document.querySelector('.overlay'),
      modal = document.querySelectorAll('.modal'),
      pulsmeterType = document.querySelectorAll('.catalog__card_header');


function openModal(btn, selector) {
  btn.forEach((button, index) => {
    button.addEventListener('click', () => {
      
      if (selector == 'order') {
        document.querySelector('#order .modal__subtitle').textContent = pulsmeterType[index].textContent;
      }
      overlay.style.display = 'block';
      document.getElementById(selector).style.display = 'block';
    })
  })
}
openModal(consultButtons, 'consult');
openModal(cardBtns, 'order');


function closeModal () {
    modal.forEach(elem => elem.style.display = 'none')
    overlay.style.display = 'none'
  }

function showThx(){
  setTimeout(()=>{
    document.getElementById('thanks').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
    },4000);
    
    document.getElementById('thanks').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
}


overlay.addEventListener('click', (e) => {
  if (e.target == overlay) closeModal();
  closeFormBtns.forEach(btn => {
    if (btn == e.target) closeModal();
  })
});

//form validate
function validateForm (selector) {
$(selector).validate({
  errorClass: "invalid",
  rules: {
    name:{
      required: true,
      minlength: 2
    },
    phone:{
      required: true,
      minlength: 8
    },
    email:{
      required: true,
      email: true
    }
  },
  messages: {
    name: {
      required: "Укажите ваше имя",
      minlength: jQuery.validator.format("Минимум {0} символа")
    },
    phone: {
      required: "Укажите номер телефона",
      minlength: jQuery.validator.format("Минимум {0} цифр")
    },
    email: {
      required: "Нам нужен e-mail для связи с вами",
      email: "Пример: name@domain.com"
    }
  }
});
}
validateForm('#consult .feed__form');
validateForm('.consult .feed__form');
validateForm('#order .feed__form');

// import IMask from 'imask';
// Phonemask
const phoneInputs = document.querySelectorAll('input[name="phone"]');

phoneInputs.forEach(input => {
  IMask(input, {
    mask: '+{38}(000)000-00-00',
    lazy: false,  // make placeholder always visible
    placeholderChar: '_'     // defaults to '_'
  });
  
})
// // ////
// function sendData() {
//   const XHR = new XMLHttpRequest();

//   // Bind the FormData object and the form element
//   const FD = new FormData( form );

//   // Define what happens on successful data submission
//   XHR.addEventListener( "load", function(event) {
//     // alert( event.target.responseText );
//   } );

//   // Define what happens in case of error
//   XHR.addEventListener( "error", function( event ) {
//     alert( 'Oops! Something went wrong.' );
//   } );

//   // Set up our request
//   XHR.open( "POST", "mailer/smart.php" );

//   // The data sent is what the user provided in the form
//   XHR.send( FD );
// }

// // Access the form element...
// const form = document.getElementById( "myForm" );

// // ...and take over its submit event.
// form.addEventListener( "submit", function ( event ) {
//   event.preventDefault();

//   sendData();
//   form.reset();
//   showThx();

// } );




$('form').submit(function(e){
  e.preventDefault();

  if (!$(this).valid()) {
    return;
  }

  $.ajax({
    type: "POST",
    url: 'mailer/smart.php',
    data: $(this).serialize() 
  }).done(function() {
    $(this).find('input').val("");

    $('#consult, #order').fadeOut();
    $('.overlay, #thanks').fadeIn('slow');

    $('form').trigger('reset');
  });
  return false;


});
const btnUp = {
  el: document.querySelector('.up'),
  show() {
    // удалим у кнопки класс btn-up_hide
    this.el.classList.remove('up_hide');
  },
  hide() {
    // добавим к кнопке класс btn-up_hide
    this.el.classList.add('up_hide');
  },
  addEventListener() {
    // при прокрутке содержимого страницы
    window.addEventListener('scroll', () => {
      // определяем величину прокрутки
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
      scrollY > 1400 ? this.show() : this.hide();
    });
    // при нажатии на кнопку .btn-up
    document.querySelector('.up').onclick = () => {
      // переместим в начало страницы
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}

btnUp.addEventListener();