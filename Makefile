REPORTER = spec
NODEARGS = --harmony-generators

test: clean
	@./node_modules/.bin/jshint ./app/**/*.js --config .jshintrc &2> /dev/null
	@if [ ! -n "$(NODE_ENV)" ]; then \
		NODE_ENV=test NODE_PATH=app/lib nodemon --exec "./node_modules/.bin/mocha -R $(REPORTER) -t 15000 --recursive" test $(NODEARGS); \
	else  \
		NODE_PATH=app/lib mocha -R $(REPORTER) -t 15000 --recursive test $(NODEARGS); \
	fi

start:
	@if [ ! -n "$(NODE_ENV)" ]; then \
		NODE_ENV=development NODE_PATH=app/lib nodemon server.js $(NODEARGS) ; \
	else \
		NODE_PATH=lib foreman start; \
	fi

test-cov: app-cov
	@BILGOW_COV=1 NODE_ENV=test NODE_PATH=app-cov/lib:. $(MAKE) test REPORTER=html-cov > coverage.html

app-cov:
	@jscover app app-cov

clean:
	@if [ ! -n "$(NODE_ENV)" ]; then \
		rm -f coverage.html; \
		rm -fr app-cov; \
		curl -XDELETE http://localhost:9200; \
		mongo bilgow_test --eval "db.dropDatabase()"; \
		node repl/clean-neo4j.js ; \
	fi;

repl:
	@NODE_ENV=development NODE_PATH=lib node --debug $(NODEARGS)

webtest:
	@NODE_ENV=test NODE_PATH=app/lib web-mocha test	$(NODEARGS)

.PHONY: jshint test repl webtest clean
