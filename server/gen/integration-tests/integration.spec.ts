
    import { connectToServer, disconnectFromServer } from './helper'
    export async function createAttack(server, {user}, data){
        data.user = user.id
        return server.entry.models['attack'].create(data)
    }
export async function createAttackFields(server, {user}, data){
        data.user = user.id
        return server.entry.models['attackFields'].create(data)
    }
export async function createEvolution(server, {user}, data){
        data.user = user.id
        return server.entry.models['evolution'].create(data)
    }
export async function createMinMax(server, {user}, data){
        data.user = user.id
        return server.entry.models['minMax'].create(data)
    }
export async function createPokemon(server, {user}, data){
        data.user = user.id
        return server.entry.models['pokemon'].create(data)
    }
export async function createPokemonType(server, {user}, data){
        data.user = user.id
        return server.entry.models['pokemonType'].create(data)
    }
    
    describe('integration', () => {
        let server
        let admin, user, pub
        
        beforeAll(async ()=>{
            server = await connectToServer()

            const res = await server.post(
                "/auth/login_v1?fields=token,refreshToken,user.id&alias=login",
                {
                  email: "admin@admin.test",
                  password: "admin@admin.test",
                }
              );
          
              // expect(res).toHaveProperty('status', 200)
              expect(res).toHaveProperty("body.login.token");
              expect(res.body.login.token).toMatch(
                /^[A-Za-z0-9-_=]+.[A-Za-z0-9-_=]+.?[A-Za-z0-9-_.+/=]*$/
              );
              expect(res).toHaveProperty("body.login.refreshToken");
              expect(res).toHaveProperty("body.login.user.id");
              expect(res).toHaveProperty("body.login.user.email", "admin@admin.test");
              // expect(res).toHaveProperty('body.login.user.roles', [{ name: 'admin' }])
              expect(res).not.toHaveProperty("errors");
          
              admin = res.body.login;

              const res2 = await server.post(
                "/auth/register_v1?fields=token,refreshToken,user.id&alias=register",
                {
                  email: "user@user.test",
                  password: "user@user.test",
                }
              );
          
              // expect(res).toHaveProperty('status', 200)
              expect(res2).toHaveProperty("body.register.token");
              expect(res2.body.register.token).toMatch(
                /^[A-Za-z0-9-_=]+.[A-Za-z0-9-_=]+.?[A-Za-z0-9-_.+/=]*$/
              );
              expect(res2).toHaveProperty("body.register.refreshToken");
              expect(res2).toHaveProperty("body.register.user.id");
              expect(res2).toHaveProperty("body.register.user.email", "user@user.test");
              // expect(res).toHaveProperty('body.register.user.roles', [{ name: 'admin' }])
              expect(res2).not.toHaveProperty("errors");
          
              user = res2.body.register.token;

              pub = {user: user.user, token: ''};
        })

        afterAll(async () => {
            disconnectFromServer(server)
        });

        
        describe('Attack', () => {
             
    describe('admin:graphql', ()=>{
        
        it('create Attack', async()=>{
            const token = admin.token
              
            const data = {
	"name": "Attack/name/9xeuzete",
	"type": "Attack/type/3tnkcy",
	"damage": 640458
}
const createAttackMutation = `mutation CreateAttack($name: String!,$type: String!,$damage: Int!){
        createAttack(name: $name,type: $type,damage: $damage) {
           name,type,damage
        }
    }`
    
    const createAttackResponse = await server.mutate({
        mutation: createAttackMutation,
        variables: data
      }, token);
    expect(createAttackResponse).not.toHaveProperty('errors')
expect(createAttackResponse).toHaveProperty('data.createAttack.name', 'Attack/name/9xeuzete')
expect(createAttackResponse).toHaveProperty('data.createAttack.type', 'Attack/type/3tnkcy')
expect(createAttackResponse).toHaveProperty('data.createAttack.damage', 640458)
        })
    
        
        it('one Attack', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, admin, {"name":"Attack/name/ntfivhup","type":"Attack/type/04b30g49","damage":804698})
                // createModelLine: end  
            const oneAttackQuery = `query Attack($id: ID!){
        Attack(id: $id) {
            name,type,damage
        }
    }`
    
    const oneAttackResponse = await server.query({
        query: oneAttackQuery,
        variables: { id: createAttackResponse.id}
      }, token);

      expect(oneAttackResponse).not.toHaveProperty('errors')
expect(oneAttackResponse).toHaveProperty('data.Attack.name', createAttackResponse.name)
expect(oneAttackResponse).toHaveProperty('data.Attack.type', createAttackResponse.type)
expect(oneAttackResponse).toHaveProperty('data.Attack.damage', createAttackResponse.damage)

    
        })
    
        
        it('update Attack', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, admin, {"name":"Attack/name/4it6so5n","type":"Attack/type/75x9g17k","damage":522861})
                // createModelLine: end  
            const updateAttackMutation = `mutation UpdateAttack($name: String!,$type: String!,$damage: Int!){
        updateAttack(name: $name,type: $type,damage: $damage) {
           name,type,damage
        }
    }`
    
    const updateAttackResponse = await server.mutate({
        mutation: updateAttackMutation,
        variables: {
	"name": "Attack/name/qarczux9",
	"type": "Attack/type/8a75do6g",
	"damage": 273284
}
      }, token);

    expect(updateAttackResponse).not.toHaveProperty('errors')
expect(updateAttackResponse).toHaveProperty('data.updateAttack.name', 'Attack/name/qarczux9')
expect(updateAttackResponse).toHaveProperty('data.updateAttack.type', 'Attack/type/8a75do6g')
expect(updateAttackResponse).toHaveProperty('data.updateAttack.damage', 273284)
    
        })
    
        
        it('remove Attack', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, admin, {"name":"Attack/name/6ylwc3pe","type":"Attack/type/aw4jhgdt","damage":842026})
                // createModelLine: end  
            const removeAttackMutation = `mutation RemoveAttack(){
        removeAttack() {
           id
        }
    }`
    
    const removeAttackResponse = await server.mutate({
        mutation: removeAttackMutation,
        variables: { id:createAttackResponse.id }
      }, token);

      expect(removeAttackResponse).not.toHaveProperty('errors')

          
          const attackCheck = await server.entry.models['attack'].findById(createAttackResponse.id)
          expect(attackCheck).toBeNull()
    
    
        })
    
        
        it('all Attack', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, admin, {"name":"Attack/name/l5d8cajt","type":"Attack/type/12l4rj1m","damage":117210})
                // createModelLine: end

                // createModelLine: start
                const createAttackResponse2 = await createAttack(server, admin, {"name":"Attack/name/qwu1bbw","type":"Attack/type/d5kagwf","damage":572397})
                // createModelLine: end  
            const allAttackQuery = `query allAttack {
        allAttack {
            name,type,damage
        }
    }`
    
    const allAttackResponse = await server.query({
        query: allAttackQuery,
        variables: { id: createAttackResponse.id}
      }, token)

    
expect(allAttackResponse.data.allAttack).toEqual(expect.arrayContaining([
        expect.objectContaining({name: createAttackResponse.name,type: createAttackResponse.type,damage: createAttackResponse.damage}),
        expect.objectContaining({name: createAttackResponse2.name,type: createAttackResponse2.type,damage: createAttackResponse2.damage})
    ]))
        })
    
    })

    describe('admin:api', ()=>{
        
        it('create:api Attack', async()=>{
            const token = admin.token
              
            const data = {
	"name": "Attack/name/jhx9qyfi",
	"type": "Attack/type/f8qhhojo",
	"damage": 568609
}
    const createAttackResponse = await server.post('/api/attack', data ,token);
      
      expect(createAttackResponse).not.toHaveProperty('errors')
expect(createAttackResponse).toHaveProperty('body.createAttack.name', 'Attack/name/jhx9qyfi')
expect(createAttackResponse).toHaveProperty('body.createAttack.type', 'Attack/type/f8qhhojo')
expect(createAttackResponse).toHaveProperty('body.createAttack.damage', 568609)
    
        })
    
        
        it('one:api Attack', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, admin, {"name":"Attack/name/htk5fgev5","type":"Attack/type/ppx957r","damage":324702})
                // createModelLine: end  
            
      const oneAttackResponse = await server.get('/api/attack/' + createAttackResponse.id, token);

      expect(oneAttackResponse).not.toHaveProperty('errors')
expect(oneAttackResponse).toHaveProperty('body.attack.name', createAttackResponse.name)
expect(oneAttackResponse).toHaveProperty('body.attack.type', createAttackResponse.type)
expect(oneAttackResponse).toHaveProperty('body.attack.damage', createAttackResponse.damage)

    
        })
    
        
        it('update:api Attack', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, admin, {"name":"Attack/name/unng0w8","type":"Attack/type/ahqo5hur","damage":31927})
                // createModelLine: end  
            
    const updateAttackResponse = await server.put('/api/attack/' + createAttackResponse.id,
        {
	"name": "Attack/name/3i0u0l3q",
	"type": "Attack/type/9a2d02ts",
	"damage": 935430
}
      , token);

    expect(updateAttackResponse).not.toHaveProperty('errors')
expect(updateAttackResponse).toHaveProperty('body.updateAttack.name', 'Attack/name/3i0u0l3q')
expect(updateAttackResponse).toHaveProperty('body.updateAttack.type', 'Attack/type/9a2d02ts')
expect(updateAttackResponse).toHaveProperty('body.updateAttack.damage', 935430)
    
        })
    
        
        it('remove:api Attack', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, admin, {"name":"Attack/name/mlh8cogu","type":"Attack/type/h4h62r6p","damage":117724})
                // createModelLine: end  
            const removeAttackMutation = `mutation RemoveAttack(){
        removeAttack() {
           id
        }
    }`
    
    const removeAttackResponse = await server.mutate({
        mutation: removeAttackMutation,
        variables: { id:createAttackResponse.id }
      }, token);

      expect(removeAttackResponse).not.toHaveProperty('errors')

          
          const attackCheck = await server.entry.models['attack'].findById(createAttackResponse.id)
          expect(attackCheck).toBeNull()
    
    
        })
    
        
        it('all:api Attack', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, admin, {"name":"Attack/name/806pzeti","type":"Attack/type/v752dxz4","damage":885819})
                // createModelLine: end

                // createModelLine: start
                const createAttackResponse2 = await createAttack(server, admin, {"name":"Attack/name/eezcjtm","type":"Attack/type/l2fguey3","damage":200464})
                // createModelLine: end  
             const allAttackResponse = await server.get('/api/attack/all', token);
expect(allAttackResponse.body.allAttack).toEqual(expect.arrayContaining([
        expect.objectContaining({name: createAttackResponse.name,type: createAttackResponse.type,damage: createAttackResponse.damage}),
        expect.objectContaining({name: createAttackResponse2.name,type: createAttackResponse2.type,damage: createAttackResponse2.damage})
    ]))
        })
    
    })


    describe('user:graphql', ()=>{
        
        it('create Attack', async()=>{
            const token = user.token
              
            const data = {
	"name": "Attack/name/34nt4wns",
	"type": "Attack/type/42aqlybh",
	"damage": 425759
}
const createAttackMutation = `mutation CreateAttack($name: String!,$type: String!,$damage: Int!){
        createAttack(name: $name,type: $type,damage: $damage) {
           name,type,damage
        }
    }`
    
    const createAttackResponse = await server.mutate({
        mutation: createAttackMutation,
        variables: data
      }, token);
    expect(createAttackResponse).not.toHaveProperty('errors')
expect(createAttackResponse).toHaveProperty('data.createAttack.name', 'Attack/name/34nt4wns')
expect(createAttackResponse).toHaveProperty('data.createAttack.type', 'Attack/type/42aqlybh')
expect(createAttackResponse).toHaveProperty('data.createAttack.damage', 425759)
        })
    
        
        it('one Attack', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, user, {"name":"Attack/name/at939neb","type":"Attack/type/jjr4s51q","damage":486110})
                // createModelLine: end  
            const oneAttackQuery = `query Attack($id: ID!){
        Attack(id: $id) {
            name,type,damage
        }
    }`
    
    const oneAttackResponse = await server.query({
        query: oneAttackQuery,
        variables: { id: createAttackResponse.id}
      }, token);

      expect(oneAttackResponse).not.toHaveProperty('errors')
expect(oneAttackResponse).toHaveProperty('data.Attack.name', createAttackResponse.name)
expect(oneAttackResponse).toHaveProperty('data.Attack.type', createAttackResponse.type)
expect(oneAttackResponse).toHaveProperty('data.Attack.damage', createAttackResponse.damage)

    
        })
    
        
        it('update Attack', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, user, {"name":"Attack/name/n54e64ck","type":"Attack/type/cp2s9r1","damage":927850})
                // createModelLine: end  
            const updateAttackMutation = `mutation UpdateAttack($name: String!,$type: String!,$damage: Int!){
        updateAttack(name: $name,type: $type,damage: $damage) {
           name,type,damage
        }
    }`
    
    const updateAttackResponse = await server.mutate({
        mutation: updateAttackMutation,
        variables: {
	"name": "Attack/name/cgxtq7s9",
	"type": "Attack/type/8huasiei",
	"damage": 477318
}
      }, token);

    expect(updateAttackResponse).not.toHaveProperty('errors')
expect(updateAttackResponse).toHaveProperty('data.updateAttack.name', 'Attack/name/cgxtq7s9')
expect(updateAttackResponse).toHaveProperty('data.updateAttack.type', 'Attack/type/8huasiei')
expect(updateAttackResponse).toHaveProperty('data.updateAttack.damage', 477318)
    
        })
    
        
        it('remove Attack', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, user, {"name":"Attack/name/498zzv5r","type":"Attack/type/b5edneji","damage":325116})
                // createModelLine: end  
            const removeAttackMutation = `mutation RemoveAttack(){
        removeAttack() {
           id
        }
    }`
    
    const removeAttackResponse = await server.mutate({
        mutation: removeAttackMutation,
        variables: { id:createAttackResponse.id }
      }, token);

      expect(removeAttackResponse).not.toHaveProperty('errors')

          
          const attackCheck = await server.entry.models['attack'].findById(createAttackResponse.id)
          expect(attackCheck).toBeNull()
    
    
        })
    
        
        it('all Attack', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, user, {"name":"Attack/name/7mqk24zl","type":"Attack/type/dw8v3nb7","damage":412350})
                // createModelLine: end

                // createModelLine: start
                const createAttackResponse2 = await createAttack(server, user, {"name":"Attack/name/w8f3udia","type":"Attack/type/dfkijg","damage":482354})
                // createModelLine: end  
            const allAttackQuery = `query allAttack {
        allAttack {
            name,type,damage
        }
    }`
    
    const allAttackResponse = await server.query({
        query: allAttackQuery,
        variables: { id: createAttackResponse.id}
      }, token)

    
expect(allAttackResponse.data.allAttack).toEqual(expect.arrayContaining([
        expect.objectContaining({name: createAttackResponse.name,type: createAttackResponse.type,damage: createAttackResponse.damage}),
        expect.objectContaining({name: createAttackResponse2.name,type: createAttackResponse2.type,damage: createAttackResponse2.damage})
    ]))
        })
    
    })

    describe('user:api', ()=>{
        
        it('create:api Attack', async()=>{
            const token = user.token
              
            const data = {
	"name": "Attack/name/9kl5pwn",
	"type": "Attack/type/srns75eo",
	"damage": 874963
}
    const createAttackResponse = await server.post('/api/attack', data ,token);
      
      expect(createAttackResponse).not.toHaveProperty('errors')
expect(createAttackResponse).toHaveProperty('body.createAttack.name', 'Attack/name/9kl5pwn')
expect(createAttackResponse).toHaveProperty('body.createAttack.type', 'Attack/type/srns75eo')
expect(createAttackResponse).toHaveProperty('body.createAttack.damage', 874963)
    
        })
    
        
        it('one:api Attack', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, user, {"name":"Attack/name/kckj2vsd","type":"Attack/type/9z8va2hz","damage":380857})
                // createModelLine: end  
            
      const oneAttackResponse = await server.get('/api/attack/' + createAttackResponse.id, token);

      expect(oneAttackResponse).not.toHaveProperty('errors')
expect(oneAttackResponse).toHaveProperty('body.attack.name', createAttackResponse.name)
expect(oneAttackResponse).toHaveProperty('body.attack.type', createAttackResponse.type)
expect(oneAttackResponse).toHaveProperty('body.attack.damage', createAttackResponse.damage)

    
        })
    
        
        it('update:api Attack', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, user, {"name":"Attack/name/vsru1hcj","type":"Attack/type/5nbeavl","damage":508287})
                // createModelLine: end  
            
    const updateAttackResponse = await server.put('/api/attack/' + createAttackResponse.id,
        {
	"name": "Attack/name/s86hgas",
	"type": "Attack/type/x31h64v",
	"damage": 71821
}
      , token);

    expect(updateAttackResponse).not.toHaveProperty('errors')
expect(updateAttackResponse).toHaveProperty('body.updateAttack.name', 'Attack/name/s86hgas')
expect(updateAttackResponse).toHaveProperty('body.updateAttack.type', 'Attack/type/x31h64v')
expect(updateAttackResponse).toHaveProperty('body.updateAttack.damage', 71821)
    
        })
    
        
        it('remove:api Attack', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, user, {"name":"Attack/name/iaxh46o8","type":"Attack/type/esk4s2b","damage":772227})
                // createModelLine: end  
            const removeAttackMutation = `mutation RemoveAttack(){
        removeAttack() {
           id
        }
    }`
    
    const removeAttackResponse = await server.mutate({
        mutation: removeAttackMutation,
        variables: { id:createAttackResponse.id }
      }, token);

      expect(removeAttackResponse).not.toHaveProperty('errors')

          
          const attackCheck = await server.entry.models['attack'].findById(createAttackResponse.id)
          expect(attackCheck).toBeNull()
    
    
        })
    
        
        it('all:api Attack', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, user, {"name":"Attack/name/rq16odpp","type":"Attack/type/xdlz938n","damage":681531})
                // createModelLine: end

                // createModelLine: start
                const createAttackResponse2 = await createAttack(server, user, {"name":"Attack/name/1wf4ju4w","type":"Attack/type/h4jdd058","damage":6452})
                // createModelLine: end  
             const allAttackResponse = await server.get('/api/attack/all', token);
expect(allAttackResponse.body.allAttack).toEqual(expect.arrayContaining([
        expect.objectContaining({name: createAttackResponse.name,type: createAttackResponse.type,damage: createAttackResponse.damage}),
        expect.objectContaining({name: createAttackResponse2.name,type: createAttackResponse2.type,damage: createAttackResponse2.damage})
    ]))
        })
    
    })


    describe('pub:graphql', ()=>{
        
        it('create Attack', async()=>{
            const token = pub.token
              
            const data = {
	"name": "Attack/name/ftwkssyn",
	"type": "Attack/type/o7jsv2ep",
	"damage": 948286
}
const createAttackMutation = `mutation CreateAttack($name: String!,$type: String!,$damage: Int!){
        createAttack(name: $name,type: $type,damage: $damage) {
           name,type,damage
        }
    }`
    
    const createAttackResponse = await server.mutate({
        mutation: createAttackMutation,
        variables: data
      }, token);
    expect(createAttackResponse).not.toHaveProperty('errors')
expect(createAttackResponse).toHaveProperty('data.createAttack.name', 'Attack/name/ftwkssyn')
expect(createAttackResponse).toHaveProperty('data.createAttack.type', 'Attack/type/o7jsv2ep')
expect(createAttackResponse).toHaveProperty('data.createAttack.damage', 948286)
        })
    
        
        it('one Attack', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, pub, {"name":"Attack/name/lytqysyi","type":"Attack/type/bnxmo92","damage":273770})
                // createModelLine: end  
            const oneAttackQuery = `query Attack($id: ID!){
        Attack(id: $id) {
            name,type,damage
        }
    }`
    
    const oneAttackResponse = await server.query({
        query: oneAttackQuery,
        variables: { id: createAttackResponse.id}
      }, token);

      expect(oneAttackResponse).not.toHaveProperty('errors')
expect(oneAttackResponse).toHaveProperty('data.Attack.name', createAttackResponse.name)
expect(oneAttackResponse).toHaveProperty('data.Attack.type', createAttackResponse.type)
expect(oneAttackResponse).toHaveProperty('data.Attack.damage', createAttackResponse.damage)

    
        })
    
        
        it('update Attack', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, pub, {"name":"Attack/name/6zuk4nzo","type":"Attack/type/0gy5h4pj","damage":59659})
                // createModelLine: end  
            const updateAttackMutation = `mutation UpdateAttack($name: String!,$type: String!,$damage: Int!){
        updateAttack(name: $name,type: $type,damage: $damage) {
           name,type,damage
        }
    }`
    
    const updateAttackResponse = await server.mutate({
        mutation: updateAttackMutation,
        variables: {
	"name": "Attack/name/onriuxxm",
	"type": "Attack/type/8of1nkks",
	"damage": 131923
}
      }, token);

    expect(updateAttackResponse).not.toHaveProperty('errors')
expect(updateAttackResponse).toHaveProperty('data.updateAttack.name', 'Attack/name/onriuxxm')
expect(updateAttackResponse).toHaveProperty('data.updateAttack.type', 'Attack/type/8of1nkks')
expect(updateAttackResponse).toHaveProperty('data.updateAttack.damage', 131923)
    
        })
    
        
        it('remove Attack', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, pub, {"name":"Attack/name/a3r336ig","type":"Attack/type/rmyq5o5i","damage":833109})
                // createModelLine: end  
            const removeAttackMutation = `mutation RemoveAttack(){
        removeAttack() {
           id
        }
    }`
    
    const removeAttackResponse = await server.mutate({
        mutation: removeAttackMutation,
        variables: { id:createAttackResponse.id }
      }, token);

      expect(removeAttackResponse).not.toHaveProperty('errors')

          
          const attackCheck = await server.entry.models['attack'].findById(createAttackResponse.id)
          expect(attackCheck).toBeNull()
    
    
        })
    
        
        it('all Attack', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, pub, {"name":"Attack/name/gsjtgk46","type":"Attack/type/w5ls4unp","damage":987988})
                // createModelLine: end

                // createModelLine: start
                const createAttackResponse2 = await createAttack(server, pub, {"name":"Attack/name/q5itgjyo","type":"Attack/type/2m5idrf9","damage":567847})
                // createModelLine: end  
            const allAttackQuery = `query allAttack {
        allAttack {
            name,type,damage
        }
    }`
    
    const allAttackResponse = await server.query({
        query: allAttackQuery,
        variables: { id: createAttackResponse.id}
      }, token)

    
expect(allAttackResponse.data.allAttack).toEqual(expect.arrayContaining([
        expect.objectContaining({name: createAttackResponse.name,type: createAttackResponse.type,damage: createAttackResponse.damage}),
        expect.objectContaining({name: createAttackResponse2.name,type: createAttackResponse2.type,damage: createAttackResponse2.damage})
    ]))
        })
    
    })

    describe('pub:api', ()=>{
        
        it('create:api Attack', async()=>{
            const token = pub.token
              
            const data = {
	"name": "Attack/name/2qrnpqgd",
	"type": "Attack/type/p9g0wcw4",
	"damage": 935769
}
    const createAttackResponse = await server.post('/api/attack', data ,token);
      
      expect(createAttackResponse).not.toHaveProperty('errors')
expect(createAttackResponse).toHaveProperty('body.createAttack.name', 'Attack/name/2qrnpqgd')
expect(createAttackResponse).toHaveProperty('body.createAttack.type', 'Attack/type/p9g0wcw4')
expect(createAttackResponse).toHaveProperty('body.createAttack.damage', 935769)
    
        })
    
        
        it('one:api Attack', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, pub, {"name":"Attack/name/qv1bvdv","type":"Attack/type/gwc3gqn","damage":191305})
                // createModelLine: end  
            
      const oneAttackResponse = await server.get('/api/attack/' + createAttackResponse.id, token);

      expect(oneAttackResponse).not.toHaveProperty('errors')
expect(oneAttackResponse).toHaveProperty('body.attack.name', createAttackResponse.name)
expect(oneAttackResponse).toHaveProperty('body.attack.type', createAttackResponse.type)
expect(oneAttackResponse).toHaveProperty('body.attack.damage', createAttackResponse.damage)

    
        })
    
        
        it('update:api Attack', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, pub, {"name":"Attack/name/nwq43n8k","type":"Attack/type/mqcz55fh","damage":784959})
                // createModelLine: end  
            
    const updateAttackResponse = await server.put('/api/attack/' + createAttackResponse.id,
        {
	"name": "Attack/name/fvpsagwt",
	"type": "Attack/type/criekel",
	"damage": 849038
}
      , token);

    expect(updateAttackResponse).not.toHaveProperty('errors')
