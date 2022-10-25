module.exports = {
    onLost(req, res){
        res.status(404).json({
            status: "FAIL",
            message: "ROUTE NOT FOUND"
        })
    },

    onError(req, res, next, err){
        res.status(500).json({
            status: "Error",
            error:{
                name: err.name,
                message: err.message
            }
        })
    }
}