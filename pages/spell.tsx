import React from "react";

import {GetStaticProps, NextPage} from "next";
import path from "path";
import * as fs from "fs";
import dynamic from "next/dynamic";
import {Spell} from "../lib/model";


export type SpellSearchPageProps = { spells: Spell[] }

export const getStaticProps: GetStaticProps<SpellSearchPageProps> = async () => {
    const spellJsonPath = path.join(process.cwd(), "spell.json")
    const spellJsonText = fs.readFileSync(spellJsonPath, 'utf-8')
    const spells = JSON.parse(spellJsonText) as Spell[]

    return {
        props: {spells}
    }
}

// 「Text content did not match. Server: "ダガー" Client: "大型ナイフ"」というエラーが発生している。
// 原因としてはserver sideとclient sideで描画が異なるので発生している。
// 理由としては、クライアントサイドでLocalStorageを使用しているため。
const SpellSearch = dynamic(() => import("../components/spell_search"), {ssr: false})
export const SpellSearchPage: NextPage<SpellSearchPageProps> = ({spells}: SpellSearchPageProps) => {
    return <SpellSearch spells={spells}/>

}

export default SpellSearchPage