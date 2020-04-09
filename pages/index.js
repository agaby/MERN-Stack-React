import React from 'react'
import axios from  'axios' //http lib

function Home(products) {
  console.log(products);

  //to preform a side effect, making request to external api
  //2 prams the 1st: effect function 
  //2nd: dependencies, detrmine where effect function is run
  // React.useEffect(() => {
  //   getProducts()
  // }, []) 

  // async function getProducts(){
  //   const url = 'http://localhost:3000/api/products'
  //   const response = await axios.get(url);
  //   console.log(response.data);
  // }
  return <>home</>;
}

Home.getInitialProps = async () => {
  //fetch data on server
  //return response data as an object
  const url = 'http://localhost:3000/api/products'
  const response = await axios.get(url);
  return response.data
  //this obj will be mergered with existing props

}
export default Home;
