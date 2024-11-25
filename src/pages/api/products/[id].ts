// pages/api/products/[id].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import products from '../../../data/products.json';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  description?: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Validate that 'id' is a number
  const productId = Number(id);
  if (isNaN(productId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  const product = products.find((p) => p.id === productId);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
}
