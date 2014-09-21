﻿(function() {
  var app;

  app = angular.module('classyMixinsTest', ['classy', 'classy-mixins']);

  app.classy.controller({
    name: 'FlyMixin',
    inject: ['$scope'],
    init: function() {
      if (!this.$.logs) {
        this.$.logs = [];
      }
      this.$.logs.push('can fly');
    },
    fly: function() {
      this.$.logs.push('fly');
    }
  });

  app.classy.controller({
    name: 'CatMixin',
    inject: ['$scope'],
    init: function() {
      if (!this.$.logs) {
        this.$.logs = [];
      }
      this.$.logs.push('can talk');
    },
    talk: function() {
      this.$.logs.push('meow');
    }
  });

  app.classy.controller({
    name: 'Animal',
    mixins: ['FlyMixin', 'CatMixin'],
    inject: ['$scope'],
    init: function() {
      this.$.fly();
      this.$.talk();
    }
  });

  describe('Classy mixins (classy-mixins.coffee)', function() {
    var animalController, scope;
    beforeEach(module('classyMixinsTest'));
    animalController = null;
    scope = null;
    beforeEach(function() {
      inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        animalController = $controller('Animal', {
          $scope: scope
        });
      });
    });
    it('should be able to call mixin functions', function() {
      expect(scope.logs).toEqual(['can fly', 'can talk', 'fly', 'meow']);
    });
  });

}).call(this);
