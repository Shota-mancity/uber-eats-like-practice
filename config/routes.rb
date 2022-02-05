Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      # namespace hogeで名前空間を付与、コントローラーをグルーピングし、またURLにもその情報を付与
      resources :restaurants do
        # resources :hogeで:hogeというリソースに対して７つのルーティングが自動的に作成
        resources :foods, only: %i[index]
      end
      resources :line_foods, only: %i[index create]
      put 'line_foods/replace', to: 'line_foods#replace'
      resources :orders, only: %i[create]
    end
  end
  # --- ここまで追加 ---
end