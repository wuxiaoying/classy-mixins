# Test Data

app = angular.module 'classyMixinsTest', [
    'classy'
    'classy-mixins'
]
 
app.classy.controller
    name: 'FlyMixin'
   
    inject: ['$scope']
    
    init: ->
        @$.logs = [] if not @$.logs
        @$.logs.push 'can fly'
        return
        
    fly: ->
        @$.logs.push 'fly'
        return
 
app.classy.controller
    name: 'CatMixin'
    
    inject: ['$scope']
    
    init: ->
        @$.logs = [] if not @$.logs
        @$.logs.push 'can talk'
        return
        
    talk: ->
        @$.logs.push 'meow'
        return
        
app.classy.controller
    name: 'Animal'
    mixins: ['FlyMixin', 'CatMixin']
    inject: ['$scope']
    
    init: ->
        @$.fly()
        @$.talk()
        return
    
# Tests

describe 'Classy mixins (classy-mixins.coffee)', ->
    beforeEach module 'classyMixinsTest'
    
    animalController = null
    scope = null
    
    beforeEach ->
        inject ($controller, $rootScope) ->
            scope = $rootScope.$new()
            animalController = $controller 'Animal', 
                $scope: scope
            return
        return
    
    it 'should be able to call mixin functions', ->
        expect(scope.logs).toEqual ['can fly', 'can talk', 'fly', 'meow']
        return
    return
    