expect(updateAttackResponse).toHaveProperty('body.updateAttack.name', 'Attack/name/fvpsagwt')
expect(updateAttackResponse).toHaveProperty('body.updateAttack.type', 'Attack/type/criekel')
expect(updateAttackResponse).toHaveProperty('body.updateAttack.damage', 849038)
    
        })
    
        
        it('remove:api Attack', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, pub, {"name":"Attack/name/urahe2oi","type":"Attack/type/acrkl3hu","damage":367035})
                // createModelLine: end  
            const removeAttackMutation = `mutation RemoveAttack(){
        removeAttack() {
           id
        }
    }`
    
    const removeAttackResponse = await server.mutate({
        mutation: removeAttackMutation,
        variables: { id:createAttackResponse.id }
      }, token);

      expect(removeAttackResponse).not.toHaveProperty('errors')

          
          const attackCheck = await server.entry.models['attack'].findById(createAttackResponse.id)
          expect(attackCheck).toBeNull()
    
    
        })
    
        
        it('all:api Attack', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createAttackResponse = await createAttack(server, pub, {"name":"Attack/name/9tsh5puo","type":"Attack/type/wijnous","damage":505735})
                // createModelLine: end

                // createModelLine: start
                const createAttackResponse2 = await createAttack(server, pub, {"name":"Attack/name/6y88blfj","type":"Attack/type/2ug7rqyq","damage":289047})
                // createModelLine: end  
             const allAttackResponse = await server.get('/api/attack/all', token);
expect(allAttackResponse.body.allAttack).toEqual(expect.arrayContaining([
        expect.objectContaining({name: createAttackResponse.name,type: createAttackResponse.type,damage: createAttackResponse.damage}),
        expect.objectContaining({name: createAttackResponse2.name,type: createAttackResponse2.type,damage: createAttackResponse2.damage})
    ]))
        })
    
    })

        })
    

        describe('AttackFields', () => {
             
    describe('admin:graphql', ()=>{
        
        it('create AttackFields', async()=>{
            const token = admin.token
              
            const data = {}
const createAttackFieldsMutation = `mutation CreateAttackFields(){
        createAttackFields() {
           
        }
    }`
    
    const createAttackFieldsResponse = await server.mutate({
        mutation: createAttackFieldsMutation,
        variables: data
      }, token);
    expect(createAttackFieldsResponse).not.toHaveProperty('errors')
        })
    
        
        it('one AttackFields', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, admin, {})
                // createModelLine: end  
            const oneAttackFieldsQuery = `query AttackFields($id: ID!){
        AttackFields(id: $id) {
            fast{name,type,damage},special{name,type,damage}
        }
    }`
    
    const oneAttackFieldsResponse = await server.query({
        query: oneAttackFieldsQuery,
        variables: { id: createAttackFieldsResponse.id}
      }, token);

      expect(oneAttackFieldsResponse).not.toHaveProperty('errors')
expect(oneAttackFieldsResponse.data.AttackFields.fast).toEqual(expect.arrayContaining([
	expect.objectContaining({}),
	expect.objectContaining({})]))
expect(oneAttackFieldsResponse).toHaveProperty('data.AttackFields.fast.0.id')
expect(oneAttackFieldsResponse).toHaveProperty('data.AttackFields.fast.1.id')
expect(oneAttackFieldsResponse.data.AttackFields.special).toEqual(expect.arrayContaining([
	expect.objectContaining({}),
	expect.objectContaining({})]))
expect(oneAttackFieldsResponse).toHaveProperty('data.AttackFields.special.0.id')
expect(oneAttackFieldsResponse).toHaveProperty('data.AttackFields.special.1.id')

    
        })
    
        
        it('update AttackFields', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, admin, {})
                // createModelLine: end  
            const updateAttackFieldsMutation = `mutation UpdateAttackFields(){
        updateAttackFields() {
           
        }
    }`
    
    const updateAttackFieldsResponse = await server.mutate({
        mutation: updateAttackFieldsMutation,
        variables: {}
      }, token);

    expect(updateAttackFieldsResponse).not.toHaveProperty('errors')
    
        })
    
        
        it('remove AttackFields', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, admin, {})
                // createModelLine: end  
            const removeAttackFieldsMutation = `mutation RemoveAttackFields(){
        removeAttackFields() {
           id
        }
    }`
    
    const removeAttackFieldsResponse = await server.mutate({
        mutation: removeAttackFieldsMutation,
        variables: { id:createAttackFieldsResponse.id }
      }, token);

      expect(removeAttackFieldsResponse).not.toHaveProperty('errors')

          
          const attackFieldsCheck = await server.entry.models['attackFields'].findById(createAttackFieldsResponse.id)
          expect(attackFieldsCheck).toBeNull()
    
    
        })
    
        
        it('all AttackFields', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, admin, {})
                // createModelLine: end

                // createModelLine: start
                const createAttackFieldsResponse2 = await createAttackFields(server, admin, {})
                // createModelLine: end  
            const allAttackFieldsQuery = `query allAttackFields {
        allAttackFields {
            fast{name,type,damage},special{name,type,damage}
        }
    }`
    
    const allAttackFieldsResponse = await server.query({
        query: allAttackFieldsQuery,
        variables: { id: createAttackFieldsResponse.id}
      }, token)

    
expect(allAttackFieldsResponse.data.allAttackFields).toEqual(expect.arrayContaining([
        expect.objectContaining({}),
        expect.objectContaining({})
    ]))
        })
    
    })

    describe('admin:api', ()=>{
        
        it('create:api AttackFields', async()=>{
            const token = admin.token
              
            const data = {}
    const createAttackFieldsResponse = await server.post('/api/attackFields', data ,token);
      
      expect(createAttackFieldsResponse).not.toHaveProperty('errors')
    
        })
    
        
        it('one:api AttackFields', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, admin, {})
                // createModelLine: end  
            
      const oneAttackFieldsResponse = await server.get('/api/attackFields/' + createAttackFieldsResponse.id, token);

      expect(oneAttackFieldsResponse).not.toHaveProperty('errors')
expect(oneAttackFieldsResponse.body.attackFields.fast).toEqual(expect.arrayContaining([
	expect.objectContaining({}),
	expect.objectContaining({})]))
expect(oneAttackFieldsResponse).toHaveProperty('body.attackFields.fast.0.id')
expect(oneAttackFieldsResponse).toHaveProperty('body.attackFields.fast.1.id')
expect(oneAttackFieldsResponse.body.attackFields.special).toEqual(expect.arrayContaining([
	expect.objectContaining({}),
	expect.objectContaining({})]))
expect(oneAttackFieldsResponse).toHaveProperty('body.attackFields.special.0.id')
expect(oneAttackFieldsResponse).toHaveProperty('body.attackFields.special.1.id')

    
        })
    
        
        it('update:api AttackFields', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, admin, {})
                // createModelLine: end  
            
    const updateAttackFieldsResponse = await server.put('/api/attackFields/' + createAttackFieldsResponse.id,
        {}
      , token);

    expect(updateAttackFieldsResponse).not.toHaveProperty('errors')
    
        })
    
        
        it('remove:api AttackFields', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, admin, {})
                // createModelLine: end  
            const removeAttackFieldsMutation = `mutation RemoveAttackFields(){
        removeAttackFields() {
           id
        }
    }`
    
    const removeAttackFieldsResponse = await server.mutate({
        mutation: removeAttackFieldsMutation,
        variables: { id:createAttackFieldsResponse.id }
      }, token);

      expect(removeAttackFieldsResponse).not.toHaveProperty('errors')

          
          const attackFieldsCheck = await server.entry.models['attackFields'].findById(createAttackFieldsResponse.id)
          expect(attackFieldsCheck).toBeNull()
    
    
        })
    
        
        it('all:api AttackFields', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, admin, {})
                // createModelLine: end

                // createModelLine: start
                const createAttackFieldsResponse2 = await createAttackFields(server, admin, {})
                // createModelLine: end  
             const allAttackFieldsResponse = await server.get('/api/attackFields/all', token);
expect(allAttackFieldsResponse.body.allAttackFields).toEqual(expect.arrayContaining([
        expect.objectContaining({}),
        expect.objectContaining({})
    ]))
        })
    
    })


    describe('user:graphql', ()=>{
        
        it('create AttackFields', async()=>{
            const token = user.token
              
            const data = {}
const createAttackFieldsMutation = `mutation CreateAttackFields(){
        createAttackFields() {
           
        }
    }`
    
    const createAttackFieldsResponse = await server.mutate({
        mutation: createAttackFieldsMutation,
        variables: data
      }, token);
    expect(createAttackFieldsResponse).not.toHaveProperty('errors')
        })
    
        
        it('one AttackFields', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, user, {})
                // createModelLine: end  
            const oneAttackFieldsQuery = `query AttackFields($id: ID!){
        AttackFields(id: $id) {
            fast{name,type,damage},special{name,type,damage}
        }
    }`
    
    const oneAttackFieldsResponse = await server.query({
        query: oneAttackFieldsQuery,
        variables: { id: createAttackFieldsResponse.id}
      }, token);

      expect(oneAttackFieldsResponse).not.toHaveProperty('errors')
expect(oneAttackFieldsResponse.data.AttackFields.fast).toEqual(expect.arrayContaining([
	expect.objectContaining({}),
	expect.objectContaining({})]))
expect(oneAttackFieldsResponse).toHaveProperty('data.AttackFields.fast.0.id')
expect(oneAttackFieldsResponse).toHaveProperty('data.AttackFields.fast.1.id')
expect(oneAttackFieldsResponse.data.AttackFields.special).toEqual(expect.arrayContaining([
	expect.objectContaining({}),
	expect.objectContaining({})]))
expect(oneAttackFieldsResponse).toHaveProperty('data.AttackFields.special.0.id')
expect(oneAttackFieldsResponse).toHaveProperty('data.AttackFields.special.1.id')

    
        })
    
        
        it('update AttackFields', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, user, {})
                // createModelLine: end  
            const updateAttackFieldsMutation = `mutation UpdateAttackFields(){
        updateAttackFields() {
           
        }
    }`
    
    const updateAttackFieldsResponse = await server.mutate({
        mutation: updateAttackFieldsMutation,
        variables: {}
      }, token);

    expect(updateAttackFieldsResponse).not.toHaveProperty('errors')
    
        })
    
        
        it('remove AttackFields', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, user, {})
                // createModelLine: end  
            const removeAttackFieldsMutation = `mutation RemoveAttackFields(){
        removeAttackFields() {
           id
        }
    }`
    
    const removeAttackFieldsResponse = await server.mutate({
        mutation: removeAttackFieldsMutation,
        variables: { id:createAttackFieldsResponse.id }
      }, token);

      expect(removeAttackFieldsResponse).not.toHaveProperty('errors')

          
          const attackFieldsCheck = await server.entry.models['attackFields'].findById(createAttackFieldsResponse.id)
          expect(attackFieldsCheck).toBeNull()
    
    
        })
    
        
        it('all AttackFields', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, user, {})
                // createModelLine: end

                // createModelLine: start
                const createAttackFieldsResponse2 = await createAttackFields(server, user, {})
                // createModelLine: end  
            const allAttackFieldsQuery = `query allAttackFields {
        allAttackFields {
            fast{name,type,damage},special{name,type,damage}
        }
    }`
    
    const allAttackFieldsResponse = await server.query({
        query: allAttackFieldsQuery,
        variables: { id: createAttackFieldsResponse.id}
      }, token)

    
expect(allAttackFieldsResponse.data.allAttackFields).toEqual(expect.arrayContaining([
        expect.objectContaining({}),
        expect.objectContaining({})
    ]))
        })
    
    })

    describe('user:api', ()=>{
        
        it('create:api AttackFields', async()=>{
            const token = user.token
              
            const data = {}
    const createAttackFieldsResponse = await server.post('/api/attackFields', data ,token);
      
      expect(createAttackFieldsResponse).not.toHaveProperty('errors')
    
        })
    
        
        it('one:api AttackFields', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, user, {})
                // createModelLine: end  
            
      const oneAttackFieldsResponse = await server.get('/api/attackFields/' + createAttackFieldsResponse.id, token);

      expect(oneAttackFieldsResponse).not.toHaveProperty('errors')
expect(oneAttackFieldsResponse.body.attackFields.fast).toEqual(expect.arrayContaining([
	expect.objectContaining({}),
	expect.objectContaining({})]))
expect(oneAttackFieldsResponse).toHaveProperty('body.attackFields.fast.0.id')
expect(oneAttackFieldsResponse).toHaveProperty('body.attackFields.fast.1.id')
expect(oneAttackFieldsResponse.body.attackFields.special).toEqual(expect.arrayContaining([
	expect.objectContaining({}),
	expect.objectContaining({})]))
expect(oneAttackFieldsResponse).toHaveProperty('body.attackFields.special.0.id')
expect(oneAttackFieldsResponse).toHaveProperty('body.attackFields.special.1.id')

    
        })
    
        
        it('update:api AttackFields', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, user, {})
                // createModelLine: end  
            
    const updateAttackFieldsResponse = await server.put('/api/attackFields/' + createAttackFieldsResponse.id,
        {}
      , token);

    expect(updateAttackFieldsResponse).not.toHaveProperty('errors')
    
        })
    
        
        it('remove:api AttackFields', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, user, {})
                // createModelLine: end  
            const removeAttackFieldsMutation = `mutation RemoveAttackFields(){
        removeAttackFields() {
           id
        }
    }`
    
    const removeAttackFieldsResponse = await server.mutate({
        mutation: removeAttackFieldsMutation,
        variables: { id:createAttackFieldsResponse.id }
      }, token);

      expect(removeAttackFieldsResponse).not.toHaveProperty('errors')

          
          const attackFieldsCheck = await server.entry.models['attackFields'].findById(createAttackFieldsResponse.id)
          expect(attackFieldsCheck).toBeNull()
    
    
        })
    
        
        it('all:api AttackFields', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, user, {})
                // createModelLine: end

                // createModelLine: start
                const createAttackFieldsResponse2 = await createAttackFields(server, user, {})
                // createModelLine: end  
             const allAttackFieldsResponse = await server.get('/api/attackFields/all', token);
expect(allAttackFieldsResponse.body.allAttackFields).toEqual(expect.arrayContaining([
        expect.objectContaining({}),
        expect.objectContaining({})
    ]))
        })
    
    })


    describe('pub:graphql', ()=>{
        
        it('create AttackFields', async()=>{
            const token = pub.token
              
            const data = {}
const createAttackFieldsMutation = `mutation CreateAttackFields(){
        createAttackFields() {
           
        }
    }`
    
    const createAttackFieldsResponse = await server.mutate({
        mutation: createAttackFieldsMutation,
        variables: data
      }, token);
    expect(createAttackFieldsResponse).not.toHaveProperty('errors')
        })
    
        
        it('one AttackFields', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, pub, {})
                // createModelLine: end  
            const oneAttackFieldsQuery = `query AttackFields($id: ID!){
        AttackFields(id: $id) {
            fast{name,type,damage},special{name,type,damage}
        }
    }`
    
    const oneAttackFieldsResponse = await server.query({
        query: oneAttackFieldsQuery,
        variables: { id: createAttackFieldsResponse.id}
      }, token);

      expect(oneAttackFieldsResponse).not.toHaveProperty('errors')
expect(oneAttackFieldsResponse.data.AttackFields.fast).toEqual(expect.arrayContaining([
	expect.objectContaining({}),
	expect.objectContaining({})]))
expect(oneAttackFieldsResponse).toHaveProperty('data.AttackFields.fast.0.id')
expect(oneAttackFieldsResponse).toHaveProperty('data.AttackFields.fast.1.id')
expect(oneAttackFieldsResponse.data.AttackFields.special).toEqual(expect.arrayContaining([
	expect.objectContaining({}),
	expect.objectContaining({})]))
expect(oneAttackFieldsResponse).toHaveProperty('data.AttackFields.special.0.id')
expect(oneAttackFieldsResponse).toHaveProperty('data.AttackFields.special.1.id')

    
        })
    
        
        it('update AttackFields', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, pub, {})
                // createModelLine: end  
            const updateAttackFieldsMutation = `mutation UpdateAttackFields(){
        updateAttackFields() {
           
        }
    }`
    
    const updateAttackFieldsResponse = await server.mutate({
        mutation: updateAttackFieldsMutation,
        variables: {}
      }, token);

    expect(updateAttackFieldsResponse).not.toHaveProperty('errors')
    
        })
    
        
        it('remove AttackFields', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, pub, {})
                // createModelLine: end  
            const removeAttackFieldsMutation = `mutation RemoveAttackFields(){
        removeAttackFields() {
           id
        }
    }`
    
    const removeAttackFieldsResponse = await server.mutate({
        mutation: removeAttackFieldsMutation,
        variables: { id:createAttackFieldsResponse.id }
      }, token);

      expect(removeAttackFieldsResponse).not.toHaveProperty('errors')

          
          const attackFieldsCheck = await server.entry.models['attackFields'].findById(createAttackFieldsResponse.id)
          expect(attackFieldsCheck).toBeNull()
    
    
        })
    
        
        it('all AttackFields', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, pub, {})
                // createModelLine: end

                // createModelLine: start
                const createAttackFieldsResponse2 = await createAttackFields(server, pub, {})
                // createModelLine: end  
            const allAttackFieldsQuery = `query allAttackFields {
        allAttackFields {
            fast{name,type,damage},special{name,type,damage}
        }
    }`
    
    const allAttackFieldsResponse = await server.query({
        query: allAttackFieldsQuery,
        variables: { id: createAttackFieldsResponse.id}
      }, token)

    
expect(allAttackFieldsResponse.data.allAttackFields).toEqual(expect.arrayContaining([
        expect.objectContaining({}),
        expect.objectContaining({})
    ]))
        })
    
    })

    describe('pub:api', ()=>{
        
        it('create:api AttackFields', async()=>{
            const token = pub.token
              
            const data = {}
    const createAttackFieldsResponse = await server.post('/api/attackFields', data ,token);
      
      expect(createAttackFieldsResponse).not.toHaveProperty('errors')
    
        })
    
        
        it('one:api AttackFields', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, pub, {})
                // createModelLine: end  
            
      const oneAttackFieldsResponse = await server.get('/api/attackFields/' + createAttackFieldsResponse.id, token);

      expect(oneAttackFieldsResponse).not.toHaveProperty('errors')
expect(oneAttackFieldsResponse.body.attackFields.fast).toEqual(expect.arrayContaining([
	expect.objectContaining({}),
	expect.objectContaining({})]))
expect(oneAttackFieldsResponse).toHaveProperty('body.attackFields.fast.0.id')
expect(oneAttackFieldsResponse).toHaveProperty('body.attackFields.fast.1.id')
expect(oneAttackFieldsResponse.body.attackFields.special).toEqual(expect.arrayContaining([
	expect.objectContaining({}),
	expect.objectContaining({})]))
expect(oneAttackFieldsResponse).toHaveProperty('body.attackFields.special.0.id')
expect(oneAttackFieldsResponse).toHaveProperty('body.attackFields.special.1.id')

    
        })
    
        
        it('update:api AttackFields', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, pub, {})
                // createModelLine: end  
            
    const updateAttackFieldsResponse = await server.put('/api/attackFields/' + createAttackFieldsResponse.id,
        {}
      , token);

    expect(updateAttackFieldsResponse).not.toHaveProperty('errors')
    
        })
    
        
        it('remove:api AttackFields', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, pub, {})
                // createModelLine: end  
            const removeAttackFieldsMutation = `mutation RemoveAttackFields(){
        removeAttackFields() {
           id
        }
    }`
    
    const removeAttackFieldsResponse = await server.mutate({
        mutation: removeAttackFieldsMutation,
        variables: { id:createAttackFieldsResponse.id }
      }, token);

      expect(removeAttackFieldsResponse).not.toHaveProperty('errors')

          
          const attackFieldsCheck = await server.entry.models['attackFields'].findById(createAttackFieldsResponse.id)
          expect(attackFieldsCheck).toBeNull()
    
    
        })
    
        
        it('all:api AttackFields', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createAttackFieldsResponse = await createAttackFields(server, pub, {})
                // createModelLine: end

                // createModelLine: start
                const createAttackFieldsResponse2 = await createAttackFields(server, pub, {})
                // createModelLine: end  
             const allAttackFieldsResponse = await server.get('/api/attackFields/all', token);
expect(allAttackFieldsResponse.body.allAttackFields).toEqual(expect.arrayContaining([
        expect.objectContaining({}),
        expect.objectContaining({})
    ]))
        })
    
    })

        })
    

        describe('Evolution', () => {
             
    describe('admin:graphql', ()=>{
        
        it('create Evolution', async()=>{
            const token = admin.token
              
            const data = {
	"updatedAt": "2021-09-14T22:38:30.989Z",
	"createdAt": "2022-08-16T22:19:25.400Z",
	"name": "Evolution/name/7xy4yvl"
}
const createEvolutionMutation = `mutation CreateEvolution($name: String!){
        createEvolution(name: $name) {
           name
        }
    }`
    
    const createEvolutionResponse = await server.mutate({
        mutation: createEvolutionMutation,
        variables: data
      }, token);
    expect(createEvolutionResponse).not.toHaveProperty('errors')
expect(createEvolutionResponse).toHaveProperty('data.createEvolution.name', 'Evolution/name/7xy4yvl')
        })
    
        
        it('one Evolution', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, admin, {"name":"Evolution/name/s2ude7ye"})
                // createModelLine: end  
            const oneEvolutionQuery = `query Evolution($id: ID!){
        Evolution(id: $id) {
            updatedAt,createdAt,id,name,pokemon{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},_pokemonEvo{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},_prevPokemonEvo{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},user{updatedAt,createdAt,id,email,password,verified,roles{id},files{id},_pokemon{id},_evolution{id},_pokemonType{id}}
        }
    }`
    
    const oneEvolutionResponse = await server.query({
        query: oneEvolutionQuery,
        variables: { id: createEvolutionResponse.id}
      }, token);

      expect(oneEvolutionResponse).not.toHaveProperty('errors')
expect(oneEvolutionResponse).toHaveProperty('data.Evolution.updatedAt')
expect(oneEvolutionResponse).toHaveProperty('data.Evolution.createdAt')
expect(oneEvolutionResponse).toHaveProperty('data.Evolution.id', createEvolutionResponse.id)
expect(oneEvolutionResponse).toHaveProperty('data.Evolution.name', createEvolutionResponse.name)
expect(oneEvolutionResponse).toHaveProperty('data.Evolution.pokemon')
expect(oneEvolutionResponse.data.Evolution._pokemonEvo).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createEvolutionResponse._pokemonEvo[0].id,evolutions:expect.objectContaining({id:oneEvolutionResponse.id})}),
	expect.objectContaining({id: createEvolutionResponse._pokemonEvo[1].id,evolutions:expect.objectContaining({id:oneEvolutionResponse.id})})]))
expect(oneEvolutionResponse).toHaveProperty('data.Evolution._pokemonEvo.0.id')
expect(oneEvolutionResponse).toHaveProperty('data.Evolution._pokemonEvo.1.id')
expect(oneEvolutionResponse.data.Evolution._prevPokemonEvo).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createEvolutionResponse._prevPokemonEvo[0].id,prevEvolutions:expect.objectContaining({id:oneEvolutionResponse.id})}),
	expect.objectContaining({id: createEvolutionResponse._prevPokemonEvo[1].id,prevEvolutions:expect.objectContaining({id:oneEvolutionResponse.id})})]))
expect(oneEvolutionResponse).toHaveProperty('data.Evolution._prevPokemonEvo.0.id')
expect(oneEvolutionResponse).toHaveProperty('data.Evolution._prevPokemonEvo.1.id')
expect(oneEvolutionResponse).toHaveProperty('data.Evolution.user')

    
        })
    
        
        it('update Evolution', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, admin, {"name":"Evolution/name/atxjd4gh"})
                // createModelLine: end  
            const updateEvolutionMutation = `mutation UpdateEvolution($id: ID!,$name: String!){
        updateEvolution(id: $id,name: $name) {
           id,name
        }
    }`
    
    const updateEvolutionResponse = await server.mutate({
        mutation: updateEvolutionMutation,
        variables: {
	"id": createEvolutionResponse.id,
	"name": "Evolution/name/q8lhnbj"
}
      }, token);

    expect(updateEvolutionResponse).not.toHaveProperty('errors')
expect(updateEvolutionResponse).toHaveProperty('data.updateEvolution.id', createEvolutionResponse.id)
expect(updateEvolutionResponse).toHaveProperty('data.updateEvolution.name', 'Evolution/name/q8lhnbj')
    
        })
    
        
        it('remove Evolution', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, admin, {"name":"Evolution/name/jei36n9"})
                // createModelLine: end  
            const removeEvolutionMutation = `mutation RemoveEvolution($id: ID!){
        removeEvolution(id: $id) {
           id
        }
    }`
    
    const removeEvolutionResponse = await server.mutate({
        mutation: removeEvolutionMutation,
        variables: { id:createEvolutionResponse.id }
      }, token);

      expect(removeEvolutionResponse).not.toHaveProperty('errors')
expect(removeEvolutionResponse).toHaveProperty('data.removeEvolution.id', createEvolutionResponse.id)

          
          const evolutionCheck = await server.entry.models['evolution'].findById(createEvolutionResponse.id)
          expect(evolutionCheck).toBeNull()
    
    
        })
    
        
        it('all Evolution', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, admin, {"name":"Evolution/name/fq2t6sdw"})
                // createModelLine: end

                // createModelLine: start
                const createEvolutionResponse2 = await createEvolution(server, admin, {"name":"Evolution/name/2zq5hm7"})
                // createModelLine: end  
            const allEvolutionQuery = `query allEvolution {
        allEvolution {
            updatedAt,createdAt,id,name,pokemon{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},_pokemonEvo{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},_prevPokemonEvo{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},user{updatedAt,createdAt,id,email,password,verified,roles{id},files{id},_pokemon{id},_evolution{id},_pokemonType{id}}
        }
    }`
    
    const allEvolutionResponse = await server.query({
        query: allEvolutionQuery,
        variables: { id: createEvolutionResponse.id}
      }, token)

    
