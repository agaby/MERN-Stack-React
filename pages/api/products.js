// import products from '../../static/products.json';
import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
   const products = await Product.find();
   console.log("IN PRODUCTS..."+ Array.isArray(products))
    res.status(200).json(products);
};