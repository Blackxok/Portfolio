// ------------NAVIGATION MENU--------------
(() => {
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
        navMenu = document.querySelector(".nav-menu"),
        closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu() {
        navMenu.classList.add("open");
        bodyScrolliongToggle();
    }

    function hideNavMenu() {
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrolliongToggle();
    }

    function fadeOutEffect() {
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 300)
    }


    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("link-item")) {

            if (event.target.hash !== "") {
                event.preventDefault();
                const hash = event.target.hash;

                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");

                document.querySelector(hash).classList.add("active");
                document.querySelector(".section.active").classList.remove("hide");


                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "hover-in-shadow");

                if (navMenu.classList.contains("open")) {



                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");

                    hideNavMenu();

                } else {
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) => {
                        if (hash === item.hash) {
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }
            }
        }
    })

})
    ();






// ----------------------About section--------

(() => {
    const aboutSection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        if (
            event.target.classList.contains("tab-item") &&
            !event.target.classList.contains("active")
        ) {
            const target = event.target.getAttribute("data-target");
            tabsContainer
                .querySelector(".active")
                .classList.remove("outer-shadow", "active");
            event.target.classList.add("active", "outer-shadow");
            aboutSection
                .querySelector(".tab-content.active")
                .classList.remove("active");

            aboutSection.querySelector(target).classList.add("active");
        }
    });
})

    ();

function bodyScrolliongToggle() {
    document.body.classList.toggle("stop-scrolling");
}
// ------------------------------------------------------------
// PORTFOLIO FILTER and POPUP
// ------------------------------------------------------------


(() => {
    const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item"),
        popup = document.querySelector(".portfolio-popup"),
        prevBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = document.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    //  filter portfolio items
    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") &&
            !event.target.classList.contains("active")) {
            // deactivate existing active 'filter-item'
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            // active new filter item 
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item) => {

                if (target === item.getAttribute("data-category") || target === 'all') {
                    item.classList.remove("hide");
                    item.classList.add("show");
                } else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }

    })

    portfolioItemContainer.addEventListener("click", (event) => {
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner").
                parentElement;
            // get the portfolio item index
            itemIndex = Array.from(portfolioItem.parentElement.children)
                .indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex]
                .querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            // covert screen shots
            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            } else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", () => {
        popupToggle();

        if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle();
        }
    })


    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrolliongToggle();
    }

    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        // activaet loader
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            //    deactivate loader
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML =
            (slideIndex + 1) + " of " + screenshots.length
    }

    // next slide
    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        popupSlideshow();
    })

    //prev slide 
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length - 1
        } else {
            slideIndex--;
        }
        popupSlideshow();
    })

    function popupDetails() {
        // if portfolio item details not exists
        if (!portfolioItems[itemIndex]
            .querySelector(".portfolio-item-details")) {
            projectDetailsBtn.style.display = "none";
            return; //end function
        }
        projectDetailsBtn.style.display = "block";

        // get the project details
        const details = portfolioItems[itemIndex]
            .querySelector(".portfolio-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        const title = portfolioItems[itemIndex]
            .querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category")
            .innerHTML = category.split("-").join("  ");
    }

    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })

    function popupDetailsToggle() {
        if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
            projectDetailsBtn.querySelector(".plus").classList.remove("fa-minus");
            projectDetailsBtn.querySelector(".plus").classList.add("fa-plus");
        } else {
            projectDetailsBtn.querySelector(".plus").classList.remove("fa-plus");
            projectDetailsBtn.querySelector(".plus").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight =
                projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }

})();

//---------- HIDE ALL SECTIONS-(STOP SCROLL)----------- 

// (() => {
//     const sections = document.querySelectorAll(".section");
//     sections.forEach((section) => {
//         if (!section.classList.contains("active")) {
//             section.classList.add("hide");
//         }
//     })
// })
//     ();

// ---------------up sroll-------------
// const Upscroll = document.querySelector(".Upbtn");

// function upscroll() {
//     document.querySelector(".bhome").classList.add("Up")
//     if () {

//     }
// }


// SCROOL UP -----------
const offset = 100;
const scrollUp = document.querySelector(".scroll-up");
const scrollUpSvgPath = document.querySelector(".scroll-up_svg-path");
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollUpSvgPath.style.transition = `stroke-dashoffset 20ms`;

const getTop = () => window.pageYOffset || document.documentElement.scrollTop

//updateDashoffset
const updateDashoffset = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const dashoffset = pathLength - (getTop() * pathLength / height);

    scrollUpSvgPath.style.strokeDashoffset = dashoffset;
};

// onScroll
window.addEventListener('scroll', () => {
    updateDashoffset();

    if (getTop() > offset) {
        scrollUp.classList.add('scroll-up_active')
    } else {
        scrollUp.classList.remove('scroll-up_active')
    }
});
// click
scrollUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})

// HEADER 2
// window.addEventListener("scroll", () => {
//     document.querySelector(".header2").classList.add("scr");
//     setTimeout(() => {
//         document.querySelector(".header2").classList.remove("scr");
//     }, 5000);
// })

window.addEventListener("scroll", () => {
    if (window.scrollY > 0.1) {
        document.querySelector(".header2").classList.add("scrl");
    } else {
        document.querySelector(".header2").classList.remove("scrl");
    }
});
