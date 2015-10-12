# Combining mongoose and Q in node.js

This directory contains code samples that go with the following blog post:

http://joost.vunderink.net/blog/2015/09/18/combining-mongoose-and-q-in-node-js/

# Preparation

First make sure that mongodb is running. Then:

    npm install
    cp ../src/config/local.example.js ../src/config/local.js
    $EDITOR ../src/config/local.js

Put the right mongo db uri in the config file.

Then initialise the data needed for these scripts:

    node init-database.js

# Running

You can now run the test scripts:

    node vehicles-mongoose-callbacks.js
    node vehicles-mongoose-q1.js
    node vehicles-mongoose-q2.js
    node vehicles-mongoose-q3.js
    node vehicles-mongoose-q4.js
