module Api
    module V1
        class OrdersController < ApplicationController
            # 注文の生成
            def create
                posted_line_foods=LineFood.where(id: params[:line_food_ids])
                # LineFoodを呼び出すことで、line_food_controllerにより、activeなline_food一覧がフロントから送られてくる
                # アプリケーションの仕様上、複数の仮注文があるため、複数のidの配列がパラメーターとしてフロントから送られる
                order=Order.new(
                    total_price: total_price(posted_line_foods)
                )
                
                if order.save_with_update_line_foods!(posted_line_foods)
                    # 注文のDBへの保存はOrderモデルのメソッドで行う
                    render json:{}, status: :no_content
                else
                    render json:{}, status: :initial_server_error
                end
            end

            private

            def total_price(posted_line_foods)
                posted_line_foods.sum {|line_food| line_food.total_amount}+posted_line_foods.first.restaurant.fee
                # LineFoodのDBに保存されている内容：id, count, restaurant, active, created_at, updated_at
                # そのため各line_foodの合計金額は、その都度total_amountメソッドで計算
            end
        end
    end
end