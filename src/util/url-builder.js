import template from 'lodash/template';

/*
* @module config/server/url-builder
* @param url - url with params such as http://url/entity/${id}
* @param method - HTTP verb {GET, POST, PUT, DELETE}
* @return {function}
*/
export default (url, method) => {
    /**
    * Function returns by the module.
    * @param  {object} param - urlData: The JSON data to inject in the URL, data: The JSON data to give to the request.
    * @return {function} returns a function which takes the URL as parameters.
    */
    return (param) => {
        if (param == undefined) {
            param = {};
        }
        return {
            url: template(url, param.urlData),
            method: method,
            data: param.data || param.bodyData
        };
    };
};
