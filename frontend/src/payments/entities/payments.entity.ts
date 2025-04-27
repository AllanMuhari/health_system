export class Payment {
  id: number;
  amount: number;
  currency: string;
  status: string; // e.g., 'pending', 'completed', 'failed'
  stripePaymentId?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    amount: number,
    currency: string,
    status: string,
    stripePaymentId?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.amount = amount;
    this.currency = currency;
    this.status = status;
    this.stripePaymentId = stripePaymentId;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}
