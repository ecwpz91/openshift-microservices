// Created by: Jason Dudash
// https://github.com/dudash
//
// (C) 2019
// Released under the terms of Apache-2.0 License

const ITEMS_COLLECTION = 'items'

module.exports.getitems = function getitems (req, res, next) {
    var result = req.db.get(ITEMS_COLLECTION).find({'owner':req.swagger.params.userId.value})
    .then((docs) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(docs || {}, null, 2));
    }).catch((err) => {
        req.debugdb('GET ITEMS failed')
        req.debugdb(err)
        res.sendStatus(500)
    })
};

module.exports.createitem = function createitem (req, res, next) {
    var newItem = req.body
    // TODO: manual validation of the req object should go here (or let swagger handle it)
    req.db.get(ITEMS_COLLECTION).insert(newItem)
    .then((docs) => {
        // docs contains the documents inserted with added **_id** fields
        req.debugdb('INSERTED a new item')
        req.debugdb(docs)
        res.sendStatus(201)
    }).catch((err) => {
        req.debugdb('INSERT failed for a new item')
        req.debugdb(err)
        res.sendStatus(500)
    })
};

module.exports.getitem = function getitem (req, res, next) {
    var result = req.db.get(ITEMS_COLLECTION).findOne({'id':req.swagger.params.itemId.value})
    .then((docs) => {
        if (docs == null) {res.sendStatus(404)}
        else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(docs || {}, null, 2));
        }
    }).catch((err) => {
        req.debugdb('GET ITEM failed')
        req.debugdb(err)
        res.sendStatus(500)
    })
};

// TODO:
// module.exports.updateitem = function updateitem (req, res, next) {
//     var result = '[{TODO:updateitem}]'
//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify(result || {}, null, 2));
// };

// TODO:
// module.exports.deleteitem = function deleteitem (req, res, next) {
//     var result = '[{blah:deleteitem}]'
//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify(result || {}, null, 2));
// };