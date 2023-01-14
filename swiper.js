const deviceTypes = new DeviceTypes();

// Slider's properties.
let slideQuantity = 3; // Default.
let slideRightMargin = 15 // px.

// Devices responsivness.
if (deviceTypes.lg) slideQuantity = 3; // Desktop.
if (deviceTypes.md) slideQuantity = 2; // Tablets.
if (deviceTypes.sm) { // Mobiles.
    slideQuantity = 1;
    slideRightMargin = 0; 
}

// Initialize objects.
const grabElements = new GrabElements();
const addEvents = new AddEvents();
const sliderStyles = new SliderStyles();

function SliderStyles() {
    const container = document.querySelector('.slider-owerflow-hidden')
        .getBoundingClientRect();

    // Calculate each slide width.
    let eachSlideWidth = () => {
        return (container.width / slideQuantity) - (slideRightMargin / 2);     
    }

    // Set width for each slide.
    grabElements.slides.forEach((slide) => {
        slide.style.width = `${eachSlideWidth()}px`;
        slide.style.marginRight = `${slideRightMargin}px`;

        // Remove a drag effect on the image if a slide contains it.
        imgInSlide = slide.querySelector('img');
        if (imgInSlide) {
           imgInSlide.addEventListener('dragstart', (e) => e.preventDefault()); 
        }
        
    });

    Object.defineProperty(SliderStyles.prototype,'eachSlideWidth', {
        get: () => {
            return Math.round(eachSlideWidth())
        }     
    });
}

// Add events to sliders.
function AddEvents() {

    // Check arrows existens.
    const checkArrows = () => {
        const arrows = document.querySelector('.slider-arrows');
        if (arrows) {
            return true;
        } else {
            return false;
        }
    }

    // Add events.
    const addEventsToTarge = (target) => {
        // Slider transition object.
        const st = new SliderTransition();

        // Save current slider.
        st.currentSlider = target;

        // Touch Events.
        target.addEventListener('touchstart', st.startMove);
        target.addEventListener('touchmove', st.moving);
        target.addEventListener('touchend', st.endMove);

        // Mouse Events.
        target.addEventListener('mousedown', st.startMove);
        target.addEventListener('mouseup', st.endMove);
        target.addEventListener('mouseleave', st.endMove);
        target.addEventListener('mousemove', st.moving);

        // Grab slider's left & right arrows.
        const sliderArrows = () => {
            // Left.
            const leftArrow = target.parentElement.parentElement
                .previousElementSibling.children[0];
            
            // Right.
            const rightArrow = target.parentElement.parentElement
                .nextElementSibling.children[0];
            
            return {
                'left': leftArrow,
                'right': rightArrow
            }
        }

        // Add click event on to the arrows.
        if (deviceTypes.lg && checkArrows()) {
            // Grabb all arrows.
            const arrows = sliderArrows();
            // Left arrow.
            if (arrows.left) {
                arrows.left.addEventListener('click', st.arrowMove(arrows.left.id));
            }
            // Right arrow.
            if (arrows.right) {
                arrows.right.addEventListener('click', st.arrowMove(arrows.right.id));
            }          
        }
    }

    // Events for slider.
    grabElements.sliders.forEach((slider) => {
        addEventsToTarge(slider);
    });
}

function GrabElements() {
    const sliders = Array.from(document.querySelectorAll('.slides-container'));
    const slides = Array.from(document.querySelectorAll('.slide'));

    Object.defineProperties(GrabElements.prototype, {
        'sliders': {
            get: () => {
                return sliders;
            }
        },
        'slides': {
            get: () => {
                return slides;
            }
        }
    });
}

function DeviceTypes() {
    let lg = false;
    let md = false;
    let sm = false;

    // Determine device types.
    const winWidth = window.innerWidth;

    Object.defineProperties(DeviceTypes.prototype, {
        'lg': {
            get: () => {
                return lg;
            }
        },
        'md': {
            get: () => {
                return md;
            }
        },
        'sm': {
            get: () => {
                return sm;
            }
        }
    });
    
    if (winWidth < 768) {
        sm = true;
        return sm;
    } else if (winWidth > 768 && winWidth < 992) {
        md = true;
        return md;
    } else if (winWidth >= 992) {
        lg = true;
        return lg;
    } else {
        return false;
    }

}

