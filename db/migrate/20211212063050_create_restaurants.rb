class CreateRestaurants < ActiveRecord::Migration[6.0]
  def change
    create_table :restaurants do |t|
      # --- ここから追加 ---
      t.string :name, null: false
      t.integer :fee, null: false, default: 0
      t.integer :time_required, null: false

      t.timestamps
      # --- ここまで追加 ---
    end
  end
end


# migrationが完了すると、db/migrate/schema.rbというファイルが出来上がっているはず
# このschema.rbとはmigrationの結果生成されるファイルなので、これを直接編集しないように注意