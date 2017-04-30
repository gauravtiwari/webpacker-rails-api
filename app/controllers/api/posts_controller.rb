class Api::PostsController < ApplicationController
  def index
    render json: Post.limit(10)
  end

  def show
    render json: Post.find(params[:id])
  end
end
