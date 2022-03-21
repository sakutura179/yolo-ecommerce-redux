import React from 'react'
import PropTypes from 'prop-types'

const CheckBox = props => {
    const inputRef = React.useRef(null);

    // onChange o day la ten ham
    const onChange = () => {
        if (props.onChange) {
            // su dung de truyen len catalog xu ly tiep
            // onChange o day la thuoc tinh cua component
            props.onChange(inputRef.current)
        }
    };

    return (
        <label className='custom-checkbox'>
            <input type={'checkbox'} ref={inputRef} onChange={onChange} checked={props.checked} />
            <span className='custom-checkbox__checkmark'>
                <i className='bx bx-check'></i>
            </span>
            {props.label}
        </label>
    )
}

CheckBox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func
}

export default CheckBox