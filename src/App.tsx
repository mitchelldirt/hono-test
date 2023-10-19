import type {InferResponseType} from 'hono/client'
import {hc} from 'hono/client'
import {FormEvent, useEffect, useState} from 'react'
import {AppType} from '../functions/api/[[route]]'

const App = () => {
    const client = hc<AppType>('/')
    const $get = client.api.hello.$get
    const $post = client.api.hello.$post

    const [data, setData] = useState<InferResponseType<typeof $post>>()

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const greeting = e.currentTarget.greeting.value

        const fetchData = async () => {
            const res = await $post({
                query: {
                    greeting: greeting,
                },
            })
            const responseData = await res.json()
            setData(responseData)
        }

        fetchData();
    }


    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await $get({
    //             query: {
    //                 name: 'Pages',
    //             },
    //         })
    //         const responseData = await res.json()
    //         setData(responseData)
    //     }
    //     fetchData()
    // }, [])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Send Hono a message :)
                    <input name="greeting" type="text"/>
                </label>
                <button type="submit">Send</button>
            </form>

            <h1>{data?.response}</h1>
        </>
    )
}

export default App
