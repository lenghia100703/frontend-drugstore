import { PayPalButtons } from "@paypal/react-paypal-js";
import request from "../../api/axios";

const ButtonPaypal = (props) => {
    /**
     * usePayPalScriptReducer use within PayPalScriptProvider
     * isPending: not finished loading(default state)
     * isResolved: successfully loaded
     * isRejected: failed to load
     */
    const createPayment = () => {
        let data = {
            "customerId": JSON.parse(localStorage.getItem("userData")).userId,
            "medicalShopId": props.carts[0].medicalShopId,
            "goodsIdStringList": props.carts.map(e => e.goodsId).toString(),
            "isPaymentConfirmed": true,
            "totalPrice": props.payment.totalPrice,
            "paymentMethod": "paypal",
            "note": props.payment.note,
            "delivered": false,
            "deliverToAddress": props.payment.deliveryAddress
        }
        request.post('bill/new', data)
    }
    const paypalbuttonTransactionProps = {
        style: {
            layout: "horizontal",
            tagline: false,
            height: 32
        },

        createOrder(data, actions) {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: props.payment.totalPrice,
                            currentcy_code: 'USD'
                        }
                    }
                ]
            });
        },
        onApprove(data, actions) {
            /**
             * data: {
             *   orderID: string;
             *   payerID: string;
             *   paymentID: string | null;
             *   billingToken: string | null;
             *   facilitatorAccesstoken: string;
             * }
             */
            return actions.order.capture({}).then((details) => {
                createPayment()
                alert(
                    "Transaction completed by" +
                    (details?.payer.name.given_name ?? "No details")
                );

                alert("Data details: " + JSON.stringify(data, null, 2));
            });
        }
    };
    return (
        <div>
            <div style={{ marginBottom: '-6px' }}>
                <PayPalButtons {...paypalbuttonTransactionProps} />
            </div>
        </div>
    );
}

export default ButtonPaypal