import { diContainer } from '../containers';
import { PAYMENT_SERVICE } from '../const/services';
import { StripePaymentsService } from '../services';
import { isNormalizedError, toNormalizedError } from '../utils/normalError';

export const handleGetPaymentData = async (data: { id: string }) => {
  const stripeService = diContainer.get<StripePaymentsService>(PAYMENT_SERVICE);

  const itemProduct = await stripeService.getItemProduct(data.id).catch(toNormalizedError);

  if (isNormalizedError(itemProduct)) {
    return {
      success: false,
      error: {
        message: itemProduct.message,
      },
    };
  }

  if (!itemProduct) {
    return {
      success: false,
      error: {
        message: 'no product for item',
      },
    };
  }

  const paymentCheckout = await stripeService.getPaymentUrl(itemProduct?.id).catch(toNormalizedError);

  return {
    success: true,
    result: {
      url: paymentCheckout,
    },
  };
};
