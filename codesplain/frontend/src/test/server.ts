import { setupServer } from 'msw/node'
import { rest, RestRequest, ResponseComposition, RestContext } from 'msw'

interface Config {
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch'
  path: string
  res: (req: RestRequest, res: ResponseComposition, ctx: RestContext) => any
}

export function createServer(handlerConfig: Config[]) {
  const handlers = handlerConfig.map((config) => {
    const method = config.method || 'get'
    return rest[method](config.path, (req, res, ctx) => {
      return res(
        ctx.json(
          config.res(req, res, ctx)
        )
      )
    })
  })

  const server = setupServer(...handlers)

  beforeAll(() => {
    server.listen()
  })
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => {
    server.close()
  })
}