expect(allEvolutionResponse.data.allEvolution).toEqual(expect.arrayContaining([
        expect.objectContaining({id: createEvolutionResponse.id,name: createEvolutionResponse.name}),
        expect.objectContaining({id: createEvolutionResponse2.id,name: createEvolutionResponse2.name})
    ]))
        })
    
    })

    describe('admin:api', ()=>{
        
        it('create:api Evolution', async()=>{
            const token = admin.token
              
            const data = {
	"updatedAt": "2022-01-24T23:50:43.780Z",
	"createdAt": "2021-08-04T22:46:44.896Z",
	"name": "Evolution/name/6lm26z4t"
}
    const createEvolutionResponse = await server.post('/api/evolution', data ,token);
      
      expect(createEvolutionResponse).not.toHaveProperty('errors')
expect(createEvolutionResponse).toHaveProperty('body.createEvolution.name', 'Evolution/name/6lm26z4t')
    
        })
    
        
        it('one:api Evolution', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, admin, {"name":"Evolution/name/ltogi5kc"})
                // createModelLine: end  
            
      const oneEvolutionResponse = await server.get('/api/evolution/' + createEvolutionResponse.id, token);

      expect(oneEvolutionResponse).not.toHaveProperty('errors')
expect(oneEvolutionResponse).toHaveProperty('body.evolution.updatedAt')
expect(oneEvolutionResponse).toHaveProperty('body.evolution.createdAt')
expect(oneEvolutionResponse).toHaveProperty('body.evolution.id', createEvolutionResponse.id)
expect(oneEvolutionResponse).toHaveProperty('body.evolution.name', createEvolutionResponse.name)
expect(oneEvolutionResponse).toHaveProperty('body.evolution.pokemon')
expect(oneEvolutionResponse.body.evolution._pokemonEvo).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createEvolutionResponse._pokemonEvo[0].id,evolutions:expect.objectContaining({id:oneEvolutionResponse.id})}),
	expect.objectContaining({id: createEvolutionResponse._pokemonEvo[1].id,evolutions:expect.objectContaining({id:oneEvolutionResponse.id})})]))
expect(oneEvolutionResponse).toHaveProperty('body.evolution._pokemonEvo.0.id')
expect(oneEvolutionResponse).toHaveProperty('body.evolution._pokemonEvo.1.id')
expect(oneEvolutionResponse.body.evolution._prevPokemonEvo).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createEvolutionResponse._prevPokemonEvo[0].id,prevEvolutions:expect.objectContaining({id:oneEvolutionResponse.id})}),
	expect.objectContaining({id: createEvolutionResponse._prevPokemonEvo[1].id,prevEvolutions:expect.objectContaining({id:oneEvolutionResponse.id})})]))
expect(oneEvolutionResponse).toHaveProperty('body.evolution._prevPokemonEvo.0.id')
expect(oneEvolutionResponse).toHaveProperty('body.evolution._prevPokemonEvo.1.id')
expect(oneEvolutionResponse).toHaveProperty('body.evolution.user')

    
        })
    
        
        it('update:api Evolution', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, admin, {"name":"Evolution/name/989wod09"})
                // createModelLine: end  
            
    const updateEvolutionResponse = await server.put('/api/evolution/' + createEvolutionResponse.id,
        {
	"id": createEvolutionResponse.id,
	"name": "Evolution/name/8ev9b93"
}
      , token);

    expect(updateEvolutionResponse).not.toHaveProperty('errors')
expect(updateEvolutionResponse).toHaveProperty('body.updateEvolution.id', createEvolutionResponse.id)
expect(updateEvolutionResponse).toHaveProperty('body.updateEvolution.name', 'Evolution/name/8ev9b93')
    
        })
    
        
        it('remove:api Evolution', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, admin, {"name":"Evolution/name/1rwp7a8k"})
                // createModelLine: end  
            const removeEvolutionMutation = `mutation RemoveEvolution($id: ID!){
        removeEvolution(id: $id) {
           id
        }
    }`
    
    const removeEvolutionResponse = await server.mutate({
        mutation: removeEvolutionMutation,
        variables: { id:createEvolutionResponse.id }
      }, token);

      expect(removeEvolutionResponse).not.toHaveProperty('errors')
expect(removeEvolutionResponse).toHaveProperty('data.removeEvolution.id', createEvolutionResponse.id)

          
          const evolutionCheck = await server.entry.models['evolution'].findById(createEvolutionResponse.id)
          expect(evolutionCheck).toBeNull()
    
    
        })
    
        
        it('all:api Evolution', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, admin, {"name":"Evolution/name/rsoha977"})
                // createModelLine: end

                // createModelLine: start
                const createEvolutionResponse2 = await createEvolution(server, admin, {"name":"Evolution/name/pw3qiwt7"})
                // createModelLine: end  
             const allEvolutionResponse = await server.get('/api/evolution/all', token);
expect(allEvolutionResponse.body.allEvolution).toEqual(expect.arrayContaining([
        expect.objectContaining({id: createEvolutionResponse.id,name: createEvolutionResponse.name}),
        expect.objectContaining({id: createEvolutionResponse2.id,name: createEvolutionResponse2.name})
    ]))
        })
    
    })


    describe('user:graphql', ()=>{
        
        it('create Evolution', async()=>{
            const token = user.token
              
            const data = {
	"updatedAt": "2021-12-18T23:48:29.176Z",
	"createdAt": "2022-02-13T23:34:56.748Z",
	"name": "Evolution/name/hzpamb85"
}
const createEvolutionMutation = `mutation CreateEvolution($name: String!){
        createEvolution(name: $name) {
           name
        }
    }`
    
    const createEvolutionResponse = await server.mutate({
        mutation: createEvolutionMutation,
        variables: data
      }, token);
    expect(createEvolutionResponse).not.toHaveProperty('errors')
expect(createEvolutionResponse).toHaveProperty('data.createEvolution.name', 'Evolution/name/hzpamb85')
        })
    
        
        it('one Evolution', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, user, {"name":"Evolution/name/g315hjpf"})
                // createModelLine: end  
            const oneEvolutionQuery = `query Evolution($id: ID!){
        Evolution(id: $id) {
            updatedAt,createdAt,id,name,pokemon{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},_pokemonEvo{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},_prevPokemonEvo{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},user{updatedAt,createdAt,id,email,password,verified,roles{id},files{id},_pokemon{id},_evolution{id},_pokemonType{id}}
        }
    }`
    
    const oneEvolutionResponse = await server.query({
        query: oneEvolutionQuery,
        variables: { id: createEvolutionResponse.id}
      }, token);

      expect(oneEvolutionResponse).not.toHaveProperty('errors')
expect(oneEvolutionResponse).toHaveProperty('data.Evolution.updatedAt')
expect(oneEvolutionResponse).toHaveProperty('data.Evolution.createdAt')
expect(oneEvolutionResponse).toHaveProperty('data.Evolution.id', createEvolutionResponse.id)
expect(oneEvolutionResponse).toHaveProperty('data.Evolution.name', createEvolutionResponse.name)
expect(oneEvolutionResponse).toHaveProperty('data.Evolution.pokemon')
expect(oneEvolutionResponse.data.Evolution._pokemonEvo).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createEvolutionResponse._pokemonEvo[0].id,evolutions:expect.objectContaining({id:oneEvolutionResponse.id})}),
	expect.objectContaining({id: createEvolutionResponse._pokemonEvo[1].id,evolutions:expect.objectContaining({id:oneEvolutionResponse.id})})]))
expect(oneEvolutionResponse).toHaveProperty('data.Evolution._pokemonEvo.0.id')
expect(oneEvolutionResponse).toHaveProperty('data.Evolution._pokemonEvo.1.id')
expect(oneEvolutionResponse.data.Evolution._prevPokemonEvo).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createEvolutionResponse._prevPokemonEvo[0].id,prevEvolutions:expect.objectContaining({id:oneEvolutionResponse.id})}),
	expect.objectContaining({id: createEvolutionResponse._prevPokemonEvo[1].id,prevEvolutions:expect.objectContaining({id:oneEvolutionResponse.id})})]))
expect(oneEvolutionResponse).toHaveProperty('data.Evolution._prevPokemonEvo.0.id')
expect(oneEvolutionResponse).toHaveProperty('data.Evolution._prevPokemonEvo.1.id')
expect(oneEvolutionResponse).toHaveProperty('data.Evolution.user')

    
        })
    
        
        it('update Evolution', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, user, {"name":"Evolution/name/id3jx1vo"})
                // createModelLine: end  
            const updateEvolutionMutation = `mutation UpdateEvolution($id: ID!,$name: String!){
        updateEvolution(id: $id,name: $name) {
           id,name
        }
    }`
    
    const updateEvolutionResponse = await server.mutate({
        mutation: updateEvolutionMutation,
        variables: {
	"id": createEvolutionResponse.id,
	"name": "Evolution/name/0cb0puo"
}
      }, token);

    expect(updateEvolutionResponse).not.toHaveProperty('errors')
expect(updateEvolutionResponse).toHaveProperty('data.updateEvolution.id', createEvolutionResponse.id)
expect(updateEvolutionResponse).toHaveProperty('data.updateEvolution.name', 'Evolution/name/0cb0puo')
    
        })
    
        
        it('remove Evolution', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, user, {"name":"Evolution/name/ezd3qor"})
                // createModelLine: end  
            const removeEvolutionMutation = `mutation RemoveEvolution($id: ID!){
        removeEvolution(id: $id) {
           id
        }
    }`
    
    const removeEvolutionResponse = await server.mutate({
        mutation: removeEvolutionMutation,
        variables: { id:createEvolutionResponse.id }
      }, token);

      expect(removeEvolutionResponse).not.toHaveProperty('errors')
expect(removeEvolutionResponse).toHaveProperty('data.removeEvolution.id', createEvolutionResponse.id)

          
          const evolutionCheck = await server.entry.models['evolution'].findById(createEvolutionResponse.id)
          expect(evolutionCheck).toBeNull()
    
    
        })
    
        
        it('all Evolution', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, user, {"name":"Evolution/name/7cysfluu"})
                // createModelLine: end

                // createModelLine: start
                const createEvolutionResponse2 = await createEvolution(server, user, {"name":"Evolution/name/5cf9jnab"})
                // createModelLine: end  
            const allEvolutionQuery = `query allEvolution {
        allEvolution {
            updatedAt,createdAt,id,name,pokemon{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},_pokemonEvo{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},_prevPokemonEvo{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},user{updatedAt,createdAt,id,email,password,verified,roles{id},files{id},_pokemon{id},_evolution{id},_pokemonType{id}}
        }
    }`
    
    const allEvolutionResponse = await server.query({
        query: allEvolutionQuery,
        variables: { id: createEvolutionResponse.id}
      }, token)

    
expect(allEvolutionResponse.data.allEvolution).toEqual(expect.arrayContaining([
        expect.objectContaining({id: createEvolutionResponse.id,name: createEvolutionResponse.name}),
        expect.objectContaining({id: createEvolutionResponse2.id,name: createEvolutionResponse2.name})
    ]))
        })
    
    })

    describe('user:api', ()=>{
        
        it('create:api Evolution', async()=>{
            const token = user.token
              
            const data = {
	"updatedAt": "2022-01-17T23:33:42.635Z",
	"createdAt": "2021-07-01T22:43:48.492Z",
	"name": "Evolution/name/tg7jqysc"
}
    const createEvolutionResponse = await server.post('/api/evolution', data ,token);
      
      expect(createEvolutionResponse).not.toHaveProperty('errors')
expect(createEvolutionResponse).toHaveProperty('body.createEvolution.name', 'Evolution/name/tg7jqysc')
    
        })
    
        
        it('one:api Evolution', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, user, {"name":"Evolution/name/dibulva7"})
                // createModelLine: end  
            
      const oneEvolutionResponse = await server.get('/api/evolution/' + createEvolutionResponse.id, token);

      expect(oneEvolutionResponse).not.toHaveProperty('errors')
expect(oneEvolutionResponse).toHaveProperty('body.evolution.updatedAt')
expect(oneEvolutionResponse).toHaveProperty('body.evolution.createdAt')
expect(oneEvolutionResponse).toHaveProperty('body.evolution.id', createEvolutionResponse.id)
expect(oneEvolutionResponse).toHaveProperty('body.evolution.name', createEvolutionResponse.name)
expect(oneEvolutionResponse).toHaveProperty('body.evolution.pokemon')
expect(oneEvolutionResponse.body.evolution._pokemonEvo).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createEvolutionResponse._pokemonEvo[0].id,evolutions:expect.objectContaining({id:oneEvolutionResponse.id})}),
	expect.objectContaining({id: createEvolutionResponse._pokemonEvo[1].id,evolutions:expect.objectContaining({id:oneEvolutionResponse.id})})]))
expect(oneEvolutionResponse).toHaveProperty('body.evolution._pokemonEvo.0.id')
expect(oneEvolutionResponse).toHaveProperty('body.evolution._pokemonEvo.1.id')
expect(oneEvolutionResponse.body.evolution._prevPokemonEvo).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createEvolutionResponse._prevPokemonEvo[0].id,prevEvolutions:expect.objectContaining({id:oneEvolutionResponse.id})}),
	expect.objectContaining({id: createEvolutionResponse._prevPokemonEvo[1].id,prevEvolutions:expect.objectContaining({id:oneEvolutionResponse.id})})]))
expect(oneEvolutionResponse).toHaveProperty('body.evolution._prevPokemonEvo.0.id')
expect(oneEvolutionResponse).toHaveProperty('body.evolution._prevPokemonEvo.1.id')
expect(oneEvolutionResponse).toHaveProperty('body.evolution.user')

    
        })
    
        
        it('update:api Evolution', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, user, {"name":"Evolution/name/f7ih8h4o"})
                // createModelLine: end  
            
    const updateEvolutionResponse = await server.put('/api/evolution/' + createEvolutionResponse.id,
        {
	"id": createEvolutionResponse.id,
	"name": "Evolution/name/u0zcw6n"
}
      , token);

    expect(updateEvolutionResponse).not.toHaveProperty('errors')
expect(updateEvolutionResponse).toHaveProperty('body.updateEvolution.id', createEvolutionResponse.id)
expect(updateEvolutionResponse).toHaveProperty('body.updateEvolution.name', 'Evolution/name/u0zcw6n')
    
        })
    
        
        it('remove:api Evolution', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, user, {"name":"Evolution/name/ca4c9e1e"})
                // createModelLine: end  
            const removeEvolutionMutation = `mutation RemoveEvolution($id: ID!){
        removeEvolution(id: $id) {
           id
        }
    }`
    
    const removeEvolutionResponse = await server.mutate({
        mutation: removeEvolutionMutation,
        variables: { id:createEvolutionResponse.id }
      }, token);

      expect(removeEvolutionResponse).not.toHaveProperty('errors')
expect(removeEvolutionResponse).toHaveProperty('data.removeEvolution.id', createEvolutionResponse.id)

          
          const evolutionCheck = await server.entry.models['evolution'].findById(createEvolutionResponse.id)
          expect(evolutionCheck).toBeNull()
    
    
        })
    
        
        it('all:api Evolution', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, user, {"name":"Evolution/name/z2cenlen"})
                // createModelLine: end

                // createModelLine: start
                const createEvolutionResponse2 = await createEvolution(server, user, {"name":"Evolution/name/qucejs28"})
                // createModelLine: end  
             const allEvolutionResponse = await server.get('/api/evolution/all', token);
expect(allEvolutionResponse.body.allEvolution).toEqual(expect.arrayContaining([
        expect.objectContaining({id: createEvolutionResponse.id,name: createEvolutionResponse.name}),
        expect.objectContaining({id: createEvolutionResponse2.id,name: createEvolutionResponse2.name})
    ]))
        })
    
    })


    describe('pub:graphql', ()=>{
        
        it('create Evolution', async()=>{
            const token = pub.token
              
            const data = {
	"updatedAt": "2021-05-27T22:33:03.015Z",
	"createdAt": "2021-02-15T23:57:28.743Z",
	"name": "Evolution/name/vajem2oo"
}
const createEvolutionMutation = `mutation CreateEvolution($name: String!){
        createEvolution(name: $name) {
           name
        }
    }`
    
    const createEvolutionResponse = await server.mutate({
        mutation: createEvolutionMutation,
        variables: data
      }, token);
    expect(createEvolutionResponse).not.toHaveProperty('errors')
expect(createEvolutionResponse).toHaveProperty('data.createEvolution.name', 'Evolution/name/vajem2oo')
        })
    
        
        it('one Evolution', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, pub, {"name":"Evolution/name/ewqowb74"})
                // createModelLine: end  
            const oneEvolutionQuery = `query Evolution($id: ID!){
        Evolution(id: $id) {
            updatedAt,createdAt,id,name,pokemon{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},_pokemonEvo{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},_prevPokemonEvo{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},user{updatedAt,createdAt,id,email,password,verified,roles{id},files{id},_pokemon{id},_evolution{id},_pokemonType{id}}
        }
    }`
    
    const oneEvolutionResponse = await server.query({
        query: oneEvolutionQuery,
        variables: { id: createEvolutionResponse.id}
      }, token);

      expect(oneEvolutionResponse).not.toHaveProperty('errors')
expect(oneEvolutionResponse).toHaveProperty('data.Evolution.updatedAt')
expect(oneEvolutionResponse).toHaveProperty('data.Evolution.createdAt')
expect(oneEvolutionResponse).toHaveProperty('data.Evolution.id', createEvolutionResponse.id)
expect(oneEvolutionResponse).toHaveProperty('data.Evolution.name', createEvolutionResponse.name)
expect(oneEvolutionResponse).toHaveProperty('data.Evolution.pokemon')
expect(oneEvolutionResponse.data.Evolution._pokemonEvo).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createEvolutionResponse._pokemonEvo[0].id,evolutions:expect.objectContaining({id:oneEvolutionResponse.id})}),
	expect.objectContaining({id: createEvolutionResponse._pokemonEvo[1].id,evolutions:expect.objectContaining({id:oneEvolutionResponse.id})})]))
expect(oneEvolutionResponse).toHaveProperty('data.Evolution._pokemonEvo.0.id')
expect(oneEvolutionResponse).toHaveProperty('data.Evolution._pokemonEvo.1.id')
expect(oneEvolutionResponse.data.Evolution._prevPokemonEvo).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createEvolutionResponse._prevPokemonEvo[0].id,prevEvolutions:expect.objectContaining({id:oneEvolutionResponse.id})}),
	expect.objectContaining({id: createEvolutionResponse._prevPokemonEvo[1].id,prevEvolutions:expect.objectContaining({id:oneEvolutionResponse.id})})]))
expect(oneEvolutionResponse).toHaveProperty('data.Evolution._prevPokemonEvo.0.id')
expect(oneEvolutionResponse).toHaveProperty('data.Evolution._prevPokemonEvo.1.id')
expect(oneEvolutionResponse).toHaveProperty('data.Evolution.user')

    
        })
    
        
        it('update Evolution', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, pub, {"name":"Evolution/name/zjhjmg9"})
                // createModelLine: end  
            const updateEvolutionMutation = `mutation UpdateEvolution($id: ID!,$name: String!){
        updateEvolution(id: $id,name: $name) {
           id,name
        }
    }`
    
    const updateEvolutionResponse = await server.mutate({
        mutation: updateEvolutionMutation,
        variables: {
	"id": createEvolutionResponse.id,
	"name": "Evolution/name/kred05p"
}
      }, token);

    expect(updateEvolutionResponse).not.toHaveProperty('errors')
expect(updateEvolutionResponse).toHaveProperty('data.updateEvolution.id', createEvolutionResponse.id)
expect(updateEvolutionResponse).toHaveProperty('data.updateEvolution.name', 'Evolution/name/kred05p')
    
        })
    
        
        it('remove Evolution', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, pub, {"name":"Evolution/name/vpj6gqhd"})
                // createModelLine: end  
            const removeEvolutionMutation = `mutation RemoveEvolution($id: ID!){
        removeEvolution(id: $id) {
           id
        }
    }`
    
    const removeEvolutionResponse = await server.mutate({
        mutation: removeEvolutionMutation,
        variables: { id:createEvolutionResponse.id }
      }, token);

      expect(removeEvolutionResponse).not.toHaveProperty('errors')
expect(removeEvolutionResponse).toHaveProperty('data.removeEvolution.id', createEvolutionResponse.id)

          
          const evolutionCheck = await server.entry.models['evolution'].findById(createEvolutionResponse.id)
          expect(evolutionCheck).toBeNull()
    
    
        })
    
        
        it('all Evolution', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, pub, {"name":"Evolution/name/1yla867"})
                // createModelLine: end

                // createModelLine: start
                const createEvolutionResponse2 = await createEvolution(server, pub, {"name":"Evolution/name/qbqsg2e"})
                // createModelLine: end  
            const allEvolutionQuery = `query allEvolution {
        allEvolution {
            updatedAt,createdAt,id,name,pokemon{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},_pokemonEvo{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},_prevPokemonEvo{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},user{updatedAt,createdAt,id,email,password,verified,roles{id},files{id},_pokemon{id},_evolution{id},_pokemonType{id}}
        }
    }`
    
    const allEvolutionResponse = await server.query({
        query: allEvolutionQuery,
        variables: { id: createEvolutionResponse.id}
      }, token)

    
expect(allEvolutionResponse.data.allEvolution).toEqual(expect.arrayContaining([
        expect.objectContaining({id: createEvolutionResponse.id,name: createEvolutionResponse.name}),
        expect.objectContaining({id: createEvolutionResponse2.id,name: createEvolutionResponse2.name})
    ]))
        })
    
    })

    describe('pub:api', ()=>{
        
        it('create:api Evolution', async()=>{
            const token = pub.token
              
            const data = {
	"updatedAt": "2022-01-05T23:26:25.726Z",
	"createdAt": "2021-01-09T23:10:29.838Z",
	"name": "Evolution/name/hujzcgph"
}
    const createEvolutionResponse = await server.post('/api/evolution', data ,token);
      
      expect(createEvolutionResponse).not.toHaveProperty('errors')
expect(createEvolutionResponse).toHaveProperty('body.createEvolution.name', 'Evolution/name/hujzcgph')
    
        })
    
        
        it('one:api Evolution', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, pub, {"name":"Evolution/name/kbgqh5aj"})
                // createModelLine: end  
            
      const oneEvolutionResponse = await server.get('/api/evolution/' + createEvolutionResponse.id, token);

      expect(oneEvolutionResponse).not.toHaveProperty('errors')
expect(oneEvolutionResponse).toHaveProperty('body.evolution.updatedAt')
expect(oneEvolutionResponse).toHaveProperty('body.evolution.createdAt')
expect(oneEvolutionResponse).toHaveProperty('body.evolution.id', createEvolutionResponse.id)
expect(oneEvolutionResponse).toHaveProperty('body.evolution.name', createEvolutionResponse.name)
expect(oneEvolutionResponse).toHaveProperty('body.evolution.pokemon')
expect(oneEvolutionResponse.body.evolution._pokemonEvo).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createEvolutionResponse._pokemonEvo[0].id,evolutions:expect.objectContaining({id:oneEvolutionResponse.id})}),
	expect.objectContaining({id: createEvolutionResponse._pokemonEvo[1].id,evolutions:expect.objectContaining({id:oneEvolutionResponse.id})})]))
expect(oneEvolutionResponse).toHaveProperty('body.evolution._pokemonEvo.0.id')
expect(oneEvolutionResponse).toHaveProperty('body.evolution._pokemonEvo.1.id')
expect(oneEvolutionResponse.body.evolution._prevPokemonEvo).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createEvolutionResponse._prevPokemonEvo[0].id,prevEvolutions:expect.objectContaining({id:oneEvolutionResponse.id})}),
	expect.objectContaining({id: createEvolutionResponse._prevPokemonEvo[1].id,prevEvolutions:expect.objectContaining({id:oneEvolutionResponse.id})})]))
expect(oneEvolutionResponse).toHaveProperty('body.evolution._prevPokemonEvo.0.id')
expect(oneEvolutionResponse).toHaveProperty('body.evolution._prevPokemonEvo.1.id')
expect(oneEvolutionResponse).toHaveProperty('body.evolution.user')

    
        })
    
        
        it('update:api Evolution', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, pub, {"name":"Evolution/name/4cypipa5"})
                // createModelLine: end  
            
    const updateEvolutionResponse = await server.put('/api/evolution/' + createEvolutionResponse.id,
        {
	"id": createEvolutionResponse.id,
	"name": "Evolution/name/akmcdrzw"
}
      , token);

    expect(updateEvolutionResponse).not.toHaveProperty('errors')
expect(updateEvolutionResponse).toHaveProperty('body.updateEvolution.id', createEvolutionResponse.id)
expect(updateEvolutionResponse).toHaveProperty('body.updateEvolution.name', 'Evolution/name/akmcdrzw')
    
        })
    
        
        it('remove:api Evolution', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, pub, {"name":"Evolution/name/nsz7qbge"})
                // createModelLine: end  
            const removeEvolutionMutation = `mutation RemoveEvolution($id: ID!){
        removeEvolution(id: $id) {
           id
        }
    }`
    
    const removeEvolutionResponse = await server.mutate({
        mutation: removeEvolutionMutation,
        variables: { id:createEvolutionResponse.id }
      }, token);

      expect(removeEvolutionResponse).not.toHaveProperty('errors')
