// CO CUNG DUOC, KHONG CO CUNG DUOC

import React from 'react'
import PropTypes from 'prop-types'

import Grid from './Grid';
import ProductCard from './ProductCard';

const InfinityList = props => {
    const listRef = React.useRef(null);
    const preLoad = 6 // items each load

    const [products, setProducts] = React.useState([]);

    const [load, setLoad] = React.useState(true);
    const [index, setIndex] = React.useState(0);

    // Su dung useEffect de load du lieu khi co su thay doi tu Catalog component cung nhu de load lan dau
    React.useEffect(() => {
        setProducts(props.products.slice(0, preLoad));
        setIndex(1);
    }, [props.products]);

    // useEffect nay su dung de add event scroll vao window - Khi scroll den cuoi se thay doi state cua load --> ham callback cua useEffect duoi se duoc goi
    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            // Kiem tra xem listRef co duoc set hay khong
            if (listRef.current && listRef) {
                if (window.scrollY + window.innerHeight >= listRef.current.clientHeight + listRef.current.offsetTop + 200) {
                    setLoad(true);
                }
            }
        })

        return () => window.removeEventListener("scroll", () => { });
    }, [listRef])

    // useEffect nay se duoc goi khi scroll va load duoc thay doi gia tri
    // KHONG phai duoc goi o lan render dau tien
    React.useEffect(() => {
        const getItems = () => {
            // so trang (VD: 18/6 = 3; 19/6 = 3)
            const pages = Math.floor(props.products.length / preLoad)
            // tong so trang (VD: 18%6 = 0 => pages; 19%6 = 1 => pages + 1 = 4)
            const maxIndex = props.products.length % preLoad === 0 ? pages : pages + 1;

            if (load && index <= maxIndex) {
                const start = index * preLoad;
                const end = start + preLoad;

                /* 
                    concat: ham noi 2 mang
                    mang duoc noi vao se la mang duoc slice (cat) tu vi tri start den vi tri end cua props.products (mang tong)
                */
                setProducts(products.concat(props.products.slice(start, end)));
                // tang index len
                setIndex(index + 1);
            }
        }

        getItems();
        setLoad(false);
    }, [load, index, products, props.products])

    return (
        <div ref={listRef}>
            <Grid
                col={3}
                mdCol={2}
                smCol1={1}
                gap={20}
            >
                {products.map((item, index) => (
                    <ProductCard
                        key={index}
                        img01={item.image01}
                        img02={item.image02}
                        name={item.title}
                        price={parseInt(item.price)}
                        slug={item.slug}
                    />
                ))}
            </Grid>
        </div>
    )
}

InfinityList.propTypes = {
    products: PropTypes.array.isRequired
}

export default InfinityList