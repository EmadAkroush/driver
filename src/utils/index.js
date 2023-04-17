export function debounce(fn, delay) {
    var timeoutID = null
    return function () {
        clearTimeout(timeoutID)
        var args = arguments
        var that = this
        timeoutID = setTimeout(function () {
            fn.apply(that, args)
        }, delay)
    }
}

export function numberFormatter(num) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K' // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M' // convert to M for number from > 1 million
    } else if (num > 0) {
        return num // if value < 1000, nothing to do
    }
    return '-'
}

export function parametrizer(data) {
    let params = data;
    Object.keys(params).forEach(key => params[key] === undefined ? delete params[key] : {});
    return params;
}