expect(removeEvolutionResponse).toHaveProperty('data.removeEvolution.id', createEvolutionResponse.id)

          
          const evolutionCheck = await server.entry.models['evolution'].findById(createEvolutionResponse.id)
          expect(evolutionCheck).toBeNull()
    
    
        })
    
        
        it('all:api Evolution', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createEvolutionResponse = await createEvolution(server, pub, {"name":"Evolution/name/vicojqbh"})
                // createModelLine: end

                // createModelLine: start
                const createEvolutionResponse2 = await createEvolution(server, pub, {"name":"Evolution/name/nca9k7mr"})
                // createModelLine: end  
             const allEvolutionResponse = await server.get('/api/evolution/all', token);
expect(allEvolutionResponse.body.allEvolution).toEqual(expect.arrayContaining([
        expect.objectContaining({id: createEvolutionResponse.id,name: createEvolutionResponse.name}),
        expect.objectContaining({id: createEvolutionResponse2.id,name: createEvolutionResponse2.name})
    ]))
        })
    
    })

        })
    

        describe('MinMax', () => {
             
    describe('admin:graphql', ()=>{
        
        it('create MinMax', async()=>{
            const token = admin.token
              
            const data = {
	"minimum": "MinMax/minimum/rwhu6tza",
	"maximum": "MinMax/maximum/jqmo0tk9"
}
const createMinMaxMutation = `mutation CreateMinMax($minimum: String!,$maximum: String!){
        createMinMax(minimum: $minimum,maximum: $maximum) {
           minimum,maximum
        }
    }`
    
    const createMinMaxResponse = await server.mutate({
        mutation: createMinMaxMutation,
        variables: data
      }, token);
    expect(createMinMaxResponse).not.toHaveProperty('errors')
expect(createMinMaxResponse).toHaveProperty('data.createMinMax.minimum', 'MinMax/minimum/rwhu6tza')
expect(createMinMaxResponse).toHaveProperty('data.createMinMax.maximum', 'MinMax/maximum/jqmo0tk9')
        })
    
        
        it('one MinMax', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, admin, {"minimum":"MinMax/minimum/en7gso6m","maximum":"MinMax/maximum/o6e65qxj"})
                // createModelLine: end  
            const oneMinMaxQuery = `query MinMax($id: ID!){
        MinMax(id: $id) {
            minimum,maximum
        }
    }`
    
    const oneMinMaxResponse = await server.query({
        query: oneMinMaxQuery,
        variables: { id: createMinMaxResponse.id}
      }, token);

      expect(oneMinMaxResponse).not.toHaveProperty('errors')
expect(oneMinMaxResponse).toHaveProperty('data.MinMax.minimum', createMinMaxResponse.minimum)
expect(oneMinMaxResponse).toHaveProperty('data.MinMax.maximum', createMinMaxResponse.maximum)

    
        })
    
        
        it('update MinMax', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, admin, {"minimum":"MinMax/minimum/73fbf4h","maximum":"MinMax/maximum/a77zw1zr"})
                // createModelLine: end  
            const updateMinMaxMutation = `mutation UpdateMinMax($minimum: String!,$maximum: String!){
        updateMinMax(minimum: $minimum,maximum: $maximum) {
           minimum,maximum
        }
    }`
    
    const updateMinMaxResponse = await server.mutate({
        mutation: updateMinMaxMutation,
        variables: {
	"minimum": "MinMax/minimum/h5vettgh",
	"maximum": "MinMax/maximum/s42i9vew"
}
      }, token);

    expect(updateMinMaxResponse).not.toHaveProperty('errors')
expect(updateMinMaxResponse).toHaveProperty('data.updateMinMax.minimum', 'MinMax/minimum/h5vettgh')
expect(updateMinMaxResponse).toHaveProperty('data.updateMinMax.maximum', 'MinMax/maximum/s42i9vew')
    
        })
    
        
        it('remove MinMax', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, admin, {"minimum":"MinMax/minimum/hv7e6lt","maximum":"MinMax/maximum/goxnjdex"})
                // createModelLine: end  
            const removeMinMaxMutation = `mutation RemoveMinMax(){
        removeMinMax() {
           id
        }
    }`
    
    const removeMinMaxResponse = await server.mutate({
        mutation: removeMinMaxMutation,
        variables: { id:createMinMaxResponse.id }
      }, token);

      expect(removeMinMaxResponse).not.toHaveProperty('errors')

          
          const minMaxCheck = await server.entry.models['minMax'].findById(createMinMaxResponse.id)
          expect(minMaxCheck).toBeNull()
    
    
        })
    
        
        it('all MinMax', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, admin, {"minimum":"MinMax/minimum/w5a2yqx","maximum":"MinMax/maximum/wuw671ed"})
                // createModelLine: end

                // createModelLine: start
                const createMinMaxResponse2 = await createMinMax(server, admin, {"minimum":"MinMax/minimum/7pq1mo6s","maximum":"MinMax/maximum/rj7v1iaf"})
                // createModelLine: end  
            const allMinMaxQuery = `query allMinMax {
        allMinMax {
            minimum,maximum
        }
    }`
    
    const allMinMaxResponse = await server.query({
        query: allMinMaxQuery,
        variables: { id: createMinMaxResponse.id}
      }, token)

    
expect(allMinMaxResponse.data.allMinMax).toEqual(expect.arrayContaining([
        expect.objectContaining({minimum: createMinMaxResponse.minimum,maximum: createMinMaxResponse.maximum}),
        expect.objectContaining({minimum: createMinMaxResponse2.minimum,maximum: createMinMaxResponse2.maximum})
    ]))
        })
    
    })

    describe('admin:api', ()=>{
        
        it('create:api MinMax', async()=>{
            const token = admin.token
              
            const data = {
	"minimum": "MinMax/minimum/fpsbf0v",
	"maximum": "MinMax/maximum/p4g7e8z"
}
    const createMinMaxResponse = await server.post('/api/minMax', data ,token);
      
      expect(createMinMaxResponse).not.toHaveProperty('errors')
expect(createMinMaxResponse).toHaveProperty('body.createMinMax.minimum', 'MinMax/minimum/fpsbf0v')
expect(createMinMaxResponse).toHaveProperty('body.createMinMax.maximum', 'MinMax/maximum/p4g7e8z')
    
        })
    
        
        it('one:api MinMax', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, admin, {"minimum":"MinMax/minimum/2cnp826i","maximum":"MinMax/maximum/yphpk0wi"})
                // createModelLine: end  
            
      const oneMinMaxResponse = await server.get('/api/minMax/' + createMinMaxResponse.id, token);

      expect(oneMinMaxResponse).not.toHaveProperty('errors')
expect(oneMinMaxResponse).toHaveProperty('body.minMax.minimum', createMinMaxResponse.minimum)
expect(oneMinMaxResponse).toHaveProperty('body.minMax.maximum', createMinMaxResponse.maximum)

    
        })
    
        
        it('update:api MinMax', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, admin, {"minimum":"MinMax/minimum/adjaqn9s","maximum":"MinMax/maximum/fxrspx2y"})
                // createModelLine: end  
            
    const updateMinMaxResponse = await server.put('/api/minMax/' + createMinMaxResponse.id,
        {
	"minimum": "MinMax/minimum/npemzcj5",
	"maximum": "MinMax/maximum/3nmdwupb"
}
      , token);

    expect(updateMinMaxResponse).not.toHaveProperty('errors')
expect(updateMinMaxResponse).toHaveProperty('body.updateMinMax.minimum', 'MinMax/minimum/npemzcj5')
expect(updateMinMaxResponse).toHaveProperty('body.updateMinMax.maximum', 'MinMax/maximum/3nmdwupb')
    
        })
    
        
        it('remove:api MinMax', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, admin, {"minimum":"MinMax/minimum/pu82cdkm","maximum":"MinMax/maximum/3fw0kay"})
                // createModelLine: end  
            const removeMinMaxMutation = `mutation RemoveMinMax(){
        removeMinMax() {
           id
        }
    }`
    
    const removeMinMaxResponse = await server.mutate({
        mutation: removeMinMaxMutation,
        variables: { id:createMinMaxResponse.id }
      }, token);

      expect(removeMinMaxResponse).not.toHaveProperty('errors')

          
          const minMaxCheck = await server.entry.models['minMax'].findById(createMinMaxResponse.id)
          expect(minMaxCheck).toBeNull()
    
    
        })
    
        
        it('all:api MinMax', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, admin, {"minimum":"MinMax/minimum/k89tayp","maximum":"MinMax/maximum/z6mkkonf"})
                // createModelLine: end

                // createModelLine: start
                const createMinMaxResponse2 = await createMinMax(server, admin, {"minimum":"MinMax/minimum/zi2s4ya","maximum":"MinMax/maximum/1dbbfpg8"})
                // createModelLine: end  
             const allMinMaxResponse = await server.get('/api/minMax/all', token);
expect(allMinMaxResponse.body.allMinMax).toEqual(expect.arrayContaining([
        expect.objectContaining({minimum: createMinMaxResponse.minimum,maximum: createMinMaxResponse.maximum}),
        expect.objectContaining({minimum: createMinMaxResponse2.minimum,maximum: createMinMaxResponse2.maximum})
    ]))
        })
    
    })


    describe('user:graphql', ()=>{
        
        it('create MinMax', async()=>{
            const token = user.token
              
            const data = {
	"minimum": "MinMax/minimum/1hbcsagh",
	"maximum": "MinMax/maximum/230i0iuf"
}
const createMinMaxMutation = `mutation CreateMinMax($minimum: String!,$maximum: String!){
        createMinMax(minimum: $minimum,maximum: $maximum) {
           minimum,maximum
        }
    }`
    
    const createMinMaxResponse = await server.mutate({
        mutation: createMinMaxMutation,
        variables: data
      }, token);
    expect(createMinMaxResponse).not.toHaveProperty('errors')
expect(createMinMaxResponse).toHaveProperty('data.createMinMax.minimum', 'MinMax/minimum/1hbcsagh')
expect(createMinMaxResponse).toHaveProperty('data.createMinMax.maximum', 'MinMax/maximum/230i0iuf')
        })
    
        
        it('one MinMax', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, user, {"minimum":"MinMax/minimum/l888y1q","maximum":"MinMax/maximum/ohzbjd7e"})
                // createModelLine: end  
            const oneMinMaxQuery = `query MinMax($id: ID!){
        MinMax(id: $id) {
            minimum,maximum
        }
    }`
    
    const oneMinMaxResponse = await server.query({
        query: oneMinMaxQuery,
        variables: { id: createMinMaxResponse.id}
      }, token);

      expect(oneMinMaxResponse).not.toHaveProperty('errors')
expect(oneMinMaxResponse).toHaveProperty('data.MinMax.minimum', createMinMaxResponse.minimum)
expect(oneMinMaxResponse).toHaveProperty('data.MinMax.maximum', createMinMaxResponse.maximum)

    
        })
    
        
        it('update MinMax', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, user, {"minimum":"MinMax/minimum/ra83vw","maximum":"MinMax/maximum/xu8gdv"})
                // createModelLine: end  
            const updateMinMaxMutation = `mutation UpdateMinMax($minimum: String!,$maximum: String!){
        updateMinMax(minimum: $minimum,maximum: $maximum) {
           minimum,maximum
        }
    }`
    
    const updateMinMaxResponse = await server.mutate({
        mutation: updateMinMaxMutation,
        variables: {
	"minimum": "MinMax/minimum/l7dcvvc",
	"maximum": "MinMax/maximum/5kij2jku"
}
      }, token);

    expect(updateMinMaxResponse).not.toHaveProperty('errors')
expect(updateMinMaxResponse).toHaveProperty('data.updateMinMax.minimum', 'MinMax/minimum/l7dcvvc')
expect(updateMinMaxResponse).toHaveProperty('data.updateMinMax.maximum', 'MinMax/maximum/5kij2jku')
    
        })
    
        
        it('remove MinMax', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, user, {"minimum":"MinMax/minimum/tw17wyk5","maximum":"MinMax/maximum/25m27y2a"})
                // createModelLine: end  
            const removeMinMaxMutation = `mutation RemoveMinMax(){
        removeMinMax() {
           id
        }
    }`
    
    const removeMinMaxResponse = await server.mutate({
        mutation: removeMinMaxMutation,
        variables: { id:createMinMaxResponse.id }
      }, token);

      expect(removeMinMaxResponse).not.toHaveProperty('errors')

          
          const minMaxCheck = await server.entry.models['minMax'].findById(createMinMaxResponse.id)
          expect(minMaxCheck).toBeNull()
    
    
        })
    
        
        it('all MinMax', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, user, {"minimum":"MinMax/minimum/zh108azc","maximum":"MinMax/maximum/yfunwtgp"})
                // createModelLine: end

                // createModelLine: start
                const createMinMaxResponse2 = await createMinMax(server, user, {"minimum":"MinMax/minimum/wuqdpwy","maximum":"MinMax/maximum/wjy69t9w"})
                // createModelLine: end  
            const allMinMaxQuery = `query allMinMax {
        allMinMax {
            minimum,maximum
        }
    }`
    
    const allMinMaxResponse = await server.query({
        query: allMinMaxQuery,
        variables: { id: createMinMaxResponse.id}
      }, token)

    
expect(allMinMaxResponse.data.allMinMax).toEqual(expect.arrayContaining([
        expect.objectContaining({minimum: createMinMaxResponse.minimum,maximum: createMinMaxResponse.maximum}),
        expect.objectContaining({minimum: createMinMaxResponse2.minimum,maximum: createMinMaxResponse2.maximum})
    ]))
        })
    
    })

    describe('user:api', ()=>{
        
        it('create:api MinMax', async()=>{
            const token = user.token
              
            const data = {
	"minimum": "MinMax/minimum/4qm4py3",
	"maximum": "MinMax/maximum/9bv10cz"
}
    const createMinMaxResponse = await server.post('/api/minMax', data ,token);
      
      expect(createMinMaxResponse).not.toHaveProperty('errors')
expect(createMinMaxResponse).toHaveProperty('body.createMinMax.minimum', 'MinMax/minimum/4qm4py3')
expect(createMinMaxResponse).toHaveProperty('body.createMinMax.maximum', 'MinMax/maximum/9bv10cz')
    
        })
    
        
        it('one:api MinMax', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, user, {"minimum":"MinMax/minimum/l5too42","maximum":"MinMax/maximum/pqd5j67q"})
                // createModelLine: end  
            
      const oneMinMaxResponse = await server.get('/api/minMax/' + createMinMaxResponse.id, token);

      expect(oneMinMaxResponse).not.toHaveProperty('errors')
expect(oneMinMaxResponse).toHaveProperty('body.minMax.minimum', createMinMaxResponse.minimum)
expect(oneMinMaxResponse).toHaveProperty('body.minMax.maximum', createMinMaxResponse.maximum)

    
        })
    
        
        it('update:api MinMax', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, user, {"minimum":"MinMax/minimum/ce3xh06n","maximum":"MinMax/maximum/d7x3uj8"})
                // createModelLine: end  
            
    const updateMinMaxResponse = await server.put('/api/minMax/' + createMinMaxResponse.id,
        {
	"minimum": "MinMax/minimum/jvmsg43",
	"maximum": "MinMax/maximum/gza0rpb6"
}
      , token);

    expect(updateMinMaxResponse).not.toHaveProperty('errors')
expect(updateMinMaxResponse).toHaveProperty('body.updateMinMax.minimum', 'MinMax/minimum/jvmsg43')
expect(updateMinMaxResponse).toHaveProperty('body.updateMinMax.maximum', 'MinMax/maximum/gza0rpb6')
    
        })
    
        
        it('remove:api MinMax', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, user, {"minimum":"MinMax/minimum/yoiw6fxo","maximum":"MinMax/maximum/6tpvwt7"})
                // createModelLine: end  
            const removeMinMaxMutation = `mutation RemoveMinMax(){
        removeMinMax() {
           id
        }
    }`
    
    const removeMinMaxResponse = await server.mutate({
        mutation: removeMinMaxMutation,
        variables: { id:createMinMaxResponse.id }
      }, token);

      expect(removeMinMaxResponse).not.toHaveProperty('errors')

          
          const minMaxCheck = await server.entry.models['minMax'].findById(createMinMaxResponse.id)
          expect(minMaxCheck).toBeNull()
    
    
        })
    
        
        it('all:api MinMax', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, user, {"minimum":"MinMax/minimum/yii5kn9a","maximum":"MinMax/maximum/z2viirph"})
                // createModelLine: end

                // createModelLine: start
                const createMinMaxResponse2 = await createMinMax(server, user, {"minimum":"MinMax/minimum/iot9hdsu","maximum":"MinMax/maximum/e4y5qg21"})
                // createModelLine: end  
             const allMinMaxResponse = await server.get('/api/minMax/all', token);
expect(allMinMaxResponse.body.allMinMax).toEqual(expect.arrayContaining([
        expect.objectContaining({minimum: createMinMaxResponse.minimum,maximum: createMinMaxResponse.maximum}),
        expect.objectContaining({minimum: createMinMaxResponse2.minimum,maximum: createMinMaxResponse2.maximum})
    ]))
        })
    
    })


    describe('pub:graphql', ()=>{
        
        it('create MinMax', async()=>{
            const token = pub.token
              
            const data = {
	"minimum": "MinMax/minimum/2hzmw2ov",
	"maximum": "MinMax/maximum/4gr2cslc"
}
const createMinMaxMutation = `mutation CreateMinMax($minimum: String!,$maximum: String!){
        createMinMax(minimum: $minimum,maximum: $maximum) {
           minimum,maximum
        }
    }`
    
    const createMinMaxResponse = await server.mutate({
        mutation: createMinMaxMutation,
        variables: data
      }, token);
    expect(createMinMaxResponse).not.toHaveProperty('errors')
expect(createMinMaxResponse).toHaveProperty('data.createMinMax.minimum', 'MinMax/minimum/2hzmw2ov')
expect(createMinMaxResponse).toHaveProperty('data.createMinMax.maximum', 'MinMax/maximum/4gr2cslc')
        })
    
        
        it('one MinMax', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, pub, {"minimum":"MinMax/minimum/s0tgxqbh","maximum":"MinMax/maximum/2c511mhp"})
                // createModelLine: end  
            const oneMinMaxQuery = `query MinMax($id: ID!){
        MinMax(id: $id) {
            minimum,maximum
        }
    }`
    
    const oneMinMaxResponse = await server.query({
        query: oneMinMaxQuery,
        variables: { id: createMinMaxResponse.id}
      }, token);

      expect(oneMinMaxResponse).not.toHaveProperty('errors')
expect(oneMinMaxResponse).toHaveProperty('data.MinMax.minimum', createMinMaxResponse.minimum)
expect(oneMinMaxResponse).toHaveProperty('data.MinMax.maximum', createMinMaxResponse.maximum)

    
        })
    
        
        it('update MinMax', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, pub, {"minimum":"MinMax/minimum/9a8127","maximum":"MinMax/maximum/30qlx8nr"})
                // createModelLine: end  
            const updateMinMaxMutation = `mutation UpdateMinMax($minimum: String!,$maximum: String!){
        updateMinMax(minimum: $minimum,maximum: $maximum) {
           minimum,maximum
        }
    }`
    
    const updateMinMaxResponse = await server.mutate({
        mutation: updateMinMaxMutation,
        variables: {
	"minimum": "MinMax/minimum/rzdo9kcj",
	"maximum": "MinMax/maximum/sxblshlr"
}
      }, token);

    expect(updateMinMaxResponse).not.toHaveProperty('errors')
expect(updateMinMaxResponse).toHaveProperty('data.updateMinMax.minimum', 'MinMax/minimum/rzdo9kcj')
expect(updateMinMaxResponse).toHaveProperty('data.updateMinMax.maximum', 'MinMax/maximum/sxblshlr')
    
        })
    
        
        it('remove MinMax', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, pub, {"minimum":"MinMax/minimum/csy1bouq","maximum":"MinMax/maximum/sh5lxyc9"})
                // createModelLine: end  
            const removeMinMaxMutation = `mutation RemoveMinMax(){
        removeMinMax() {
           id
        }
    }`
    
    const removeMinMaxResponse = await server.mutate({
        mutation: removeMinMaxMutation,
        variables: { id:createMinMaxResponse.id }
      }, token);

      expect(removeMinMaxResponse).not.toHaveProperty('errors')

          
          const minMaxCheck = await server.entry.models['minMax'].findById(createMinMaxResponse.id)
          expect(minMaxCheck).toBeNull()
    
    
        })
    
        
        it('all MinMax', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, pub, {"minimum":"MinMax/minimum/9ehvyvtp","maximum":"MinMax/maximum/lzdrkstj"})
                // createModelLine: end

                // createModelLine: start
                const createMinMaxResponse2 = await createMinMax(server, pub, {"minimum":"MinMax/minimum/2n4gqsnd","maximum":"MinMax/maximum/e8q31ykg"})
                // createModelLine: end  
            const allMinMaxQuery = `query allMinMax {
        allMinMax {
            minimum,maximum
        }
    }`
    
    const allMinMaxResponse = await server.query({
        query: allMinMaxQuery,
        variables: { id: createMinMaxResponse.id}
      }, token)

    
expect(allMinMaxResponse.data.allMinMax).toEqual(expect.arrayContaining([
        expect.objectContaining({minimum: createMinMaxResponse.minimum,maximum: createMinMaxResponse.maximum}),
        expect.objectContaining({minimum: createMinMaxResponse2.minimum,maximum: createMinMaxResponse2.maximum})
    ]))
        })
    
    })

    describe('pub:api', ()=>{
        
        it('create:api MinMax', async()=>{
            const token = pub.token
              
            const data = {
	"minimum": "MinMax/minimum/nnf3b8fq",
	"maximum": "MinMax/maximum/w2db4mjm"
}
    const createMinMaxResponse = await server.post('/api/minMax', data ,token);
      
      expect(createMinMaxResponse).not.toHaveProperty('errors')
expect(createMinMaxResponse).toHaveProperty('body.createMinMax.minimum', 'MinMax/minimum/nnf3b8fq')
expect(createMinMaxResponse).toHaveProperty('body.createMinMax.maximum', 'MinMax/maximum/w2db4mjm')
    
        })
    
        
        it('one:api MinMax', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, pub, {"minimum":"MinMax/minimum/me5d18eq","maximum":"MinMax/maximum/h26h5ea5"})
                // createModelLine: end  
            
      const oneMinMaxResponse = await server.get('/api/minMax/' + createMinMaxResponse.id, token);

      expect(oneMinMaxResponse).not.toHaveProperty('errors')
expect(oneMinMaxResponse).toHaveProperty('body.minMax.minimum', createMinMaxResponse.minimum)
expect(oneMinMaxResponse).toHaveProperty('body.minMax.maximum', createMinMaxResponse.maximum)

    
        })
    
        
        it('update:api MinMax', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, pub, {"minimum":"MinMax/minimum/7krx7sy8","maximum":"MinMax/maximum/rea2fn03"})
                // createModelLine: end  
            
    const updateMinMaxResponse = await server.put('/api/minMax/' + createMinMaxResponse.id,
        {
	"minimum": "MinMax/minimum/lxnt71vu",
	"maximum": "MinMax/maximum/xbulsa1"
}
      , token);

    expect(updateMinMaxResponse).not.toHaveProperty('errors')
