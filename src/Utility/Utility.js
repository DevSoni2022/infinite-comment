const chekIfJsonOrString = (data) => {
    var ret = true;
    try {
        JSON.parse(data);
    } catch (e) {
        ret = false;
    }
    return ret;
};


const numberSuffix=(i)=> {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}


export const formatDate=(datStr, formatStr)=> {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (formatStr === 'new') {
        const date = new Date(datStr);
        const day = date.getDate();
        const dayWithSuffix = numberSuffix(date.getDate());
        const weekDay = weekdays[date.getDay()];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return {
            

            // format 4 ex--> 23rd Mar 2024
            f1: `${dayWithSuffix} ${month} ${year}`
        };
    }
    let d;
    if (typeof datStr === 'string') {
        datStr = datStr.split(' ')[0];
        d = new Date(datStr.replace(/-/g, "/"));
    } else {
        d = new Date(datStr);
    }
    if (formatStr === 'dd-mm-yy')
        return d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear();
    if (formatStr === 'dd-month-yy') {
        let dateStrArr = datStr.split('-');
        datStr = dateStrArr[1] + "-" + dateStrArr[0] + "-" + dateStrArr[2];
        d = new Date(datStr.replace(/-/g, "/"));
        return d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear();
    }
    if (formatStr === 'DD-dd-mm') {
        return weekdays[d.getDay()] + " " + d.getDate() + " " + monthNames[d.getMonth()];
    }
    if (typeof datStr === 'string') {
        d = new Date(datStr.replace(/-/g, "/"));
    } else {
        d = new Date(datStr);
    }
    return monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}


export const __localStorageSet = (key, value) => {
    let temp;
    if ((value == null) || (value == undefined)) {
        return;
    }
    if (!value || (value && typeof value == "boolean") || (value && (typeof value == 'string' || value instanceof String))) {
        temp = value;
    } else {
        temp = JSON.stringify(value);
    }
    localStorage && localStorage.setItem(key, temp);
};

export const __localStorageGet = (key) => {
    let temp = null;
    let data = null;
    if (typeof window !== 'undefined') {
        data = localStorage.getItem(key);
        if (data && typeof data == "boolean") {
            temp = data;
        } else {
            let isJSON = (data && chekIfJsonOrString(data)) || false;
            if (isJSON) {
                temp = (data && JSON.parse(data)) || null;
            } else {
                temp = data;
            }
        }
    }

    return temp;
};

export const __localStorageDel = (key) => {
    if (localStorage) {
        localStorage.removeItem(key);
    }
};