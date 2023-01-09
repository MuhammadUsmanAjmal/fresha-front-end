namespace :react do
  def build_app
    within current_path do
      execute :npm, :install
      execute :npm, :run, :build
    end
  end

  desc 'Build app'
  task :build do
    on roles(:all) do
      build_app
    end
  end
end
