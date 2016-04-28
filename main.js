'use strict';

var app = angular.module('pokeApp', ['ui.bootstrap'])

.service('Pokemon', function($http) {

  this.getAll = function() {
    return $http({
      url: 'http://pokeapi.co/api/v2/pokedex/1/',
      method: 'GET'
    })
    .catch(function(err) {
      console.error(err);
    });
  };

  this.getOne = function(id) {
    return $http.get(`http://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(function(res) {
        console.log('res:', res);
      })
  };

})

.controller('pokeModalCtrl', function($scope, $uibModalInstance, Pokemon, selectedPokemon) {
  console.log('pokeModalCtrl!', selectedPokemon);

  Pokemon.getOne(selectedPokemon.entry_number);

  $scope.pokemon = selectedPokemon;

  $scope.ok = function() {
    $uibModalInstance.close();
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss();
  };
})

.controller('mainCtrl', function($scope, Pokemon, $uibModal) {

  Pokemon.getAll()
  .then(function(res) {
    $scope.pokeList = res.data.pokemon_entries;
  });

  $scope.selectPokemon = function(pokemon) {
    var modalInstance = $uibModal.open({
      controller: 'pokeModalCtrl',
      templateUrl: 'pokeModal.html',
      resolve: {
        selectedPokemon: pokemon
      }
    });

    modalInstance.result
    .then(function() {
      console.log('success!');
    })
    .catch(function() {
      console.log('failure!');
    })
  };
})

