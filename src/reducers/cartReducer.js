import {
    GET_ALL_PRODUCT,
    GET_NUMBER_CART,
    ADD_CART,
    DECREASE_QUANTITY,
    INCREASE_QUANTITY,
    DELETE_CART,
    CHANGE_IS_SELECTION
} from '../actions/cartAction';

const tempProduct = localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : [];

const initProduct = {
    numberCart: tempProduct.length,
    Carts: tempProduct,
    _products: [],
};

export const todoProduct = (state = initProduct, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCT:
            return {
                ...state,
                _products: action.payload,
            };
        case GET_NUMBER_CART:
            return {
                ...state,
            };
        case ADD_CART:
            if (state.numberCart === 0) {
                let cart = {
                    goodsId: action.payload.goodsId,
                    quantity: 1,
                    goodsName: action.payload.goodsName,
                    goodsUrlImage: action.payload.goodsUrlImage,
                    price: action.payload.price,
                    medicalShopId: action.payload.medicalShopId,
                    isSelection: false
                };
                state.Carts.push(cart);
                state.numberCart = state.numberCart + 1
            } else {
                let isExisting = false
                state.Carts.map((item, key) => {
                    if (item.goodsId === action.payload.goodsId) {
                        state.Carts[key].quantity++;
                        isExisting = true;
                    }
                });
                if (!isExisting) {
                    let cart = {
                        goodsId: action.payload.goodsId,
                        quantity: 1,
                        goodsName: action.payload.goodsName,
                        goodsUrlImage: action.payload.goodsUrlImage,
                        price: action.payload.price,
                        medicalShopId: action.payload.medicalShopId,
                        isSelection: false
                    };
                    state.Carts.push(cart);
                    state.numberCart = state.numberCart + 1
                }
            }
            localStorage.setItem('carts', JSON.stringify(state.Carts));
            return {
                ...state
            };
        case INCREASE_QUANTITY:
            state.numberCart++;
            state.Carts[state.Carts.indexOf(action.payload)].quantity++;
            localStorage.setItem('carts', JSON.stringify(state.Carts));
            return {
                ...state,
            };
        case DECREASE_QUANTITY:
            let quantity = state.Carts[state.Carts.indexOf(action.payload)].quantity;
            if (quantity > 1) {
                state.numberCart--;
                state.Carts[state.Carts.indexOf(action.payload)].quantity--;
            }
            localStorage.setItem('carts', JSON.stringify(state.Carts));
            return {
                ...state,
            };
        case DELETE_CART:
            let items = {
                ...state,
                numberCart: state.numberCart - 1,
                Carts: state.Carts.filter((item) => {
                    return item.goodsId !== action.payload.goodsId;
                }),
            };
            localStorage.setItem('carts', JSON.stringify(items.Carts));
            return {
                ...items
            };
        case CHANGE_IS_SELECTION:
            let good = state.Carts.find(({ goodsId }) => goodsId === action.payload.goodsId)
            good.isSelection = action.payload.isSelection
            localStorage.setItem('carts', JSON.stringify(state.Carts));
            return {
                ...state,
            };
        default:
            return state;
    }
};
