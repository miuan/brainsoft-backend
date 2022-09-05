export const generateCreateMinMax = (entry) => (entity) => {

}
export const generateUpdateMinMax = (entry) => (entity) => {

}

export const generateRemoveMinMax = (entry) => (entity) => {

}

export function generateMinMaxService(entry){
    return {
        create: generateCreateMinMax(entry),
        update: generateUpdateMinMax(entry),
        remove: generateRemoveMinMax(entry)
    }
}