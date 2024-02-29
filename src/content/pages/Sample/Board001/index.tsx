import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import React, { ReactNode, SyntheticEvent, useState } from 'react';
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import BoardListPage from "src/content/pages/Sample/Board001/BoardListPage";
import BoardListPageWithComponents from "src/content/pages/Sample/Board001/BoardListPageWithComponents";
import Test from "src/content/pages/Sample/Board001/Test";

/** Tabs (s) */
interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

/** Tabs (e) */

/** Board001 (s) */
function Board001() {
    /* Tab */
    const [tab, setTab] = useState(0);
    const handleChangeTab = (e: SyntheticEvent, newValue: number) => {
        setTab(newValue);
    }
    // Tab Text
    const tabList: string[] = ['test', 'Version 1', 'Version 2'];

    return (
        <>
            <Helmet>
                <title>Board001</title>
            </Helmet>

            {/* TAB */}
            <PageTitleWrapper>
                <Tabs
                    variant="scrollable" scrollButtons="auto" textColor="primary"
                    indicatorColor="primary" aria-label="basic tabs example"
                    value={tab} onChange={handleChangeTab}
                >
                    {tabList.map((t, idx) => {
                        return <Tab key={idx} label={t} {...a11yProps(idx)} />;
                    })}
                </Tabs>
            </PageTitleWrapper>

            {/* Tab Page */}
            <Container maxWidth="lg">
                <TabPanel index={0} value={tab}>
                    <Test />
                </TabPanel>
                <TabPanel index={1} value={tab}>
                    <BoardListPage />
                </TabPanel>
                <TabPanel index={2} value={tab}>
                    <BoardListPageWithComponents />
                </TabPanel>
            </Container>

            {/* Footer */}
            <Footer />
        </>
    );
}
/** Board001 (e) */

export default Board001;