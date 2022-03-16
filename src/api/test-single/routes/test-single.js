'use strict';

/**
 * test-single router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::test-single.test-single');
