'use strict';

/**
 *  test-single controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::test-single.test-single');
