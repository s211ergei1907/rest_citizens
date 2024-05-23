import React, {useState} from "react";
import {Button, Container, createTheme, Grid, rem} from "@mantine/core";
import styles from "./Header.module.scss"
import {Link} from "react-router-dom";
import {tabs} from '../../constants/tabs'
import {eventWrapper} from "@testing-library/user-event/dist/utils";

const Header: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("Home");

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };


    return (
        <div className={styles.wrapper}>
            <Container size="responsive" className={styles.container}>
                <Grid>
                    <Grid.Col span={6}>
                        <Link to={"/"} className={styles.link}><h1 className={styles.link__h1}>CloudCom</h1></Link>
                    </Grid.Col>
                    <Grid.Col span={6} className={styles.tabs}>
                        {tabs.map((tab, index) => (
                            <Link to={tab.path} key={index}>
                                <Button
                                    key={index}
                                    style={{
                                        marginRight: "10px",
                                        opacity: activeTab === tab.name ? 0.5 : 1
                                    }}
                                    variant={activeTab === tab.name ? "filled" : "outline"}
                                    color={activeTab === tab.name ? "gray" : "white"}
                                    onClick={() => handleTabClick(tab.name)}
                                >
                                    {tab.name}
                                </Button>
                            </Link>
                        ))}
                    </Grid.Col>
                </Grid>
            </Container>
        </div>


    );
};

export default Header;