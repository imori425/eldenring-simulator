import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import Layout from "./layout";
import {WeaponSearchPageProps, SearchForm} from "../pages";
import {useRecoilState} from "recoil";
import {searchFormRecoilState} from "../lib/atom";

export const SearchComponent: React.FC<WeaponSearchPageProps> = ({weapons, weaponTypes}: WeaponSearchPageProps) => {

    const [searchForm, setSearchForm] = useRecoilState(searchFormRecoilState);

    const {
        register,
        watch,
    } = useForm<SearchForm>({defaultValues: searchForm});

    const formValues = watch()

    useEffect(() => {
        setSearchForm(formValues)
        // depsにformValuesをそのまま設定すると、中身が等しいが別の配列が渡ってくるので無限ループしてしまう。
        // JSON（文字列）にすることで、無限ループを防いでいる。
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(formValues), setSearchForm])

    const weaponItems = weapons
        .filter((weapon) => weapon.requireStrength <= formValues.str)
        .filter((weapon) => weapon.requireDexterity <= formValues.dex)
        .filter((weapon) => weapon.requireIntelligence <= formValues.int)
        .filter((weapon) => weapon.requireArcane <= formValues.arc)
        .filter((weapon) => weapon.requireFaith <= formValues.fth)
        .filter((weapon) => formValues.type === "" || weapon.type === formValues.type)
        .filter((weapon) => formValues.keyword === "" || weapon.name.includes(formValues.keyword))
        .map((weapon) =>
            <div key={weapon.name} className="flex flex-row flex-auto items-center space-x-2">
                <div>{weapon.type} {weapon.name}</div>
                {/*<div>筋力{weapon.requireStrength}/技量{weapon.requireDexterity}/知力{weapon.requireIntelligence}/信仰{weapon.requireFaith}/神秘{weapon.requireArcane}</div>*/}
                <div>物{weapon.physicalAttack}/魔{weapon.magicAttack}/聖{weapon.holyAttack}/雷{weapon.lightningAttack}/炎{weapon.fireAttack}</div>
                <div>
                    <a className="link" target="_blank"
                       href={encodeURI(`https://www.google.com/search?q=エルデンリング+${weapon.name}`)}
                       rel="noreferrer">G</a>
                </div>
                <div>
                    <a className="link" target="_blank"
                       href={encodeURI(`https://www.youtube.com/results?search_query=エルデンリング+${weapon.name}`)}
                       rel="noreferrer">Y</a>
                </div>
            </div>
        );


    const weaponTypeOptions = weaponTypes.map((t) => <option key={t} value={t}>{t}</option>)
    return (
        // <form onSubmit={handleSubmit(onSubmit)}>
        <Layout>
            <section>
                <div className="text-2xl my-5">武器検索</div>
                <form>
                    <h3>キャラクターステータス</h3>
                    <div className="flex flex-row -ml-2 flex-wrap">
                        <div className="form-control ml-2 my-1">
                            <label className="input-group">
                                <span>筋力</span>
                                <input type="number" placeholder="str" {...register("str", {
                                    required: true,
                                    max: 99,
                                    min: 1
                                })}
                                       className="input input-bordered"/>
                            </label>
                        </div>
                        <div className="form-control ml-2  my-1">
                            <label className="input-group">
                                <span>技量</span>
                                <input type="number" placeholder="dex" {...register("dex", {
                                    required: true,
                                    max: 99,
                                    min: 1
                                })}
                                       className="input input-bordered"/>
                            </label>
                        </div>

                        <div className="form-control  ml-2 my-1">
                            <label className="input-group">
                                <span>知力</span>
                                <input type="number" placeholder="int" {...register("int", {
                                    required: true,
                                    max: 99,
                                    min: 1
                                })}
                                       className="input input-bordered"/>
                            </label>
                        </div>


                        <div className="form-control ml-2 my-1">
                            <label className="input-group">
                                <span>信仰</span>
                                <input type="number" placeholder="fth" {...register("fth", {
                                    required: true,
                                    max: 99,
                                    min: 1
                                })}
                                       className="input input-bordered"/>
                            </label>
                        </div>
                        <div className="form-control ml-2 my-1">
                            <label className="input-group">
                                <span>神秘</span>
                                <input type="number" placeholder="arc" {...register("arc", {
                                    required: true,
                                    max: 99,
                                    min: 1
                                })}
                                       className="input input-bordered"/>
                            </label>
                        </div>
                    </div>
                    <h2>武器検索</h2>
                    <div className="flex flex-row -ml-2 flex-wrap">
                        <div className="form-control my-1 ml-2 max-w-xs">
                            <label className="input-group">
                                <span>名前</span>
                                <input type="search" placeholder="keyword" {...register("keyword", {
                                    required: true,
                                    max: 99,
                                    min: 1
                                })}
                                       className="input input-bordered"/>
                            </label>
                        </div>
                        <div className="form-control my-1 ml-2 max-w-xs">
                            <label className="input-group">
                                <span>武器種別</span>
                                <select className="select select-bordered" {...register("type")}>
                                    <option value="">-</option>
                                    {weaponTypeOptions}
                                </select>
                            </label>
                        </div>
                    </div>
                </form>
            </section>

            <div className="divider"/>
            <h3>使える武器一覧</h3>
            <section>
                {weaponItems}
            </section>
        </Layout>

    );

}
export default SearchComponent;