import React from 'react'

import Helmet from '../components/Helmet'
import CheckBox from '../components/CheckBox'

import productData from '../assets/fake-data/products'
import category from '../assets/fake-data/category'
import colors from '../assets/fake-data/product-color'
import size from '../assets/fake-data/product-size'
import Button from '../components/Button'
import InfinityList from '../components/InfinityList'

const Catalog = () => {
    const initFilter = {
        category: [],
        color: [],
        size: []
    }

    const productList = productData.getAllProducts()

    const [products, setProducts] = React.useState(productList)

    const [filter, setFilter] = React.useState(initFilter)

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case "CATEGORY":
                    setFilter({ ...filter, category: [...filter.category, item.categorySlug] })
                    break;
                case "COLOR":
                    setFilter({ ...filter, color: [...filter.color, item.color] })
                    break;
                case "SIZE":
                    setFilter({ ...filter, size: [...filter.size, item.size] })
                    break;

                default:
                    break;
            }
        } else {
            switch (type) {
                case "CATEGORY":
                    const newCategory = filter.category.filter(i => i !== item.categorySlug)
                    setFilter({ ...filter, category: newCategory })
                    break;
                case "COLOR":
                    const newColor = filter.color.filter(i => i !== item.color)
                    setFilter({ ...filter, color: newColor })
                    break;
                case "SIZE":
                    const newSize = filter.size.filter(i => i !== item.size)
                    setFilter({ ...filter, size: newSize })
                    break;

                default:
                    break;
            }
        }
    }

    const clearFilter = () => setFilter(initFilter)

    // useCallback --> Khi filter (productList) thay đổi thì sẽ chạy hàm này
    const updateProducts = React.useCallback(
        () => {
            let tmp = productList

            if (filter.category.length > 0) {
                /*
                    - tmp la bien tam chua danh sach san pham
                    - .filter se loc lai cac san pham dung voi dieu kien
                    - ham includes la xac dinh xem tham so truyen vao co trong mang hay khong
                        + Mang o day la filter.category
                    => Dieu kien se la product nao co categorySlug nam trong mang filter.category
                */
                tmp = tmp.filter(product => filter.category.includes(product.categorySlug))
            }

            if (filter.color.length > 0) {
                /*
                    - Tuong tu nhu o tren, loc lai cac san pham dung voi dieu kien
                    - Tuy nhien, color trong product se la 1 mang => su dung find de tim tung color mot
                        + Neu co color thi tra ve true
                */
                tmp = tmp.filter(product => {
                    const check = product.colors.find(color => filter.color.includes(color))
                    return check !== undefined
                })
            }

            if (filter.size.length > 0) {
                tmp = tmp.filter(product => {
                    const check = product.size.find(size => filter.size.includes(size))
                    return check !== undefined
                })
            }

            setProducts(tmp)
        },
        [filter, productList]
    )

    // Se duoc goi moi lan updateProducts thay doi (do filter thay doi --> updateProducts thay doi)
    // re-render lai component
    React.useEffect(() => {
        updateProducts()
    }, [updateProducts])

    const filterRef = React.useRef(null);

    const toggleFilter = () => filterRef.current.classList.toggle('active')

    return (
        <Helmet title='Sản phẩm'>
            <div className='catalog'>
                <div className='catalog__filter' ref={filterRef}>
                    <div className='catalog__filter__close' onClick={toggleFilter}>
                        <i className='bx bx-x'></i>
                    </div>
                    <div className='catalog__filter__widget'>
                        <div className='catalog__filter__widget__title'>
                            danh mục sản phẩm
                        </div>
                        <div className='catalog__filter__widget__content'>
                            {
                                category.map((item, index) => (
                                    <div
                                        key={index}
                                        className='catalog__filter__widget__content__item'
                                    >
                                        <CheckBox
                                            label={item.display}
                                            // input de tu trong CheckBox truyen ra
                                            // tham so dau la case, tham so 2 la thuoc tinh checked cua the input
                                            // tham so 3 la cac category (Neu co BE thi se la data lay ve tu API)
                                            onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                                            // props checked cua component CheckBox
                                            checked={filter.category.includes(item.categorySlug)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='catalog__filter__widget'>
                        <div className='catalog__filter__widget__title'>
                            màu sắc
                        </div>
                        <div className='catalog__filter__widget__content'>
                            {
                                colors.map((item, index) => (
                                    <div
                                        key={index}
                                        className='catalog__filter__widget__content__item'
                                    >
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("COLOR", input.checked, item)}
                                            checked={filter.color.includes(item.color)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='catalog__filter__widget'>
                        <div className='catalog__filter__widget__title'>
                            kích cỡ
                        </div>
                        <div className='catalog__filter__widget__content'>
                            {
                                size.map((item, index) => (
                                    <div
                                        key={index}
                                        className='catalog__filter__widget__content__item'
                                    >
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("SIZE", input.checked, item)}
                                            checked={filter.size.includes(item.size)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='catalog__filter__widget'>
                        <div className='catalog__filter__widget__content'>
                            <Button size='sm' onClick={clearFilter}>xóa bộ lộc</Button>
                        </div>
                    </div>
                </div>
                <div className='catalog__toggle-button'>
                    <Button size='sm' onClick={toggleFilter}>Menu</Button>
                </div>
                <div className='catalog__content'>
                    <InfinityList
                        products={products}
                    />
                </div>
            </div>
        </Helmet>
    )
}

export default Catalog