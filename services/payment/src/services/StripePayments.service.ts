import Stripe from 'stripe';

import { isNormalizedError, toNormalizedError } from '../utils/normalError';

export class StripePaymentsService {
  private client: Stripe;

  constructor(pk: string) {
    this.client = new Stripe(pk);
  }

  async getItemProduct(id: string): Promise<Stripe.Product | null> {
    const product = await this.client.products
      .search({
        query: `metadata["itemId"]:"${id}"`,
      })
      .catch(toNormalizedError);

    if (isNormalizedError(product)) {
      return null;
    }

    return product.data[0];
  }

  async createItemProduct(data: any): Promise<Stripe.Product | null> {
    const product = await this.client.products
      .create({
        name: data.title,
        description: data.description,
        metadata: {
          itemId: data.id,
        },
        type: 'good',
        default_price_data: {
          currency: 'usd',
          unit_amount: data.price,
        },
      })
      .catch(toNormalizedError);

    if (isNormalizedError(product)) {
      return null;
    }

    return product;
  }

  async getProductById(id: string) {
    return this.client.products.retrieve(id);
  }

  async getPaymentUrl(productId: string) {
    const product = await this.getProductById(productId);

    const priceId = this.isPriceInterface(product.default_price)
      ? product.default_price.id
      : product.default_price;

    const checkoutSession = await this.client.checkout.sessions.create({
      client_reference_id: 'cus_Pi69HWlQRdMUs3',
      customer: 'cus_Pi69HWlQRdMUs3',
      mode: 'payment',
      line_items: [
        {
          price: priceId ?? '',
        },
      ],
    });

    console.log(checkoutSession);

    return checkoutSession.url;
  }

  isPriceInterface(price: string | Stripe.Price | null | undefined): price is Stripe.Price {
    return !!(price && typeof price !== 'string');
  }
}