expect(updateMinMaxResponse).toHaveProperty('body.updateMinMax.minimum', 'MinMax/minimum/lxnt71vu')
expect(updateMinMaxResponse).toHaveProperty('body.updateMinMax.maximum', 'MinMax/maximum/xbulsa1')
    
        })
    
        
        it('remove:api MinMax', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, pub, {"minimum":"MinMax/minimum/46m3emmv","maximum":"MinMax/maximum/m0pvy248"})
                // createModelLine: end  
            const removeMinMaxMutation = `mutation RemoveMinMax(){
        removeMinMax() {
           id
        }
    }`
    
    const removeMinMaxResponse = await server.mutate({
        mutation: removeMinMaxMutation,
        variables: { id:createMinMaxResponse.id }
      }, token);

      expect(removeMinMaxResponse).not.toHaveProperty('errors')

          
          const minMaxCheck = await server.entry.models['minMax'].findById(createMinMaxResponse.id)
          expect(minMaxCheck).toBeNull()
    
    
        })
    
        
        it('all:api MinMax', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createMinMaxResponse = await createMinMax(server, pub, {"minimum":"MinMax/minimum/z50lo9vg","maximum":"MinMax/maximum/ro5lh3u"})
                // createModelLine: end

                // createModelLine: start
                const createMinMaxResponse2 = await createMinMax(server, pub, {"minimum":"MinMax/minimum/ailbk4f","maximum":"MinMax/maximum/55zyftx8"})
                // createModelLine: end  
             const allMinMaxResponse = await server.get('/api/minMax/all', token);
expect(allMinMaxResponse.body.allMinMax).toEqual(expect.arrayContaining([
        expect.objectContaining({minimum: createMinMaxResponse.minimum,maximum: createMinMaxResponse.maximum}),
        expect.objectContaining({minimum: createMinMaxResponse2.minimum,maximum: createMinMaxResponse2.maximum})
    ]))
        })
    
    })

        })
    

        describe('Pokemon', () => {
             
    describe('admin:graphql', ()=>{
        
        it('create Pokemon', async()=>{
            const token = admin.token
              
            const data = {
	"updatedAt": "2021-04-03T22:29:45.092Z",
	"createdAt": "2022-08-15T22:21:44.521Z",
	"name": "Pokemon/name/6udmfwz",
	"classification": "Pokemon/classification/w2vljmmq",
	"resistant": [
		"Pokemon/resistant/a5jio171",
		"Pokemon/resistant/h6vysava",
		"Pokemon/resistant/7vxxrdot"
	],
	"weaknesses": [
		"Pokemon/weaknesses/8jg8ct1d",
		"Pokemon/weaknesses/hxwnugrg",
		"Pokemon/weaknesses/sn2s5bd"
	],
	"fleeRate": 35539.630006347965,
	"maxCP": 724348,
	"maxHP": 603016,
	"favorite": "Pokemon/favorite/ezzmdumu"
}
const createPokemonMutation = `mutation CreatePokemon($name: String!,$classification: String,$resistant: String,$weaknesses: String,$fleeRate: Float,$maxCP: Int,$maxHP: Int,$favorite: Boolean){
        createPokemon(name: $name,classification: $classification,resistant: $resistant,weaknesses: $weaknesses,fleeRate: $fleeRate,maxCP: $maxCP,maxHP: $maxHP,favorite: $favorite) {
           name,classification,resistant,weaknesses,fleeRate,maxCP,maxHP,favorite
        }
    }`
    
    const createPokemonResponse = await server.mutate({
        mutation: createPokemonMutation,
        variables: data
      }, token);
    expect(createPokemonResponse).not.toHaveProperty('errors')
expect(createPokemonResponse).toHaveProperty('data.createPokemon.name', 'Pokemon/name/6udmfwz')
expect(createPokemonResponse).toHaveProperty('data.createPokemon.classification', 'Pokemon/classification/w2vljmmq')
expect(createPokemonResponse).toHaveProperty('data.createPokemon.resistant', ['Pokemon/resistant/a5jio171','Pokemon/resistant/h6vysava','Pokemon/resistant/7vxxrdot'])
expect(createPokemonResponse).toHaveProperty('data.createPokemon.weaknesses', ['Pokemon/weaknesses/8jg8ct1d','Pokemon/weaknesses/hxwnugrg','Pokemon/weaknesses/sn2s5bd'])
expect(createPokemonResponse).toHaveProperty('data.createPokemon.fleeRate', 35539.630006347965)
expect(createPokemonResponse).toHaveProperty('data.createPokemon.maxCP', 724348)
expect(createPokemonResponse).toHaveProperty('data.createPokemon.maxHP', 603016)
expect(createPokemonResponse).toHaveProperty('data.createPokemon.favorite', Pokemon/favorite/ezzmdumu)
        })
    
        
        it('one Pokemon', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, admin, {"name":"Pokemon/name/zkwsws9v","classification":"Pokemon/classification/iv3np9gk","resistant":["Pokemon/resistant/08d7w9em","Pokemon/resistant/u1j02qm","Pokemon/resistant/dqgcwwqg"],"weaknesses":["Pokemon/weaknesses/qbrzoqb7","Pokemon/weaknesses/7v01yf7l","Pokemon/weaknesses/fld10r9h"],"fleeRate":990876.6563316347,"maxCP":385939,"maxHP":519386,"favorite":"Pokemon/favorite/pxiphsa"})
                // createModelLine: end  
            const onePokemonQuery = `query Pokemon($id: ID!){
        Pokemon(id: $id) {
            updatedAt,createdAt,id,name,classification,types{updatedAt,createdAt,id,name,pokemons{id},user{id}},resistant,weaknesses,weight{minimum,maximum},height{minimum,maximum},attacks{fast{id},special{id}},fleeRate,maxCP,maxHP,evolutions{updatedAt,createdAt,id,name,pokemon{id},_pokemonEvo{id},_prevPokemonEvo{id},user{id}},prevEvolutions{updatedAt,createdAt,id,name,pokemon{id},_pokemonEvo{id},_prevPokemonEvo{id},user{id}},favorite,_evo{updatedAt,createdAt,id,name,pokemon{id},_pokemonEvo{id},_prevPokemonEvo{id},user{id}},user{updatedAt,createdAt,id,email,password,verified,roles{id},files{id},_pokemon{id},_evolution{id},_pokemonType{id}}
        }
    }`
    
    const onePokemonResponse = await server.query({
        query: onePokemonQuery,
        variables: { id: createPokemonResponse.id}
      }, token);

      expect(onePokemonResponse).not.toHaveProperty('errors')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.updatedAt')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.createdAt')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.id', createPokemonResponse.id)
expect(onePokemonResponse).toHaveProperty('data.Pokemon.name', createPokemonResponse.name)
expect(onePokemonResponse).toHaveProperty('data.Pokemon.classification', createPokemonResponse.classification)
expect(onePokemonResponse.data.Pokemon.types).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonResponse.types[0].id,pokemons:expect.objectContaining({id:onePokemonResponse.id})}),
	expect.objectContaining({id: createPokemonResponse.types[1].id,pokemons:expect.objectContaining({id:onePokemonResponse.id})})]))
expect(onePokemonResponse).toHaveProperty('data.Pokemon.types.0.id')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.types.1.id')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.resistant', createPokemonResponse.resistant)
expect(onePokemonResponse).toHaveProperty('data.Pokemon.weaknesses', createPokemonResponse.weaknesses)
expect(onePokemonResponse).toHaveProperty('data.Pokemon.weight')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.height')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.attacks')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.fleeRate', createPokemonResponse.fleeRate)
expect(onePokemonResponse).toHaveProperty('data.Pokemon.maxCP', createPokemonResponse.maxCP)
expect(onePokemonResponse).toHaveProperty('data.Pokemon.maxHP', createPokemonResponse.maxHP)
expect(onePokemonResponse.data.Pokemon.evolutions).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonResponse.evolutions[0].id,_pokemonEvo:expect.objectContaining({id:onePokemonResponse.id})}),
	expect.objectContaining({id: createPokemonResponse.evolutions[1].id,_pokemonEvo:expect.objectContaining({id:onePokemonResponse.id})})]))
expect(onePokemonResponse).toHaveProperty('data.Pokemon.evolutions.0.id')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.evolutions.1.id')
expect(onePokemonResponse.data.Pokemon.prevEvolutions).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonResponse.prevEvolutions[0].id,_prevPokemonEvo:expect.objectContaining({id:onePokemonResponse.id})}),
	expect.objectContaining({id: createPokemonResponse.prevEvolutions[1].id,_prevPokemonEvo:expect.objectContaining({id:onePokemonResponse.id})})]))
expect(onePokemonResponse).toHaveProperty('data.Pokemon.prevEvolutions.0.id')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.prevEvolutions.1.id')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.favorite', createPokemonResponse.favorite)
expect(onePokemonResponse).toHaveProperty('data.Pokemon._evo')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.user')

    
        })
    
        
        it('update Pokemon', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, admin, {"name":"Pokemon/name/1vr6go1x","classification":"Pokemon/classification/p4jkbqo","resistant":["Pokemon/resistant/d9d1gmg16","Pokemon/resistant/rlamydyp","Pokemon/resistant/aic2vuu"],"weaknesses":["Pokemon/weaknesses/6vw5bv2c","Pokemon/weaknesses/ykby58y","Pokemon/weaknesses/76qmxd9m"],"fleeRate":880164.400298353,"maxCP":357682,"maxHP":811585,"favorite":"Pokemon/favorite/sjknrqbm"})
                // createModelLine: end  
            const updatePokemonMutation = `mutation UpdatePokemon($id: ID!,$name: String!,$classification: String,$resistant: String,$weaknesses: String,$fleeRate: Float,$maxCP: Int,$maxHP: Int,$favorite: Boolean){
        updatePokemon(id: $id,name: $name,classification: $classification,resistant: $resistant,weaknesses: $weaknesses,fleeRate: $fleeRate,maxCP: $maxCP,maxHP: $maxHP,favorite: $favorite) {
           id,name,classification,resistant,weaknesses,fleeRate,maxCP,maxHP,favorite
        }
    }`
    
    const updatePokemonResponse = await server.mutate({
        mutation: updatePokemonMutation,
        variables: {
	"id": createPokemonResponse.id,
	"name": "Pokemon/name/9sez4dm9",
	"classification": "Pokemon/classification/1e2yba",
	"resistant": [
		"Pokemon/resistant/586l942",
		"Pokemon/resistant/8j1bmlv8",
		"Pokemon/resistant/x9qpnmd"
	],
	"weaknesses": [
		"Pokemon/weaknesses/srxbtusg",
		"Pokemon/weaknesses/b8fyk1b",
		"Pokemon/weaknesses/kipugb2"
	],
	"fleeRate": 994402.9916692107,
	"maxCP": 344235,
	"maxHP": 967780,
	"favorite": "Pokemon/favorite/ps0olz4q"
}
      }, token);

    expect(updatePokemonResponse).not.toHaveProperty('errors')
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.id', createPokemonResponse.id)
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.name', 'Pokemon/name/9sez4dm9')
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.classification', 'Pokemon/classification/1e2yba')
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.resistant', ['Pokemon/resistant/586l942','Pokemon/resistant/8j1bmlv8','Pokemon/resistant/x9qpnmd'])
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.weaknesses', ['Pokemon/weaknesses/srxbtusg','Pokemon/weaknesses/b8fyk1b','Pokemon/weaknesses/kipugb2'])
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.fleeRate', 994402.9916692107)
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.maxCP', 344235)
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.maxHP', 967780)
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.favorite', Pokemon/favorite/ps0olz4q)
    
        })
    
        
        it('remove Pokemon', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, admin, {"name":"Pokemon/name/mc16v3dg","classification":"Pokemon/classification/2xz7gwuq","resistant":["Pokemon/resistant/4gkb3d4","Pokemon/resistant/2bn5g1l0r","Pokemon/resistant/tzt9mq"],"weaknesses":["Pokemon/weaknesses/0e7ugbd6c","Pokemon/weaknesses/qo66c6t","Pokemon/weaknesses/cgclva1d"],"fleeRate":352890.87379146024,"maxCP":255571,"maxHP":839081,"favorite":"Pokemon/favorite/ogl8egmr"})
                // createModelLine: end  
            const removePokemonMutation = `mutation RemovePokemon($id: ID!){
        removePokemon(id: $id) {
           id
        }
    }`
    
    const removePokemonResponse = await server.mutate({
        mutation: removePokemonMutation,
        variables: { id:createPokemonResponse.id }
      }, token);

      expect(removePokemonResponse).not.toHaveProperty('errors')
expect(removePokemonResponse).toHaveProperty('data.removePokemon.id', createPokemonResponse.id)

          
          const pokemonCheck = await server.entry.models['pokemon'].findById(createPokemonResponse.id)
          expect(pokemonCheck).toBeNull()
    
    
        })
    
        
        it('all Pokemon', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, admin, {"name":"Pokemon/name/m0tea7k","classification":"Pokemon/classification/yzsjue4q","resistant":["Pokemon/resistant/1xt8pzoe","Pokemon/resistant/2z9to9s","Pokemon/resistant/nfhn090s"],"weaknesses":["Pokemon/weaknesses/zo1xwpulj","Pokemon/weaknesses/td8l3yrj","Pokemon/weaknesses/v62yp4j5"],"fleeRate":739850.5750685883,"maxCP":507006,"maxHP":963445,"favorite":"Pokemon/favorite/fg60fsfr"})
                // createModelLine: end

                // createModelLine: start
                const createPokemonResponse2 = await createPokemon(server, admin, {"name":"Pokemon/name/xty7808t","classification":"Pokemon/classification/irli5wha","resistant":["Pokemon/resistant/kh3lrlh7","Pokemon/resistant/zhyxwa9","Pokemon/resistant/c75ss6e"],"weaknesses":["Pokemon/weaknesses/knevmxj","Pokemon/weaknesses/4p303kxd","Pokemon/weaknesses/xrj91q3r"],"fleeRate":884809.92284121,"maxCP":426280,"maxHP":22993,"favorite":"Pokemon/favorite/i8i0m245"})
                // createModelLine: end  
            const allPokemonQuery = `query allPokemon {
        allPokemon {
            updatedAt,createdAt,id,name,classification,types{updatedAt,createdAt,id,name,pokemons{id},user{id}},resistant,weaknesses,weight{minimum,maximum},height{minimum,maximum},attacks{fast{id},special{id}},fleeRate,maxCP,maxHP,evolutions{updatedAt,createdAt,id,name,pokemon{id},_pokemonEvo{id},_prevPokemonEvo{id},user{id}},prevEvolutions{updatedAt,createdAt,id,name,pokemon{id},_pokemonEvo{id},_prevPokemonEvo{id},user{id}},favorite,_evo{updatedAt,createdAt,id,name,pokemon{id},_pokemonEvo{id},_prevPokemonEvo{id},user{id}},user{updatedAt,createdAt,id,email,password,verified,roles{id},files{id},_pokemon{id},_evolution{id},_pokemonType{id}}
        }
    }`
    
    const allPokemonResponse = await server.query({
        query: allPokemonQuery,
        variables: { id: createPokemonResponse.id}
      }, token)

    
expect(allPokemonResponse.data.allPokemon).toEqual(expect.arrayContaining([
        expect.objectContaining({id: createPokemonResponse.id,name: createPokemonResponse.name,classification: createPokemonResponse.classification,resistant: createPokemonResponse.resistant,weaknesses: createPokemonResponse.weaknesses,fleeRate: createPokemonResponse.fleeRate,maxCP: createPokemonResponse.maxCP,maxHP: createPokemonResponse.maxHP,favorite: createPokemonResponse.favorite}),
        expect.objectContaining({id: createPokemonResponse2.id,name: createPokemonResponse2.name,classification: createPokemonResponse2.classification,resistant: createPokemonResponse2.resistant,weaknesses: createPokemonResponse2.weaknesses,fleeRate: createPokemonResponse2.fleeRate,maxCP: createPokemonResponse2.maxCP,maxHP: createPokemonResponse2.maxHP,favorite: createPokemonResponse2.favorite})
    ]))
        })
    
    })

    describe('admin:api', ()=>{
        
        it('create:api Pokemon', async()=>{
            const token = admin.token
              
            const data = {
	"updatedAt": "2021-02-13T23:05:13.623Z",
	"createdAt": "2021-10-07T22:54:04.535Z",
	"name": "Pokemon/name/dl3lc85",
	"classification": "Pokemon/classification/gv7zabid",
	"resistant": [
		"Pokemon/resistant/lgqznmro",
		"Pokemon/resistant/v8y7zyuo",
		"Pokemon/resistant/rclk7ts9l"
	],
	"weaknesses": [
		"Pokemon/weaknesses/fa1ghgqs",
		"Pokemon/weaknesses/o7rs3ofc",
		"Pokemon/weaknesses/114on384"
	],
	"fleeRate": 576101.3384762541,
	"maxCP": 444551,
	"maxHP": 976334,
	"favorite": "Pokemon/favorite/dcs37xkp"
}
    const createPokemonResponse = await server.post('/api/pokemon', data ,token);
      
      expect(createPokemonResponse).not.toHaveProperty('errors')
expect(createPokemonResponse).toHaveProperty('body.createPokemon.name', 'Pokemon/name/dl3lc85')
expect(createPokemonResponse).toHaveProperty('body.createPokemon.classification', 'Pokemon/classification/gv7zabid')
expect(createPokemonResponse).toHaveProperty('body.createPokemon.resistant', ['Pokemon/resistant/lgqznmro','Pokemon/resistant/v8y7zyuo','Pokemon/resistant/rclk7ts9l'])
expect(createPokemonResponse).toHaveProperty('body.createPokemon.weaknesses', ['Pokemon/weaknesses/fa1ghgqs','Pokemon/weaknesses/o7rs3ofc','Pokemon/weaknesses/114on384'])
expect(createPokemonResponse).toHaveProperty('body.createPokemon.fleeRate', 576101.3384762541)
expect(createPokemonResponse).toHaveProperty('body.createPokemon.maxCP', 444551)
expect(createPokemonResponse).toHaveProperty('body.createPokemon.maxHP', 976334)
expect(createPokemonResponse).toHaveProperty('body.createPokemon.favorite', Pokemon/favorite/dcs37xkp)
    
        })
    
        
        it('one:api Pokemon', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, admin, {"name":"Pokemon/name/06074e1","classification":"Pokemon/classification/hyd4i5yo","resistant":["Pokemon/resistant/xc54mqnc","Pokemon/resistant/9slo5t6","Pokemon/resistant/o6iq0ru"],"weaknesses":["Pokemon/weaknesses/z4t9k4ll","Pokemon/weaknesses/wrowrwsj","Pokemon/weaknesses/r5uoc5qj"],"fleeRate":279027.9664982986,"maxCP":657231,"maxHP":530482,"favorite":"Pokemon/favorite/m4wtygce"})
                // createModelLine: end  
            
      const onePokemonResponse = await server.get('/api/pokemon/' + createPokemonResponse.id, token);

      expect(onePokemonResponse).not.toHaveProperty('errors')
expect(onePokemonResponse).toHaveProperty('body.pokemon.updatedAt')
expect(onePokemonResponse).toHaveProperty('body.pokemon.createdAt')
expect(onePokemonResponse).toHaveProperty('body.pokemon.id', createPokemonResponse.id)
expect(onePokemonResponse).toHaveProperty('body.pokemon.name', createPokemonResponse.name)
expect(onePokemonResponse).toHaveProperty('body.pokemon.classification', createPokemonResponse.classification)
expect(onePokemonResponse.body.pokemon.types).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonResponse.types[0].id,pokemons:expect.objectContaining({id:onePokemonResponse.id})}),
	expect.objectContaining({id: createPokemonResponse.types[1].id,pokemons:expect.objectContaining({id:onePokemonResponse.id})})]))
expect(onePokemonResponse).toHaveProperty('body.pokemon.types.0.id')
expect(onePokemonResponse).toHaveProperty('body.pokemon.types.1.id')
expect(onePokemonResponse).toHaveProperty('body.pokemon.resistant', createPokemonResponse.resistant)
expect(onePokemonResponse).toHaveProperty('body.pokemon.weaknesses', createPokemonResponse.weaknesses)
expect(onePokemonResponse).toHaveProperty('body.pokemon.weight')
expect(onePokemonResponse).toHaveProperty('body.pokemon.height')
expect(onePokemonResponse).toHaveProperty('body.pokemon.attacks')
expect(onePokemonResponse).toHaveProperty('body.pokemon.fleeRate', createPokemonResponse.fleeRate)
expect(onePokemonResponse).toHaveProperty('body.pokemon.maxCP', createPokemonResponse.maxCP)
expect(onePokemonResponse).toHaveProperty('body.pokemon.maxHP', createPokemonResponse.maxHP)
expect(onePokemonResponse.body.pokemon.evolutions).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonResponse.evolutions[0].id,_pokemonEvo:expect.objectContaining({id:onePokemonResponse.id})}),
	expect.objectContaining({id: createPokemonResponse.evolutions[1].id,_pokemonEvo:expect.objectContaining({id:onePokemonResponse.id})})]))
expect(onePokemonResponse).toHaveProperty('body.pokemon.evolutions.0.id')
expect(onePokemonResponse).toHaveProperty('body.pokemon.evolutions.1.id')
expect(onePokemonResponse.body.pokemon.prevEvolutions).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonResponse.prevEvolutions[0].id,_prevPokemonEvo:expect.objectContaining({id:onePokemonResponse.id})}),
	expect.objectContaining({id: createPokemonResponse.prevEvolutions[1].id,_prevPokemonEvo:expect.objectContaining({id:onePokemonResponse.id})})]))
expect(onePokemonResponse).toHaveProperty('body.pokemon.prevEvolutions.0.id')
expect(onePokemonResponse).toHaveProperty('body.pokemon.prevEvolutions.1.id')
expect(onePokemonResponse).toHaveProperty('body.pokemon.favorite', createPokemonResponse.favorite)
expect(onePokemonResponse).toHaveProperty('body.pokemon._evo')
expect(onePokemonResponse).toHaveProperty('body.pokemon.user')

    
        })
    
        
        it('update:api Pokemon', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, admin, {"name":"Pokemon/name/2k3auqhv","classification":"Pokemon/classification/ufcv6k8c","resistant":["Pokemon/resistant/vz26go9","Pokemon/resistant/oqbopbbw","Pokemon/resistant/mmb20sfc"],"weaknesses":["Pokemon/weaknesses/4v8cirby","Pokemon/weaknesses/tvn4pse7","Pokemon/weaknesses/usr6ydgj"],"fleeRate":686985.1174726363,"maxCP":53191,"maxHP":789531,"favorite":"Pokemon/favorite/j3nvzpu9h"})
                // createModelLine: end  
            
    const updatePokemonResponse = await server.put('/api/pokemon/' + createPokemonResponse.id,
        {
	"id": createPokemonResponse.id,
	"name": "Pokemon/name/giww5k3g",
	"classification": "Pokemon/classification/wlblf9on",
	"resistant": [
		"Pokemon/resistant/2juzcyoo",
		"Pokemon/resistant/az052kqi",
		"Pokemon/resistant/l7yhu3ki"
	],
	"weaknesses": [
		"Pokemon/weaknesses/4jior3js",
		"Pokemon/weaknesses/8ojqmp7",
		"Pokemon/weaknesses/of6wqd6"
	],
	"fleeRate": 44936.821117985026,
	"maxCP": 797827,
	"maxHP": 421679,
	"favorite": "Pokemon/favorite/x4t0b3nd"
}
      , token);

    expect(updatePokemonResponse).not.toHaveProperty('errors')
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.id', createPokemonResponse.id)
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.name', 'Pokemon/name/giww5k3g')
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.classification', 'Pokemon/classification/wlblf9on')
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.resistant', ['Pokemon/resistant/2juzcyoo','Pokemon/resistant/az052kqi','Pokemon/resistant/l7yhu3ki'])
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.weaknesses', ['Pokemon/weaknesses/4jior3js','Pokemon/weaknesses/8ojqmp7','Pokemon/weaknesses/of6wqd6'])
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.fleeRate', 44936.821117985026)
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.maxCP', 797827)
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.maxHP', 421679)
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.favorite', Pokemon/favorite/x4t0b3nd)
    
        })
    
        
        it('remove:api Pokemon', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, admin, {"name":"Pokemon/name/9uauff0m","classification":"Pokemon/classification/yt3or0p","resistant":["Pokemon/resistant/kw8uxpbd","Pokemon/resistant/yrirnxyo","Pokemon/resistant/a5vmctmj"],"weaknesses":["Pokemon/weaknesses/owwzfr917","Pokemon/weaknesses/zt92lg26","Pokemon/weaknesses/c5oaijk"],"fleeRate":598092.1312512117,"maxCP":793894,"maxHP":154691,"favorite":"Pokemon/favorite/afgirr2"})
                // createModelLine: end  
            const removePokemonMutation = `mutation RemovePokemon($id: ID!){
        removePokemon(id: $id) {
           id
        }
    }`
    
    const removePokemonResponse = await server.mutate({
        mutation: removePokemonMutation,
        variables: { id:createPokemonResponse.id }
      }, token);

      expect(removePokemonResponse).not.toHaveProperty('errors')
expect(removePokemonResponse).toHaveProperty('data.removePokemon.id', createPokemonResponse.id)

          
          const pokemonCheck = await server.entry.models['pokemon'].findById(createPokemonResponse.id)
          expect(pokemonCheck).toBeNull()
    
    
        })
    
        
        it('all:api Pokemon', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, admin, {"name":"Pokemon/name/qucs99nc","classification":"Pokemon/classification/engcbdf9","resistant":["Pokemon/resistant/cxuxsoo","Pokemon/resistant/iibhtvbe","Pokemon/resistant/ndwre9r"],"weaknesses":["Pokemon/weaknesses/el5s2fql","Pokemon/weaknesses/vy37kefg","Pokemon/weaknesses/r4z05ni8"],"fleeRate":528903.3640173812,"maxCP":545652,"maxHP":266928,"favorite":"Pokemon/favorite/rzndfdqk"})
                // createModelLine: end

                // createModelLine: start
                const createPokemonResponse2 = await createPokemon(server, admin, {"name":"Pokemon/name/z14jkuag","classification":"Pokemon/classification/dxwr3uy","resistant":["Pokemon/resistant/evrw2zbu","Pokemon/resistant/qliezux4","Pokemon/resistant/o805xvkr"],"weaknesses":["Pokemon/weaknesses/p9227ef","Pokemon/weaknesses/c502nt4","Pokemon/weaknesses/5cjyns9d"],"fleeRate":996.7027782169513,"maxCP":839961,"maxHP":423723,"favorite":"Pokemon/favorite/cfecflp"})
                // createModelLine: end  
             const allPokemonResponse = await server.get('/api/pokemon/all', token);
