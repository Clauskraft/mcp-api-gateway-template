.PHONY: setup install build dev start test clean

setup:
	npm install && npm run setup

install:
	npm install

build:
	npm run build

dev:
	npm run dev

start:
	npm start

test:
	npm test

clean:
	rm -rf dist node_modules

.DEFAULT_GOAL := help
help:
	@echo "MCP API Gateway"
	@echo "make setup       - Full setup"
	@echo "make build       - Build TypeScript"
	@echo "make dev         - Dev mode"
	@echo "make start       - Run server"
