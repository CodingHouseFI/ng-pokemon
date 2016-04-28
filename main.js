'use strict';

angular.module('pokeApp', [])
.controller('mainCtrl', function($scope, $http) {

  $http({
    url: 'http://pokeapi.co/api/v2/pokedex/1/',
    method: 'GET'
  })
  .then(function(res) {
    $scope.pokeList = res.data.pokemon_entries;
  })
  .catch(function(err) {
    console.error(err);
  })


})
