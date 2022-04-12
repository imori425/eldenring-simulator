import "../styles/globals.css";
import React from "react";
import {RecoilRoot} from "recoil";
import {AppType} from "next/dist/shared/lib/utils";

const MyApp: AppType = ({Component, pageProps}) => {

    return <RecoilRoot>
        <Component {...pageProps}/>;
    </RecoilRoot>
}

export default MyApp;