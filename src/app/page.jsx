"use client";
import "./styles/global.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useState } from "react";

import {
    Card,
    Row,
    Col,
    Spin,
    Typography,
    Layout,
    Menu,
    Avatar,
    Divider,
    Button,
    Input
} from "antd";
import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

const { Title } = Typography;
const { Header, Content, Sider, Footer } = Layout;

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Open, setOpen] = useState(false);
    const [Total, setTotal] = useState(0)
    const [Items, setItems] = useState([])
    const [Search, setSearch] = useState("")
    const [Show, setShow] = useState(false)

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=12&sort=desc")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch(() => setLoading(false));





    }, []);


    useEffect(() => {
        if (!loading) {

            gsap.registerPlugin(ScrollTrigger);

            gsap.fromTo(".theSider", { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2 })
            gsap.fromTo(".Headerr", { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 })
            gsap.fromTo(".background", { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2 })
            gsap.fromTo(".TextSwi", { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 })
            gsap.fromTo(".recomen", { y: -100, opacity: 0 }, {
                y: 0, opacity: 1, duration: 1.2, scrollTrigger: {
                    trigger: ".recomen"
                }
            })

            gsap.fromTo(".swiperr", { y: 100, opacity: 0 }, {
                y: 0, opacity: 1, duration: 1.2, scrollTrigger: {
                    trigger: ".swiperr"
                }
            })


            gsap.fromTo(".productList", { x: -100, opacity: 0 }, {
                x: 0, opacity: 1, duration: 1.2, scrollTrigger: {
                    trigger: ".productList"
                }
            })
            gsap.fromTo(".TheList", { y: 200, opacity: 0 }, {
                y: 0, opacity: 1, duration: 1.5, scrollTrigger: {
                    trigger: ".TheList"
                }
            })
            gsap.fromTo(".footerr", { y: -20, opacity: 0 }, {
                y: 0, opacity: 1, duration: 1, scrollTrigger: {
                    trigger: ".footerr"
                }
            })
        }


    }, [loading])



    const handlebuy = (itemm, pricee) => {
        setTotal((prev) => prev + pricee)
        setItems((prev) => [...prev, { itemm, pricee }])
    }


    const hanldeCheckout = () => {
        if (Items.length === 0) {
            alert("Please Buy Something Before Checkout")
            return
        }


        const Itemsss =
            Items.map((II, index) => `${index + 1}. ${II.itemm}, Price = $${II.pricee}`)
                .join("\n")
        alert(`The Items That You Buy:\n${Itemsss}\nTotal: ${Total}`)
        setTotal(0)
        setItems([])
    }

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: 320 }}>
                <Spin size="large" />
            </div>
        );
    }


    const filteredProducts = products.filter((item) =>
        item.title.toLowerCase().includes(Search.toLocaleLowerCase())
    );

    return (

        <>
            <div className="animated-bg"></div>
            <Layout style={{ minHeight: "100vh" }}>

                <Sider className="theSider" collapsed={!Open} style={{ backgroundColor: "black", color: "white" }}>
                    <Menu
                        style={{
                            backgroundColor: "black",
                            color: "white",
                            marginTop: "100px",
                            padding: "40px",
                        }}
                        theme="dark"
                        mode="inline"
                    >
                        <Menu.Item key="home">
                            <Link href="/">Home</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout>
                    <Header className="Headerr">
                        <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
                            <MenuOutlined
                                onClick={() => setOpen(!Open)}
                                style={{ fontSize: "28px", cursor: "pointer" }}
                            />
                            <p style={{ fontSize: "32px", fontWeight: "600", marginTop: "30px" }}>
                                AbbyFashion
                            </p>

                            <Input className="TheInput" placeholder="Search Item"
                                value={Search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <ShoppingCartOutlined onClick={() => setShow(true)} className="Keranjang" />
                        </div>
                    </Header>


                    <Content className="content-with-bg">


                        <div className="AlldivShow">
                            {Show && (
                                <Card className="InShow" onMouseLeave={() => setShow(false)} style={{ backgroundColor: "#f5f5f5" }}>
                                    <h3>Your Cart</h3>
                                    {Items.length > 0 ? (
                                        <>
                                            {Items.map((ITE, index) => (
                                                <p key={index}>
                                                    <b>{index + 1}.</b> {ITE.itemm} — Price: ${ITE.pricee}
                                                </p>
                                            ))}
                                            <p><b>Total:</b> ${Total}</p>
                                            <Button type="primary" onClick={hanldeCheckout}>Checkout</Button>
                                        </>
                                    ) : (
                                        <p>No items in cart.</p>
                                    )}
                                </Card>
                            )}
                        </div>



                        <Image
                            src="/gambar3.jpg"
                            alt="background"
                            width={1920}
                            height={1080}
                            className="background"
                            priority
                        />


                        <div className="AllDivSWiper">

                            <div className="TextSwi">
                                <p style={{ color: "white", fontWeight: 300 }}>
                                    Welcome

                                </p>

                                <p className="cosmetic">Cosmetic ingredients</p>
                            </div>



                            <div className="TheSwiper">


                                <div className="swiperr">

                                    <Title className="recomen" level={2} style={{ margin: "60px 0 30px", fontWeight: "600", display: 'flex', justifyContent: "center" }}>
                                        Recommended For You
                                    </Title>
                                    <Divider />

                                    <Swiper
                                        modules={[Navigation, Pagination, Autoplay]}
                                        slidesPerView={4}
                                        spaceBetween={200}
                                        pagination={{ clickable: true }}
                                        autoplay={{ delay: 2500 }}
                                        loop={true}
                                        className="swiper"
                                    >
                                        {products.map((item) => (
                                            <SwiperSlide key={item.id}>
                                                <div className="InSwiper">
                                                    <Avatar
                                                        size={300}
                                                        shape="square"
                                                        src={item.thumbnail}
                                                        style={{
                                                            borderRadius: 10,
                                                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                                        }}
                                                    />

                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>


                            </div>
                        </div>

                        <div style={{ marginTop: "150px" }}>
                            <Title className="productList" level={2} style={{ margin: "60px 0 30px", fontWeight: "600" }}>
                                Product List
                            </Title>

                            <div className="TheList">
                                <Divider />
                                {filteredProducts.length > 0 ? (
                                    <Row gutter={[24, 24]}>
                                        {products.map((item) => (
                                            <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                                                <Card
                                                    hoverable
                                                    cover={
                                                        <img
                                                            alt={item.title}
                                                            src={item.thumbnail}
                                                            style={{
                                                                height: 200,
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                    }
                                                >
                                                    <Card.Meta style={{ marginBottom: "30px" }} title={item.title} description={`$${item.price}`} />
                                                    <Button type="primary" onClick={() => handlebuy(item.title, item.price)}>Buy +</Button>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                ) : (
                                    <p style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>
                                        No products found for “{Search}”
                                    </p>


                                )}
                            </div>

                        </div>
                    </Content>

                    <Footer
                        style={{
                            textAlign: "center",
                            backgroundColor: "black",
                            color: "white",
                            marginTop: "40px",
                        }}
                        className="footerr"
                    >
                        2025 AbbyFashion | By Abhirath
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
}
