import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'
import { z } from 'zod'

const app = new Hono().basePath('/api')

const route = app.get(
  '/hello',
  zValidator(
    'query',
    z.object({
      name: z.string(),
    })
  ),
  (c) => {
    const { name } = c.req.valid('query')
    return c.jsonT({
      message: `Hello ${name}!`,
    })
  }
)

const route2 = app.post(
    '/hello',
    zValidator(
        'query',
        z.object({
            greeting: z.string(),
        })
    ),
    (c) => {
        const {greeting} = c.req.valid('query')
        let response = "";

        switch (greeting.toLowerCase()) {
            case "hello":
                response = "howdy";
                break;
            case "howdy":
                response = "howdy pardner!";
                break;
            case "hi":
                response = "uhhhhh hello";
                break;
            default:
                response = "howdy :)";
                break;
        }

        return c.jsonT({
            response: response
        })
    }
)



export type AppType = typeof route | typeof route2

export const onRequest = handle(app)
