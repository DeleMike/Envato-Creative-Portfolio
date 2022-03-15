
const getHomePage = async (req, res) => {
   res.status(200).json({'page':'Home Page', gotten:true})
}

const sendContactDetails = async (req, res) => {
   res.status(201).json({'info': 'Your message have been sent.'});
}

module.exports = {sendContactDetails}

module.exports = {   
   getHomePage,
   sendContactDetails
} 