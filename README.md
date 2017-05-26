# ShowTimeElements
Javascript plugin to display elements at specific times, days or dates. Useful for hiding content outside of working hours, certain days of the week or specific dates.

## Dependancies
Date calculation and manipulation requires [moment.js](http://momentjs.com/) to work. Include this script in your document before you call `showtime.js`

## Markup
ShowTime works on any element. Just initiate the Javascript and ensure the element has show-time data attributes.

### `data-show-time-start` (required)
Specifies the start of when an element should begin on displaying.

    <div class="offer-banner" ... data-show-time-end='0800'>...</div>

### `data-show-time-end` (required)
Specifies the start of when an element should stop on displaying.

    <div class="offer-banner" ... data-show-time-end='1730'>...</div>

### `data-show-time-days`
Specifies days of the week that the element should display.

    <div class="offer-banner" ... data-show-time-days='[ "sat", "sun" ]'>...</div>

### `data-show-time-dates`
Specifies dates when the element should display.

    <div class="offer-banner" ... data-show-time-dates='[ "26-05-2017", "27-05-2017", "28-05-2017" ]'>...</div>


## Options

    ShowTimeElements(
        document.getElementsByClassName('offer-banner'),
        {
            hideClass: 'u-hide'
        }
    );
