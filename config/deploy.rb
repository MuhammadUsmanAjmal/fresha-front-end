# config valid only for current version of Capistrano
lock '3.14.1'

set :branch, ask('Git Branch:', 'master')

set :keep_releases, 10

namespace :deploy do
  desc 'Building application'
  task :restart do
    invoke 'react:build'
  end

  after :finished, :restart
end

