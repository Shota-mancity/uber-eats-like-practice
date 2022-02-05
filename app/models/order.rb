class Order < ApplicationRecord
    has_many :line_foods

    validates :total_price, numericality: {greater_than:0}

        # インスタンスメソッド:特定のデータに対する操作
        def save_with_update_line_foods!(line_foods)
        ActiveRecord::Base.transaction do
            # transaction:LineFoodデータの更新と、Orderデータの保存、いずれかが失敗した場合に全ての処理をなかったことにする
            # データの統一性を保てる
            line_foods.each do |line_food|
                line_food.update!(active: false, count: 0, order: self)
                # 6.1系以降ではupdate_attributesメソッド非推奨のため、updateメソッドを使用
                # 注文後はline_foodを非活性にすると同時に、countをリセット
                # line_food.update_attributes!(active: false, order: self)
                # update_attributes:Hash(key: 値, key: 値)を引数に渡してデータベースのレコードを複数同時に更新
            end
            self.save! 
            # 注文をDBに保存
        end
    end
end
