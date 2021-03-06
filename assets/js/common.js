// let atag = document.querySelectorAll(".btn_more");

// for (let i = 0; i < atag.length; i++) {
//   atag[i].addEventListener("click", function (reset) {
//     reset.preventDefault();
//   });
// }

// Nav Menu
const menuList = document.querySelectorAll(".menu_list > li");

for (let i = 0, max = menuList.length; i < max; i++) {
  menuList[i].addEventListener("mouseenter", function (e) {
    e.target.classList.add("on");
  });

  menuList[i].addEventListener("mouseleave", function (e) {
    e.target.classList.remove("on");
  });
}

//Scroll Event

const mainHeader = document.querySelector(".header_dark");
const fadeInList = document.querySelectorAll(".fade");

let beforePosition = document.documentElement.scrollTop;

function fadeIn() {
  let afterPosition = document.documentElement.scrollTop;

  if (afterPosition > 180) {
    if (beforePosition < afterPosition) {
      mainHeader.style.top = -86 + "px";
    } else {
      mainHeader.style.top = 0 + "px";
      mainHeader.classList.add("up");
    }
  } else if (afterPosition == 0) {
    mainHeader.classList.remove("up");
  }

  beforePosition = afterPosition;

  fadeInList.forEach((menu) => {
    let distinView = menu.getBoundingClientRect().top - window.innerHeight + 20;

    if (distinView < 0) {
      menu.classList.add("fade_in");
    } else {
      menu.classList.remove("fade_in");
    }
  });
}

window.addEventListener("scroll", fadeIn);



// Slider
document.addEventListener("DOMContentLoaded", function () {
  // 변수 지정
  const slideWrap = document.querySelector(".slide_wrap"),
    slideContainer = document.querySelector(".slide_container"),
    slides = document.querySelectorAll(".slide"),
    pagerBtn = document.querySelectorAll(".pager a");

  let slideCount = slides.length,
    currentIndex = 0,
    timer = null;

  // 슬라이드 가로로 배열하기
  for (let i = 0; i < slideCount; i++) {
    slides[i].style.left = i * 100 + "%";
  }

  // 슬라이드 이동함수
  function goToSlide(idx) {
    slideContainer.classList.add("animate");
    slideContainer.style.left = -100 * idx + "%";
    currentIndex = idx;

    for (let y = 0; y < pagerBtn.length; y++) {
      pagerBtn[y].classList.remove("on");
    }
    pagerBtn[idx].classList.add("on");

    for (let s = 0; s < slideCount; s++) {
      slides[s].classList.remove("fade_in");
    }
    slides[idx].classList.add("fade_in");
  }

  goToSlide(0);

  //자동 슬라이드 함수
  function startAutoSlide() {
    timer = setInterval(function () {
      let nextIdx = (currentIndex + 1) % slideCount;

      goToSlide(nextIdx);
    }, 4500);
  }

  startAutoSlide();

  // 슬라이드 정지 함수
  function stopAutoSlide() {
    clearInterval(timer);
  }

  //slideWrap에 마우스가 들어오면 할일, 나가면 할일
  slideWrap.addEventListener("mouseenter", function () {
    stopAutoSlide();
  });

  slideWrap.addEventListener("mouseleave", function () {
    startAutoSlide();
  });

  //pager로 슬라이드 이동하기
  for (let a = 0; a < pagerBtn.length; a++) {
    pagerBtn[a].addEventListener("click", function (e) {
      e.preventDefault();
      let pagerNum = e.target.getAttribute("data-idx");
      goToSlide(pagerNum);
    });
  }
});

