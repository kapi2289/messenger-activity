export function parseJSON(str) { return JSON.parse(str.substr(str.search('{'))) }

export function decodeResponse(input) { return (new TextDecoder("utf-8")).decode(input, {stream: true}) }

export function encodeResponse(input) { return (new TextEncoder).encode(input) }

export function getUrlParam(url, param) { return (new URLSearchParams(url)).get(param) }

export default { parseJSON, decodeResponse, encodeResponse, getUrlParam }
