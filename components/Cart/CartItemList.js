import {Header, Segment, Button, Icon}  from 'semantic-ui-react'

function CartItemList() {
  const user = false;

  return (
    <Segment secondary color="teal" inverted textAlign="center" placeholder>
      <Header icon>
        <Icon name= "shopping basket"/>
        No products in cart. Add some!
      </Header>
        <div>
          { user? (
            <Button color = "google plus" >
              View Products
              </Button>
          ):(
            <Button color = "linkedin">
              Login to add Products
            </Button>
          )}
        </div>
    </Segment>
  );
}

export default CartItemList;
