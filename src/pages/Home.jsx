import React from 'react'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
import Slider from '../components/Slider'
import Grid from '../components/Grid'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import PolicyCard from '../components/PolicyCard'
import ProductCard from '../components/ProductCard'

import sliderData from '../assets/fake-data/slider'
import policy from '../assets/fake-data/policy'
import productData from '../assets/fake-data/products'
import banner from '../assets/images/banner.png'


const Home = () => {
    return (
        <Helmet title='Trang chủ'>
            {/* Slider */}
            <Slider
                data={sliderData}
                control={true}
                auto={true}
            />
            {/* End slider */}

            {/* Policy section */}
            <Section>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            policy.map((item, index) => (
                                <Link to="/policy" key={index}>
                                    <PolicyCard
                                        name={item.name}
                                        description={item.description}
                                        icon={item.icon}
                                    />
                                </Link>
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* End Policy section */}

            {/* Best selling product section */}
            <Section>
                <SectionTitle>
                    top sản phẩm bán chạy trong tuần
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            productData.getProducts(4).map((item, index) => (
                                <ProductCard
                                    key={index}
                                    img01={item.image01}
                                    img02={item.image02}
                                    name={item.title}
                                    price={parseInt(item.price)}
                                    slug={item.slug}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* End Best selling product section */}

            {/* Newest product section */}
            <Section>
                <SectionTitle>
                    sản phẩm mới
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            productData.getProducts(4).map((item, index) => (
                                <ProductCard
                                    key={index}
                                    img01={item.image01}
                                    img02={item.image02}
                                    name={item.title}
                                    price={parseInt(item.price)}
                                    slug={item.slug}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* End Newest product section */}

            {/* Banner section */}
            <Section>
                <SectionBody>
                    <img src={banner} alt='' />
                </SectionBody>
            </Section>
            {/* End banner section */}

            {/* Popular product section */}
            <Section>
                <SectionTitle>
                    phổ biến
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            productData.getProducts(8).map((item, index) => (
                                <ProductCard
                                    key={index}
                                    img01={item.image01}
                                    img02={item.image02}
                                    name={item.title}
                                    price={parseInt(item.price)}
                                    slug={item.slug}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* End Popular product section */}
        </Helmet>
    )
}

export default Home