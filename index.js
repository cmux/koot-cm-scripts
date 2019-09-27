#!/usr/bin/env node

switch (process.argv0) {
    case 'build': {
        require('./bin/build');
        break;
    }
    case 'dev': {
        require('./bin/dev');
        break;
    }
    case 'publish': {
        require('./bin/publish');
        break;
    }
    default: {
    }
}
