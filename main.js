'use strict';

var app = angular.module('pokeApp', ['ui.bootstrap'])
.controller('mainCtrl', function($scope, $http, $uibModal) {

  $http({
    url: 'http://pokeapi.co/api/v2/pokedex/1/',
    method: 'GET'
  })
  .then(function(res) {
    $scope.pokeList = res.data.pokemon_entries;
  })
  .catch(function(err) {
    console.error(err);
  });

  $scope.selectPokemon = function(pokemon) {
    var modalInstance = $uibModal.open({
      controller: 'pokeModalCtrl',
      templateUrl: 'pokeModal.html',
      resolve: {
        pokemon: pokemon
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

.controller('pokeModalCtrl', function($scope, $uibModalInstance, pokemon) {
  console.log('pokeModalCtrl!', pokemon);

  $scope.pokemon = pokemon;

  $scope.ok = function() {
    $uibModalInstance.close();
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss();
  };
});
