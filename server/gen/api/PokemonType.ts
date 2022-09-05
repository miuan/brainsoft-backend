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
 *     PokemonType: 
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
 *         pokemons: 
 *           type: "string"
 *         user: 
 *           type: "string"
 * paths: 
 *   /api/pokemonType/all: 
 *     get: 
 *       tags: 
 *         - "PokemonType"
 *         - "all"
 *         - "query"
 *       summary: "Retrive all PokemonType"
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
 *           description: "List of PokemonType"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 type: "array"
 *                 items: 
 *                   $ref: "#/components/schemas/PokemonType"
 *   /api/pokemonType/owned: 
 *     get: 
 *       tags: 
 *         - "PokemonType"
 *         - "owned"
 *         - "query"
 *       summary: "Retrive only owned (my) PokemonType"
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
 *           description: "List of PokemonType"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 type: "array"
 *                 items: 
 *                   $ref: "#/components/schemas/PokemonType"
 *   /api/pokemonType/count: 
 *     get: 
 *       tags: 
 *         - "PokemonType"
 *         - "count"
 *         - "query"
 *       summary: "Count of PokemonType"
 *       parameters: 
 *         - 
 *           $ref: "#/components/parameters/AliasParam"
 *         - 
 *           $ref: "#/components/parameters/SortParam"
 *         - 
 *           $ref: "#/components/parameters/FilterParam"
 *       responses: 
 *         200: 
 *           description: "Count of PokemonType"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 type: "integer"
 *   /api/pokemonType: 
 *     post: 
 *       tags: 
 *         - "PokemonType"
 *         - "create"
 *         - "mutation"
 *       summary: "Create PokemonType with id"
 *       parameters: 
 *         - 
 *           $ref: "#/components/parameters/FieldParam"
 *         - 
 *           $ref: "#/components/parameters/AliasParam"
 *       requestBody: 
 *         content: 
 *           application/json: 
 *             schema: 
 *               $ref: "#/components/schemas/PokemonType"
 *       responses: 
 *         200: 
 *           description: "updated model PokemonType"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 $ref: "#/components/schemas/PokemonType"
 *   /api/pokemonType/{id}: 
 *     get: 
 *       tags: 
 *         - "PokemonType"
 *         - "one"
 *         - "query"
 *       summary: "Retrive one PokemonType by id"
 *       parameters: 
 *         - 
 *           $ref: "#/components/parameters/FieldParam"
 *         - 
 *           $ref: "#/components/parameters/AliasParam"
 *         - 
 *           $ref: "#/components/parameters/IdParam"
 *       responses: 
 *         200: 
 *           description: "One PokemonType"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 $ref: "#/components/schemas/PokemonType"
 *     put: 
 *       tags: 
 *         - "PokemonType"
 *         - "update"
 *         - "mutation"
 *       summary: "Update PokemonType with id"
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
 *               $ref: "#/components/schemas/PokemonType"
 *       responses: 
 *         200: 
 *           description: "updated model PokemonType"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 $ref: "#/components/schemas/PokemonType"
 *     delete: 
 *       tags: 
 *         - "PokemonType"
 *         - "delete"
 *         - "mutation"
 *       summary: "Delete PokemonType with id"
 *       parameters: 
 *         - 
 *           $ref: "#/components/parameters/FieldParam"
 *         - 
 *           $ref: "#/components/parameters/AliasParam"
 *         - 
 *           $ref: "#/components/parameters/IdParam"
 *       responses: 
 *         200: 
 *           description: "updated model PokemonType"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 $ref: "#/components/schemas/PokemonType"
 */

const createPokemonType = (entry) => async (ctx) => {
    let body = ctx.request.body

    

    if (entry.hooks.api['beforeCreatePokemonType']) {
        body = (await entry.hooks.api['beforeCreatePokemonType'](entry, ctx, body)) || body
    }

    body.user = body.user || ctx.state?.user?.id
    let resData = await entry.services['pokemonType'].create(body, ctx.state?.user?.id)

    if (entry.hooks.api['afterCreatePokemonType']) {
        resData = (await entry.hooks.api['afterCreatePokemonType'](entry, ctx, resData, body)) || resData
    }

    ctx.body = apiMiddleware(ctx, resData, 'createPokemonType')
}

