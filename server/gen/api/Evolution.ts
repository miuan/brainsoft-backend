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
 *     Evolution: 
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
 *         pokemon: 
 *           type: "string"
 *         _pokemonEvo: 
 *           type: "string"
 *         _prevPokemonEvo: 
 *           type: "string"
 *         user: 
 *           type: "string"
 * paths: 
 *   /api/evolution/all: 
 *     get: 
 *       tags: 
 *         - "Evolution"
 *         - "all"
 *         - "query"
 *       summary: "Retrive all Evolution"
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
 *           description: "List of Evolution"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 type: "array"
 *                 items: 
 *                   $ref: "#/components/schemas/Evolution"
 *   /api/evolution/owned: 
 *     get: 
 *       tags: 
 *         - "Evolution"
 *         - "owned"
 *         - "query"
 *       summary: "Retrive only owned (my) Evolution"
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
 *           description: "List of Evolution"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 type: "array"
 *                 items: 
 *                   $ref: "#/components/schemas/Evolution"
 *   /api/evolution/count: 
 *     get: 
 *       tags: 
 *         - "Evolution"
 *         - "count"
 *         - "query"
 *       summary: "Count of Evolution"
 *       parameters: 
 *         - 
 *           $ref: "#/components/parameters/AliasParam"
 *         - 
 *           $ref: "#/components/parameters/SortParam"
 *         - 
 *           $ref: "#/components/parameters/FilterParam"
 *       responses: 
 *         200: 
 *           description: "Count of Evolution"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 type: "integer"
 *   /api/evolution: 
 *     post: 
 *       tags: 
 *         - "Evolution"
 *         - "create"
 *         - "mutation"
 *       summary: "Create Evolution with id"
 *       parameters: 
 *         - 
 *           $ref: "#/components/parameters/FieldParam"
 *         - 
 *           $ref: "#/components/parameters/AliasParam"
 *       requestBody: 
 *         content: 
 *           application/json: 
 *             schema: 
 *               $ref: "#/components/schemas/Evolution"
 *       responses: 
 *         200: 
 *           description: "updated model Evolution"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 $ref: "#/components/schemas/Evolution"
 *   /api/evolution/{id}: 
 *     get: 
 *       tags: 
 *         - "Evolution"
 *         - "one"
 *         - "query"
 *       summary: "Retrive one Evolution by id"
 *       parameters: 
 *         - 
 *           $ref: "#/components/parameters/FieldParam"
 *         - 
 *           $ref: "#/components/parameters/AliasParam"
 *         - 
 *           $ref: "#/components/parameters/IdParam"
 *       responses: 
 *         200: 
 *           description: "One Evolution"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 $ref: "#/components/schemas/Evolution"
 *     put: 
 *       tags: 
 *         - "Evolution"
 *         - "update"
 *         - "mutation"
 *       summary: "Update Evolution with id"
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
 *               $ref: "#/components/schemas/Evolution"
 *       responses: 
 *         200: 
 *           description: "updated model Evolution"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 $ref: "#/components/schemas/Evolution"
 *     delete: 
 *       tags: 
 *         - "Evolution"
 *         - "delete"
 *         - "mutation"
 *       summary: "Delete Evolution with id"
 *       parameters: 
 *         - 
 *           $ref: "#/components/parameters/FieldParam"
 *         - 
 *           $ref: "#/components/parameters/AliasParam"
 *         - 
 *           $ref: "#/components/parameters/IdParam"
 *       responses: 
 *         200: 
 *           description: "updated model Evolution"
 *           content: 
 *             application/json: 
 *               schema: 
 *                 $ref: "#/components/schemas/Evolution"
 */

const createEvolution = (entry) => async (ctx) => {
    let body = ctx.request.body

    

    if (entry.hooks.api['beforeCreateEvolution']) {
        body = (await entry.hooks.api['beforeCreateEvolution'](entry, ctx, body)) || body
    }

    body.user = body.user || ctx.state?.user?.id
    let resData = await entry.services['evolution'].create(body, ctx.state?.user?.id)

    if (entry.hooks.api['afterCreateEvolution']) {
        resData = (await entry.hooks.api['afterCreateEvolution'](entry, ctx, resData, body)) || resData
    }

    ctx.body = apiMiddleware(ctx, resData, 'createEvolution')
}

