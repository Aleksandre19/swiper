<h1 align="center">Swiper - Javascript Slider</h1>
This is a Javascript slider written with a Obeject Oriented Programming style and it can be used at the multiple place in the same webpage. The swiper is also responsive to the devices. 

- [Demo](https://aleksandre19.github.io/swiper/)

<h2 align="center"><img src="images/general/mockup.gif" width="100%" alt='Diasfero Mockup GIF'></h2>

##### Features:
- Responsiveness:
    - Small devices - < 768px.
    - Tablet devices >= 768px.
    - Desktop devices >= 992px.
- Configurable amount of the slides per devices.
    - Default one slide on a mobile devices.
    - Default two slides on a tablet devices.
    - Default three slide on a desktop devices.
- Configurable right margin of the slide.
    - Default is 15px.
##### Integrate on your webpage.

To integrate the swiper in to your webpage you will need only two files:
- swiper.js
- styles/swiper.css

The swiper.js needs to be linked in the end of the page before the closing ```</body>``` element.

##### Configuration:
- Amount of slides per device types:
    - In the swiper.js on the line 8, 9 and 10 change a values of the ```slideQuantity``` variable according to the device types (See a comments for a device types).
    - If you want to change default amount of the slides then in the swiper.js on the line 3 change a value to the ```slideQuantity``` variable.
- Right margin:
    - In the swiper.js on the line 5 change a value to the ```slideRightMargin``` variable.
##### Important to know!
The script supports the following HTML structure:
- Slider container's wrapper MUST have a ```slider-owerflow-hidden``` class name.
- Slides container MUST have a ```slides-container```class name.
- Each slide container MUST have a ```slide```class name.
- If you use a left & right arrow switcher than each arrow 'a' element MUST have a ```slider-arrows```class name.
- You can restyle the swiper as you wish but important is to keep a following HTML structure and class names:
- ###### HTML Without arrow switchers:
```
<div class="slider-owerflow-hidden">
    <div class="slides-container">

        <div class="slide">
            Slide 1
        </div>

        <div class="slide">
            Slide 2
        </div>

        <div class="slide">
            Slide 3
        </div>

        ...
    </div>
</div>
```
- ###### HTML With arrow switchers:
```
<div class="arrows-container">
    <a href="#" class="slider-arrows">
        Left Arrow
    </a>
</div>

<div class="slider-owerflow-hidden">
    <div class="slides-container">

        <div class="slide">
            Slide 1
        </div>

        <div class="slide">
            Slide 2
        </div>

        <div class="slide">
            Slide 3
        </div>

        ...
    </div>
</div>

<div class="arrows-container">
    <a href="#" class="slider-arrows">
        Right Arrow
    </a>
</div>
```

###### Caming in future:
In the future there will be added a function which opens a original image in to the pop up window.

</br>
</br>

[Source of the inspiration](https://youtu.be/5bxFSOA5JYo)