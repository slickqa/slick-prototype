'use strict';

/**
 * User: jcorbett
 * Date: 6/3/13
 * Time: 8:40 AM
 */

var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    defaultRelease: String,
    releases: [{
        name: String,
        target: Date,
        defaultBuild: String,
        builds: [{
            name: String,
            built: Date
        }]
    }],
    automationTools: [String],
    components: [{
        name: String,
        code: String
    }]
});

exports.Project = mongoose.model('projects', projectSchema);
