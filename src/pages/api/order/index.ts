import { CartItem } from "@/types/cart";
import { prisma } from "@/utils/db";
import { OrderStatus, Product } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "POST") {
    const cartItems = req.body as CartItem[];
    const cartItemIds = cartItems.map((item) => item.id);

    // filtered products from database (table plus)
    const products = await prisma.product.findMany({
      where: {
        id: { in: cartItemIds },
      },
    });

    // total price must be calculated in Backend (client data is not reliable)
    // total price // frontend quantity * backend price
    const getProductPriceWithQuantity = (item: CartItem) => {
      const product = products.find(
        (product) => product.id === item.id
      ) as Product;

      return product?.price * item.quantity;
    };

    let totalPrice = 0;
    cartItems.forEach((item) => {
      const price = getProductPriceWithQuantity(item);
      totalPrice += price;
    });

    // creating "Order" in database (table plus)
    const createdOrder = await prisma.order.create({
      data: {
        status: OrderStatus.ORDERED,
        totalPrice,
      },
    });

    // "Orderline"

    const orderId = createdOrder.id;

    cartItems.forEach(async (item) => {
      const data = {
        orderId,
        productId: item.id,
        totalPrice: getProductPriceWithQuantity(item),
        quantity: item.quantity,
      };
      await prisma.orderline.create({ data });
    });

    return res.status(200).send({ orderId, status: OrderStatus.ORDERED });
  }

  res.status(405).send("Invalid Request Method!");
}
