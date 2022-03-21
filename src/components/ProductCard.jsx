import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Button from './Button'
import currencyFormat from '../utils/currencyFormat'

const ProductCard = props => {
    return (
        <div className='product-card'>
            <Link to={`/catalog/${props.slug}`}>
                <div className='product-card__image'>
                    <img src={props.img01} alt="" />
                    <img src={props.img02} alt="" />
                </div>
                <div className='product-card__name'>
                    {props.name}
                </div>
                <div className='product-card__price'>
                    {currencyFormat(props.price)}
                    <span className='product-card__price__old'>
                        <del>{currencyFormat(props.price + 100000)}</del>
                    </span>
                </div>
            </Link>
            <div className='product-card__btn'>
                <Button
                    size='sm'
                    icon='bx bx-cart'
                    animate={true}
                >
                    chọn mua
                </Button>
            </div>
        </div>
    )
}

ProductCard.propTypes = {
    img01: PropTypes.string.isRequired,
    img02: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
}

export default ProductCard