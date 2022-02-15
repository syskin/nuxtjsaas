import { Request, Response, NextFunction } from "express";
import HttpException from "../../exceptions/HttpException";
import Stripe
    from "stripe";
import { get, updateById } from "../../services/user";

type CheckoutSession = {
    client_reference_id: string
    customer_email: string
    mode: Stripe.Checkout.Session.Mode
    payment_status: Stripe.Checkout.Session.PaymentStatus
    status: Stripe.Checkout.Session.Status
    subscription: string
}

type InvoicePayement = {
    customer_email: string
    payment_status: Stripe.Checkout.Session.PaymentStatus
    status: Stripe.PaymentIntent.Status
    paid: boolean
    lines: any
    subscription: string
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

        switch (event.type) {
            case 'checkout.session.completed': {
                const { client_reference_id, customer_email, subscription } = event.data.object as CheckoutSession
                const user = await get([{
                    key: 'sub',
                    operator: '==',
                    value: client_reference_id
                },
                {
                    key: 'email',
                    operator: '==',
                    value: customer_email
                }
                ], true) as string[]

                if (!user?.[0]) return new HttpException(404, `No existing user`)
                else {
                    await updateById(user[0], {
                        subscription
                    })
                }
                break;
            }
            case 'invoice.payment_succeeded': {
                let { customer_email, subscription, status, lines } = event.data.object as InvoicePayement
                const subscribedUser = await get([{
                    key: 'subscription',
                    operator: '==',
                    value: subscription
                }, {
                    key: 'email',
                    operator: '==',
                    value: customer_email
                }
                ], true) as string[]

                if (!subscribedUser?.[0]) return new HttpException(404, `No subscribed user`)
                await updateById(subscribedUser[0], {
                    period: lines?.data?.[0]?.period,
                    status
                })
                break;
            }
            case 'invoice.payment_failed': {
                let { customer_email, subscription, status } = event.data.object as InvoicePayement

                const subscribedUser = await get([{
                    key: 'subscription',
                    operator: '==',
                    value: subscription
                }, {
                    key: 'email',
                    operator: '==',
                    value: customer_email
                }
                ], true) as string[]

                if (!subscribedUser?.[0]) return new HttpException(404, `No subscribed user`)
                else {
                    await updateById(subscribedUser[0], {
                        period: { end: 0, start: 0 },
                        status
                    })
                }
                break;
            }
            default:
                console.log(event.type)
                break;
        }
        return res.status(200).json({
            status: `success`,
            statusCode: 200,
        });
    } catch (e) {
        console.log(e)
        return next(new HttpException(500, `Something went wrong`));
    }
};
