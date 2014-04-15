sharepoint-datamodel
====================

A Sharepoint Services helper model to load, create and delete data from sharepoint lists


### Setup
```javascript
var BlogPostsModel = new DataModel('posts', '/blog/');
```


### Load Items
```javascript
BlogPostsModel.load({count: 3}, function(records) {});
```


### Create New Item
```javascript
BlogPostsModel.create([['Title', 'My Title'],['Body', '<p>My Content</p>']], function(xData, Status) {});
```


### Delete Item
```javascript
BlogPostsModel.remove(1 , function(xData, Status) {});
```
