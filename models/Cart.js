import mongoos from 'mongoose';
const {ObjectId, Number} = mongoos.Schema.Types;

const CartSchema =new mongoos.Schema({
    User:{
        type: ObjectId,
        ref: "User",
    },
    products: [
        {
            quantity:{
                type: Number,
                dafault: 1
            },
            product: {
                type: ObjectId,
                ref: "Product"
            }
        }
    ]
});

export default mongoos.models.Cart || mongoos.model("Cart", CartSchema);