/**
 * data-1.0.js
 *
 * Setup:
 * var BlogPostsModel = new DataModel('posts', '/blog/');
 *
 * Load: (The following code will load an array with the 3 last post of a blog site)
 * BlogPostsModel.load({count: 3}, function(records) {});
 *
 * Create: (The following code will create a new blog post)
 * BlogPostsModel.create([['Title', 'My Title'],['Body', '<p>My Content</p>']], function(xData, Status) {});
 *
 * Remove: (The following code will delete a specific blog post)
 * BlogPostsModel.remove(1 , function(xData, Status) {});
 */

function DataModel(list, path) {
    this.list = list;
    this.path = path;
}

DataModel.prototype.load = function(options, f) {
    var opt = (options !== null) ? options : {};
    var fields = '<ViewFields Properties="True"/>';
    var query = (opt.query !== null) ? opt.query : '<Query><OrderBy><FieldRef Name="ID" Ascending="False" /></OrderBy></Query>';
    var max = (opt.count !== null) ? opt.count : 999;
    var callBack = (f !== undefined) ? f : null;
    var list = this.list;
    var path = this.path;

    $().SPServices({
        operation: "GetListItems",
        webURL: path,
        listName: list,
        async: true,
        CAMLQuery: query,
        CAMLViewFields: fields,
        CAMLRowLimit: max,
        completefunc: function(xData, Status) {
            var records = $(xData.responseXML).SPFilterNode("z:row").SPXmlToJson({
                removeOws: true,
                includeAllAttrs: true
            });

            if (callBack !== null)
                callBack(records);
        }
    });
};

DataModel.prototype.create = function(values, f) {
    var callBack = (f !== undefined) ? f : null;
    var valuePairs = (values !== undefined) ? values : [];
    var list = this.list;
    var path = this.path;

    if (valuePairs.length > 0) {
        $().SPServices({
            operation: "UpdateListItems",
            webURL: path,
            listName: list,
            batchCmd: 'New',
            valuepairs: values,
            completefunc: function(xData, Status) {
                if (callBack !== null)
                    callBack(xData, Status);
            }
        });
    }
};

DataModel.prototype.remove = function(cID, f) {
    var callBack = (f !== undefined) ? f : null;
    var list = this.list;
    var path = this.path;

    if (cID !== null) {
        $().SPServices({
            operation: "UpdateListItems",
            webURL: path,
            listName: list,
            batchCmd: 'Delete',
            ID: cID,
            completefunc: function(xData, Status) {
                if (callBack !== null)
                    callBack(xData);
            }
        });
    }
};