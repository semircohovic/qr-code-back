const axios = require("axios");
const querystring = require("querystring");

const Invoice = require("../models/invoice.model");

function sendInvoice(data) {
  return new Promise((reslove, reject) => {
    axios
      .post(
        "https://mapr.tax.gov.me/ic/api/verifyInvoice",
        querystring.stringify(data)
      )
      .then((res) => {
        // console.log(res.data);
        reslove(res.data.items);
      })
      .catch((err) => {
        reject(new Error(err.message));
      });
  });
}
function checkWord(data) {
  const validated = data.filter((item) => item.name.includes("DOJC"));
  if (validated.length > 0) {
    return validated[0];
  } else {
    return 0;
  }
}
async function verifyInvoice(req, res) {
  const user_id = req.userData.sub;
  // provjeri da li postoje isti tic i iin dateTimeCreated
  const { iic, tin, dateTimeCreated } = req.body;

  try {
    // provjerimo da li postoji ista invoice sa da datim parametrima
    const invoice = await Invoice.findOne({
      tin: tin,
      iic: iic,
      dateTimeCreated: dateTimeCreated,
    }).exec();
    // ako je invoice razlicito od nulla tj. postoji invoice izadji i javi gresku da invoice postoji
    if (invoice != null) {
      return res.status(401).json({
        status: false,
        message: "Invoice exists",
      });
    }
    const create_invoice = new Invoice({
      tin: tin,
      iic: iic,
      dateTimeCreated: dateTimeCreated,
      user: user_id,
    });

    const saved_invoice = await create_invoice.save();

    res.json({
      status: true,
      message: "Invoice registred succesfully.",
      data: saved_invoice,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: false, message: "Something went wrong.", data: error });
  }

  //   sendInvoice(req.body).then((results) => {
  //     res.send(checkWord(results));
  //   });
}

module.exports = {
  verifyInvoice,
};
