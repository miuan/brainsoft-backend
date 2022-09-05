import * as JSON5 from 'json5'
import { apiMiddleware, userIsOwner, userHaveRoles, paramHaveFilter, RequestError, UnauthorizedError } from '../api-utils'

/**
 * @swagger
 * components: 
 *   parameters: 
 *     FieldParam: 
 *       name: "fields"
 *       in: "query"
 *       type: "array"
 *       collectionType: "csv"
 *       items: 
 *         type: "string"
 *     AliasParam: 
 *       name: "alias"
 *       in: "query"
 *       type: "string"
 *     SortParam: 
 *       name: "sort"
 *       in: "query"
 *       type: "string"
 *     FilterParam: 
 *       name: "filter"
 *       in: "query"
 *       type: "string"
 *     IdParam: 
 *       name: "id"
 *       in: "path"
 *       type: "string"
 *   schemas: 
 *     Pokemon: 
 *       type: "object"
 *       properties: 
 *         updatedAt: 
 *           type: "string"
 *         createdAt: 
 *           type: "string"
 *         id: 
 *           type: "integer"
 *         name: 
 *           type: "string"
 *         classification: 
 *           type: "string"
 *         types: 
 *           type: "string"
 *         resistant: 
 *           type: "string"
 *         weaknesses: 
 *           type: "string"
 *         weight: 
 *           type: "string"
 *         height: 
 *           type: "string"
 *         attacks: 
 *           type: "string"
 *         fleeRate: 
 *           type: "integer"
 *         maxCP: 
 *           type: "integer"
 *         maxHP: 
 *           type: "integer"
 *         evolutions: 
 *           type: "string"
 *         prevEvolutions: 
 *           type: "string"
 *         favorite: 
 *           type: "string"
 *         _evo: 
 *           type: "string"
 *         user: 
 *           type: "string"
 * paths: 
 *   /api/pokemon/all: 
 *     get: 
 *       tags: 
 *         - "Pokemon"
 *         - "all"
 *         - "query"
 *       summary: "Retrive all Pokemon"
 *       parameters: 
 *         - 
 *           $ref: "#/components/parameters/FieldParam"
 *         - 
 *           $ref: "#/components/parameters/AliasParam"
 *         - 
 *           $ref: "#/components/parameters/SortParam"
 *         - 
 *           $ref: "#/components/parameters/FilterParam"
 *       responses: 
 *         200: 
 *           description: "List of Pokemon"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 type: "array"
 *                 items: 
 *                   $ref: "#/components/schemas/Pokemon"
 *   /api/pokemon/owned: 
 *     get: 
 *       tags: 
 *         - "Pokemon"
 *         - "owned"
 *         - "query"
 *       summary: "Retrive only owned (my) Pokemon"
 *       parameters: 
 *         - 
 *           $ref: "#/components/parameters/FieldParam"
 *         - 
 *           $ref: "#/components/parameters/AliasParam"
 *         - 
 *           $ref: "#/components/parameters/SortParam"
 *         - 
 *           $ref: "#/components/parameters/FilterParam"
 *       responses: 
 *         200: 
 *           description: "List of Pokemon"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 type: "array"
 *                 items: 
 *                   $ref: "#/components/schemas/Pokemon"
 *   /api/pokemon/count: 
 *     get: 
 *       tags: 
 *         - "Pokemon"
 *         - "count"
 *         - "query"
 *       summary: "Count of Pokemon"
 *       parameters: 
 *         - 
 *           $ref: "#/components/parameters/AliasParam"
 *         - 
 *           $ref: "#/components/parameters/SortParam"
 *         - 
 *           $ref: "#/components/parameters/FilterParam"
 *       responses: 
 *         200: 
 *           description: "Count of Pokemon"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 type: "integer"
 *   /api/pokemon: 
 *     post: 
 *       tags: 
 *         - "Pokemon"
 *         - "create"
 *         - "mutation"
 *       summary: "Create Pokemon with id"
 *       parameters: 
 *         - 
 *           $ref: "#/components/parameters/FieldParam"
 *         - 
 *           $ref: "#/components/parameters/AliasParam"
 *       requestBody: 
 *         content: 
 *           application/json: 
 *             schema: 
 *               $ref: "#/components/schemas/Pokemon"
 *       responses: 
 *         200: 
 *           description: "updated model Pokemon"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 $ref: "#/components/schemas/Pokemon"
 *   /api/pokemon/{id}: 
 *     get: 
 *       tags: 
 *         - "Pokemon"
 *         - "one"
 *         - "query"
 *       summary: "Retrive one Pokemon by id"
 *       parameters: 
 *         - 
 *           $ref: "#/components/parameters/FieldParam"
 *         - 
 *           $ref: "#/components/parameters/AliasParam"
 *         - 
 *           $ref: "#/components/parameters/IdParam"
 *       responses: 
 *         200: 
 *           description: "One Pokemon"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 $ref: "#/components/schemas/Pokemon"
 *     put: 
 *       tags: 
 *         - "Pokemon"
 *         - "update"
 *         - "mutation"
 *       summary: "Update Pokemon with id"
 *       parameters: 
 *         - 
 *           $ref: "#/components/parameters/FieldParam"
 *         - 
 *           $ref: "#/components/parameters/AliasParam"
 *         - 
 *           $ref: "#/components/parameters/IdParam"
 *       requestBody: 
 *         content: 
 *           application/json: 
 *             schema: 
 *               $ref: "#/components/schemas/Pokemon"
 *       responses: 
 *         200: 
 *           description: "updated model Pokemon"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 $ref: "#/components/schemas/Pokemon"
 *     delete: 
 *       tags: 
 *         - "Pokemon"
 *         - "delete"
 *         - "mutation"
 *       summary: "Delete Pokemon with id"
 *       parameters: 
 *         - 
 *           $ref: "#/components/parameters/FieldParam"
 *         - 
 *           $ref: "#/components/parameters/AliasParam"
 *         - 
 *           $ref: "#/components/parameters/IdParam"
 *       responses: 
 *         200: 
 *           description: "updated model Pokemon"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 $ref: "#/components/schemas/Pokemon"
 */

