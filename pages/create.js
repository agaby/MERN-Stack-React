import {Form, Input, TextArea, Button, Image, Message, Header, Icon, FormGroup} from 'semantic-ui-react'
import React from 'react'
import axios from 'axios'
import basrUrl from '../utils/baseUrl';

const INITIAL_PRODUCT = {
    name: "",
    price: "",
    media: '',
    description: ""
  };

function CreateProduct() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // saves previous states when mwdia is being updated 
  function handleChange(event){
    const { name, value, files } = event.target;
    if(name === 'media') {
      setProduct(prevState => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else{
      setProduct((prevState) => ({ ...prevState, [name]: value}));
    }
  }
async function handleSubmit(event){
  event.preventDefault(); //don't refresh page
  setLoading(true);
  const mediaUrl = await handleImageUpload();
  console.log({mediaUrl});
  const url = `${basrUrl}/api/product`;
  const payload = { ...product, mediaUrl}
  const response = await axios.post(url, payload);
  console.log({response});
  setLoading(false);
  setProduct(INITIAL_PRODUCT);
  setSuccess(true);
}

async function handleImageUpload(){
  const data= new FormData();
  data.append('file', product.media);
  data.append('upload_preset', 'reactreserve');
  data.append('cloud_name', 'dqtjgdjd4');
  const response = await axios.post(process.env.CLOUDINARY_URL, data);
  const mediaUrl =  response.data.url;
  return mediaUrl;
}

  return (
    <>
      <Header as = "h2" block>
        <Icon name="add" color="yellow"/>
        Create New Product
      </Header>
      <Form loading={loading} success={success} onSubmit ={handleSubmit}>
        <Message
          success
          icon="check"
          header="Success!"
          content="your prosuct has been posted"
        />
        <Form.Group width ="equal" >
          <Form.Field
            control = {Input}
            name = "name"
            label = "Name"
            placeholder = "Name"
            value={product.name}
            onChange={handleChange}
          />
          <Form.Field
          control = {Input}
          name = "price"
          label = "Price"
          placeholder = "Price"
          min = "0.00"
          step = "0.01"
          type = "number"
          value={product.price}
          onChange={handleChange}
          />
          <Form.Field
          control = {Input}
          name = "media"
          type="file"
          label = "Media"
          accept="image/*"
          content="Select Image"
          onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field
          control = {TextArea}
          name= "description"
          lable= "Description"
          placeholder = "Description"
          onChange={handleChange}
          value={product.description}
        />
        <Form.Field
          control={Button}
          disabled={loading}
          color="blue"
          icon="pencil alternate"
          content="submit"
          type="submit"
        />
      </Form>
    </>
  );
}


export default CreateProduct;
