db.arr.drop()
db.arr.insertMany([
  {_id: 1,
  location: {
    city: 'berlin',
    country: 'germany'
  },
  temp: [20,16,11,17]
  }, 
  {_id: 2,
    location: {
      city: 'paris',
      country: 'france'
    },
    temp: [20,18,13,17],
    highlight: true
    },
]);

// search against one field

db.arr.find({
  "location.city": { $regex: "/^berlin$/i"},
});

db.arr.find({
  highlight: { $exists: 0}
});

db.arr.find({
  highlight: { $type: 'bool'}
});

// check that at least one of the lements is equal
db.arr.find({
  temp: 12
});
// check all elements containing the element

db.arr.find(
  { temp: { $all: [ 20] } }
)

db.arr.find({
  temp: { $elemMatch: {$gt:15} }
})

// check size

db.arr.find({
  temp: { $size:4 }
})

// match
db.arr.find({temp: {$gt: 15}
}, { 'temp.$': 1})

db.arr.find({temp: {$gt: 15}
}, { temp: { $elemMatch: { $gt: 10}}})

db.arr.findOne({temp: {$gt: 15}
}, { 'temp.$': 1})

//slice
db.arr.find({
}, { temp: { $slice: -2}})

db.arr.find({
}, { temp: { $slice: 2}})

db.arr.find({
}, { temp: { $slice: [0,3 ]}})

// find exact field in array

db.arr.find({ "temp.0": { $gt: 15}}, { temp: {$slice: 1}})

// query to find the restaurants who achieved a scrore more than 90.

db.rest.findOne({
  "grades.score" : { $gt: 90}}
)

// find restaurant that achieved score between more than 80 but less than 100

db.rest.find({
  "grades.score" : { $gt: 90, $lt: 100}}
)

// 
db.rest.findOne({
  "grades.score" : { $gt: 90, $lt: 100}}
)


// find the restaurants which locate in latitude 
//value less than -95.754168

db.rest.find({}
, { "address.coord":  { $lt: -95.754168}})