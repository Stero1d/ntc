/**
 * Created by smalkov on 14.09.2018.
 */
import axios from "axios";

export const fetchData = (api, data, functionReducer) => {
    let d = axios({
        method: "post",
        url: window.location.origin + '/api/' + api,
        data: data,
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        }
    })
        .then(response => {
            let { data } = response;
            if(data) {
                setTimeout(() => {
                    functionReducer(data);
                }, 200)
            }
        })
        .catch(error => {
            const {response} = error;
            const errorMessage = response && response.data && response.data.message || "Сервер недоступен";
            setTimeout(() => {
                functionReducer([]);
            }, 3000);
            return {
                errorMessage: errorMessage
            }
        });
    return (d)

};

export const regAuthUser = (api, data, functionReducer, isReg) => {
    let d = axios({
        method: "post",
        url: window.location.origin + '/api/' + api,
        data: data
    })
        .then(response => {
            if(isReg) {
                functionReducer(response);
            } else {
                functionReducer(response)
            }
        })
        .catch(error => {
            const {response} = error;
            const errorMessage = response && response.data && response.data.message || "Сервер недоступен";
                functionReducer(response);
            return {
                errorMessage: errorMessage
            }
        });
    return (d)

};

export const fetchDataGet = (api, parameters, functionReducer) => {
    let url = "?";
    Object.keys(parameters).forEach(key => {
        if (url.length > 1)
            url += "&";
        url += key + "=" + parameters[key];
    });

    let d = axios({
        method: "get",
        url: window.location.origin + '/api/' + api + url
    })
        .then(response => {
            let { data } = response;
            if(data) {
                setTimeout(() => {
                    functionReducer(data);
                }, 200)
            }
        })
        .catch(error => {
            const {response} = error;
            const errorMessage = response && response.data && response.data.message || "Сервер недоступен";
            setTimeout(() => {
                functionReducer([]);
            }, 3000);
            return {
                errorMessage: errorMessage
            }
        });
    return (d);
};

export const uploadFile = (api, file, functionReducer) => {
    const formData = new FormData();
    formData.append('data', file);
    let d = axios.post(window.location.origin + '/api/' + api, formData, {
        headers: {
            "Content-Type": "multipart/form-data;charset=UTF-8",
        }
    })
    .then(response => {
        let { data } = response;
        if(data) {
            setTimeout(() => {
                functionReducer(data);
            }, 200)
        }
    })
    .catch(error => {
        const {response} = error;
        const errorMessage = response && response.data && response.data.message || "Сервер недоступен";
        setTimeout(() => {
            functionReducer([]);
        }, 3000);
        return {
            errorMessage: errorMessage
        }
    });

    return (d);
};

