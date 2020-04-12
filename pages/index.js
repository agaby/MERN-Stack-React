import React from 'react'
import axios from  'axios' //http lib
import ProductList from '../components/Index/ProductList'


function Home({products}) {
  console.log(products)
  console.log("IN INDEX..."+ Array.isArray(products))
  return< ProductList products={products}/>
}

Home.getInitialProps = async () => {
  //fetch data on server
  //return response data as an object
  const url = 'http://localhost:3000/api/products'
  const response = await axios.get(url);
  return { products: response.data };
  //this obj will be mergered with existing props

}
export default Home;