expect(allPokemonResponse.body.allPokemon).toEqual(expect.arrayContaining([
        expect.objectContaining({id: createPokemonResponse.id,name: createPokemonResponse.name,classification: createPokemonResponse.classification,resistant: createPokemonResponse.resistant,weaknesses: createPokemonResponse.weaknesses,fleeRate: createPokemonResponse.fleeRate,maxCP: createPokemonResponse.maxCP,maxHP: createPokemonResponse.maxHP,favorite: createPokemonResponse.favorite}),
        expect.objectContaining({id: createPokemonResponse2.id,name: createPokemonResponse2.name,classification: createPokemonResponse2.classification,resistant: createPokemonResponse2.resistant,weaknesses: createPokemonResponse2.weaknesses,fleeRate: createPokemonResponse2.fleeRate,maxCP: createPokemonResponse2.maxCP,maxHP: createPokemonResponse2.maxHP,favorite: createPokemonResponse2.favorite})
    ]))
        })
    
    })


    describe('user:graphql', ()=>{
        
        it('create Pokemon', async()=>{
            const token = user.token
              
            const data = {
	"updatedAt": "2021-02-20T23:30:38.621Z",
	"createdAt": "2020-08-05T22:08:42.043Z",
	"name": "Pokemon/name/araj7vg3",
	"classification": "Pokemon/classification/56nhyaac",
	"resistant": [
		"Pokemon/resistant/61fpav8b",
		"Pokemon/resistant/mle7md3p",
		"Pokemon/resistant/k5zhvmg"
	],
	"weaknesses": [
		"Pokemon/weaknesses/sjcjt1vk",
		"Pokemon/weaknesses/u73hl9ju",
		"Pokemon/weaknesses/jr0w2wxr"
	],
	"fleeRate": 432061.05205549597,
	"maxCP": 576121,
	"maxHP": 681476,
	"favorite": "Pokemon/favorite/up18xj4"
}
const createPokemonMutation = `mutation CreatePokemon($name: String!,$classification: String,$resistant: String,$weaknesses: String,$fleeRate: Float,$maxCP: Int,$maxHP: Int,$favorite: Boolean){
        createPokemon(name: $name,classification: $classification,resistant: $resistant,weaknesses: $weaknesses,fleeRate: $fleeRate,maxCP: $maxCP,maxHP: $maxHP,favorite: $favorite) {
           name,classification,resistant,weaknesses,fleeRate,maxCP,maxHP,favorite
        }
    }`
    
    const createPokemonResponse = await server.mutate({
        mutation: createPokemonMutation,
        variables: data
      }, token);
    expect(createPokemonResponse).not.toHaveProperty('errors')
expect(createPokemonResponse).toHaveProperty('data.createPokemon.name', 'Pokemon/name/araj7vg3')
expect(createPokemonResponse).toHaveProperty('data.createPokemon.classification', 'Pokemon/classification/56nhyaac')
expect(createPokemonResponse).toHaveProperty('data.createPokemon.resistant', ['Pokemon/resistant/61fpav8b','Pokemon/resistant/mle7md3p','Pokemon/resistant/k5zhvmg'])
expect(createPokemonResponse).toHaveProperty('data.createPokemon.weaknesses', ['Pokemon/weaknesses/sjcjt1vk','Pokemon/weaknesses/u73hl9ju','Pokemon/weaknesses/jr0w2wxr'])
expect(createPokemonResponse).toHaveProperty('data.createPokemon.fleeRate', 432061.05205549597)
expect(createPokemonResponse).toHaveProperty('data.createPokemon.maxCP', 576121)
expect(createPokemonResponse).toHaveProperty('data.createPokemon.maxHP', 681476)
expect(createPokemonResponse).toHaveProperty('data.createPokemon.favorite', Pokemon/favorite/up18xj4)
        })
    
        
        it('one Pokemon', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, user, {"name":"Pokemon/name/jrzn4tt3","classification":"Pokemon/classification/ft10t1ue","resistant":["Pokemon/resistant/0qslhthk","Pokemon/resistant/3ebnm7qa","Pokemon/resistant/ioyl0e4i"],"weaknesses":["Pokemon/weaknesses/778opio8","Pokemon/weaknesses/7y6bg03i","Pokemon/weaknesses/spyhjrmr"],"fleeRate":490684.8695837982,"maxCP":636858,"maxHP":317725,"favorite":"Pokemon/favorite/hu3gav6b"})
                // createModelLine: end  
            const onePokemonQuery = `query Pokemon($id: ID!){
        Pokemon(id: $id) {
            updatedAt,createdAt,id,name,classification,types{updatedAt,createdAt,id,name,pokemons{id},user{id}},resistant,weaknesses,weight{minimum,maximum},height{minimum,maximum},attacks{fast{id},special{id}},fleeRate,maxCP,maxHP,evolutions{updatedAt,createdAt,id,name,pokemon{id},_pokemonEvo{id},_prevPokemonEvo{id},user{id}},prevEvolutions{updatedAt,createdAt,id,name,pokemon{id},_pokemonEvo{id},_prevPokemonEvo{id},user{id}},favorite,_evo{updatedAt,createdAt,id,name,pokemon{id},_pokemonEvo{id},_prevPokemonEvo{id},user{id}},user{updatedAt,createdAt,id,email,password,verified,roles{id},files{id},_pokemon{id},_evolution{id},_pokemonType{id}}
        }
    }`
    
    const onePokemonResponse = await server.query({
        query: onePokemonQuery,
        variables: { id: createPokemonResponse.id}
      }, token);

      expect(onePokemonResponse).not.toHaveProperty('errors')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.updatedAt')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.createdAt')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.id', createPokemonResponse.id)
expect(onePokemonResponse).toHaveProperty('data.Pokemon.name', createPokemonResponse.name)
expect(onePokemonResponse).toHaveProperty('data.Pokemon.classification', createPokemonResponse.classification)
expect(onePokemonResponse.data.Pokemon.types).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonResponse.types[0].id,pokemons:expect.objectContaining({id:onePokemonResponse.id})}),
	expect.objectContaining({id: createPokemonResponse.types[1].id,pokemons:expect.objectContaining({id:onePokemonResponse.id})})]))
expect(onePokemonResponse).toHaveProperty('data.Pokemon.types.0.id')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.types.1.id')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.resistant', createPokemonResponse.resistant)
expect(onePokemonResponse).toHaveProperty('data.Pokemon.weaknesses', createPokemonResponse.weaknesses)
expect(onePokemonResponse).toHaveProperty('data.Pokemon.weight')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.height')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.attacks')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.fleeRate', createPokemonResponse.fleeRate)
expect(onePokemonResponse).toHaveProperty('data.Pokemon.maxCP', createPokemonResponse.maxCP)
expect(onePokemonResponse).toHaveProperty('data.Pokemon.maxHP', createPokemonResponse.maxHP)
expect(onePokemonResponse.data.Pokemon.evolutions).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonResponse.evolutions[0].id,_pokemonEvo:expect.objectContaining({id:onePokemonResponse.id})}),
	expect.objectContaining({id: createPokemonResponse.evolutions[1].id,_pokemonEvo:expect.objectContaining({id:onePokemonResponse.id})})]))
expect(onePokemonResponse).toHaveProperty('data.Pokemon.evolutions.0.id')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.evolutions.1.id')
expect(onePokemonResponse.data.Pokemon.prevEvolutions).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonResponse.prevEvolutions[0].id,_prevPokemonEvo:expect.objectContaining({id:onePokemonResponse.id})}),
	expect.objectContaining({id: createPokemonResponse.prevEvolutions[1].id,_prevPokemonEvo:expect.objectContaining({id:onePokemonResponse.id})})]))
expect(onePokemonResponse).toHaveProperty('data.Pokemon.prevEvolutions.0.id')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.prevEvolutions.1.id')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.favorite', createPokemonResponse.favorite)
expect(onePokemonResponse).toHaveProperty('data.Pokemon._evo')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.user')

    
        })
    
        
        it('update Pokemon', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, user, {"name":"Pokemon/name/2irbqma","classification":"Pokemon/classification/1bnkzbvf","resistant":["Pokemon/resistant/o6qz5pfl","Pokemon/resistant/ago072wl","Pokemon/resistant/zzh9di2"],"weaknesses":["Pokemon/weaknesses/52qx7c","Pokemon/weaknesses/kez3kr2r","Pokemon/weaknesses/vgxfpcp9"],"fleeRate":900401.2902596148,"maxCP":132100,"maxHP":613357,"favorite":"Pokemon/favorite/ari7g9w8"})
                // createModelLine: end  
            const updatePokemonMutation = `mutation UpdatePokemon($id: ID!,$name: String!,$classification: String,$resistant: String,$weaknesses: String,$fleeRate: Float,$maxCP: Int,$maxHP: Int,$favorite: Boolean){
        updatePokemon(id: $id,name: $name,classification: $classification,resistant: $resistant,weaknesses: $weaknesses,fleeRate: $fleeRate,maxCP: $maxCP,maxHP: $maxHP,favorite: $favorite) {
           id,name,classification,resistant,weaknesses,fleeRate,maxCP,maxHP,favorite
        }
    }`
    
    const updatePokemonResponse = await server.mutate({
        mutation: updatePokemonMutation,
        variables: {
	"id": createPokemonResponse.id,
	"name": "Pokemon/name/fcjzvdmq",
	"classification": "Pokemon/classification/2k58e8",
	"resistant": [
		"Pokemon/resistant/pp6bp6ff",
		"Pokemon/resistant/oiyxdeqq",
		"Pokemon/resistant/tw6i2fi9"
	],
	"weaknesses": [
		"Pokemon/weaknesses/amdp024e",
		"Pokemon/weaknesses/jijnaer",
		"Pokemon/weaknesses/hoeemqt9v"
	],
	"fleeRate": 380336.58978900255,
	"maxCP": 940849,
	"maxHP": 392333,
	"favorite": "Pokemon/favorite/g4bjy1qsq"
}
      }, token);

    expect(updatePokemonResponse).not.toHaveProperty('errors')
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.id', createPokemonResponse.id)
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.name', 'Pokemon/name/fcjzvdmq')
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.classification', 'Pokemon/classification/2k58e8')
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.resistant', ['Pokemon/resistant/pp6bp6ff','Pokemon/resistant/oiyxdeqq','Pokemon/resistant/tw6i2fi9'])
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.weaknesses', ['Pokemon/weaknesses/amdp024e','Pokemon/weaknesses/jijnaer','Pokemon/weaknesses/hoeemqt9v'])
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.fleeRate', 380336.58978900255)
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.maxCP', 940849)
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.maxHP', 392333)
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.favorite', Pokemon/favorite/g4bjy1qsq)
    
        })
    
        
        it('remove Pokemon', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, user, {"name":"Pokemon/name/kt7hd0xq","classification":"Pokemon/classification/rmpok4eh","resistant":["Pokemon/resistant/ynjc0eui","Pokemon/resistant/pech5gl8","Pokemon/resistant/ptn6qta"],"weaknesses":["Pokemon/weaknesses/fl1shxyl","Pokemon/weaknesses/n2sko02","Pokemon/weaknesses/0cis14sf"],"fleeRate":844316.2459683747,"maxCP":463090,"maxHP":193769,"favorite":"Pokemon/favorite/pr6cb66"})
                // createModelLine: end  
            const removePokemonMutation = `mutation RemovePokemon($id: ID!){
        removePokemon(id: $id) {
           id
        }
    }`
    
    const removePokemonResponse = await server.mutate({
        mutation: removePokemonMutation,
        variables: { id:createPokemonResponse.id }
      }, token);

      expect(removePokemonResponse).not.toHaveProperty('errors')
expect(removePokemonResponse).toHaveProperty('data.removePokemon.id', createPokemonResponse.id)

          
          const pokemonCheck = await server.entry.models['pokemon'].findById(createPokemonResponse.id)
          expect(pokemonCheck).toBeNull()
    
    
        })
    
        
        it('all Pokemon', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, user, {"name":"Pokemon/name/zmtgr9uk","classification":"Pokemon/classification/k1p9h2qg","resistant":["Pokemon/resistant/fxkvw56k","Pokemon/resistant/1xvdxrt","Pokemon/resistant/n3b9699"],"weaknesses":["Pokemon/weaknesses/lqtrkmt","Pokemon/weaknesses/6bsl0kvf","Pokemon/weaknesses/y4xdwvss"],"fleeRate":947271.8675609073,"maxCP":627849,"maxHP":844710,"favorite":"Pokemon/favorite/km2c31e7"})
                // createModelLine: end

                // createModelLine: start
                const createPokemonResponse2 = await createPokemon(server, user, {"name":"Pokemon/name/gf78ybg","classification":"Pokemon/classification/vdifc2t","resistant":["Pokemon/resistant/1merm0l8j","Pokemon/resistant/h96elbd8q","Pokemon/resistant/eg8lfnhd"],"weaknesses":["Pokemon/weaknesses/8rb416swd","Pokemon/weaknesses/7kvc10mx","Pokemon/weaknesses/cvz68zfl"],"fleeRate":1887.1848047756766,"maxCP":115057,"maxHP":50225,"favorite":"Pokemon/favorite/0ims4kw"})
                // createModelLine: end  
            const allPokemonQuery = `query allPokemon {
        allPokemon {
            updatedAt,createdAt,id,name,classification,types{updatedAt,createdAt,id,name,pokemons{id},user{id}},resistant,weaknesses,weight{minimum,maximum},height{minimum,maximum},attacks{fast{id},special{id}},fleeRate,maxCP,maxHP,evolutions{updatedAt,createdAt,id,name,pokemon{id},_pokemonEvo{id},_prevPokemonEvo{id},user{id}},prevEvolutions{updatedAt,createdAt,id,name,pokemon{id},_pokemonEvo{id},_prevPokemonEvo{id},user{id}},favorite,_evo{updatedAt,createdAt,id,name,pokemon{id},_pokemonEvo{id},_prevPokemonEvo{id},user{id}},user{updatedAt,createdAt,id,email,password,verified,roles{id},files{id},_pokemon{id},_evolution{id},_pokemonType{id}}
        }
    }`
    
    const allPokemonResponse = await server.query({
        query: allPokemonQuery,
        variables: { id: createPokemonResponse.id}
      }, token)

    
expect(allPokemonResponse.data.allPokemon).toEqual(expect.arrayContaining([
        expect.objectContaining({id: createPokemonResponse.id,name: createPokemonResponse.name,classification: createPokemonResponse.classification,resistant: createPokemonResponse.resistant,weaknesses: createPokemonResponse.weaknesses,fleeRate: createPokemonResponse.fleeRate,maxCP: createPokemonResponse.maxCP,maxHP: createPokemonResponse.maxHP,favorite: createPokemonResponse.favorite}),
        expect.objectContaining({id: createPokemonResponse2.id,name: createPokemonResponse2.name,classification: createPokemonResponse2.classification,resistant: createPokemonResponse2.resistant,weaknesses: createPokemonResponse2.weaknesses,fleeRate: createPokemonResponse2.fleeRate,maxCP: createPokemonResponse2.maxCP,maxHP: createPokemonResponse2.maxHP,favorite: createPokemonResponse2.favorite})
    ]))
        })
    
    })

    describe('user:api', ()=>{
        
        it('create:api Pokemon', async()=>{
            const token = user.token
              
            const data = {
	"updatedAt": "2021-12-11T23:02:24.250Z",
	"createdAt": "2020-07-15T22:48:50.309Z",
	"name": "Pokemon/name/y0izakw",
	"classification": "Pokemon/classification/4btscje7",
	"resistant": [
		"Pokemon/resistant/v6a3hopq",
		"Pokemon/resistant/t841owz8",
		"Pokemon/resistant/ma6xhw2a"
	],
	"weaknesses": [
		"Pokemon/weaknesses/yr18b6k",
		"Pokemon/weaknesses/ed6s76c",
		"Pokemon/weaknesses/ij1m591r"
	],
	"fleeRate": 267265.98271217797,
	"maxCP": 92872,
	"maxHP": 105696,
	"favorite": "Pokemon/favorite/qmpjta9f"
}
    const createPokemonResponse = await server.post('/api/pokemon', data ,token);
      
      expect(createPokemonResponse).not.toHaveProperty('errors')
expect(createPokemonResponse).toHaveProperty('body.createPokemon.name', 'Pokemon/name/y0izakw')
expect(createPokemonResponse).toHaveProperty('body.createPokemon.classification', 'Pokemon/classification/4btscje7')
expect(createPokemonResponse).toHaveProperty('body.createPokemon.resistant', ['Pokemon/resistant/v6a3hopq','Pokemon/resistant/t841owz8','Pokemon/resistant/ma6xhw2a'])
expect(createPokemonResponse).toHaveProperty('body.createPokemon.weaknesses', ['Pokemon/weaknesses/yr18b6k','Pokemon/weaknesses/ed6s76c','Pokemon/weaknesses/ij1m591r'])
expect(createPokemonResponse).toHaveProperty('body.createPokemon.fleeRate', 267265.98271217797)
expect(createPokemonResponse).toHaveProperty('body.createPokemon.maxCP', 92872)
expect(createPokemonResponse).toHaveProperty('body.createPokemon.maxHP', 105696)
expect(createPokemonResponse).toHaveProperty('body.createPokemon.favorite', Pokemon/favorite/qmpjta9f)
    
        })
    
        
        it('one:api Pokemon', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, user, {"name":"Pokemon/name/hhcg5skd","classification":"Pokemon/classification/42sawuts","resistant":["Pokemon/resistant/7rwlwii5","Pokemon/resistant/52zzzrq8","Pokemon/resistant/xmts8qp"],"weaknesses":["Pokemon/weaknesses/h213djk","Pokemon/weaknesses/7uzzabd","Pokemon/weaknesses/zm7ud7sb"],"fleeRate":973424.4649055998,"maxCP":904557,"maxHP":666205,"favorite":"Pokemon/favorite/5ui327db"})
                // createModelLine: end  
            
      const onePokemonResponse = await server.get('/api/pokemon/' + createPokemonResponse.id, token);

      expect(onePokemonResponse).not.toHaveProperty('errors')
expect(onePokemonResponse).toHaveProperty('body.pokemon.updatedAt')
expect(onePokemonResponse).toHaveProperty('body.pokemon.createdAt')
expect(onePokemonResponse).toHaveProperty('body.pokemon.id', createPokemonResponse.id)
expect(onePokemonResponse).toHaveProperty('body.pokemon.name', createPokemonResponse.name)
expect(onePokemonResponse).toHaveProperty('body.pokemon.classification', createPokemonResponse.classification)
expect(onePokemonResponse.body.pokemon.types).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonResponse.types[0].id,pokemons:expect.objectContaining({id:onePokemonResponse.id})}),
	expect.objectContaining({id: createPokemonResponse.types[1].id,pokemons:expect.objectContaining({id:onePokemonResponse.id})})]))
expect(onePokemonResponse).toHaveProperty('body.pokemon.types.0.id')
expect(onePokemonResponse).toHaveProperty('body.pokemon.types.1.id')
expect(onePokemonResponse).toHaveProperty('body.pokemon.resistant', createPokemonResponse.resistant)
expect(onePokemonResponse).toHaveProperty('body.pokemon.weaknesses', createPokemonResponse.weaknesses)
expect(onePokemonResponse).toHaveProperty('body.pokemon.weight')
expect(onePokemonResponse).toHaveProperty('body.pokemon.height')
expect(onePokemonResponse).toHaveProperty('body.pokemon.attacks')
expect(onePokemonResponse).toHaveProperty('body.pokemon.fleeRate', createPokemonResponse.fleeRate)
expect(onePokemonResponse).toHaveProperty('body.pokemon.maxCP', createPokemonResponse.maxCP)
expect(onePokemonResponse).toHaveProperty('body.pokemon.maxHP', createPokemonResponse.maxHP)
expect(onePokemonResponse.body.pokemon.evolutions).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonResponse.evolutions[0].id,_pokemonEvo:expect.objectContaining({id:onePokemonResponse.id})}),
	expect.objectContaining({id: createPokemonResponse.evolutions[1].id,_pokemonEvo:expect.objectContaining({id:onePokemonResponse.id})})]))
expect(onePokemonResponse).toHaveProperty('body.pokemon.evolutions.0.id')
expect(onePokemonResponse).toHaveProperty('body.pokemon.evolutions.1.id')
expect(onePokemonResponse.body.pokemon.prevEvolutions).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonResponse.prevEvolutions[0].id,_prevPokemonEvo:expect.objectContaining({id:onePokemonResponse.id})}),
	expect.objectContaining({id: createPokemonResponse.prevEvolutions[1].id,_prevPokemonEvo:expect.objectContaining({id:onePokemonResponse.id})})]))
expect(onePokemonResponse).toHaveProperty('body.pokemon.prevEvolutions.0.id')
expect(onePokemonResponse).toHaveProperty('body.pokemon.prevEvolutions.1.id')
expect(onePokemonResponse).toHaveProperty('body.pokemon.favorite', createPokemonResponse.favorite)
expect(onePokemonResponse).toHaveProperty('body.pokemon._evo')
expect(onePokemonResponse).toHaveProperty('body.pokemon.user')

    
        })
    
        
        it('update:api Pokemon', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, user, {"name":"Pokemon/name/3e8lq22","classification":"Pokemon/classification/im8w0tlt","resistant":["Pokemon/resistant/pekep15s","Pokemon/resistant/i31ppet","Pokemon/resistant/9bc05pip"],"weaknesses":["Pokemon/weaknesses/zhxb938d","Pokemon/weaknesses/20teefrc","Pokemon/weaknesses/r83gi4uo"],"fleeRate":40018.75000470378,"maxCP":657793,"maxHP":266136,"favorite":"Pokemon/favorite/t7f3s3di"})
                // createModelLine: end  
            
    const updatePokemonResponse = await server.put('/api/pokemon/' + createPokemonResponse.id,
        {
	"id": createPokemonResponse.id,
	"name": "Pokemon/name/gzksoiu",
	"classification": "Pokemon/classification/l5p3987",
	"resistant": [
		"Pokemon/resistant/7p8w1jf",
		"Pokemon/resistant/j87wj3z",
		"Pokemon/resistant/hkuak9af"
	],
	"weaknesses": [
		"Pokemon/weaknesses/l99brb3",
		"Pokemon/weaknesses/q61iswi9",
		"Pokemon/weaknesses/0zxj31jk"
	],
	"fleeRate": 115565.12291166765,
	"maxCP": 464889,
	"maxHP": 108237,
	"favorite": "Pokemon/favorite/aqft66"
}
      , token);

    expect(updatePokemonResponse).not.toHaveProperty('errors')
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.id', createPokemonResponse.id)
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.name', 'Pokemon/name/gzksoiu')
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.classification', 'Pokemon/classification/l5p3987')
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.resistant', ['Pokemon/resistant/7p8w1jf','Pokemon/resistant/j87wj3z','Pokemon/resistant/hkuak9af'])
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.weaknesses', ['Pokemon/weaknesses/l99brb3','Pokemon/weaknesses/q61iswi9','Pokemon/weaknesses/0zxj31jk'])
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.fleeRate', 115565.12291166765)
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.maxCP', 464889)
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.maxHP', 108237)
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.favorite', Pokemon/favorite/aqft66)
    
        })
    
        
        it('remove:api Pokemon', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, user, {"name":"Pokemon/name/9tmwhlkj","classification":"Pokemon/classification/dg9woyf","resistant":["Pokemon/resistant/e6eqpcvi","Pokemon/resistant/0zww4x37","Pokemon/resistant/wdaassbm"],"weaknesses":["Pokemon/weaknesses/n50d5c4","Pokemon/weaknesses/0c2aipkb","Pokemon/weaknesses/olrdlgz"],"fleeRate":210991.8659328891,"maxCP":363273,"maxHP":898783,"favorite":"Pokemon/favorite/qld1df6e"})
                // createModelLine: end  
            const removePokemonMutation = `mutation RemovePokemon($id: ID!){
        removePokemon(id: $id) {
           id
        }
    }`
    
    const removePokemonResponse = await server.mutate({
        mutation: removePokemonMutation,
        variables: { id:createPokemonResponse.id }
      }, token);

      expect(removePokemonResponse).not.toHaveProperty('errors')
expect(removePokemonResponse).toHaveProperty('data.removePokemon.id', createPokemonResponse.id)

          
          const pokemonCheck = await server.entry.models['pokemon'].findById(createPokemonResponse.id)
          expect(pokemonCheck).toBeNull()
    
    
        })
    
        
        it('all:api Pokemon', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, user, {"name":"Pokemon/name/2pgtpas","classification":"Pokemon/classification/zt0m4ih8","resistant":["Pokemon/resistant/x53lev7","Pokemon/resistant/8xhn0wq","Pokemon/resistant/8xrn6kf"],"weaknesses":["Pokemon/weaknesses/9s05ykz4i","Pokemon/weaknesses/ycvr1dre","Pokemon/weaknesses/npffjlk"],"fleeRate":941050.6575489221,"maxCP":914801,"maxHP":189999,"favorite":"Pokemon/favorite/l833dca"})
                // createModelLine: end

                // createModelLine: start
                const createPokemonResponse2 = await createPokemon(server, user, {"name":"Pokemon/name/bgfl6bim","classification":"Pokemon/classification/zkcsow37","resistant":["Pokemon/resistant/68pu5smk","Pokemon/resistant/msx7btl","Pokemon/resistant/zpwisugw"],"weaknesses":["Pokemon/weaknesses/3opu5jm9","Pokemon/weaknesses/9yk2dv2y","Pokemon/weaknesses/ffeymlm"],"fleeRate":472883.1840757151,"maxCP":550472,"maxHP":407185,"favorite":"Pokemon/favorite/3pmfm2s"})
                // createModelLine: end  
             const allPokemonResponse = await server.get('/api/pokemon/all', token);
