
WEBPACK ?= ./node_modules/webpack/bin/webpack.js
WEBPACK_DEV_SERVER ?= ./node_modules/webpack-dev-server/bin/webpack-dev-server.js

build-dev:
	$(WEBPACK) --progress -d

build-prod:
	$(WEBPACK) --progress -p

dev-server:
	env DEBUG=true $(WEBPACK_DEV_SERVER) --hot --inline

clean:
	rm -rf dist

serve: clean build-dev dev-server
