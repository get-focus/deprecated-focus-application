
export const CLEAR_CONFIG_CONFIRM = 'Confirm: CLEAR_CONFIG_CONFIRM';
export const SET_CONFIG_CONFIRM = 'Confirm: SET_CONFIG_CONFIRM';
const CONFIRM_CONFIG_CLEAR = {isVsible: false, Content: null};


export function clearConfigConfirm(){
    return {type: CLEAR_CONFIG_CONFIRM, config: CONFIRM_CONFIG_CLEAR};
}

export function setConfigConfirm(confirmConfig){
    return {type: SET_CONFIG_CONFIRM, config: confirmConfig};
}


/**
* This function aims to have the same behaviour as JS confirm.
* @param  {string | numver | component} ContentComponent - The component to display in the conform message.
* @return {Promise}Confirm is a promise in order to be able to provide success and error callbacks.
*/
export function confirm(ContentComponent, options) {
    const {resolve, reject, ...otherProps} = options;
    return dispatch => {
        dispatch(setConfigConfirm({
            isVisible: true,
            Content: ContentComponent,
            handleCancel(err){
                dispatch(clearConfigConfirm());
                if(reject) reject(err);
            },
            handleConfirm(data){
                dispatch(clearConfigConfirm());
                if(resolve) {
                    resolve(data);
                } else {
                    console.warn('[CONFIRM] Please define resolve function.');
                }
            },
            ...otherProps
        }))
    }
}
