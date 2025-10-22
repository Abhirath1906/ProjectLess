"use client";
import "./styles/global.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { Card, Row,Col,Spin,Typography,Layout, Menu,Avatar,Divider} from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Title } = Typography;
const { Header, Content, Sider, Footer } = Layout;

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Open, setOpen] = useState(false);


    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=12&sort=desc")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: 320 }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>

            <Sider
                collapsed={!Open}
                style={{ backgroundColor: "black", color: "white" }}
            >
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




                <Header
                className="Headerr"
                    
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                        <MenuOutlined
                            onClick={() => setOpen(!Open)}
                            style={{ fontSize: "28px", cursor: "pointer" }}
                        />
                        <p style={{ fontSize: "32px", fontWeight: "600",marginTop:"30px" }}>AbbyFashion</p>
                    </div>
                </Header>


                <Content style={{ padding: "50px" }}>

                    <div className="AllDivSWiper" >
                        <p className="TextSwi">
                            The Product<br />We Sell
                        </p>

                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            slidesPerView={1}
                            spaceBetween={20}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 2500 }}
                            loop={true}
                            className="swiper"
                            
                        >
                            {products.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <div className="InSwiper" >
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

                    <div style={{marginTop:"250px"}}>
                        <Title
                            level={2}
                            style={{

                                margin: "60px 0 30px",
                                fontWeight: "600",
                            }}
                        >
                            Recommended for you
                        </Title>
                        <Divider/>

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
                                        <Card.Meta
                                            title={item.title}
                                            description={`$${item.price}`}
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Content>


                <Footer
                    style={{
                        textAlign: "center",
                        backgroundColor: "black",
                        color: "white",
                        marginTop: "40px",
                    }}
                >
                     2025 AbbyFashion | By Abhirath
                </Footer>
            </Layout>
        </Layout>
    );
}
