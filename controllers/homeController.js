
const getHomePage = async (req, res) => {
   res.status(200).send({'page':'Home Page', gotten:true})
}

module.exports = {
   getHomePage
} 