const updatePokemonType = (entry) => async (ctx) => {
    let body = ctx.request.body || {}
    // user is owner need id
    body.id = ctx.params.id

    

    if (entry.hooks.api['beforeUpdatePokemonType']) {
        body = (await entry.hooks.api['beforeUpdatePokemonType'](entry, ctx, body)) || body
    }

    body.user = body.user || ctx.state?.user?.id
    let resData = await entry.services['pokemonType'].update(body, ctx.state?.user?.id)

    if (entry.hooks.api['afterUpdatePokemonType']) {
        resData = (await entry.hooks.api['afterUpdatePokemonType'](entry, ctx, resData, body)) || resData
    }

    ctx.body = apiMiddleware(ctx, resData, 'updatePokemonType')
}

const removePokemonType = (entry) => async (ctx) => {
    let body = ctx.request.body || {}
    // user is owner need id
    body.id = ctx.params.id

    

    if (entry.hooks.api['beforeRemovePokemonType']) {
        body = (await entry.hooks.api['beforeRemovePokemonType'](entry, ctx, body)) || body
    }

    body.user = body.user || ctx.state?.user?.id
    let resData = await entry.services['pokemonType'].remove(body.id, ctx.state?.user?.id)

    if (entry.hooks.api['afterRemovePokemonType']) {
        resData = (await entry.hooks.api['afterRemovePokemonType'](entry, ctx, resData, body)) || resData
    }

    ctx.body = apiMiddleware(ctx, resData, 'removePokemonType')
}

const onePokemonType = (entry) => async (ctx) => {
    let body = ctx.request.body || {}
    // user is owner need id
    body.id = ctx.params.id

    

    if (entry.hooks.api['beforeOnePokemonType']) {
        body = (await entry.hooks.api['beforeOnePokemonType'](entry, ctx, body)) || body
    }

    body.user = body.user || ctx.state?.user?.id
    let resData = await entry.services['pokemonType'].one(body.id, ctx.state?.user?.id)

    if (entry.hooks.api['afterOnePokemonType']) {
        resData = (await entry.hooks.api['afterOnePokemonType'](entry, ctx, resData, body)) || resData
    }

    ctx.body = apiMiddleware(ctx, resData, 'pokemonType')
}

const allPokemonType = (entry) => async (ctx) => {
    let body = ctx.request.body || {}
    // user is owner need id
    body.id = ctx.params.id

    

    if (entry.hooks.api['beforeAllPokemonType']) {
        body = (await entry.hooks.api['beforeAllPokemonType'](entry, ctx, body)) || body
    }

    body.user = body.user || ctx.state?.user?.id
    let resData = await entry.services['pokemonType'].all(ctx.params, ctx.state?.user?.id)
    resData = resData.map((m) => {
        m.id = m._id
        delete m._id
        return m
    })

    if (entry.hooks.api['afterAllPokemonType']) {
        resData = (await entry.hooks.api['afterAllPokemonType'](entry, ctx, resData, body)) || resData
    }

    ctx.body = apiMiddleware(ctx, resData, 'allPokemonType')
}

const countPokemonType = (entry) => async (ctx) => {
    let body = ctx.request.body || {}
    // user is owner need id
    body.id = ctx.params.id

    

    if (entry.hooks.api['beforeAllPokemonType']) {
        body = (await entry.hooks.api['beforeAllPokemonType'](entry, ctx, body)) || body
    }

    body.user = body.user || ctx.state?.user?.id
    const query = ctx.request.query
    if (query.filter) {
        query.filter = JSON5.parse(query.filter)
    }
    let resData = await entry.services['pokemonType'].count(query, ctx.state?.user?.id)

    if (entry.hooks.api['afterAllPokemonType']) {
        resData = (await entry.hooks.api['afterAllPokemonType'](entry, ctx, resData, body)) || resData
    }

    ctx.body = apiMiddleware(ctx, resData, 'countPokemonType')
}

export function connectPokemonTypeApi(apiRouter, entry) {
    apiRouter.post('/pokemonType', createPokemonType(entry))
    apiRouter.put('/pokemonType/:id', updatePokemonType(entry))
    apiRouter.delete('/pokemonType/:id', removePokemonType(entry))
    apiRouter.get('/pokemonType/all', allPokemonType(entry))
    apiRouter.get('/pokemonType/count', countPokemonType(entry))
    apiRouter.get('/pokemonType/:id', onePokemonType(entry))
}