const createPokemon = (entry) => async (ctx) => {
    let body = ctx.request.body

    

    if (entry.hooks.api['beforeCreatePokemon']) {
        body = (await entry.hooks.api['beforeCreatePokemon'](entry, ctx, body)) || body
    }

    body.user = body.user || ctx.state?.user?.id
    let resData = await entry.services['pokemon'].create(body, ctx.state?.user?.id)

    if (entry.hooks.api['afterCreatePokemon']) {
        resData = (await entry.hooks.api['afterCreatePokemon'](entry, ctx, resData, body)) || resData
    }

    ctx.body = apiMiddleware(ctx, resData, 'createPokemon')
}

const updatePokemon = (entry) => async (ctx) => {
    let body = ctx.request.body || {}
    // user is owner need id
    body.id = ctx.params.id

    

    if (entry.hooks.api['beforeUpdatePokemon']) {
        body = (await entry.hooks.api['beforeUpdatePokemon'](entry, ctx, body)) || body
    }

    body.user = body.user || ctx.state?.user?.id
    let resData = await entry.services['pokemon'].update(body, ctx.state?.user?.id)

    if (entry.hooks.api['afterUpdatePokemon']) {
        resData = (await entry.hooks.api['afterUpdatePokemon'](entry, ctx, resData, body)) || resData
    }

    ctx.body = apiMiddleware(ctx, resData, 'updatePokemon')
}

const removePokemon = (entry) => async (ctx) => {
    let body = ctx.request.body || {}
    // user is owner need id
    body.id = ctx.params.id

    

    if (entry.hooks.api['beforeRemovePokemon']) {
        body = (await entry.hooks.api['beforeRemovePokemon'](entry, ctx, body)) || body
    }

    body.user = body.user || ctx.state?.user?.id
    let resData = await entry.services['pokemon'].remove(body.id, ctx.state?.user?.id)

    if (entry.hooks.api['afterRemovePokemon']) {
        resData = (await entry.hooks.api['afterRemovePokemon'](entry, ctx, resData, body)) || resData
    }

    ctx.body = apiMiddleware(ctx, resData, 'removePokemon')
}

const onePokemon = (entry) => async (ctx) => {
    let body = ctx.request.body || {}
    // user is owner need id
    body.id = ctx.params.id

    

    if (entry.hooks.api['beforeOnePokemon']) {
        body = (await entry.hooks.api['beforeOnePokemon'](entry, ctx, body)) || body
    }

    body.user = body.user || ctx.state?.user?.id
    let resData = await entry.services['pokemon'].one(body.id, ctx.state?.user?.id)

    if (entry.hooks.api['afterOnePokemon']) {
        resData = (await entry.hooks.api['afterOnePokemon'](entry, ctx, resData, body)) || resData
    }

    ctx.body = apiMiddleware(ctx, resData, 'pokemon')
}

const allPokemon = (entry) => async (ctx) => {
    let body = ctx.request.body || {}
    // user is owner need id
    body.id = ctx.params.id

    

    if (entry.hooks.api['beforeAllPokemon']) {
        body = (await entry.hooks.api['beforeAllPokemon'](entry, ctx, body)) || body
    }

    body.user = body.user || ctx.state?.user?.id
    let resData = await entry.services['pokemon'].all(ctx.params, ctx.state?.user?.id)
    resData = resData.map((m) => {
        m.id = m._id
        delete m._id
        return m
    })

    if (entry.hooks.api['afterAllPokemon']) {
        resData = (await entry.hooks.api['afterAllPokemon'](entry, ctx, resData, body)) || resData
    }

    ctx.body = apiMiddleware(ctx, resData, 'allPokemon')
}

const countPokemon = (entry) => async (ctx) => {
    let body = ctx.request.body || {}
    // user is owner need id
    body.id = ctx.params.id

    

    if (entry.hooks.api['beforeAllPokemon']) {
        body = (await entry.hooks.api['beforeAllPokemon'](entry, ctx, body)) || body
    }

    body.user = body.user || ctx.state?.user?.id
    const query = ctx.request.query
    if (query.filter) {
        query.filter = JSON5.parse(query.filter)
    }
    let resData = await entry.services['pokemon'].count(query, ctx.state?.user?.id)

    if (entry.hooks.api['afterAllPokemon']) {
        resData = (await entry.hooks.api['afterAllPokemon'](entry, ctx, resData, body)) || resData
    }

    ctx.body = apiMiddleware(ctx, resData, 'countPokemon')
}

export function connectPokemonApi(apiRouter, entry) {
    apiRouter.post('/pokemon', createPokemon(entry))
    apiRouter.put('/pokemon/:id', updatePokemon(entry))
    apiRouter.delete('/pokemon/:id', removePokemon(entry))
    apiRouter.get('/pokemon/all', allPokemon(entry))
    apiRouter.get('/pokemon/count', countPokemon(entry))
    apiRouter.get('/pokemon/:id', onePokemon(entry))
}
