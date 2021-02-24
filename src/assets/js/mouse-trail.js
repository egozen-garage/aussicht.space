

document.addEventListener("mousemove", e=> {
gsap.to(".cursor-follower", {
    x : e.clientX,
    y : e.clientY,
    duration: 1,
    stagger : {
    from: 7,
    each: 0.05,
    }
})
})

document.addEventListener("touchmove", e=> {
gsap.to(".cursor-follower", {
    x : e.changedTouches[0].clientX,
    y : e.changedTouches[0].clientY,
    duration: 3,
    stagger : {
    from: 7,
    each: 0.05,
    }
})
})
