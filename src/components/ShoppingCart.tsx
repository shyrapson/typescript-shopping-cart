import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItems from "./CartItems";
import { formatCurrency } from "../utilities/formatCurrency";

import StoreItems from "../data/items.json";


type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({isOpen}: ShoppingCartProps){
    const {closeCart,cartItems} = useShoppingCart()
   

    return <Offcanvas  show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
<Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {/* stack helps to arrange items horizontally */}
            <Stack gap={3}>
{cartItems.map((item)=>(
    <CartItems key={item.id} {...item} />
))}
             <div className="ms-auto fw-bold fs-5">
                Total{formatCurrency(cartItems.reduce((total,cartItem)=>{
                          const item = StoreItems.find((i) => i.id === cartItem.id);
                          return total + (item?.price||0) * cartItem.quantity;
                },0))}
             </div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
}