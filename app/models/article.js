/**
 * Module dependencies.
 */
var lazyboy = require('LazyBoy'),    
    config = require('../../config/config');


/**
 * Article Schema
 */
var ArticleSchema = {
    created: {
        type: Date        
    },
    title: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    }
    
};

// ArticleSchema.path('title').validate(function(title) {
//     return title.length;
// }, 'Title cannot be blank');

 
// ArticleSchema.statics = {
//     load: function(id, cb) {
//         this.findOne({
//             _id: id
//         }).populate('user').exec(cb);
//     }
// };

lazyboy.define('Article', ArticleSchema);