expect(allPokemonResponse.body.allPokemon).toEqual(expect.arrayContaining([
        expect.objectContaining({id: createPokemonResponse.id,name: createPokemonResponse.name,classification: createPokemonResponse.classification,resistant: createPokemonResponse.resistant,weaknesses: createPokemonResponse.weaknesses,fleeRate: createPokemonResponse.fleeRate,maxCP: createPokemonResponse.maxCP,maxHP: createPokemonResponse.maxHP,favorite: createPokemonResponse.favorite}),
        expect.objectContaining({id: createPokemonResponse2.id,name: createPokemonResponse2.name,classification: createPokemonResponse2.classification,resistant: createPokemonResponse2.resistant,weaknesses: createPokemonResponse2.weaknesses,fleeRate: createPokemonResponse2.fleeRate,maxCP: createPokemonResponse2.maxCP,maxHP: createPokemonResponse2.maxHP,favorite: createPokemonResponse2.favorite})
    ]))
        })
    
    })


    describe('pub:graphql', ()=>{
        
        it('create Pokemon', async()=>{
            const token = pub.token
              
            const data = {
	"updatedAt": "2021-12-07T23:16:31.217Z",
	"createdAt": "2022-07-21T22:52:33.951Z",
	"name": "Pokemon/name/ufbzp6lm",
	"classification": "Pokemon/classification/y7d1dokc",
	"resistant": [
		"Pokemon/resistant/rly4zd4",
		"Pokemon/resistant/e377y6b",
		"Pokemon/resistant/omp796od"
	],
	"weaknesses": [
		"Pokemon/weaknesses/b5elkcd",
		"Pokemon/weaknesses/jas5g9ic",
		"Pokemon/weaknesses/togbddyt"
	],
	"fleeRate": 554263.8126310973,
	"maxCP": 897243,
	"maxHP": 362169,
	"favorite": "Pokemon/favorite/kk77vgsr"
}
const createPokemonMutation = `mutation CreatePokemon($name: String!,$classification: String,$resistant: String,$weaknesses: String,$fleeRate: Float,$maxCP: Int,$maxHP: Int,$favorite: Boolean){
        createPokemon(name: $name,classification: $classification,resistant: $resistant,weaknesses: $weaknesses,fleeRate: $fleeRate,maxCP: $maxCP,maxHP: $maxHP,favorite: $favorite) {
           name,classification,resistant,weaknesses,fleeRate,maxCP,maxHP,favorite
        }
    }`
    
    const createPokemonResponse = await server.mutate({
        mutation: createPokemonMutation,
        variables: data
      }, token);
    expect(createPokemonResponse).not.toHaveProperty('errors')
expect(createPokemonResponse).toHaveProperty('data.createPokemon.name', 'Pokemon/name/ufbzp6lm')
expect(createPokemonResponse).toHaveProperty('data.createPokemon.classification', 'Pokemon/classification/y7d1dokc')
expect(createPokemonResponse).toHaveProperty('data.createPokemon.resistant', ['Pokemon/resistant/rly4zd4','Pokemon/resistant/e377y6b','Pokemon/resistant/omp796od'])
expect(createPokemonResponse).toHaveProperty('data.createPokemon.weaknesses', ['Pokemon/weaknesses/b5elkcd','Pokemon/weaknesses/jas5g9ic','Pokemon/weaknesses/togbddyt'])
expect(createPokemonResponse).toHaveProperty('data.createPokemon.fleeRate', 554263.8126310973)
expect(createPokemonResponse).toHaveProperty('data.createPokemon.maxCP', 897243)
expect(createPokemonResponse).toHaveProperty('data.createPokemon.maxHP', 362169)
expect(createPokemonResponse).toHaveProperty('data.createPokemon.favorite', Pokemon/favorite/kk77vgsr)
        })
    
        
        it('one Pokemon', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, pub, {"name":"Pokemon/name/tlc52ys","classification":"Pokemon/classification/ih1clkhw","resistant":["Pokemon/resistant/ngad8zy","Pokemon/resistant/cvylrth","Pokemon/resistant/kdfvagq"],"weaknesses":["Pokemon/weaknesses/97kocfxn","Pokemon/weaknesses/7spljmka","Pokemon/weaknesses/s3yvv44"],"fleeRate":334368.5472149078,"maxCP":144594,"maxHP":299025,"favorite":"Pokemon/favorite/tyk372pc"})
                // createModelLine: end  
            const onePokemonQuery = `query Pokemon($id: ID!){
        Pokemon(id: $id) {
            updatedAt,createdAt,id,name,classification,types{updatedAt,createdAt,id,name,pokemons{id},user{id}},resistant,weaknesses,weight{minimum,maximum},height{minimum,maximum},attacks{fast{id},special{id}},fleeRate,maxCP,maxHP,evolutions{updatedAt,createdAt,id,name,pokemon{id},_pokemonEvo{id},_prevPokemonEvo{id},user{id}},prevEvolutions{updatedAt,createdAt,id,name,pokemon{id},_pokemonEvo{id},_prevPokemonEvo{id},user{id}},favorite,_evo{updatedAt,createdAt,id,name,pokemon{id},_pokemonEvo{id},_prevPokemonEvo{id},user{id}},user{updatedAt,createdAt,id,email,password,verified,roles{id},files{id},_pokemon{id},_evolution{id},_pokemonType{id}}
        }
    }`
    
    const onePokemonResponse = await server.query({
        query: onePokemonQuery,
        variables: { id: createPokemonResponse.id}
      }, token);

      expect(onePokemonResponse).not.toHaveProperty('errors')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.updatedAt')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.createdAt')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.id', createPokemonResponse.id)
expect(onePokemonResponse).toHaveProperty('data.Pokemon.name', createPokemonResponse.name)
expect(onePokemonResponse).toHaveProperty('data.Pokemon.classification', createPokemonResponse.classification)
expect(onePokemonResponse.data.Pokemon.types).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonResponse.types[0].id,pokemons:expect.objectContaining({id:onePokemonResponse.id})}),
	expect.objectContaining({id: createPokemonResponse.types[1].id,pokemons:expect.objectContaining({id:onePokemonResponse.id})})]))
expect(onePokemonResponse).toHaveProperty('data.Pokemon.types.0.id')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.types.1.id')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.resistant', createPokemonResponse.resistant)
expect(onePokemonResponse).toHaveProperty('data.Pokemon.weaknesses', createPokemonResponse.weaknesses)
expect(onePokemonResponse).toHaveProperty('data.Pokemon.weight')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.height')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.attacks')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.fleeRate', createPokemonResponse.fleeRate)
expect(onePokemonResponse).toHaveProperty('data.Pokemon.maxCP', createPokemonResponse.maxCP)
expect(onePokemonResponse).toHaveProperty('data.Pokemon.maxHP', createPokemonResponse.maxHP)
expect(onePokemonResponse.data.Pokemon.evolutions).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonResponse.evolutions[0].id,_pokemonEvo:expect.objectContaining({id:onePokemonResponse.id})}),
	expect.objectContaining({id: createPokemonResponse.evolutions[1].id,_pokemonEvo:expect.objectContaining({id:onePokemonResponse.id})})]))
expect(onePokemonResponse).toHaveProperty('data.Pokemon.evolutions.0.id')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.evolutions.1.id')
expect(onePokemonResponse.data.Pokemon.prevEvolutions).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonResponse.prevEvolutions[0].id,_prevPokemonEvo:expect.objectContaining({id:onePokemonResponse.id})}),
	expect.objectContaining({id: createPokemonResponse.prevEvolutions[1].id,_prevPokemonEvo:expect.objectContaining({id:onePokemonResponse.id})})]))
expect(onePokemonResponse).toHaveProperty('data.Pokemon.prevEvolutions.0.id')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.prevEvolutions.1.id')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.favorite', createPokemonResponse.favorite)
expect(onePokemonResponse).toHaveProperty('data.Pokemon._evo')
expect(onePokemonResponse).toHaveProperty('data.Pokemon.user')

    
        })
    
        
        it('update Pokemon', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, pub, {"name":"Pokemon/name/yi28b7kt","classification":"Pokemon/classification/g5w6lptj","resistant":["Pokemon/resistant/fjg13rt","Pokemon/resistant/v4oklp5","Pokemon/resistant/cbhc3vbn"],"weaknesses":["Pokemon/weaknesses/10uui4ob","Pokemon/weaknesses/030ptv2","Pokemon/weaknesses/x5eh27jj"],"fleeRate":254302.9606672713,"maxCP":335856,"maxHP":693017,"favorite":"Pokemon/favorite/ayoqsedp"})
                // createModelLine: end  
            const updatePokemonMutation = `mutation UpdatePokemon($id: ID!,$name: String!,$classification: String,$resistant: String,$weaknesses: String,$fleeRate: Float,$maxCP: Int,$maxHP: Int,$favorite: Boolean){
        updatePokemon(id: $id,name: $name,classification: $classification,resistant: $resistant,weaknesses: $weaknesses,fleeRate: $fleeRate,maxCP: $maxCP,maxHP: $maxHP,favorite: $favorite) {
           id,name,classification,resistant,weaknesses,fleeRate,maxCP,maxHP,favorite
        }
    }`
    
    const updatePokemonResponse = await server.mutate({
        mutation: updatePokemonMutation,
        variables: {
	"id": createPokemonResponse.id,
	"name": "Pokemon/name/ou40vt0m",
	"classification": "Pokemon/classification/fq2iie0v",
	"resistant": [
		"Pokemon/resistant/n00rqifp",
		"Pokemon/resistant/t0h7uzdc",
		"Pokemon/resistant/e07214se"
	],
	"weaknesses": [
		"Pokemon/weaknesses/3wsdhsox",
		"Pokemon/weaknesses/uuc92sy",
		"Pokemon/weaknesses/4wksq8hj"
	],
	"fleeRate": 71875.08254707597,
	"maxCP": 117428,
	"maxHP": 371710,
	"favorite": "Pokemon/favorite/3n8roe1o"
}
      }, token);

    expect(updatePokemonResponse).not.toHaveProperty('errors')
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.id', createPokemonResponse.id)
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.name', 'Pokemon/name/ou40vt0m')
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.classification', 'Pokemon/classification/fq2iie0v')
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.resistant', ['Pokemon/resistant/n00rqifp','Pokemon/resistant/t0h7uzdc','Pokemon/resistant/e07214se'])
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.weaknesses', ['Pokemon/weaknesses/3wsdhsox','Pokemon/weaknesses/uuc92sy','Pokemon/weaknesses/4wksq8hj'])
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.fleeRate', 71875.08254707597)
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.maxCP', 117428)
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.maxHP', 371710)
expect(updatePokemonResponse).toHaveProperty('data.updatePokemon.favorite', Pokemon/favorite/3n8roe1o)
    
        })
    
        
        it('remove Pokemon', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, pub, {"name":"Pokemon/name/gm3kby","classification":"Pokemon/classification/3n5f4tzt","resistant":["Pokemon/resistant/9g2n9tj","Pokemon/resistant/yilpl9ik","Pokemon/resistant/lhkmkvwn"],"weaknesses":["Pokemon/weaknesses/albrg9nj","Pokemon/weaknesses/p1hisoou","Pokemon/weaknesses/hmjvgsno"],"fleeRate":702859.6395317501,"maxCP":783138,"maxHP":864671,"favorite":"Pokemon/favorite/n95n3up8"})
                // createModelLine: end  
            const removePokemonMutation = `mutation RemovePokemon($id: ID!){
        removePokemon(id: $id) {
           id
        }
    }`
    
    const removePokemonResponse = await server.mutate({
        mutation: removePokemonMutation,
        variables: { id:createPokemonResponse.id }
      }, token);

      expect(removePokemonResponse).not.toHaveProperty('errors')
expect(removePokemonResponse).toHaveProperty('data.removePokemon.id', createPokemonResponse.id)

          
          const pokemonCheck = await server.entry.models['pokemon'].findById(createPokemonResponse.id)
          expect(pokemonCheck).toBeNull()
    
    
        })
    
        
        it('all Pokemon', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, pub, {"name":"Pokemon/name/gbea6fey","classification":"Pokemon/classification/2czmcgan","resistant":["Pokemon/resistant/q50lr1kk","Pokemon/resistant/q205by7a","Pokemon/resistant/qvec9lja"],"weaknesses":["Pokemon/weaknesses/bv9yr02n","Pokemon/weaknesses/2os4upb","Pokemon/weaknesses/s34fewbw"],"fleeRate":652665.6299391844,"maxCP":68167,"maxHP":422829,"favorite":"Pokemon/favorite/p53ibylu"})
                // createModelLine: end

                // createModelLine: start
                const createPokemonResponse2 = await createPokemon(server, pub, {"name":"Pokemon/name/zuf5qbm","classification":"Pokemon/classification/nyzvf0f8","resistant":["Pokemon/resistant/ci43w8w","Pokemon/resistant/afordzz7","Pokemon/resistant/km1806k4"],"weaknesses":["Pokemon/weaknesses/d2wm8wzp","Pokemon/weaknesses/z6qz88ng","Pokemon/weaknesses/w4oou6p"],"fleeRate":994753.005572158,"maxCP":456003,"maxHP":173803,"favorite":"Pokemon/favorite/mlnzl1ef"})
                // createModelLine: end  
            const allPokemonQuery = `query allPokemon {
        allPokemon {
            updatedAt,createdAt,id,name,classification,types{updatedAt,createdAt,id,name,pokemons{id},user{id}},resistant,weaknesses,weight{minimum,maximum},height{minimum,maximum},attacks{fast{id},special{id}},fleeRate,maxCP,maxHP,evolutions{updatedAt,createdAt,id,name,pokemon{id},_pokemonEvo{id},_prevPokemonEvo{id},user{id}},prevEvolutions{updatedAt,createdAt,id,name,pokemon{id},_pokemonEvo{id},_prevPokemonEvo{id},user{id}},favorite,_evo{updatedAt,createdAt,id,name,pokemon{id},_pokemonEvo{id},_prevPokemonEvo{id},user{id}},user{updatedAt,createdAt,id,email,password,verified,roles{id},files{id},_pokemon{id},_evolution{id},_pokemonType{id}}
        }
    }`
    
    const allPokemonResponse = await server.query({
        query: allPokemonQuery,
        variables: { id: createPokemonResponse.id}
      }, token)

    
expect(allPokemonResponse.data.allPokemon).toEqual(expect.arrayContaining([
        expect.objectContaining({id: createPokemonResponse.id,name: createPokemonResponse.name,classification: createPokemonResponse.classification,resistant: createPokemonResponse.resistant,weaknesses: createPokemonResponse.weaknesses,fleeRate: createPokemonResponse.fleeRate,maxCP: createPokemonResponse.maxCP,maxHP: createPokemonResponse.maxHP,favorite: createPokemonResponse.favorite}),
        expect.objectContaining({id: createPokemonResponse2.id,name: createPokemonResponse2.name,classification: createPokemonResponse2.classification,resistant: createPokemonResponse2.resistant,weaknesses: createPokemonResponse2.weaknesses,fleeRate: createPokemonResponse2.fleeRate,maxCP: createPokemonResponse2.maxCP,maxHP: createPokemonResponse2.maxHP,favorite: createPokemonResponse2.favorite})
    ]))
        })
    
    })

    describe('pub:api', ()=>{
        
        it('create:api Pokemon', async()=>{
            const token = pub.token
              
            const data = {
	"updatedAt": "2021-03-17T23:26:07.014Z",
	"createdAt": "2020-08-26T22:12:45.676Z",
	"name": "Pokemon/name/eqws5zao",
	"classification": "Pokemon/classification/33u9mar2",
	"resistant": [
		"Pokemon/resistant/s1n4vo4i",
		"Pokemon/resistant/ajj6af3v",
		"Pokemon/resistant/wrq9f6u"
	],
	"weaknesses": [
		"Pokemon/weaknesses/dz1jffv",
		"Pokemon/weaknesses/7l3l1ec",
		"Pokemon/weaknesses/hwlee2td"
	],
	"fleeRate": 287395.02703516104,
	"maxCP": 41113,
	"maxHP": 343621,
	"favorite": "Pokemon/favorite/72o6iyq5"
}
    const createPokemonResponse = await server.post('/api/pokemon', data ,token);
      
      expect(createPokemonResponse).not.toHaveProperty('errors')
expect(createPokemonResponse).toHaveProperty('body.createPokemon.name', 'Pokemon/name/eqws5zao')
expect(createPokemonResponse).toHaveProperty('body.createPokemon.classification', 'Pokemon/classification/33u9mar2')
expect(createPokemonResponse).toHaveProperty('body.createPokemon.resistant', ['Pokemon/resistant/s1n4vo4i','Pokemon/resistant/ajj6af3v','Pokemon/resistant/wrq9f6u'])
expect(createPokemonResponse).toHaveProperty('body.createPokemon.weaknesses', ['Pokemon/weaknesses/dz1jffv','Pokemon/weaknesses/7l3l1ec','Pokemon/weaknesses/hwlee2td'])
expect(createPokemonResponse).toHaveProperty('body.createPokemon.fleeRate', 287395.02703516104)
expect(createPokemonResponse).toHaveProperty('body.createPokemon.maxCP', 41113)
expect(createPokemonResponse).toHaveProperty('body.createPokemon.maxHP', 343621)
expect(createPokemonResponse).toHaveProperty('body.createPokemon.favorite', Pokemon/favorite/72o6iyq5)
    
        })
    
        
        it('one:api Pokemon', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, pub, {"name":"Pokemon/name/ecss6k8","classification":"Pokemon/classification/o1wmvt3r","resistant":["Pokemon/resistant/q1oq7ni","Pokemon/resistant/sh96fisp","Pokemon/resistant/ka9s6zwf"],"weaknesses":["Pokemon/weaknesses/jac3y4ck","Pokemon/weaknesses/fegreg8","Pokemon/weaknesses/g1san7jc"],"fleeRate":560779.0892573177,"maxCP":948824,"maxHP":175063,"favorite":"Pokemon/favorite/exhhfyl"})
                // createModelLine: end  
            
      const onePokemonResponse = await server.get('/api/pokemon/' + createPokemonResponse.id, token);

      expect(onePokemonResponse).not.toHaveProperty('errors')
expect(onePokemonResponse).toHaveProperty('body.pokemon.updatedAt')
expect(onePokemonResponse).toHaveProperty('body.pokemon.createdAt')
expect(onePokemonResponse).toHaveProperty('body.pokemon.id', createPokemonResponse.id)
expect(onePokemonResponse).toHaveProperty('body.pokemon.name', createPokemonResponse.name)
expect(onePokemonResponse).toHaveProperty('body.pokemon.classification', createPokemonResponse.classification)
expect(onePokemonResponse.body.pokemon.types).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonResponse.types[0].id,pokemons:expect.objectContaining({id:onePokemonResponse.id})}),
	expect.objectContaining({id: createPokemonResponse.types[1].id,pokemons:expect.objectContaining({id:onePokemonResponse.id})})]))
expect(onePokemonResponse).toHaveProperty('body.pokemon.types.0.id')
expect(onePokemonResponse).toHaveProperty('body.pokemon.types.1.id')
expect(onePokemonResponse).toHaveProperty('body.pokemon.resistant', createPokemonResponse.resistant)
expect(onePokemonResponse).toHaveProperty('body.pokemon.weaknesses', createPokemonResponse.weaknesses)
expect(onePokemonResponse).toHaveProperty('body.pokemon.weight')
expect(onePokemonResponse).toHaveProperty('body.pokemon.height')
expect(onePokemonResponse).toHaveProperty('body.pokemon.attacks')
expect(onePokemonResponse).toHaveProperty('body.pokemon.fleeRate', createPokemonResponse.fleeRate)
expect(onePokemonResponse).toHaveProperty('body.pokemon.maxCP', createPokemonResponse.maxCP)
expect(onePokemonResponse).toHaveProperty('body.pokemon.maxHP', createPokemonResponse.maxHP)
expect(onePokemonResponse.body.pokemon.evolutions).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonResponse.evolutions[0].id,_pokemonEvo:expect.objectContaining({id:onePokemonResponse.id})}),
	expect.objectContaining({id: createPokemonResponse.evolutions[1].id,_pokemonEvo:expect.objectContaining({id:onePokemonResponse.id})})]))
expect(onePokemonResponse).toHaveProperty('body.pokemon.evolutions.0.id')
expect(onePokemonResponse).toHaveProperty('body.pokemon.evolutions.1.id')
expect(onePokemonResponse.body.pokemon.prevEvolutions).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonResponse.prevEvolutions[0].id,_prevPokemonEvo:expect.objectContaining({id:onePokemonResponse.id})}),
	expect.objectContaining({id: createPokemonResponse.prevEvolutions[1].id,_prevPokemonEvo:expect.objectContaining({id:onePokemonResponse.id})})]))
expect(onePokemonResponse).toHaveProperty('body.pokemon.prevEvolutions.0.id')
expect(onePokemonResponse).toHaveProperty('body.pokemon.prevEvolutions.1.id')
expect(onePokemonResponse).toHaveProperty('body.pokemon.favorite', createPokemonResponse.favorite)
expect(onePokemonResponse).toHaveProperty('body.pokemon._evo')
expect(onePokemonResponse).toHaveProperty('body.pokemon.user')

    
        })
    
        
        it('update:api Pokemon', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, pub, {"name":"Pokemon/name/zwac92wr","classification":"Pokemon/classification/hwmy8qg2","resistant":["Pokemon/resistant/u69s5c8c","Pokemon/resistant/mxve8mrv","Pokemon/resistant/dx4wb3c"],"weaknesses":["Pokemon/weaknesses/3v35621o","Pokemon/weaknesses/7jah2y","Pokemon/weaknesses/nmudyxwl"],"fleeRate":970616.5095319144,"maxCP":311280,"maxHP":306499,"favorite":"Pokemon/favorite/mf1zgw3"})
                // createModelLine: end  
            
    const updatePokemonResponse = await server.put('/api/pokemon/' + createPokemonResponse.id,
        {
	"id": createPokemonResponse.id,
	"name": "Pokemon/name/0ogfnnau",
	"classification": "Pokemon/classification/vvyx17r5",
	"resistant": [
		"Pokemon/resistant/76kx9ihc",
		"Pokemon/resistant/w3jja278",
		"Pokemon/resistant/mky4mf34"
	],
	"weaknesses": [
		"Pokemon/weaknesses/vad5rq1m",
		"Pokemon/weaknesses/omb5ud1h",
		"Pokemon/weaknesses/90rligam"
	],
	"fleeRate": 856565.9923262508,
	"maxCP": 772928,
	"maxHP": 443764,
	"favorite": "Pokemon/favorite/d2ppulo"
}
      , token);

    expect(updatePokemonResponse).not.toHaveProperty('errors')
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.id', createPokemonResponse.id)
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.name', 'Pokemon/name/0ogfnnau')
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.classification', 'Pokemon/classification/vvyx17r5')
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.resistant', ['Pokemon/resistant/76kx9ihc','Pokemon/resistant/w3jja278','Pokemon/resistant/mky4mf34'])
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.weaknesses', ['Pokemon/weaknesses/vad5rq1m','Pokemon/weaknesses/omb5ud1h','Pokemon/weaknesses/90rligam'])
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.fleeRate', 856565.9923262508)
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.maxCP', 772928)
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.maxHP', 443764)
expect(updatePokemonResponse).toHaveProperty('body.updatePokemon.favorite', Pokemon/favorite/d2ppulo)
    
        })
    
        
        it('remove:api Pokemon', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, pub, {"name":"Pokemon/name/tmjm3thd","classification":"Pokemon/classification/pp0vj2il","resistant":["Pokemon/resistant/kng9k35t","Pokemon/resistant/mp8a08s","Pokemon/resistant/h9b7bqhn"],"weaknesses":["Pokemon/weaknesses/fghfrhbo","Pokemon/weaknesses/bi52dkk","Pokemon/weaknesses/v3c0y90l"],"fleeRate":572952.8822500414,"maxCP":108852,"maxHP":62465,"favorite":"Pokemon/favorite/ahk3sgku"})
                // createModelLine: end  
            const removePokemonMutation = `mutation RemovePokemon($id: ID!){
        removePokemon(id: $id) {
           id
        }
    }`
    
    const removePokemonResponse = await server.mutate({
        mutation: removePokemonMutation,
        variables: { id:createPokemonResponse.id }
      }, token);

      expect(removePokemonResponse).not.toHaveProperty('errors')
expect(removePokemonResponse).toHaveProperty('data.removePokemon.id', createPokemonResponse.id)

          
          const pokemonCheck = await server.entry.models['pokemon'].findById(createPokemonResponse.id)
          expect(pokemonCheck).toBeNull()
    
    
        })
    
        
        it('all:api Pokemon', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createPokemonResponse = await createPokemon(server, pub, {"name":"Pokemon/name/6g4sfme","classification":"Pokemon/classification/g9c49mse","resistant":["Pokemon/resistant/fd9uwj7k","Pokemon/resistant/aih7c4t5","Pokemon/resistant/fmp9n0ml"],"weaknesses":["Pokemon/weaknesses/6mo3jmj8","Pokemon/weaknesses/9l80robj","Pokemon/weaknesses/un34mor5"],"fleeRate":495511.15830249805,"maxCP":589579,"maxHP":636598,"favorite":"Pokemon/favorite/cwimojsf"})
                // createModelLine: end

                // createModelLine: start
                const createPokemonResponse2 = await createPokemon(server, pub, {"name":"Pokemon/name/oyo66k3","classification":"Pokemon/classification/ngygsb4a","resistant":["Pokemon/resistant/8fxjwjys","Pokemon/resistant/988u87lw","Pokemon/resistant/jjj2aqu8"],"weaknesses":["Pokemon/weaknesses/1yh9vlnj","Pokemon/weaknesses/6ad81r8b","Pokemon/weaknesses/xcfg8wqh"],"fleeRate":35456.74118984809,"maxCP":515974,"maxHP":1077,"favorite":"Pokemon/favorite/mjvca9es"})
                // createModelLine: end  
             const allPokemonResponse = await server.get('/api/pokemon/all', token);
expect(allPokemonResponse.body.allPokemon).toEqual(expect.arrayContaining([
        expect.objectContaining({id: createPokemonResponse.id,name: createPokemonResponse.name,classification: createPokemonResponse.classification,resistant: createPokemonResponse.resistant,weaknesses: createPokemonResponse.weaknesses,fleeRate: createPokemonResponse.fleeRate,maxCP: createPokemonResponse.maxCP,maxHP: createPokemonResponse.maxHP,favorite: createPokemonResponse.favorite}),
        expect.objectContaining({id: createPokemonResponse2.id,name: createPokemonResponse2.name,classification: createPokemonResponse2.classification,resistant: createPokemonResponse2.resistant,weaknesses: createPokemonResponse2.weaknesses,fleeRate: createPokemonResponse2.fleeRate,maxCP: createPokemonResponse2.maxCP,maxHP: createPokemonResponse2.maxHP,favorite: createPokemonResponse2.favorite})
    ]))
        })
    
    })

        })
    

        describe('PokemonType', () => {
             
    describe('admin:graphql', ()=>{
        
        it('create PokemonType', async()=>{
            const token = admin.token
              
            const data = {
	"updatedAt": "2020-12-09T23:25:54.689Z",
	"createdAt": "2020-12-28T23:51:25.215Z",
	"name": "PokemonType/name/141cnlt"
}
const createPokemonTypeMutation = `mutation CreatePokemonType($name: String!){
        createPokemonType(name: $name) {
           name
        }
    }`
    
    const createPokemonTypeResponse = await server.mutate({
        mutation: createPokemonTypeMutation,
        variables: data
      }, token);
    expect(createPokemonTypeResponse).not.toHaveProperty('errors')
expect(createPokemonTypeResponse).toHaveProperty('data.createPokemonType.name', 'PokemonType/name/141cnlt')
        })
    
        
        it('one PokemonType', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, admin, {"name":"PokemonType/name/1flouqfk"})
                // createModelLine: end  
            const onePokemonTypeQuery = `query PokemonType($id: ID!){
        PokemonType(id: $id) {
            updatedAt,createdAt,id,name,pokemons{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},user{updatedAt,createdAt,id,email,password,verified,roles{id},files{id},_pokemon{id},_evolution{id},_pokemonType{id}}
        }
    }`
    
    const onePokemonTypeResponse = await server.query({
        query: onePokemonTypeQuery,
        variables: { id: createPokemonTypeResponse.id}
      }, token);

      expect(onePokemonTypeResponse).not.toHaveProperty('errors')
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.updatedAt')
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.createdAt')
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.id', createPokemonTypeResponse.id)
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.name', createPokemonTypeResponse.name)
expect(onePokemonTypeResponse.data.PokemonType.pokemons).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonTypeResponse.pokemons[0].id,types:expect.objectContaining({id:onePokemonTypeResponse.id})}),
	expect.objectContaining({id: createPokemonTypeResponse.pokemons[1].id,types:expect.objectContaining({id:onePokemonTypeResponse.id})})]))
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.pokemons.0.id')
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.pokemons.1.id')
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.user')

    
        })
    
        
        it('update PokemonType', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, admin, {"name":"PokemonType/name/xugs7oad"})
                // createModelLine: end  
            const updatePokemonTypeMutation = `mutation UpdatePokemonType($id: ID!,$name: String!){
        updatePokemonType(id: $id,name: $name) {
           id,name
        }
    }`
    
    const updatePokemonTypeResponse = await server.mutate({
        mutation: updatePokemonTypeMutation,
        variables: {
	"id": createPokemonTypeResponse.id,
	"name": "PokemonType/name/sxmotikv"
}
      }, token);

    expect(updatePokemonTypeResponse).not.toHaveProperty('errors')
