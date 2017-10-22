rm -rf ./public/dist
rm -rf ./public/index_prod.html
cp ../wechat_front/index_prod.html ./public
cp -r ../wechat_front/dist ./public/dist
mv ./public/index_prod.html ./views/index_prod.html
npm start
