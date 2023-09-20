import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DefaultLayout from './layouts/DefaultLayout';
import { privateRoutes, publicRoutes } from './routes';

function App() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    let pages = [...publicRoutes];
    if (userInfo) {
        pages = publicRoutes.concat(privateRoutes);
    } else {
        pages = [...publicRoutes];
    }
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {pages.map((route, index) => {
                        const Page = route.components;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
