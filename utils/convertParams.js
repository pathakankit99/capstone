const _ = require('lodash');
const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;
export default function convertParams(model, params){
    const finalQuery = {};
    const keys = _.keys(model.schema.obj);
    const query = _.keys(_.pickBy(params, _.identity));
    const final = _.intersectionWith(query, keys);
    const options = ["_ne", "_lt", "_gt", "_lte", "_gte"];
    finalQuery.find = {};
    finalQuery.where = {};
    finalQuery.sort = { created_at: -1 };
    finalQuery.start = 0;
    finalQuery.limit = 1000;

    _.map(query, (q) => {
        _.map(options, (option) => {
            if (_.includes(q, option)) {
                var newQuery = {};
                newQuery[option.replace("_", "$")] = params[q];
                finalQuery.where[q.replace(option, "")] = newQuery;
            } else if (_.includes(q, "_sort")) {
                var actualQuery = params[q].split(":");
                finalQuery.sort = {};
                finalQuery.sort[actualQuery[0]] = Number(actualQuery[1]);
            } else if (_.includes(q, "_start")) {
                finalQuery.start = (parseInt(params[q]) - 1) * parseInt(params._limit);
            } else if (_.includes(q, "_limit")) {
                finalQuery.limit = parseInt(params[q]);
            }
        });
    });
    _.map(final, (f) => {
        if (f === "name") {
            finalQuery.where[f] = { $regex: `^${params[f]}`, $options: "i" };
        } else {
            // console.log(model.schema.obj[f], "LOG");

            if (
                (model.schema.obj[f].valueType &&
                    model.schema.obj[f].valueType === "ObjectId") ||
                (Array.isArray(model.schema.obj[f]) &&
                    model.schema.obj[f][0].valueType &&
                    model.schema.obj[f][0].valueType === "ObjectId")
            ) {
                // console.log(finalQuery.where[f] + " is " + params[f]);
                finalQuery.where[f] = ObjectId(params[f]);
            } else {
                finalQuery.where[f] = params[f];
            }
        }
    });
    // console.log(finalQuery, "5");
    _.map(query, (f) => {
        if (f === "language") {
            params[f] = params[f].slice(1);
            var newLanguages = params[f].replace(/,/g, "");
            var languages = newLanguages.split("|");
            finalQuery.where["language"] = {
                $in: languages,
            };
        }
    });
    // console.log(finalQuery, "6");
    if (params.keyword) {
        if (f === 'category') {
            params[f] = params[f]
            console.log(params[f],'params')
        //   var newLanguages = params[f].replace(/,/g, '')
        //   var languages = newLanguages.split('|')
          finalQuery.where['category'] = {
            $in: languages,
          }
        }
        
    }
    return finalQuery;
}