expect(updatePokemonTypeResponse).toHaveProperty('data.updatePokemonType.id', createPokemonTypeResponse.id)
expect(updatePokemonTypeResponse).toHaveProperty('data.updatePokemonType.name', 'PokemonType/name/sxmotikv')
    
        })
    
        
        it('remove PokemonType', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, admin, {"name":"PokemonType/name/k74rgb2"})
                // createModelLine: end  
            const removePokemonTypeMutation = `mutation RemovePokemonType($id: ID!){
        removePokemonType(id: $id) {
           id
        }
    }`
    
    const removePokemonTypeResponse = await server.mutate({
        mutation: removePokemonTypeMutation,
        variables: { id:createPokemonTypeResponse.id }
      }, token);

      expect(removePokemonTypeResponse).not.toHaveProperty('errors')
expect(removePokemonTypeResponse).toHaveProperty('data.removePokemonType.id', createPokemonTypeResponse.id)

          
          const pokemonTypeCheck = await server.entry.models['pokemonType'].findById(createPokemonTypeResponse.id)
          expect(pokemonTypeCheck).toBeNull()
    
    
        })
    
        
        it('all PokemonType', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, admin, {"name":"PokemonType/name/zyxq0yp"})
                // createModelLine: end

                // createModelLine: start
                const createPokemonTypeResponse2 = await createPokemonType(server, admin, {"name":"PokemonType/name/qabc68c"})
                // createModelLine: end  
            const allPokemonTypeQuery = `query allPokemonType {
        allPokemonType {
            updatedAt,createdAt,id,name,pokemons{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},user{updatedAt,createdAt,id,email,password,verified,roles{id},files{id},_pokemon{id},_evolution{id},_pokemonType{id}}
        }
    }`
    
    const allPokemonTypeResponse = await server.query({
        query: allPokemonTypeQuery,
        variables: { id: createPokemonTypeResponse.id}
      }, token)

    
expect(allPokemonTypeResponse.data.allPokemonType).toEqual(expect.arrayContaining([
        expect.objectContaining({id: createPokemonTypeResponse.id,name: createPokemonTypeResponse.name}),
        expect.objectContaining({id: createPokemonTypeResponse2.id,name: createPokemonTypeResponse2.name})
    ]))
        })
    
    })

    describe('admin:api', ()=>{
        
        it('create:api PokemonType', async()=>{
            const token = admin.token
              
            const data = {
	"updatedAt": "2020-09-12T22:20:18.957Z",
	"createdAt": "2021-04-02T22:22:54.175Z",
	"name": "PokemonType/name/9a0a3jxg"
}
    const createPokemonTypeResponse = await server.post('/api/pokemonType', data ,token);
      
      expect(createPokemonTypeResponse).not.toHaveProperty('errors')
expect(createPokemonTypeResponse).toHaveProperty('body.createPokemonType.name', 'PokemonType/name/9a0a3jxg')
    
        })
    
        
        it('one:api PokemonType', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, admin, {"name":"PokemonType/name/o8c1bjz"})
                // createModelLine: end  
            
      const onePokemonTypeResponse = await server.get('/api/pokemonType/' + createPokemonTypeResponse.id, token);

      expect(onePokemonTypeResponse).not.toHaveProperty('errors')
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.updatedAt')
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.createdAt')
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.id', createPokemonTypeResponse.id)
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.name', createPokemonTypeResponse.name)
expect(onePokemonTypeResponse.body.pokemonType.pokemons).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonTypeResponse.pokemons[0].id,types:expect.objectContaining({id:onePokemonTypeResponse.id})}),
	expect.objectContaining({id: createPokemonTypeResponse.pokemons[1].id,types:expect.objectContaining({id:onePokemonTypeResponse.id})})]))
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.pokemons.0.id')
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.pokemons.1.id')
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.user')

    
        })
    
        
        it('update:api PokemonType', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, admin, {"name":"PokemonType/name/c7xf1t1n"})
                // createModelLine: end  
            
    const updatePokemonTypeResponse = await server.put('/api/pokemonType/' + createPokemonTypeResponse.id,
        {
	"id": createPokemonTypeResponse.id,
	"name": "PokemonType/name/nl29wfso"
}
      , token);

    expect(updatePokemonTypeResponse).not.toHaveProperty('errors')
expect(updatePokemonTypeResponse).toHaveProperty('body.updatePokemonType.id', createPokemonTypeResponse.id)
expect(updatePokemonTypeResponse).toHaveProperty('body.updatePokemonType.name', 'PokemonType/name/nl29wfso')
    
        })
    
        
        it('remove:api PokemonType', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, admin, {"name":"PokemonType/name/elxrd5k"})
                // createModelLine: end  
            const removePokemonTypeMutation = `mutation RemovePokemonType($id: ID!){
        removePokemonType(id: $id) {
           id
        }
    }`
    
    const removePokemonTypeResponse = await server.mutate({
        mutation: removePokemonTypeMutation,
        variables: { id:createPokemonTypeResponse.id }
      }, token);

      expect(removePokemonTypeResponse).not.toHaveProperty('errors')
expect(removePokemonTypeResponse).toHaveProperty('data.removePokemonType.id', createPokemonTypeResponse.id)

          
          const pokemonTypeCheck = await server.entry.models['pokemonType'].findById(createPokemonTypeResponse.id)
          expect(pokemonTypeCheck).toBeNull()
    
    
        })
    
        
        it('all:api PokemonType', async()=>{
            const token = admin.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, admin, {"name":"PokemonType/name/7gv6wdfk"})
                // createModelLine: end

                // createModelLine: start
                const createPokemonTypeResponse2 = await createPokemonType(server, admin, {"name":"PokemonType/name/aq1jsh3p"})
                // createModelLine: end  
             const allPokemonTypeResponse = await server.get('/api/pokemonType/all', token);
expect(allPokemonTypeResponse.body.allPokemonType).toEqual(expect.arrayContaining([
        expect.objectContaining({id: createPokemonTypeResponse.id,name: createPokemonTypeResponse.name}),
        expect.objectContaining({id: createPokemonTypeResponse2.id,name: createPokemonTypeResponse2.name})
    ]))
        })
    
    })


    describe('user:graphql', ()=>{
        
        it('create PokemonType', async()=>{
            const token = user.token
              
            const data = {
	"updatedAt": "2022-02-21T23:13:47.670Z",
	"createdAt": "2020-05-30T22:39:58.310Z",
	"name": "PokemonType/name/kr3yaepi"
}
const createPokemonTypeMutation = `mutation CreatePokemonType($name: String!){
        createPokemonType(name: $name) {
           name
        }
    }`
    
    const createPokemonTypeResponse = await server.mutate({
        mutation: createPokemonTypeMutation,
        variables: data
      }, token);
    expect(createPokemonTypeResponse).not.toHaveProperty('errors')
expect(createPokemonTypeResponse).toHaveProperty('data.createPokemonType.name', 'PokemonType/name/kr3yaepi')
        })
    
        
        it('one PokemonType', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, user, {"name":"PokemonType/name/pfgip0ir"})
                // createModelLine: end  
            const onePokemonTypeQuery = `query PokemonType($id: ID!){
        PokemonType(id: $id) {
            updatedAt,createdAt,id,name,pokemons{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},user{updatedAt,createdAt,id,email,password,verified,roles{id},files{id},_pokemon{id},_evolution{id},_pokemonType{id}}
        }
    }`
    
    const onePokemonTypeResponse = await server.query({
        query: onePokemonTypeQuery,
        variables: { id: createPokemonTypeResponse.id}
      }, token);

      expect(onePokemonTypeResponse).not.toHaveProperty('errors')
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.updatedAt')
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.createdAt')
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.id', createPokemonTypeResponse.id)
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.name', createPokemonTypeResponse.name)
expect(onePokemonTypeResponse.data.PokemonType.pokemons).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonTypeResponse.pokemons[0].id,types:expect.objectContaining({id:onePokemonTypeResponse.id})}),
	expect.objectContaining({id: createPokemonTypeResponse.pokemons[1].id,types:expect.objectContaining({id:onePokemonTypeResponse.id})})]))
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.pokemons.0.id')
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.pokemons.1.id')
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.user')

    
        })
    
        
        it('update PokemonType', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, user, {"name":"PokemonType/name/vnlfpu4"})
                // createModelLine: end  
            const updatePokemonTypeMutation = `mutation UpdatePokemonType($id: ID!,$name: String!){
        updatePokemonType(id: $id,name: $name) {
           id,name
        }
    }`
    
    const updatePokemonTypeResponse = await server.mutate({
        mutation: updatePokemonTypeMutation,
        variables: {
	"id": createPokemonTypeResponse.id,
	"name": "PokemonType/name/bwlh8iog"
}
      }, token);

    expect(updatePokemonTypeResponse).not.toHaveProperty('errors')
expect(updatePokemonTypeResponse).toHaveProperty('data.updatePokemonType.id', createPokemonTypeResponse.id)
expect(updatePokemonTypeResponse).toHaveProperty('data.updatePokemonType.name', 'PokemonType/name/bwlh8iog')
    
        })
    
        
        it('remove PokemonType', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, user, {"name":"PokemonType/name/27guoc5"})
                // createModelLine: end  
            const removePokemonTypeMutation = `mutation RemovePokemonType($id: ID!){
        removePokemonType(id: $id) {
           id
        }
    }`
    
    const removePokemonTypeResponse = await server.mutate({
        mutation: removePokemonTypeMutation,
        variables: { id:createPokemonTypeResponse.id }
      }, token);

      expect(removePokemonTypeResponse).not.toHaveProperty('errors')
expect(removePokemonTypeResponse).toHaveProperty('data.removePokemonType.id', createPokemonTypeResponse.id)

          
          const pokemonTypeCheck = await server.entry.models['pokemonType'].findById(createPokemonTypeResponse.id)
          expect(pokemonTypeCheck).toBeNull()
    
    
        })
    
        
        it('all PokemonType', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, user, {"name":"PokemonType/name/ey1actr9"})
                // createModelLine: end

                // createModelLine: start
                const createPokemonTypeResponse2 = await createPokemonType(server, user, {"name":"PokemonType/name/fhed9o2b"})
                // createModelLine: end  
            const allPokemonTypeQuery = `query allPokemonType {
        allPokemonType {
            updatedAt,createdAt,id,name,pokemons{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},user{updatedAt,createdAt,id,email,password,verified,roles{id},files{id},_pokemon{id},_evolution{id},_pokemonType{id}}
        }
    }`
    
    const allPokemonTypeResponse = await server.query({
        query: allPokemonTypeQuery,
        variables: { id: createPokemonTypeResponse.id}
      }, token)

    
expect(allPokemonTypeResponse.data.allPokemonType).toEqual(expect.arrayContaining([
        expect.objectContaining({id: createPokemonTypeResponse.id,name: createPokemonTypeResponse.name}),
        expect.objectContaining({id: createPokemonTypeResponse2.id,name: createPokemonTypeResponse2.name})
    ]))
        })
    
    })

    describe('user:api', ()=>{
        
        it('create:api PokemonType', async()=>{
            const token = user.token
              
            const data = {
	"updatedAt": "2022-01-08T23:47:06.693Z",
	"createdAt": "2020-03-03T23:52:29.034Z",
	"name": "PokemonType/name/kbscyp8j"
}
    const createPokemonTypeResponse = await server.post('/api/pokemonType', data ,token);
      
      expect(createPokemonTypeResponse).not.toHaveProperty('errors')
expect(createPokemonTypeResponse).toHaveProperty('body.createPokemonType.name', 'PokemonType/name/kbscyp8j')
    
        })
    
        
        it('one:api PokemonType', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, user, {"name":"PokemonType/name/1wrlygz"})
                // createModelLine: end  
            
      const onePokemonTypeResponse = await server.get('/api/pokemonType/' + createPokemonTypeResponse.id, token);

      expect(onePokemonTypeResponse).not.toHaveProperty('errors')
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.updatedAt')
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.createdAt')
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.id', createPokemonTypeResponse.id)
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.name', createPokemonTypeResponse.name)
expect(onePokemonTypeResponse.body.pokemonType.pokemons).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonTypeResponse.pokemons[0].id,types:expect.objectContaining({id:onePokemonTypeResponse.id})}),
	expect.objectContaining({id: createPokemonTypeResponse.pokemons[1].id,types:expect.objectContaining({id:onePokemonTypeResponse.id})})]))
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.pokemons.0.id')
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.pokemons.1.id')
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.user')

    
        })
    
        
        it('update:api PokemonType', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, user, {"name":"PokemonType/name/ekgraaq7"})
                // createModelLine: end  
            
    const updatePokemonTypeResponse = await server.put('/api/pokemonType/' + createPokemonTypeResponse.id,
        {
	"id": createPokemonTypeResponse.id,
	"name": "PokemonType/name/p0qmev9f"
}
      , token);

    expect(updatePokemonTypeResponse).not.toHaveProperty('errors')
expect(updatePokemonTypeResponse).toHaveProperty('body.updatePokemonType.id', createPokemonTypeResponse.id)
expect(updatePokemonTypeResponse).toHaveProperty('body.updatePokemonType.name', 'PokemonType/name/p0qmev9f')
    
        })
    
        
        it('remove:api PokemonType', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, user, {"name":"PokemonType/name/jmhvmkmn"})
                // createModelLine: end  
            const removePokemonTypeMutation = `mutation RemovePokemonType($id: ID!){
        removePokemonType(id: $id) {
           id
        }
    }`
    
    const removePokemonTypeResponse = await server.mutate({
        mutation: removePokemonTypeMutation,
        variables: { id:createPokemonTypeResponse.id }
      }, token);

      expect(removePokemonTypeResponse).not.toHaveProperty('errors')
expect(removePokemonTypeResponse).toHaveProperty('data.removePokemonType.id', createPokemonTypeResponse.id)

          
          const pokemonTypeCheck = await server.entry.models['pokemonType'].findById(createPokemonTypeResponse.id)
          expect(pokemonTypeCheck).toBeNull()
    
    
        })
    
        
        it('all:api PokemonType', async()=>{
            const token = user.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, user, {"name":"PokemonType/name/lrmuc5bh"})
                // createModelLine: end

                // createModelLine: start
                const createPokemonTypeResponse2 = await createPokemonType(server, user, {"name":"PokemonType/name/n8cdm8xj"})
                // createModelLine: end  
             const allPokemonTypeResponse = await server.get('/api/pokemonType/all', token);
expect(allPokemonTypeResponse.body.allPokemonType).toEqual(expect.arrayContaining([
        expect.objectContaining({id: createPokemonTypeResponse.id,name: createPokemonTypeResponse.name}),
        expect.objectContaining({id: createPokemonTypeResponse2.id,name: createPokemonTypeResponse2.name})
    ]))
        })
    
    })


    describe('pub:graphql', ()=>{
        
        it('create PokemonType', async()=>{
            const token = pub.token
              
            const data = {
	"updatedAt": "2020-12-13T23:08:43.780Z",
	"createdAt": "2021-04-21T22:48:44.179Z",
	"name": "PokemonType/name/q7hbch4nh"
}
const createPokemonTypeMutation = `mutation CreatePokemonType($name: String!){
        createPokemonType(name: $name) {
           name
        }
    }`
    
    const createPokemonTypeResponse = await server.mutate({
        mutation: createPokemonTypeMutation,
        variables: data
      }, token);
    expect(createPokemonTypeResponse).not.toHaveProperty('errors')
expect(createPokemonTypeResponse).toHaveProperty('data.createPokemonType.name', 'PokemonType/name/q7hbch4nh')
        })
    
        
        it('one PokemonType', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, pub, {"name":"PokemonType/name/mfyosnpr"})
                // createModelLine: end  
            const onePokemonTypeQuery = `query PokemonType($id: ID!){
        PokemonType(id: $id) {
            updatedAt,createdAt,id,name,pokemons{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},user{updatedAt,createdAt,id,email,password,verified,roles{id},files{id},_pokemon{id},_evolution{id},_pokemonType{id}}
        }
    }`
    
    const onePokemonTypeResponse = await server.query({
        query: onePokemonTypeQuery,
        variables: { id: createPokemonTypeResponse.id}
      }, token);

      expect(onePokemonTypeResponse).not.toHaveProperty('errors')
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.updatedAt')
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.createdAt')
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.id', createPokemonTypeResponse.id)
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.name', createPokemonTypeResponse.name)
expect(onePokemonTypeResponse.data.PokemonType.pokemons).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonTypeResponse.pokemons[0].id,types:expect.objectContaining({id:onePokemonTypeResponse.id})}),
	expect.objectContaining({id: createPokemonTypeResponse.pokemons[1].id,types:expect.objectContaining({id:onePokemonTypeResponse.id})})]))
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.pokemons.0.id')
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.pokemons.1.id')
expect(onePokemonTypeResponse).toHaveProperty('data.PokemonType.user')

    
        })
    
        
        it('update PokemonType', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, pub, {"name":"PokemonType/name/9n120s5g"})
                // createModelLine: end  
            const updatePokemonTypeMutation = `mutation UpdatePokemonType($id: ID!,$name: String!){
        updatePokemonType(id: $id,name: $name) {
           id,name
        }
    }`
    
    const updatePokemonTypeResponse = await server.mutate({
        mutation: updatePokemonTypeMutation,
        variables: {
	"id": createPokemonTypeResponse.id,
	"name": "PokemonType/name/v2dwey5"
}
      }, token);

    expect(updatePokemonTypeResponse).not.toHaveProperty('errors')
expect(updatePokemonTypeResponse).toHaveProperty('data.updatePokemonType.id', createPokemonTypeResponse.id)
expect(updatePokemonTypeResponse).toHaveProperty('data.updatePokemonType.name', 'PokemonType/name/v2dwey5')
    
        })
    
        
        it('remove PokemonType', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, pub, {"name":"PokemonType/name/tmu47rq"})
                // createModelLine: end  
            const removePokemonTypeMutation = `mutation RemovePokemonType($id: ID!){
        removePokemonType(id: $id) {
           id
        }
    }`
    
    const removePokemonTypeResponse = await server.mutate({
        mutation: removePokemonTypeMutation,
        variables: { id:createPokemonTypeResponse.id }
      }, token);

      expect(removePokemonTypeResponse).not.toHaveProperty('errors')
expect(removePokemonTypeResponse).toHaveProperty('data.removePokemonType.id', createPokemonTypeResponse.id)

          
          const pokemonTypeCheck = await server.entry.models['pokemonType'].findById(createPokemonTypeResponse.id)
          expect(pokemonTypeCheck).toBeNull()
    
    
        })
    
        
        it('all PokemonType', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, pub, {"name":"PokemonType/name/ja6sd4er"})
                // createModelLine: end

                // createModelLine: start
                const createPokemonTypeResponse2 = await createPokemonType(server, pub, {"name":"PokemonType/name/u3flqoaf"})
                // createModelLine: end  
            const allPokemonTypeQuery = `query allPokemonType {
        allPokemonType {
            updatedAt,createdAt,id,name,pokemons{updatedAt,createdAt,id,name,classification,types{id},resistant,weaknesses,weight{id},height{id},attacks{id},fleeRate,maxCP,maxHP,evolutions{id},prevEvolutions{id},favorite,_evo{id},user{id}},user{updatedAt,createdAt,id,email,password,verified,roles{id},files{id},_pokemon{id},_evolution{id},_pokemonType{id}}
        }
    }`
    
    const allPokemonTypeResponse = await server.query({
        query: allPokemonTypeQuery,
        variables: { id: createPokemonTypeResponse.id}
      }, token)

    
expect(allPokemonTypeResponse.data.allPokemonType).toEqual(expect.arrayContaining([
        expect.objectContaining({id: createPokemonTypeResponse.id,name: createPokemonTypeResponse.name}),
        expect.objectContaining({id: createPokemonTypeResponse2.id,name: createPokemonTypeResponse2.name})
    ]))
        })
    
    })

    describe('pub:api', ()=>{
        
        it('create:api PokemonType', async()=>{
            const token = pub.token
              
            const data = {
	"updatedAt": "2022-04-08T22:34:24.451Z",
	"createdAt": "2020-04-23T22:14:52.933Z",
	"name": "PokemonType/name/ni7sbgpa"
}
    const createPokemonTypeResponse = await server.post('/api/pokemonType', data ,token);
      
      expect(createPokemonTypeResponse).not.toHaveProperty('errors')
expect(createPokemonTypeResponse).toHaveProperty('body.createPokemonType.name', 'PokemonType/name/ni7sbgpa')
    
        })
    
        
        it('one:api PokemonType', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, pub, {"name":"PokemonType/name/fik77px5"})
                // createModelLine: end  
            
      const onePokemonTypeResponse = await server.get('/api/pokemonType/' + createPokemonTypeResponse.id, token);

      expect(onePokemonTypeResponse).not.toHaveProperty('errors')
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.updatedAt')
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.createdAt')
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.id', createPokemonTypeResponse.id)
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.name', createPokemonTypeResponse.name)
expect(onePokemonTypeResponse.body.pokemonType.pokemons).toEqual(expect.arrayContaining([
	expect.objectContaining({id: createPokemonTypeResponse.pokemons[0].id,types:expect.objectContaining({id:onePokemonTypeResponse.id})}),
	expect.objectContaining({id: createPokemonTypeResponse.pokemons[1].id,types:expect.objectContaining({id:onePokemonTypeResponse.id})})]))
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.pokemons.0.id')
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.pokemons.1.id')
expect(onePokemonTypeResponse).toHaveProperty('body.pokemonType.user')

    
        })
    
        
        it('update:api PokemonType', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, pub, {"name":"PokemonType/name/devogzc8"})
                // createModelLine: end  
            
    const updatePokemonTypeResponse = await server.put('/api/pokemonType/' + createPokemonTypeResponse.id,
        {
	"id": createPokemonTypeResponse.id,
	"name": "PokemonType/name/land7elo6"
}
      , token);

    expect(updatePokemonTypeResponse).not.toHaveProperty('errors')
expect(updatePokemonTypeResponse).toHaveProperty('body.updatePokemonType.id', createPokemonTypeResponse.id)
expect(updatePokemonTypeResponse).toHaveProperty('body.updatePokemonType.name', 'PokemonType/name/land7elo6')
    
        })
    
        
        it('remove:api PokemonType', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, pub, {"name":"PokemonType/name/bu7n1bd8"})
                // createModelLine: end  
            const removePokemonTypeMutation = `mutation RemovePokemonType($id: ID!){
        removePokemonType(id: $id) {
           id
        }
    }`
    
    const removePokemonTypeResponse = await server.mutate({
        mutation: removePokemonTypeMutation,
        variables: { id:createPokemonTypeResponse.id }
      }, token);

      expect(removePokemonTypeResponse).not.toHaveProperty('errors')
expect(removePokemonTypeResponse).toHaveProperty('data.removePokemonType.id', createPokemonTypeResponse.id)

          
          const pokemonTypeCheck = await server.entry.models['pokemonType'].findById(createPokemonTypeResponse.id)
          expect(pokemonTypeCheck).toBeNull()
    
    
        })
    
        
        it('all:api PokemonType', async()=>{
            const token = pub.token
            
                // createModelLine: start
                const createPokemonTypeResponse = await createPokemonType(server, pub, {"name":"PokemonType/name/wu2704bc"})
                // createModelLine: end

                // createModelLine: start
                const createPokemonTypeResponse2 = await createPokemonType(server, pub, {"name":"PokemonType/name/g35gnj8"})
                // createModelLine: end  
             const allPokemonTypeResponse = await server.get('/api/pokemonType/all', token);
expect(allPokemonTypeResponse.body.allPokemonType).toEqual(expect.arrayContaining([
        expect.objectContaining({id: createPokemonTypeResponse.id,name: createPokemonTypeResponse.name}),
        expect.objectContaining({id: createPokemonTypeResponse2.id,name: createPokemonTypeResponse2.name})
    ]))
        })
    
    })

        })
    
       
    })