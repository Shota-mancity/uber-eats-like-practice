# --- ここから追加 ---
class LineFood < ApplicationRecord
    belongs_to :food
    belongs_to :restaurant
    belongs_to :order, optional: true
  
    # validates :count, numericality: { greater_than: 0 }
    validates :count, numericality: { minimum: 0 }
  
    # LineFood.activeとしたときに、クエリを指定（LineFoodテーブル内のactiveなものだけをすべて返す）
    scope :active, -> { where(active: true) }
    # LineFood.other_restaurantとしたときに、特定のrestaurant_idに対して他店舗のLineFoodがあればすべて返す(例外処理用)
    scope :other_restaurant, -> (picked_restaurant_id) { where.not(restaurant_id: picked_restaurant_id) }
  
    def total_amount
      food.price * count
    end
  end
  # --- ここまで追加 ---
  