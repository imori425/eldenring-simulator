import React from "react";

import {GetStaticProps, NextPage} from "next";
import path from "path";
import * as fs from "fs";
import dynamic from "next/dynamic";
import {Spell, Weapon} from "../lib/model";

export type SearchForm = {
    keyword: string;
    str: number;
    dex: number;
    int: number;
    arc: number;
    fth: number;
    type: string;
};

export type SearchPageProps = { weapons: Weapon[], weaponTypes: string[], spells: Spell[] }

export const getStaticProps: GetStaticProps<SearchPageProps> = async () => {
// JSON ファイルを読み込む
    const weaponJsonPath = path.join(process.cwd(), 'weapon.json')
    const jsonText = fs.readFileSync(weaponJsonPath, 'utf-8')
    const weapons = JSON.parse(jsonText) as Weapon[]

    const spellJsonPath = path.join(process.cwd(), "spell.json")
    const spellJsonText = fs.readFileSync(spellJsonPath, 'utf-8')
    const spells = JSON.parse(spellJsonText) as Spell[]

    const weaponTypes = Array.from(new Set(weapons.map((w) => w.type)))
    return {
        props: {weapons, weaponTypes, spells}
    }
}

// 「Text content did not match. Server: "ダガー" Client: "大型ナイフ"」というエラーが発生している。
// 原因としてはserver sideとclient sideで描画が異なるので発生している。
// 理由としては、クライアントサイドでLocalStorageを使用しているため。
const Search = dynamic(() => import("../components/search"), {ssr: false})
export const SearchPage: NextPage<SearchPageProps> = ({weapons, weaponTypes, spells}: SearchPageProps) => {
    return <Search spells={spells} weapons={weapons} weaponTypes={weaponTypes}/>

}

export default SearchPage