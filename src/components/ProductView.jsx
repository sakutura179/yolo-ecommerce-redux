import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import Button from './Button'

import currencyFormat from '../utils/currencyFormat'

const ProductView = props => {
    const product = props.product;

    const [previewImg, setPreviewImg] = React.useState(product.image01);

    const [descExpand, setDescExpand] = React.useState(false);

    const [color, setColor] = React.useState('');
    const [size, setSize] = React.useState('');

    const [quantity, setQuantity] = React.useState(1);

    const updateQuantity = (type) => {
        if (type === 'plus')
            setQuantity(quantity + 1);
        else
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }

    React.useEffect(() => {
        setPreviewImg(product.image01);
        setColor('');
        setSize('');
        setQuantity(1);
    }, [product])

    // Kiem tra xem co chon mau sac chua
    const check = () => {
        if (color === '') {
            alert('Vui lòng chọn màu sắc');
            return false;
        }
        if (size === '') {
            alert('Vui lòng chọn kích cỡ');
            return false;
        }

        return true;
    }

    const addToCart = () => {
        if (check()) {
            console.log({ color, size, quantity });
        }
    }

    const goToCart = () => {
        if (check()) props.history.push('/cart');
    }

    return (
        <div className='product'>
            <div className='product__images'>
                <div className='product__images__list'>
                    <div className='product__images__list__item' onClick={() => setPreviewImg(product.image01)}>
                        <img src={product.image01} alt='' />
                    </div>
                    <div className='product__images__list__item' onClick={() => setPreviewImg(product.image02)}>
                        <img src={product.image02} alt='' />
                    </div>
                </div>
                <div className='product__images__main'>
                    <img src={previewImg} alt='' />
                </div>
                <div className={`product-description ${descExpand ? 'expand' : ''}`}>
                    <div className='product-description__title'>
                        Chi tiết sản phẩm
                    </div>
                    {/* Note here */}
                    <div className='product-description__content' dangerouslySetInnerHTML={{ __html: product.description }}>
                    </div>
                    <div
                        className='product-description__toggle'
                    >
                        <Button
                            size='sm'
                            onClick={() => setDescExpand(!descExpand)}
                        >
                            {descExpand ? 'Thu gọn' : 'Xem thêm'}
                        </Button>
                    </div>
                </div>
            </div>
            <div className='product__info'>
                <h1 className='product__info__title'>
                    {product.title}
                </h1>
                <div className='product__info__item'>
                    <span className='product__info__item__price'>
                        {currencyFormat(product.price)}
                    </span>
                </div>
                <div className='product__info__item'>
                    <div className='product__info__item__title'>
                        Màu sắc
                    </div>
                    <div className='product__info__item__list'>
                        {
                            product.colors.map((item, index) => (
                                <div
                                    key={index}
                                    className={`product__info__item__list__item ${color === item ? 'active' : ''}`}
                                    onClick={() => setColor(item)}
                                >
                                    <div className={`circle bg-${item}`}></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='product__info__item'>
                    <div className='product__info__item__title'>
                        Kích cỡ
                    </div>
                    <div className='product__info__item__list'>
                        {
                            product.size.map((item, index) => (
                                <div
                                    key={index}
                                    className={`product__info__item__list__item ${size === item ? 'active' : ''}`}
                                    onClick={() => setSize(item)}
                                >
                                    <div key={index} className='product__info__item__list__item__size'>
                                        {item}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='product__info__item'>
                    <div className='product__info__item__title'>
                        Số lượng
                    </div>
                    <div className='product__info__item__quantity'>
                        <div
                            className='product__info__item__quantity__btn'
                            onClick={() => updateQuantity('minus')}
                        >
                            <i className='bx bx-minus'></i>
                        </div>
                        <div className='product__info__item__quantity__input'>
                            {quantity}
                        </div>
                        <div
                            className='product__info__item__quantity__btn'
                            onClick={() => updateQuantity('plus')}
                        >
                            <i className='bx bx-plus'></i>
                        </div>
                    </div>
                </div>
                <div className='product__info__item'>
                    <Button
                        onClick={() => addToCart()}
                        icon="bx bx-cart"
                        animate={true}
                    >
                        Thêm vào giỏ
                    </Button>
                    <Button onClick={() => goToCart()}>
                        Mua ngay
                    </Button>
                </div>
            </div>
            <div className={`product-description mobile ${descExpand ? 'expand' : ''}`}>
                <div className='product-description__title'>
                    Chi tiết sản phẩm
                </div>
                {/* Note here */}
                <div className='product-description__content' dangerouslySetInnerHTML={{ __html: product.description }}>
                </div>
                <div
                    className='product-description__toggle'
                >
                    <Button
                        size='sm'
                        onClick={() => setDescExpand(!descExpand)}
                    >
                        {descExpand ? 'Thu gọn' : 'Xem thêm'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

ProductView.propTypes = {
    product: PropTypes.object.isRequired
}

export default withRouter(ProductView)