const updateEvolution = (entry) => async (ctx) => {
    let body = ctx.request.body || {}
    // user is owner need id
    body.id = ctx.params.id

    

    if (entry.hooks.api['beforeUpdateEvolution']) {
        body = (await entry.hooks.api['beforeUpdateEvolution'](entry, ctx, body)) || body
    }

    body.user = body.user || ctx.state?.user?.id
    let resData = await entry.services['evolution'].update(body, ctx.state?.user?.id)

    if (entry.hooks.api['afterUpdateEvolution']) {
        resData = (await entry.hooks.api['afterUpdateEvolution'](entry, ctx, resData, body)) || resData
    }

    ctx.body = apiMiddleware(ctx, resData, 'updateEvolution')
}

const removeEvolution = (entry) => async (ctx) => {
    let body = ctx.request.body || {}
    // user is owner need id
    body.id = ctx.params.id

    

    if (entry.hooks.api['beforeRemoveEvolution']) {
        body = (await entry.hooks.api['beforeRemoveEvolution'](entry, ctx, body)) || body
    }

    body.user = body.user || ctx.state?.user?.id
    let resData = await entry.services['evolution'].remove(body.id, ctx.state?.user?.id)

    if (entry.hooks.api['afterRemoveEvolution']) {
        resData = (await entry.hooks.api['afterRemoveEvolution'](entry, ctx, resData, body)) || resData
    }

    ctx.body = apiMiddleware(ctx, resData, 'removeEvolution')
}

const oneEvolution = (entry) => async (ctx) => {
    let body = ctx.request.body || {}
    // user is owner need id
    body.id = ctx.params.id

    

    if (entry.hooks.api['beforeOneEvolution']) {
        body = (await entry.hooks.api['beforeOneEvolution'](entry, ctx, body)) || body
    }

    body.user = body.user || ctx.state?.user?.id
    let resData = await entry.services['evolution'].one(body.id, ctx.state?.user?.id)

    if (entry.hooks.api['afterOneEvolution']) {
        resData = (await entry.hooks.api['afterOneEvolution'](entry, ctx, resData, body)) || resData
    }

    ctx.body = apiMiddleware(ctx, resData, 'evolution')
}

const allEvolution = (entry) => async (ctx) => {
    let body = ctx.request.body || {}
    // user is owner need id
    body.id = ctx.params.id

    

    if (entry.hooks.api['beforeAllEvolution']) {
        body = (await entry.hooks.api['beforeAllEvolution'](entry, ctx, body)) || body
    }

    body.user = body.user || ctx.state?.user?.id
    let resData = await entry.services['evolution'].all(ctx.params, ctx.state?.user?.id)
    resData = resData.map((m) => {
        m.id = m._id
        delete m._id
        return m
    })

    if (entry.hooks.api['afterAllEvolution']) {
        resData = (await entry.hooks.api['afterAllEvolution'](entry, ctx, resData, body)) || resData
    }

    ctx.body = apiMiddleware(ctx, resData, 'allEvolution')
}

const countEvolution = (entry) => async (ctx) => {
    let body = ctx.request.body || {}
    // user is owner need id
    body.id = ctx.params.id

    

    if (entry.hooks.api['beforeAllEvolution']) {
        body = (await entry.hooks.api['beforeAllEvolution'](entry, ctx, body)) || body
    }

    body.user = body.user || ctx.state?.user?.id
    const query = ctx.request.query
    if (query.filter) {
        query.filter = JSON5.parse(query.filter)
    }
    let resData = await entry.services['evolution'].count(query, ctx.state?.user?.id)

    if (entry.hooks.api['afterAllEvolution']) {
        resData = (await entry.hooks.api['afterAllEvolution'](entry, ctx, resData, body)) || resData
    }

    ctx.body = apiMiddleware(ctx, resData, 'countEvolution')
}

export function connectEvolutionApi(apiRouter, entry) {
    apiRouter.post('/evolution', createEvolution(entry))
    apiRouter.put('/evolution/:id', updateEvolution(entry))
    apiRouter.delete('/evolution/:id', removeEvolution(entry))
    apiRouter.get('/evolution/all', allEvolution(entry))
    apiRouter.get('/evolution/count', countEvolution(entry))
    apiRouter.get('/evolution/:id', oneEvolution(entry))
}
