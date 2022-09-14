const db = require("../config/database");

exports.createProduct = async (req, res) => {
  const productName = req.body.productName
  const productDescription = req.body.productDescription
  const price = req.body.price
  const productCategory = req.body.productCategory

  await db.query(
    `INSERT INTO products ("productName", "productDescription", price, "productCategory") VALUES ($1, $2, $3, $4)`,
    [productName, productDescription, price, productCategory]
  );

  res.status(201).send({
    status: 201,
    message: "Product added successfully!",
    body: {
      product: { productName, productDescription, price, productCategory }
    },
  });
};

exports.listAllProducts = async (req, res) => {
  const response = await db.query('SELECT * FROM products ORDER BY "productName" ASC');
  res.status(200).send(response.rows);
};

exports.findProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM products WHERE "productId" = $1', [productId]);
  res.status(200).send(response.rows);
}

exports.updateProductById = async (req, res) => {
  const productId = parseInt(req.params.id);  
  const productName = req.body.productName
  const productDescription = req.body.productDescription
  const price = req.body.price
  const productCategory = req.body.productCategory

  await db.query(
    `UPDATE products SET "productName" = $1, "productDescription" = $2, price = $3, "productCategory" = $4 WHERE "productId" = $5`,
    [productName, productDescription, price, productCategory, productId]
  );

  res.status(200).send({ status: 200, message: "Product Updated Successfully!" });
};

exports.deleteProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  await db.query('DELETE FROM products WHERE "productId" = $1', [
    productId
  ]);

  res.status(200).send({ status: 200, message: 'Product deleted successfully!', productId });
};

exports.findProductBySearch = async (req, res) => {
  const search = req.query.search.toLowerCase();
  const string = `SELECT * FROM products WHERE lower("productName") like '%${search}%'`
  const response = await db.query(string);
  res.status(200).send(response.rows);
}