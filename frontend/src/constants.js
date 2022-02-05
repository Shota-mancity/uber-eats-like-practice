// APIリクエストに関する定数
// 定数なのですべて大文字で定数名を定義,大文字の変数名(定数名)にすることで、この値が普遍で代入不可であることを明示
export const REQUEST_STATE={
    // APIリクエスト中に画面がいまどういう状態なのか？を知るために参照
    INITIAL:"INITIAL",
    LOADING:"LOADING",
    OK:"OK"
}

export const HTTP_STATUS_CODE={
    NOT_ACCEPTABLE:406
}