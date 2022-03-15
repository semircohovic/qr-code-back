const { Router } = require("express");
const scraper = Router();
const invoice_controller = require("../controllers/invoice.controller");
const auth_middleware = require("../middleware/auth.middleware");

scraper.post("/verifyInvoice", auth_middleware.verifyToken, invoice_controller.verifyInvoice);

module.exports = scraper;
