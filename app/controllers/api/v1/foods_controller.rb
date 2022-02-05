module Api
    module V1
        class FoodsController < ApplicationController
            # パラメーターにrestaurant_idを指定して、その店舗が持つフード一覧を返す
            def index
                restaurant=Restaurant.find(params[:restaurant_id])
                # params[:hoge]とすることで、リクエスト(URL)に含まれるパラメーターhogeを取得できる(リクエストする(URLを叩く))
                foods=restaurant.foods

                render json:{
                    foods: foods
                }, status: :ok
            end
        end
    end
end