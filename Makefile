
WEBPACK ?= ./node_modules/webpack/bin/webpack.js
WEBPACK_DEV_SERVER ?= ./node_modules/webpack-dev-server/bin/webpack-dev-server.js
SVGO = node_modules/svgo/bin/svgo

build-dev:
	$(WEBPACK) --progress -d

build-prod:
	$(WEBPACK) --progress -p

dev-server:
	env DEBUG=true $(WEBPACK_DEV_SERVER) --hot --inline --display-error-details

clean:
	rm -rf dist

serve: clean build-dev dev-server


fontcustom:
	$(SVGO) -f elements/assets/fonts/icons
	fontcustom compile --preprocessor_path=/elements/assets/fonts
