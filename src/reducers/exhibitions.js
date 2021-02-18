
const exhibitionsReducer = (state = {}, action) => {
    switch(action.type){
        case 'SETEXHIBITIONS':
            return {...state, ...action.exhibition} 
        case 'ADDTOEXHIBITIONS':
            return {...state, [(action.exhibition.id)-1]: action.exhibition}
        case 'UPDATEEXHIBITIONS':
            return {...state, [(action.exhibition.id)-1]: action.exhibition}
        case 'REMOVEFROMEXHIBITIONS':
            const index = (action.exhibition - 1)
            const {[index]: objectToDelete, ...rest} = state
            return rest
        case 'ADDEXHIBITIONOBJECT':
            const exhibitId = action.exhibitionObject.exhibition_id
            const exhibit = state[exhibitId -1]
            const exhibition_objects = exhibit.exhibition_objects
            const updateObjects = [...exhibition_objects, action.exhibitionObject]
            const updatedExhibit = {...exhibit, exhibition_objects: updateObjects}
            return {...state, [exhibitId - 1]: updatedExhibit}
        case 'UPDATEEXHIBITIONOBJECT':
            console.log('action.exhibitionObject', action.exhibitionObject)
            const updatedExhibitId = action.exhibitionObject.exhibition_id
            const changedObjectId = action.exhibitionObject.id
            const exhibitToUpdate = state[updatedExhibitId -1]
            const exhibition_objectsToUpdate = exhibitToUpdate.exhibition_objects

            const indexOfObject = exhibition_objectsToUpdate.findIndex(object => object.id===changedObjectId)
            exhibition_objectsToUpdate[indexOfObject] = action.exhibitionObject
            

            const updatedObjectsArray = [...exhibition_objectsToUpdate]
            const newlyUpdatedExhibit = {...exhibitToUpdate, exhibition_objects: updatedObjectsArray}
            return {...state, [updatedExhibitId - 1]: newlyUpdatedExhibit}
        case 'REMOVEEXHIBITIONOBJECT':
            const objectIdForDelete = action.exhibitionObject.objectId
            const exhibitIdForDelete = action.exhibitionObject.exhibitId
            const exhibitToUpdateAgain = state[exhibitIdForDelete - 1]
            const exhibitionObjects  = exhibitToUpdateAgain.exhibition_objects
            const exhibitionObjectsUpdated = exhibitionObjects.filter(object => object.id !== objectIdForDelete)
            const veryUpdatedExhibit = {...exhibitToUpdateAgain, exhibition_objects: exhibitionObjectsUpdated}
            return {...state, [exhibitIdForDelete - 1]: veryUpdatedExhibit}

        default:
            return state
    }
}

export default exhibitionsReducer

