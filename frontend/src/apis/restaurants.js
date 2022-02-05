import axios from "axios"
// axiosはフロントエンドでHTTP通信を行う際に必要な処理をまとめて行ってくれるライブラリ
import {restaurantsIndex} from "../urls/index"

// APIを叩く関数を定義
export const fetchRestaurants=()=>{
    // コンポーネントからこの関数fetchRestaurants()を叩けば、サーバーサイドのAPIを叩いて、JSON形式のデータが返ってくる
    return axios.get(restaurantsIndex)
    // axios.getの引数にはHTTPリクエストをなげる先のURL文字列
    .then(res=>{
        // 返り値をresという名前で取得
        return res.data
        // res.dataでレスポンスの中身だけをreturn
    })
    .catch(e=>console.error(e))
}