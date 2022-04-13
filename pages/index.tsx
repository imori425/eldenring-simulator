import React from "react";

import {GetStaticProps, NextPage} from "next";
import path from "path";
import * as fs from "fs";
import dynamic from "next/dynamic";
import {Weapon} from "../lib/model";

export type SearchForm = {
    keyword: string;
    str: number;
    dex: number;
    int: number;
    arc: number;
    fth: number;
    type: string;
};

export type WeaponSearchPageProps = { weapons: Weapon[], weaponTypes: string[] }

export const getStaticProps: GetStaticProps<WeaponSearchPageProps> = async () => {
// JSON ファイルを読み込む
    const weaponJsonPath = path.join(process.cwd(), 'weapon.json')
    const jsonText = fs.readFileSync(weaponJsonPath, 'utf-8')
    const weapons = JSON.parse(jsonText) as Weapon[]

    const weaponTypes = Array.from(new Set(weapons.map((w) => w.type)))
    return {
        props: {weapons, weaponTypes}
    }
}

// 「Text content did not match. Server: "ダガー" Client: "大型ナイフ"」というエラーが発生している。
// 原因としてはserver sideとclient sideで描画が異なるので発生している。
// 理由としては、クライアントサイドでLocalStorageを使用しているため。
const WeaponSearch = dynamic(() => import("../components/weapon_search"), {ssr: false})
export const WeaponSearchPage: NextPage<WeaponSearchPageProps> = ({weapons, weaponTypes}: WeaponSearchPageProps) => {


    return <WeaponSearch weapons={weapons} weaponTypes={weaponTypes}/>
}

export default WeaponSearchPage