

    var ShowTimeElements = function(elements, options){
        var defaults = {

        };

        var mergeOptions = function(obj1,obj2){
            var obj3 = {};
            for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
            for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
            return obj3;
        }

        var hasClass = function(el, className) {
            if (el.classList)
                return el.classList.contains(className)
            else
                return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
        }

        var addClass = function(el, className) {
            if (el.classList)
                el.classList.add(className)
            else if (!hasClass(el, className)) el.className += " " + className
        }

        var removeClass = function(el, className) {
            if (el.classList)
                el.classList.remove(className)
            else if (hasClass(el, className)) {
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
                el.className=el.className.replace(reg, ' ')
            }
        }

        var parseAttributeTime = function(time){
            return moment(time, "HHmm");
        }

        var isBeforeNow = function(time, isNextDay){
            var dateMoment = (isNextDay)? parseAttributeTime(time).add(24, 'hours') : parseAttributeTime(time);
            return moment().isBefore(dateMoment);
        }

        var showElement = function(el){
            if(options.hideClass === undefined) el.style.display = null;
            else removeClass(el, options.hideClass);
        }

        var hideElement = function(el){
            if(options.hideClass === undefined) el.style.display = 'none';
            else addClass(el, options.hideClass);
        }

        var uppercaseArray = function(arr){
            return arr.map(function(value){
                return value.toUpperCase();
            });
        }

        var isInArray = function(arr, str){
            if(arr === null) return false;
            var obj = JSON.parse(arr);

            if(obj.length == 0)
                return false;
            else
                return (uppercaseArray(obj).indexOf(str.toUpperCase()) >= 0)? true : false;
        }

        var checkElement = function(element){
            var currentTime = moment().format('HH:mm');
            var currentDayOfWeek = moment().format('ddd');
            var currentDate = moment().format('DD-MM-YYYY');
            var startTimeAttribute = element.getAttribute('data-show-time-start');
            var endTimeAttribute = element.getAttribute('data-show-time-end');
            var showDaysAttribute = element.getAttribute('data-show-time-days');
            var showDatesAttribute = element.getAttribute('data-show-time-dates');
            var isEndDateBeforeNow = isBeforeNow(endTimeAttribute);

            var isShowDay = (isInArray(showDaysAttribute, currentDayOfWeek) || showDaysAttribute == null)? true : false;
            var isShowDate = (isInArray(showDatesAttribute, currentDate) || showDatesAttribute == null)? true : false;

            // Figure out whether end date should be today or tomorrow
            var isNextDay;
            if(parseInt(startTimeAttribute) > parseInt(endTimeAttribute))
                isNextDay = (isEndDateBeforeNow)? false : true;
            else
                isNextDay = false;

            // Determine whether this element should display.
            var shouldDisplay = (isBeforeNow(endTimeAttribute, isNextDay) && isShowDay && isShowDate)? true : false;

            // Perform Show or Hide
            if(shouldDisplay) showElement(element);
            else hideElement(element);
        }

        // Merge default options with user defined options
        var options = mergeOptions(defaults, options);

        // Loop over elements
        if(elements.length > 0){
            for (var i = 0; i < elements.length; i++) {
                checkElement(elements[i]);
            };
        }


    }
