const express = require('express');
const router = express.Router();
const geoCluster = require('geocluster');
const population = [];
let io;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const disperse = (bucket) => {
  bucket = bucket.sort((rr, vv) => rr.length < vv.length);
  return bucket[0].map((_, colIndex) => bucket.map((row) => row[colIndex])
      .filter(Boolean));
};

/**
 * cluster geo-points
 * bucket is an array of arrays
 * disperse clusters in a way elements of new clusters would be far from each others:
 * by shuffling and disposing
 * @param {*} population
 * @return {*}
 */
function clusterGeoPoints(population) {
  const coordinates = population.map((p) => p._);
  const bias = 1.5; // multiply stdev with this factor, the smaller the more clusters
  const clusters = geoCluster(coordinates, bias);
  const bucket = clusters.map((cluster) => cluster.elements.map((arr) =>
    shuffleArray(arr)));
  return disperse(bucket);
}

router.get('/game', async function(req, res, next) {
  // Just first
  if (!io) {
    io = req.app.get('socketio');
    io.on('connection', (socket) => {
      console.log('client id - '+ socket.id);
      for (let i = 0; i < population.length; i++) {
        socket.emit('marker', population[i]);
      }
      socket.on('marker', (data) => {
        const m = {id: socket.id, _: data};
        population.push(m);
        const newClusters = clusterGeoPoints(population);
        io.emit('marker', {newMarker: m, newClusters: newClusters});
      });
    });
  }

  const response = {
    title: 'Game',
    intro: 'This is just a game',
    user: req.session.user,
    success: 'Hello there :)',
    section: 'Game',
  };
  res.render('game', response);
});


module.exports = router;
