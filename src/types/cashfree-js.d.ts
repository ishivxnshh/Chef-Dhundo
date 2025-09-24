declare module '@cashfreepayments/cashfree-js' {
  export interface LoadOptions {
    mode: 'sandbox' | 'production';
  }

  export interface CheckoutOptions {
    paymentSessionId: string;
    redirectTarget?: '_modal' | '_blank' | '_self';
    returnUrl?: string;
  }

  export interface CheckoutResponse {
    success?: boolean;
    error?: string;
    [key: string]: unknown;
  }

  export interface CashfreeInstance {
    checkout: (options: CheckoutOptions) => Promise<CheckoutResponse>;
  }

  export function load(options: LoadOptions): Promise<CashfreeInstance>;
}
