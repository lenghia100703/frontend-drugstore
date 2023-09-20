import { Modal, Button } from 'antd';
import { useState, useEffect } from 'react';
import { Steps, message, Popconfirm, Input } from 'antd';
import { EnvironmentTwoTone, ShoppingTwoTone, CarFilled, DollarTwoTone, EditTwoTone } from '@ant-design/icons';
import request from '../../api/axios';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ButtonPaypal from './ButtonPaypal';


const ModalCheckout = (props) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { TextArea } = Input;
    const paypalScriptOptions = {
        "client-id":
            "AaUpVv8WDVM5uezwsQo79K6YBKmqm3EeLSOx5TFTX4RM2_ephwW68aJ4_ASXYPjbI8OyuXchwgkQ7bRl",
        currency: "USD"
    };
    const [payment, setPayment] = useState({
        deliveryAddress: "",
        totalPrice: 0,
        customerId: "",
        phoneNumber: "",
        paymentMethod: "Paypal",
        note: "",
        isPaymentConfirmed: false,
        fullName: ""
    })
    const [carts, setCarts] = useState([])
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        const firstCart = localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : []
        setCarts(firstCart);
        let newPayment = {
            deliveryAddress: "",
            totalPrice: 0,
            phoneNumber: "",
            customerId: "",
            paymentMethod: "Paypal",
            note: "",
            isPaymentConfirmed: false,
            fullName: ""
        }
        newPayment.deliveryAddress = userData ? userData.address : ""
        newPayment.fullName = userData ? userData.fullName : ""
        newPayment.customerId = userData ? userData.userId : ""
        newPayment.phoneNumber = userData ? userData.phoneNumber : ""

        //caculate money
        firstCart.map(
            (item) => {
                newPayment.totalPrice += item.quantity * item.price
            }
        )
        setPayment(newPayment)
    }, [])
    const handleOk = () => {
        setConfirmLoading(true);
        let redirectUrl = ""
        request.get(`make/payment?sum=${payment.totalPrice}`).then((res) => {
            redirectUrl = res
        });
        setTimeout(() => {
            props.setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        props.setOpen(false);
    };

    const onChangeNote = (e) => {
        setPayment({ ...payment, note: e.target.value });
    };
    const createPayment = () => {
        let data = {
            "customerId": JSON.parse(localStorage.getItem("userData")).userId,
            "medicalShopId": carts[0].medicalShopId,
            "goodsIdStringList": carts.map(e => e.goodsId).toString(),
            "isPaymentConfirmed": true,
            "totalPrice": payment.totalPrice,
            "paymentMethod": "cod",
            "note": payment.note,
            "delivered": false,
            "deliverToAddress": payment.deliveryAddress
        }
        request.post('bill/new', data)
    }
    const confirm = (e) => {
        createPayment()
        message.success('Your bill create successful');
    };

    return (
        <>
            <Modal
                title="Payment"
                open={props.open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={1000}
                okText={"Submit"}
                footer={null}
            >
                <Steps
                    progressDot
                    current={4}
                    direction="vertical"
                    items={[
                        {
                            title: <><EnvironmentTwoTone />  Delivery address</>,
                            description: <>
                                {payment.fullName} | {payment.phoneNumber} <br></br>{payment.deliveryAddress}
                            </>
                        },
                        {
                            title: <><ShoppingTwoTone /> Items</>,
                            description: <ul>
                                {carts.map((item, index) => (
                                    <li key={index}>
                                        <b>{item.goodsName}</b> x{item.quantity} : {item.quantity * item.price}$
                                    </li>
                                ))}
                            </ul>
                        },
                        {
                            title: <><DollarTwoTone /> Total price</>,
                            description: <>
                                <p style={{ color: 'orange', fontSize: '20px', fontWeight: 'bold' }}>{payment.totalPrice}$</p>
                            </>,
                        },
                        {
                            title: <><EditTwoTone /> Note</>,
                            description: <>
                                <TextArea rows={3} placeholder="Note..." onKeyUp={(e) => onChangeNote(e)} />
                            </>,
                        },
                    ]}
                />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <PayPalScriptProvider options={paypalScriptOptions} >
                        <ButtonPaypal payment={payment} carts={carts} />
                    </PayPalScriptProvider>

                    <Popconfirm
                        title="Are you sure to create bill?"
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" icon={<CarFilled />} style={{ padding: '0 50px', marginLeft: '40px' }}>COD  </Button>
                    </Popconfirm>

                </div>
            </Modal>
        </>
    );
}

export default ModalCheckout