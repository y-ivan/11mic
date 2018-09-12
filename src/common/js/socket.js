
// import ReconnectingWebSocket from "reconnecting-websocket"

import { SOCKETHOST } from "./config"

let ws = 1

export const connect = id => {
    // ws = new ReconnectingWebSocket(`${SOCKETHOST}from=${id}`)
    ws = new WebSocket(`${SOCKETHOST}from=${id}`)
    return ws
}

export const send = data => {
    const res = Object.assign({}, data, { from_id: data.from_id + "", to_id: data.to_id + "", created_at: data.created_at + "" })
    ws && ws.send(JSON.stringify(res))
}
