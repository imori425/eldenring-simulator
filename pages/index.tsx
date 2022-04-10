import React, {HTMLInputTypeAttribute, useState} from "react";
import Layout from "../components/layout";

import {useForm} from 'react-hook-form';
import {GetStaticProps} from "next";
import path from "path";
import * as fs from "fs";

type FormData = {
    keyword: string;
    str: number;
    dex: number;
    int: number;
    arc: number;
    fth: number;
    type: string;
};

type Weapon = {
    type: string;
    name: string;
    physicalAttack: number;
    magicAttack: number;
    fireAttack: number;
    lightningAttack: number;
    holyAttack: number;
    requireStrength: number;
    requireDexterity: number;
    requireIntelligence: number;
    requireFaith: number;
    requireArcane: number;
}
type PageProps = { weapons: Weapon[], weaponTypes: string[] }

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {

// JSON ファイルを読み込む
    const jsonPath = path.join(process.cwd(), 'weapon.json')
    const jsonText = fs.readFileSync(jsonPath, 'utf-8')
    const weapons = JSON.parse(jsonText) as Weapon[]

    const weaponTypes = Array.from(new Set(weapons.map((w) => w.type)))
    return {
        props: {weapons, weaponTypes}
    }
}
export const SearchPage: React.FC<PageProps> = ({weapons, weaponTypes}: PageProps) => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<FormData>(
        {
            defaultValues: {
                str: 10,
                dex: 10,
                int: 10,
                arc: 10,
                fth: 10,
                keyword: "",
                type: ""
            }
        }
    );
    const onSubmit = (data: FormData) => console.log(data);
    console.log(errors);

    const formValues = watch();
    const weaponItems = weapons
        .filter((weapon) => weapon.requireStrength <= formValues.str)
        .filter((weapon) => weapon.requireDexterity <= formValues.dex)
        .filter((weapon) => weapon.requireIntelligence <= formValues.int)
        .filter((weapon) => weapon.requireArcane <= formValues.arc)
        .filter((weapon) => weapon.requireFaith <= formValues.fth)
        .filter((weapon) => formValues.type === "" || weapon.type === formValues.type)
        .map((weapon) =>
            <div key={weapon.name}>
                <span>{weapon.name} {weapon.requireStrength}/{weapon.requireDexterity}/{weapon.requireIntelligence}/{weapon.requireFaith}/{weapon.requireArcane}</span>
                <a target="_blank" href={encodeURI(`https://www.google.com/search?q=エルデンリング+${weapon.name}`)}
                   rel="noreferrer">検索</a>
            </div>
        );

    const weaponTypeOptions = weaponTypes.map((t) => <option key={t} value={t}>{t}</option>)
    return (
        // <form onSubmit={handleSubmit(onSubmit)}>
        <Layout>

            <div className="flex">
                <div className="form-control my-1 max-w-xs">
                    <label className="input-group">
                        <span>キーワード</span>
                        <input type="search" placeholder="keyword" {...register("keyword", {
                            required: true,
                            max: 99,
                            min: 1
                        })}
                               className="input input-bordered"/>
                    </label>
                </div>
                <div className="form-control my-1 max-w-xs">
                    <label className="input-group">
                        <span>武器種別</span>
                        <select className="select select-bordered" {...register("type")}>
                            <option value="">-</option>
                            {weaponTypeOptions}
                        </select>
                    </label>
                </div>
            </div>
            <div className="flex">
                <div className="form-control my-1 max-w-xs">
                    <label className="input-group">
                        <span>筋力</span>
                        <input type="number" placeholder="str" {...register("str", {required: true, max: 99, min: 1})}
                               className="input input-bordered"/>
                    </label>
                </div>
                <div className="form-control my-1 max-w-xs">
                    <label className="input-group">
                        <span>技量</span>
                        <input type="number" placeholder="dex" {...register("dex", {required: true, max: 99, min: 1})}
                               className="input input-bordered"/>
                    </label>
                </div>

                <div className="form-control my-1 max-w-xs">
                    <label className="input-group">
                        <span>知力</span>
                        <input type="number" placeholder="int" {...register("int", {required: true, max: 99, min: 1})}
                               className="input input-bordered"/>
                    </label>
                </div>


                <div className="form-control my-1 max-w-xs">
                    <label className="input-group">
                        <span>信仰</span>
                        <input type="number" placeholder="fth" {...register("fth", {required: true, max: 99, min: 1})}
                               className="input input-bordered"/>
                    </label>
                </div>
                <div className="form-control my-1 max-w-xs">
                    <label className="input-group">
                        <span>神秘</span>
                        <input type="number" placeholder="arc" {...register("arc", {required: true, max: 99, min: 1})}
                               className="input input-bordered"/>
                    </label>
                </div>
            </div>

            <section>
                {weaponItems}
            </section>
        </Layout>

    );
}

export default SearchPage