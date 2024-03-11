import { diContainer } from '../containers';
import { PAYMENT_SERVICE } from '../const/services';
import { StripePaymentsService } from '../services';
import { isNormalizedError, toNormalizedError } from '../utils/normalError';

export const handleCreateItemProduct = async (data: any) => {
  const stripeService = diContainer.get<StripePaymentsService>(PAYMENT_SERVICE);

  const itemProduct = await stripeService.createItemProduct(data).catch(toNormalizedError);

  if (isNormalizedError(itemProduct)) {
    return {
      success: false,
      error: {
        message: itemProduct.message,
      },
    };
  }

  return {
    success: true,
    result: itemProduct,
  };
};
