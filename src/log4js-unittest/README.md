# Checking log4js output in your node.js testsuite

This directory contains code samples that go with the following blog post:

http://joost.vunderink.net/blog/2015/09/27/checking-log4js-output-in-your-node-js-testsuite/

# Preparation

    npm install

# Running

`foo.spec.2.js` should fail. The other spec files should succeed. See the source or the blog post for an explanation why that is.

You need mocha to run the spec scripts. If it's installed globally:

    mocha foo.spec.1.js
    mocha foo.spec.2.js
    mocha foo.spec.3.js

If not:

    ../../node_modules/mocha/bin/mocha foo.spec.1.js
    ../../node_modules/mocha/bin/mocha foo.spec.2.js
    ../../node_modules/mocha/bin/mocha foo.spec.3.js
