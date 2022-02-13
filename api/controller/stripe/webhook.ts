import { Request, Response, NextFunction } from "express";
import HttpException from "../../exceptions/HttpException";
import Stripe
    from "stripe";

type CheckoutSessionCompleted = {
    client_reference_id: string
    customer_email: string
    mode: Stripe.Checkout.Session.Mode
    payment_status: Stripe.Checkout.Session.PaymentStatus
    status: Stripe.Checkout.Session.Status
    subscription: string
}

type PayementSucceded = {
    charges: {
        data: {
            receipt_email: string
        }[]
    }
    payment_status: Stripe.Checkout.Session.PaymentStatus
    status: Stripe.PaymentIntent.Status
}

export const webhookController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SK || '', {
            apiVersion: '2020-08-27',
        })

        const sig = req.headers['stripe-signature'];
        if (!sig) return new HttpException(500, `No signature`)

        const webhookSecret = process.env.STRIPE_WHS || ''

        const event = stripe.webhooks.constructEvent(
            req.rawBody,
            sig,
            webhookSecret
        )

        // delete subscribtion stripe.subscriptions.del('sub_id');

        switch (event.type) {
            case 'checkout.session.completed':
                // Set suscriber id using client_reference_id and customer_email
                const checkoutObject = event.data.object as CheckoutSessionCompleted
                console.log(checkoutObject.client_reference_id, checkoutObject.customer_email, checkoutObject.subscription)
                break;
            case 'invoice.payment_succeeded':
                // Store start and end date (depending of the payement date)
                // Set active if payement automatically succeed
                break;
            case 'invoice.payment_failed':
                // Set not active if payement automatically failed
                break;
            case 'payment_intent.succeeded':
                const payementSucceded = event.data.object as PayementSucceded
                console.log('Payement succeeded')
                break;
            case 'payment_intent.payment_failed':
                console.log('Payement failed')
                break;
            default:
                console.log('Default')
                break;
        }
        return res.status(200).json({
            status: `success`,
            statusCode: 200,
        });
    } catch (e) {
        console.log(e)
        return next(new HttpException(500, `Une erreur est survenue`));
    }
};
