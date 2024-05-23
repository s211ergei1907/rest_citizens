import React from "react";
import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from "@mantine/core";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'; // Импортируем QueryClient и QueryClientProvider
import Header from "./components/Header/Header";
import Citizens from "./pages/citizens/Citizens";
import Main from "./pages/Main";
import Citizen from "./pages/citizen/Citizen";
import {Notifications} from '@mantine/notifications';
import {LinkTo} from "./utils/LinkTo";

const theme = createTheme({});
const queryClient = new QueryClient();

function App() {
    return (

        <MantineProvider theme={theme}>
            <Notifications/>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Main/>}/>
                        <Route path={LinkTo.citizens()} element={<Citizens/>}/>
                        <Route path={LinkTo.citizen(':id')} element={<Citizen/>}/>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </MantineProvider>

    );
}

export default App;