export const generateCreateAttackFields = (entry) => (entity) => {

}
export const generateUpdateAttackFields = (entry) => (entity) => {

}

export const generateRemoveAttackFields = (entry) => (entity) => {

}

export function generateAttackFieldsService(entry){
    return {
        create: generateCreateAttackFields(entry),
        update: generateUpdateAttackFields(entry),
        remove: generateRemoveAttackFields(entry)
    }
}