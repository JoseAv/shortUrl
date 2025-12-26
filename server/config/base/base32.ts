
const base62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

export function convert62(id: number, code = '') {
    if (id === 0) return code

    const div = Math.floor(+id / 62)
    const residuo = Math.floor(id % 62)
    const position = base62[residuo]
    code = position + code

    return convert62(div, code)

}

export function decode(code: string) {
    if (!code) {
        throw new Error('Codigo no valido')
    }

    let result = 0
    let size = code.length - 1
    for (let word of code) {
        let indexof = base62.indexOf(word)
        if (indexof === -1) {
            throw new Error('Codigo contiene caracteres invalidos')
        }
        let convert = indexof * Math.pow(62, size)
        result += convert
        size--
    }
    return result
}