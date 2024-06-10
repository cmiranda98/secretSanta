import React, { Component } from "react";
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/es_ES";
import router from "./_router";
import GenerateStore from "./_store";

class App extends Component {
    render() {
        return (<Provider store={GenerateStore()}>
            <ConfigProvider locale={locale} virtual>
                <RouterProvider router={router} />
            </ConfigProvider>
        </Provider>);
    };
};

export default App;
