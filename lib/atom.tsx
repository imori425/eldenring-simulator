import {atom} from "recoil";
import {SearchForm} from "../pages";
import {recoilPersist} from "recoil-persist";

const {persistAtom} = recoilPersist()

export const searchFormRecoilState = atom<SearchForm>({
    key: 'form', // unique ID (with respect to other atoms/selectors)
    default:
        {
            str: 10,
            dex: 10,
            int: 10,
            arc: 10,
            fth: 10,
            keyword: "",
            type: ""
        },
    effects_UNSTABLE: [persistAtom]
});

