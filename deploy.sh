#!/bin/sh

if [ "$TRAVIS_PULL_REQUEST" != "false" ]
then
  echo "This is a pull request. No deployment will be done."
  exit 0
fi
if [ "$TRAVIS_BRANCH" = master ]
then
  cd dist
  git init || true
  wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh
  git remote add heroku git@heroku.com:stickr.git
  echo "Host heroku.com" >> ~/.ssh/config
  echo "   StrictHostKeyChecking no" >> ~/.ssh/config
  echo "   CheckHostIP no" >> ~/.ssh/config
  echo "   UserKnownHostsFile=/dev/null" >> ~/.ssh/config
  yes | heroku keys:add
  yes | git add -f .
  yes | git commit -m "Deployment update" --allow-empty
  yes | git push heroku master
  heroku keys:remove `whoami`@`hostname`
  cd ..
elif [ "$TRAVIS_BRANCH" = develop ]
then
  cd dist
  git init || true
  wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh
  git remote add heroku git@heroku.com:stickr-staging.git
  echo "Host heroku.com" >> ~/.ssh/config
  echo "   StrictHostKeyChecking no" >> ~/.ssh/config
  echo "   CheckHostIP no" >> ~/.ssh/config
  echo "   UserKnownHostsFile=/dev/null" >> ~/.ssh/config
  yes | heroku keys:add
  yes | git add -f .
  yes | git commit -m "Deployment update" --allow-empty
  yes | git push heroku master
  heroku keys:remove `whoami`@`hostname`
  cd ..
fi