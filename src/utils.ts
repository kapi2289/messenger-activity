export function parseJSON(str: string) {
    return JSON.parse(str.substr(str.search('{')))
}

export function decodeResponse(input: BufferSource) {
    return (new TextDecoder("utf-8")).decode(input, {stream: true})
}

export function encodeResponse(input: string) {
    return (new TextEncoder).encode(input)
}

export function getUrlParam(url: string, param: string) {
    return (new URLSearchParams(url)).get(param)
}

export function timestamp() { return new Date().getTime() }

export interface IFacebookActivityResponse {
    type: string;
    from: string;
    st: number;
}
