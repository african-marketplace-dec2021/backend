// require yup import * as yup from "yup";
const yup = require("yup");
const model = require("./model");
const middlewareCategories = require("../categories/middleware");
const {
  isEmptyArray,
  isUndefined,
  verifyInterger,
  processBodyToObject,
  verifyStringAndLength,
  verifyDecimal: verifyNumber,
  verifyString,
  verifyInteger,
} = require("../helper");

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

    let schema = yup.object().shape({
      name: yup
        .string()
        .required("name must be string, between 3 to 30 characters long")
        .min(3)
        .max(30),
      price: yup
        .number()
        .required("price must be a positive number")
        .positive(),
      description: yup
        .string()
        .required("description must be string beteen3 and 1000 characters long")
        .min(3)
        .max(3000),
      category_id: yup
        .number()
        .required("category_id must be a number")
        .integer(),
      //   image_url: yup.string().default(null),
      //   location: yup.string().default(null),
    });

    // const err_message = await schema
    //   .validate({ name, price, description, category_id, image_url, location })
    //   .then((value) => {
    //     console.log("value = ", value);
    //     return null;
    //   })
    //   .catch((err) => {
    //     console.log("err.name = ", err.name);
    //     console.log("err.errors = ", err.errors);
    //     return err.errors[0];
    //   });
    // console.log("err_message = ", err_message);

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
      const err_message = await schema
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
          console.log("err.name = ", err.name);
          console.log("err.errors = ", err.errors);
          res.status(400).json({ message: err.errors[0] });
        });
    }

    //---------------pending delete------------------------------------
    // if (
    //   isUndefined(name) ||
    //   isUndefined(price) ||
    //   isUndefined(description) ||
    //   isUndefined(category_id)
    // ) {
    //   res.status(400).json({
    //     message: "require fields : name, description, price, and category_id",
    //   });
    // } else if (verifyStringAndLength(name, 3, 30) === false) {
    //   res.status(400).json({
    //     message: "name must be string, between 3 to 30 characters long",
    //   });
    // } else if (verifyStringAndLength(description, 3, 1000) === false) {
    //   res.status(400).json({
    //     message: "description must be string beteen3 and 1000 characters long",
    //   });
    // } else if (verifyNumber(price) === false) {
    //   res.status(400).json({ message: "price must be a number" });
    // } else if (verifyInterger(category_id) === false) {
    //   res.status(400).json({ message: "category_id must be a number" });
    // } else {
    //   req.body.newProduct = {
    //     name,
    //     price,
    //     description,
    //     category_id,
    //     image_url: isUndefined(image_url) ? null : image_url,
    //     location: isUndefined(location) ? null : location,
    //   };
    //   next();
    // }
    //---------------------------------------------------------------
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
    const { name, price, description, category_id } = req.body;
    if (!isUndefined(name) && verifyStringAndLength(name, 3, 30) === false) {
      res.status(400).json({
        message: "name must be string, between 3 to 30 characters long",
      });
    } else if (
      !isUndefined(description) &&
      verifyStringAndLength(description, 3, 1000) === false
    ) {
      res.status(400).json({
        message: "description must be string beteen3 and 1000 characters long",
      });
    } else if (!isUndefined(price) && verifyNumber(price) === false) {
      res.status(400).json({ message: "price must be a positive number" });
    } else if (
      !isUndefined(category_id) &&
      verifyInterger(category_id) === false
    ) {
      res.status(400).json({ message: "category_id must be a number" });
    } else if (Object.keys(req.body.modifiedObject).length === 0) {
      res.status(400).json({ message: "no valid column name detected" });
    } else {
      next();
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
