/**
 * Created by admin on 28.07.2017.
 */

const month = [
    "Январь", "Февраль", "Март",
    "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь",
    "Октябрь", "Ноябрь","Декабрь"];

const timeParse =() => {
    let hourse = new Date(new Date().setHours(new Date().getHours() + 1)).getHours();
    let minutes = new Date().getMinutes();
    if(hourse < 10) {
        hourse = "0" + hourse
    }

    if(minutes < 10) {
        minutes = "0" + minutes
    }

    return {
        time: hourse + ":" + minutes
    }
};

const dateParse =() => {
    let date =  new Date(new Date().setHours(new Date().getHours() + 1));
    let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    let newDate = date.toLocaleString('en-GB', options).replace(',', ' ');
    return {
        newDate: newDate
    }
};

const initState = {
    date: new Date(),
    isCheckDate: true,
    textError: ""
};

export default (state = initState, action) => {
    switch (action.type) {
        case "CHANGE_CALENDAR_DATE_PICKER_DAY":{
            let date = action.payload.date;
            return {
                ...state,
                date: action.payload.date
            }
        }
        case "CALENDAR_DATA_VALIDATION_CHECK":{
            return {
                ...state,
                isCheckDate: action.payload.isCheckDate,
                textError: action.payload.text,
            }
        }

        default:
            return state
    }

}
