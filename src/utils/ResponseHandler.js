export default function(code, msg, data, res) {
    return res.status(code).send({
        message: msg,
        data: data
    })
}