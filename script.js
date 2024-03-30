





function loco(){
    gsap.registerPlugin(ScrollTrigger);


// --- SETUP START ---
// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, {duration: 0, disableLerp: true}) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.defaults({ scroller: "#main" });
// --- SETUP END ---






// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
 
loco()
// dk


function navAnimation(){
  document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector(".nav");
    const navHome = document.querySelector(".nav-home");
    const navTop = document.querySelector(".nav-top");
    const navItems = document.querySelector(".nav-items");
    const icon = document.querySelector(".hamburger i");
  
    let isOpen = false;
  
    // Setting the initial state for the elements
    gsap.set(nav, { height: "60px" });
    gsap.set(navTop, { opacity: 0, scale: 0.9, display: "none" });
    gsap.set(navItems, { opacity: 1, display: "flex" });
    gsap.set(navHome, { flexGrow: 0 });
  
    navHome.addEventListener("click", function () {
      if (!isOpen) {
        gsap.to(nav, {
          height: "370px",
          duration: 0.75,
          ease: "power4.inOut",
          immediateRender: false,
        });
  
        gsap.to(navTop, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          onStart: function () {
            gsap.set(navTop, { display: "block" });
          },
          delay: 0.5,
          immediateRender: false,
        });
  
        gsap.to(navItems, {
          opacity: 0,
          duration: 0.1,
          onComplete: function () {
            gsap.set(navItems, { display: "none" });
          },
          immediateRender: false,
        });
  
        gsap.to(navHome, {
          flexGrow: 1,
          duration: 0.2,
          ease: "power4.inOut",
          delay: 0,
          immediateRender: false,
          onComplete: function () {
            icon.className = "ph-light ph-x";
          },
        });
      } else {
        gsap.to(nav, {
          height: "60px",
          duration: 0.75,
          ease: "power4.inOut",
          delay: 0.2,
          immediateRender: false,
        });
  
        gsap.to(navTop, {
          opacity: 0,
          scale: 0.9,
          duration: 0.2,
          onComplete: function () {
            gsap.set(navTop, { display: "none" });
          },
          immediateRender: false,
        });
  
        gsap.to(navHome, {
          flexGrow: 0,
          duration: 0.2,
          ease: "power4.inOut",
          immediateRender: false,
          onComplete: function () {
            icon.className = "ph-light ph-list";
          },
        });
  
        gsap.to(navItems, {
          opacity: 1,
          duration: 0.2,
          onStart: function () {
            gsap.set(navItems, { display: "flex" });
          },
          delay: 0.5,
          immediateRender: false,
        });
      }
      isOpen = !isOpen;
    });
  });
  
  
}

navAnimation()
