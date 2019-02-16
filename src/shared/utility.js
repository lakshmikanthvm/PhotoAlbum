/**
* @desc immutably updating state
* @param oldObject, updatedProperties
* @return updated object
*/
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};