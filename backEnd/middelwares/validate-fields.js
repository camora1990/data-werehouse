const { request, response } = require("express");
const { validationResult } = require("express-validator");

/**
 * middelware for validate errors of request
 * @param {*} rq 
 * @param {*} resp 
 * @param {*} next 
 * @returns 
 * @author Camilo Morales Sanchez.
 */
const validateFields = (req = request, res = response, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json(
          errors
    )
  }
  next()
};


module.exports = {
    validateFields
}