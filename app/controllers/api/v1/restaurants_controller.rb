module Api
    # moduleは名前空間
    module V1
        class RestaurantsController < ApplicationController
            # 継承することで、すべてのコントローラーへの共通処理を継承元（ApplicationController）で定義可能
            def index
                # indexメソッドはデータを取得（GET）
                restaurants=Restaurant.all

                # render json: {}というかたちでJSON形式でデータを返却、status: :okはリクエストが成功、200 OKと一緒にデータを返す
                # http://localhost:3000/api/v1/restaurants にアクセスするとRestaurantモデルをすべて取得して、データが返却されている
                render json:{
                    restaurants: restaurants
                }, states: :ok
            end
        end
    end
end
