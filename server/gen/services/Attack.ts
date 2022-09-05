export const generateCreateAttack = (entry) => (entity) => {

}
export const generateUpdateAttack = (entry) => (entity) => {

}

export const generateRemoveAttack = (entry) => (entity) => {

}

export function generateAttackService(entry){
    return {
        create: generateCreateAttack(entry),
        update: generateUpdateAttack(entry),
        remove: generateRemoveAttack(entry)
    }
}