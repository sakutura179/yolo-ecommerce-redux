import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Button from './Button'

const Slider = props => {
    const data = props.data
    const [activeSlide, setActiveSlide] = React.useState(0)

    const timeOut = props.timeOut ? props.timeOut : 5000

    React.useEffect(() => {
        if (props.auto) {
            const slideAuto = setInterval(() => {
                if (activeSlide === data.length - 1)
                    setActiveSlide(0)
                else
                    setActiveSlide(activeSlide + 1)
            }, timeOut)
            return () => clearInterval(slideAuto)
        }
    }, [activeSlide, data.length, props.auto, timeOut])

    const handleLeft = () => {
        if (activeSlide === 0)
            setActiveSlide(data.length - 1);
        else
            setActiveSlide(activeSlide - 1);
    }
    const handleRight = () => {
        if (activeSlide === data.length - 1)
            setActiveSlide(0);
        else
            setActiveSlide(activeSlide + 1);
    }

    return (
        <div className='slider'>
            {data.map((item, index) => (
                <SliderItem key={index} item={item} active={index === activeSlide} />
            ))}
            {
                props.control ? (
                    <div className='slider__control'>
                        <div className='slider__control__item' onClick={handleLeft}>
                            <i className='bx bx-chevron-left'></i>
                        </div>
                        <div className='slider__control__item'>
                            <div className='index'>
                                {activeSlide + 1}/{data.length}
                            </div>
                        </div>
                        <div className='slider__control__item' onClick={handleRight}>
                            <i className='bx bx-chevron-right'></i>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

Slider.propTypes = {
    data: PropTypes.array.isRequired,
    control: PropTypes.bool,
    auto: PropTypes.bool,
    timeOut: PropTypes.number
}

const SliderItem = props => (
    // props la toan bo props cua SliderItem nen muon truy cap vao item thi phai . den no
    <div className={`slider__item ${props.active ? 'active' : ''}`}>
        <div className='slider__item__info'>
            <div className={`slider__item__info__title color-${props.item.color}`}>
                <span>{props.item.title}</span>
            </div>
            <div className='slider__item__info__description'>
                <span>{props.item.description}</span>
            </div>
            <div className='slider__item__info__btn'>
                <Link to={props.item.path}>
                    <Button
                        backgroundColor={props.item.color}
                        icon="bx bx-cart"
                        animate={true}
                    >
                        Xem chi tiết
                    </Button>
                </Link>
            </div>
        </div>
        <div className='slider__item__image'>
            {/* bg-color co trong file _base.scss */}
            <div className={`shape bg-${props.item.color}`}></div>
            <img src={props.item.img} alt='' />
        </div>
    </div>
)

export default Slider