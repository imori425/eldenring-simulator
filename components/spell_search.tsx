import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import Layout from "./layout";
import {SearchForm} from "../pages";
import {useRecoilState} from "recoil";
import {searchFormRecoilState} from "../lib/atom";
import {SpellSearchPageProps} from "../pages/spell";

export const SpellSearchComponent: React.FC<SpellSearchPageProps> = ({ spells}: SpellSearchPageProps) => {

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



    const spellItems = spells
        .filter((spell) => spell.int <= formValues.int)
        .filter((spell) => spell.arc <= formValues.arc)
        .filter((spell) => spell.fth <= formValues.fth)
        .filter((spell) => formValues.keyword === "" || spell.name.includes(formValues.keyword))
        .map((spell) =>
            <div key={spell.name} className="flex flex-row flex-auto items-center space-x-2">
                <div>{spell.name}</div>
                <div>知力{spell.int}/信仰{spell.fth}/神秘{spell.arc}</div>
                <div>fp:{spell.fp}/slot:{spell.slot}</div>
                <div>
                    <a className="link" target="_blank"
                       href={encodeURI(`https://www.google.com/search?q=エルデンリング+${spell.name}`)}
                       rel="noreferrer">G</a>
                </div>
                <div>
                    <a className="link" target="_blank"
                       href={encodeURI(`https://www.youtube.com/results?search_query=エルデンリング+${spell.name}`)}
                       rel="noreferrer">Y</a>
                </div>
            </div>
        );


    return (
        // <form onSubmit={handleSubmit(onSubmit)}>
        <Layout>
            <section>
                <div className="text-2xl my-5">スペル検索</div>
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
                    <h2>検索</h2>
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
                    </div>
                </form>
            </section>

            <div className="divider"/>
            <h3>使えるスペル（魔法、祈祷）</h3>
            <section>
                {spellItems}
            </section>
        </Layout>

    );

}
export default SpellSearchComponent;