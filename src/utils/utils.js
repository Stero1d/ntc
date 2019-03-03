export const DaysOfMonth =(year, month) => {//Определение колличества дней в месяце(месяц начинается с 0)
    Date.prototype.daysInMonth = function() {
        return 32 - new Date(year, month, 32).getDate();
    };

    return new Date().daysInMonth();
};

export const FormateDate = (oldDate, isDisabledTime) => {//Приводит к нормальному виду дату
    if (oldDate) {
        let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        if(isDisabledTime) {
            options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        }
        let newDate = oldDate.toLocaleString('en-GB', options).replace(/\/+/g, '.');
        return newDate.replace(/,+/g, '  ')
    }
};

export const ConvertBase64File = (file, callback) => { //Конвертер в base64 изображения
    let reader = new FileReader();
    const convertCallback = (e) => {
        callback(e.target.result);
        reader.removeEventListener("loadend", convertCallback);
    };

    reader.addEventListener("loadend", convertCallback);
    reader.readAsDataURL(file);
};

export const getCloneObject = (object) => { //Клонирование объекта
    return JSON.parse(JSON.stringify(object))
};

export const getLang = () => {//Определение предпочитаемого языка
    const lang = (navigator.language || navigator.userLanguage).split('-')[0].toUpperCase();
    return lang !== 'RU' && lang !== 'EN' ? 'EN' : lang
};

export const isAutoFocusMobile = () => {//Определение размеров экрана и вставка автофокуса в поле(от 960)
    let isFocused = false;
    let body = document.body;
    let width = 0;
    if(body) {
        width = body.offsetWidth;
        if(width > 960) {
            isFocused = true;
        }
    }

    return isFocused
};

export const sortField = (sortField, direction) => {//Сортировка объекта(Принимает поле по которому идет сортировка и направление)
    let sortOrder = -1;
    if(direction) {
        sortOrder = 1;
        sortField = sortField.substr(1);
    }
    return function (a,b) {
        let c, d;
        if(a[sortField] && b[sortField]){
            c = a[sortField];
            d = b[sortField];
        } else {
            if (a[sortField] === '') return 1;
            if (b[sortField] === '') return -1;
            c = a[sortField];
            d = b[sortField];
        }
        let result = (c === null)-(d === null) || +(c > d)||-(c < d);
        return result * sortOrder;
    }
};