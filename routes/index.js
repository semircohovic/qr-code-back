const {Router} = require('express');
const axios = require('axios');
const querystring  = require('querystring');

const app = Router();


function sendInvoice(data){
    return new Promise((reslove, reject) => {
     axios.post('https://mapr.tax.gov.me/ic/api/verifyInvoice', querystring .stringify(data))
        .then(res => {
            // console.log(res.data);
            reslove(res.data.items);
        }).catch(err => {
            console.log(err);
            reject(new Error(err.message));
        })
    })
}
function checkWord(data){
       const validated = data.filter(item => item.name.includes('DOJC'))
        if(validated.length > 0){
            return validated[0]
        } else {
            return 0
        }
}
app.post('/verifyInvoice', (req, res) => {

    sendInvoice(req.body).then((results)=> {
        res.send(checkWord(results))
    });
    
    
});

module.exports = app