// Make slider transition.
function SliderTransition() {
    let isMoving = false;
    let animationID = 0;
    let startPosition = 0;
    let prevTranslate = 0;
    let currentTranslate = 0;
    let currentSlider = '';
    let sliderMovedBy = 0;
    let currentIndex = 0;
    let arrow = false;
    let arrowID = '';

    Object.defineProperties(this, {
        'startMove': {
            get: () => {
                return startMove;
            }
        },
        'moving': {
            get: () => {
                return moving;
            }
        },
        'endMove': {
            get: () => {
                return endMove;
            }
        },
        'arrowMove': {
            get: () => {
                return arrowMove;
            }
        },
        'currentSlider': {
            set: (slider) => {
                return currentSlider = slider;
            }
        }
    });

    const startMove = (event) => {
        isMoving = true;
        startPosition = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        currentSlider.classList.add('grabbing');
    }

    const moving = (event) => {
        if (isMoving && !arrow) {
            sliderMovedBy = movedBy(event);
        }
    }

    const endMove = () => {
        cancelAnimationFrame(animationID);
        isMoving = false;

        if (currentSlider != '') {
            currentSlider.classList.remove('grabbing');
            endTransition(getBoundaries(this).left, getBoundaries(this).right);
        }
        sliderMovedBy = prevTranslate;
    }

    const arrowMove = (id) => {
        return (event) => {
            event.preventDefault();
            arrowID = id;
            isMoving = true; 
            arrowAnimation();
            return false;
        }
    }

    const arrowAnimation = () => {
        arrow = true;
        if (isMoving) {
            currentSlider.classList.add('grabbing');
            // Move left.
            if (arrowID == 'left') {
                currentTranslate -= 25;
                setSliderPosition();

                if (currentTranslate <= prevTranslate - sliderStyles.eachSlideWidth) {
                    sliderMovedBy = currentTranslate;
                    endMove();
                    return;
                }

            }           
            // Move right.
            if (arrowID == 'right') {
                currentTranslate += 25;
                setSliderPosition();

                if (currentTranslate >= prevTranslate + sliderStyles.eachSlideWidth) {
                    sliderMovedBy = currentTranslate;
                    endMove();
                    return;
                }
            };                
        }
        animationID = requestAnimationFrame(arrowAnimation);
    }

    const getPositionX = (event) => {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    const animation = () => {
        setSliderPosition();
        if(isMoving) requestAnimationFrame(animation);
    }

    const movedBy = (event) => {
        let currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPosition;
        return currentTranslate;
    }

    const endTransition = (leftBoundary, rightBoundary) => {
        checkBoundaries(leftBoundary, rightBoundary);
        currentTranslate = currentIndex *
            -(sliderStyles.eachSlideWidth + slideRightMargin);
        setSliderPosition();
        startPosition = 0;
        prevTranslate = currentTranslate;
        arrow = false;
    }
    
    const getBoundaries = () => {    
        let style = window.getComputedStyle(currentSlider);
        let matrix = new DOMMatrixReadOnly(style.transform);
        let leftBoundary = matrix.m41;
        let rightBoundary = currentSlider.offsetWidth - currentSlider.parentElement.offsetWidth;
     
        return {
            'left': leftBoundary,
            'right': rightBoundary
        }
    }

    const checkBoundaries = (leftBoundary, rightBoundary) => {   
        // Check left boundary.
        if (leftBoundary >= 0) {
            currentTranslate = 0;
            return;
        }

        // Check right boundary.
        if (leftBoundary <= -rightBoundary) {
            currentTranslate = -rightBoundary;
            return;
        }

        // Move one more slide.
        moveBySlide();
    }

    const moveBySlide = () => {     
        // Move left.
        if ((sliderMovedBy - prevTranslate) < -100) {
            currentIndex += 1;
        }

        // Move right.
        if ((sliderMovedBy - prevTranslate) > 100) {
            currentIndex -= 1;
        }              
    }

    const setSliderPosition = () => {
        currentSlider.style.transform = `translateX(${currentTranslate}px)`;
    }   
}
