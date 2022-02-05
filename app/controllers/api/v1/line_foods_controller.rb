module Api
    module V1
        class LineFoodsController < ApplicationController
            before_action :set_food, only: %i[create replace]
            # アクションの実行前にフィルタを定義、onlyオプションをつけることで、特定のアクションの実行前にだけset_foodを実行可能

            # 仮注文の一覧
            def index
                line_foods=LineFood.active
                # LineFoodモデルからactiveなLineFoodを取得
                if line_foods.exists?
                    # 仮注文ページにはいつでもアクセスすることができ、リクエスト自体は走る可能性があるためline_foodsが空かどうかチェック
                    # 注文発注後の再レンダリング時にも重要
                    line_food_ids=[]
                    count=0
                    amount=0

                    line_foods.each do |line_food|
                        line_food_ids<< line_food.id   # idを参照して配列に追加
                        count+=line_food[:count]
                        amount+=line_food.total_amount
                        # LineFoodモデルにtotal_amountメソッドあり
                    end

                    render json:{
                        line_food_ids: line_food_ids,
                        restaurant: line_foods[0].restaurant,
                        # line_foodとrestaurantはリレーションをもっているため参照可能
                        count: count,
                        amount: amount
                    }, status: :ok
                else
                    render json:{}, status: :no_content
                    # 商品注文前にorderページにアクセスするまたは、商品注文後でactiveなLineFoodが存在しないとき
                end
            end

            # 仮注文の作成
            def create
            # 例外パターンで早期リターン
            if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists?
                # LineFoodモデルから複数のscopeを組み合わせて、「他店舗でアクティブなLineFood」をActiveRecord_Relationのかたちで取得
                # そして、それが存在するかどうか？をexists?で判断
                # 1.activeなLineFoodを抜き出し
                # 2.最新の注文のレストランID（@ordered_food.restaurant.id）を引数に、activeなLineFoodテーブル内から、別のレストランIDをもつLineFoodを抜き出し
                return render json:{
                    existing_restaurant: LineFood.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name,
                    new_restaurant: Food.find(params[:food_id]).restaurant.name
                    # new_restaurant: @ordered_food.restaurant.nameでいける？
                }, status: :not_acceptable
            end
            # ここでtrueにある場合には、JSON形式のデータを返却してreturnして処理を終了
            # このあとフロントでは最新の注文のレストランに置き換えるかを確認するModalに移行
            # 置き換えがYesなら、コントローラー内のreplaceメソッドを実行

            # 例外パターンに当てはまらず、正常に仮注文を作成する場合にはグローバルなline_foodインスタンスを生成(set_line_foodはprivateメソッドに切り出し)
            set_line_food(@ordered_food)
            # line_foodはordered_foodからつくられる

            # line_foodをデータベースに保存
            if @line_food.save
                # 成功したらrender json: {}というかたちでJSON形式で保存したデータを返却
                # http://localhost:3000/api/v1/line_foods 
                render json:{
                    line_food: @line_food
                }, status: :created
            else
                render json: {}, status: :internal_server_error
            end
        end


        # 仮注文の置き換え
        def replace
            LineFood.active.other_restaurant(@ordered_food.restaurant.id).each do |line_food|
                # replaceメソッドもbefore_actionを適用しているため、@ordered_foodがセットされている
                line_food.update!(active: false, count: 0)
                # 6.1系以降ではupdate_attributeメソッド非推奨のため、updateメソッドを使用
                # 置き換え後はline_foodを非活性にすると同時に、countをリセット
                # line_food.update_attribute(:active, false)
                # 既にある古い別店舗の仮注文を論理削除(activeカラムにfalseを入れて、データを非活性の状態にする)し、新しいレコードを作成
            end

            # ここからはcreateの正常時の仮注文作成と同様
            set_line_food(@ordered_food)

            # line_foodをデータベースに保存
            if @line_food.save
                # 成功したらrender json: {}というかたちでJSON形式で保存したデータを返却
                # http://localhost:3000/api/v1/line_foods
                render json:{
                    line_food: @line_food
                }, status: :created
            else
                render json:{}, status: :initial_server_error
            end
        end

            # コントローラーの中でしか呼ばれないアクションのためprivate
            private

            def set_food
                # before_actionにより、createメソッドの実行前にのみ、set_foodを実行
                @ordered_food = Food.find(params[:food_id])
            end
    
            def set_line_food(ordered_food)
                if ordered_food.line_food.present?
                    # すでに同じ商品の仮注文が存在した場合
                    @line_food=ordered_food.line_food
                    # モデルファイルでリレーションが貼られているため、Foodモデルから生成されたインスタンスオブジェクトから、LineFoodモデルのインスタンスオブジェクトへ辿ることができる
                    @line_food.attributes={
                        count: ordered_food.line_food.count+params[:count],
                        active: true
                    }
                else
                    # DBに保存される内容：id, count, restaurant, active, created_at, updated_at,さらにリレーションが貼られているためrestaurant_id, food_id
                    @line_food=ordered_food.build_line_food(
                        # build_xxx は has_one でアソシエーションが定義されている場合に使える構文
                        # @line_food=ordered_food.line_food.buildと同じ意味
                        count: params[:count],
                        restaurant: ordered_food.restaurant,
                        # foodはrestaurantに従属している（モデルファイルでリレーションが貼られている）ためrestaurant情報にアクセス可
                        active: true
                    )
                end
            end
        end
    end
end