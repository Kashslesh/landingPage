'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const message = document.createElement('div');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');


const openModal = function (e) {
  e.preventDefault();  
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// cookies ajouté

message.classList.add('cookie-message');
message.innerHTML = 'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Gor it!</button>';
header.append(message);
document.querySelector('.btn--close-cookie').addEventListener('click', function(){
    message.parentElement.removeChild(message);
});

// style
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(message.style.color);
console.log(message.style.backgroundColor);


console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10)+ 30+ 'px';
// console.log(message);


document.documentElement.style.setProperty('--color-primary', 'green');

// Scrolling

btnScrollTo.addEventListener('click',function(e){
    e.preventDefault();
    const s1coords = section1.getBoundingClientRect();

    // version old school
    // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

     // version modern
    // window.scrollTo({
    //     left:s1coords.left + window.pageXOffset, 
    //     top: s1coords.top + window.pageYOffset,
    //     behavior: 'smooth',
    // });


    //dernier version
    
    section1.scrollIntoView({behavior : 'smooth'});
});

// Le page de navigation
// scrolling de navigation

// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({behavior : 'smooth'});
//   });
// });
document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();

  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior : 'smooth'});
  }
})


// Tabbed component


console.log(tabs,tabsContainer,tabsContent);

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  
  // guard clause
  if(!clicked) return;
  
  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content => content.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');

})

// Menu fade animation
const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav')
    .querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(sib=> {
      if(sib !== link) sib.style.opacity = this;
    });
    logo.style.opacity = this;
  };
};
nav.addEventListener('mouseover', handleHover.bind(0.5))

nav.addEventListener('mouseout', handleHover.bind(1))

// Stucky navigation

// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function(){
//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// })

const navHeight = nav.getBoundingClientRect().height;



const styckyNav = function(entries){
  const [entry] = entries;
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky')
} 


const headerObserver = new IntersectionObserver(styckyNav, {
  root:null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);


// Reveal sections 
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer){

  const [entry]= entries;
  // console.log(entry);

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
   observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


// lasy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg , {

  root: null,
  threshold: 0,
  rootMargin: '200px',
}
);
imgTargets.forEach(img=>imgObserver.observe(img));

// slider
const slider = function(){


const slides = document.querySelectorAll('.slide');
const btnRight =  document.querySelector('.slider__btn--right');
const btnLeft =  document.querySelector('.slider__btn--left');
let currentSlide = 0;
const maxSlide = slides.length;
// slider.style.overflow = 'hidden';
const dotContainer = document.querySelector('.dots');

// la fonction pour  le slider
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

//  slide  Suivant
const nextSLide = function(){
  if(currentSlide === maxSlide - 1 ){
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
  
}
//  slide précédent
const prevSlide = function(){
  if(currentSlide === 0){
    currentSlide = maxSlide - 1;
  }else {
    currentSlide--;
  }
  goToSlide(currentSlide)
  activateDot(currentSlide);
}

// dots
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot=> dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};


// initilitation
const init = function(){
  goToSlide(0);
  createDots();
  activateDot(0);
};
init()

//  event handler
btnRight.addEventListener('click', nextSLide)
btnLeft.addEventListener('click', prevSlide)
document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowLeft') prevSlide();
  e.key ==='ArrowRight' && nextSLide();
});
dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
})
};
slider();



