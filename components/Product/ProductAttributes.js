import {Header, Button} from 'semantic-ui-react'

function ProductAttributes({ discription }) {
  return <>
    <Header as="h3">About this product</Header>
    <p> {discription} </p>
    <Button
      icon="trash alternate outline"
      color="red"
      content="Delete product"
    />
  </>;
}

export default ProductAttributes;
