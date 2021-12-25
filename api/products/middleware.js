// require yup import * as yup from "yup";
const yup = require("yup");
const model = require("./model");
const middlewareCategories = require("../categories/middleware");
const {
  isEmptyArray,
  isUndefined,
  verifyInterger,
  processBodyToObject,
} = require("../helper");

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "name must be string, between 3 to 30 characters long")
    .max(30, "name must be string, between 3 to 30 characters long"),
  description: yup
    .string()
    .min(3, "description must be string beteen3 and 1000 characters long")
    .max(3000, "description must be string beteen3 and 1000 characters long"),
  price: yup
    .number("price must be a positive number")
    .positive("price must be a positive number"),
  category_id: yup
    .number("category_id must be a number")
    .integer("category_id must be a number"),
});

async function verifyExistingId(req, res, next) {
  try {
    const { id } = req.params;
    if (isUndefined(id)) {
      res.status(400).json({ message: "require id" });
    } else if (verifyInterger(Number(id)) === false) {
      res.status(400).json({ message: `invalid id ${id}` });
    } else {
      const boolean = await isIdInTable(id);
      if (boolean === false) {
        res.status(400).json({ message: `id ${id} not found` });
      } else {
        next();
      }
    }
  } catch (err) {
    next(err);
  }
}

async function isIdInTable(id) {
  const array = await model.getById(id);
  if (isEmptyArray(array)) {
    return false;
  } else {
    return true;
  }
}

async function verifyNewObject(req, res, next) {
  try {
    const { name, price, description, category_id, image_url, location } =
      req.body;
    if (
      isUndefined(name) ||
      isUndefined(price) ||
      isUndefined(description) ||
      isUndefined(category_id)
    ) {
      res.status(400).json({
        message: "require fields : name, description, price, and category_id",
      });
    } else {
      schema
        .validate({
          name,
          price,
          description,
          category_id,
          image_url,
          location,
        })
        .then((value) => {
          req.body.newProduct = {
            name,
            price,
            description,
            category_id,
            image_url: isUndefined(image_url) ? null : image_url,
            location: isUndefined(location) ? null : location,
          };
          next();
        })
        .catch((err) => {
          res.status(400).json({ message: err.errors[0] });
        });
    }
  } catch (err) {
    next(err);
  }
}

async function verifyCategoryId(req, res, next) {
  const { category_id } = req.body;
  const boolean = await middlewareCategories.isIdInTable(category_id);
  if (boolean === false) {
    res.status(404).json({ message: `category_id ${category_id} not found` });
  } else {
    next();
  }
}

async function verifyModifiedObject(req, res, next) {
  try {
    const keys = [
      { name: "name", type: "string" },
      { name: "price", type: "number" },
      { name: "category_id", type: "number" },
      { name: "description", type: "string" },
      { name: "image_url", type: "string" },
      { name: "location", type: "string" },
    ];
    req.body.modifiedObject = processBodyToObject(keys, req.body);

    if (Object.keys(req.body.modifiedObject).length === 0) {
      res.status(400).json({ message: "no valid column name detected" });
    } else {
      schema
        .validate(req.body.modifiedObject)
        .then((value) => {
          next();
        })
        .catch((err) => {
          console.log("err.errors[0] = ", err.errors[0]);
          res.status(400).json({ message: err.errors[0] });
        });
    }
  } catch (err) {
    next(err);
  }
}

async function isInTable(filtered) {
  const array = await model.getBy(filtered);
  if (isEmptyArray(array)) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  verifyExistingId,
  verifyNewObject,
  verifyModifiedObject,
  isInTable,
  isIdInTable,
  verifyCategoryId,
};
