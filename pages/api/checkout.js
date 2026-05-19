// /pages/api/checkout.js

import Stripe from "stripe";

const stripe = new Stripe(
process.env.STRIPE_SECRET_KEY
);

export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({
error: "Method not allowed"
});
}

try {

const { plan } = req.body;

const priceMap = {
starter: process.env.STRIPE_STARTER_PRICE_ID,
growth: process.env.STRIPE_GROWTH_PRICE_ID,
elite: process.env.STRIPE_ELITE_PRICE_ID
};

const session = await stripe.checkout.sessions.create({

mode: "subscription",

payment_method_types: ["card"],

line_items: [
{
price: priceMap[plan],
quantity: 1
}
],

success_url:
`${req.headers.origin}/success`,

cancel_url:
`${req.headers.origin}/pricing`

});

return res.status(200).json({
success: true,
url: session.url
});

} catch (err) {

console.error(err);

return res.status(500).json({
error: "Stripe session failed"
});

}

}