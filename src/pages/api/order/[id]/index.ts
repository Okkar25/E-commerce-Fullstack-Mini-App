import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "DELETE") {
    const query = req.query;
    const orderId = Number(query.id);

    // data validation
    if (!orderId) return res.status(400).send("Bad Request");
    const isFound = await prisma.order.findFirst({ where: { id: orderId } });
    if (!isFound) return res.status(400).send("Bad Request");

    // delete in prisma (orderline first => foreign key used / order later)
    await prisma.orderline.deleteMany({ where: { orderId: orderId } });
    await prisma.order.deleteMany({ where: { id: orderId } });

    return res.status(200).send("Delete Method Successful");
  }

  res.status(405).send("Invalid Request Method");
}
