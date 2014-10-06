void function (angular) {

  angular.module('me.gerhut.ngrid', ['ngResource'])
    .directive('ngrid', nGrid)
    .directive('ncolumn', nColumn)

  nGrid.$inject = ['$resource']
  function nGrid($resource) {
    var nGrid = {
      restrict: 'E',
      priority: 11,
      scope: true
    }

    nGrid.controller = function ($scope, $element, $attrs) {
      var renderers = []
      this.addRenderer = function (renderer) {
        renderers.push(renderer)
      }

      var tbody = $element.find('tbody')

      var resourceFactory = $resource($attrs.src)
      resourceFactory.query(function (resources) {
        tbody.empty()
        angular.forEach(resources, function (resource) {
          var tr = angular.element('<tr>')
          angular.forEach(renderers, function (renderer) {
            tr.append(angular.element('<td>').append(renderer.call(resource)))
          })
          tbody.append(tr)
        })
      })
    }

    nGrid.compile = function (tElement, tAttrs) {
      var tableElement = angular.element('<table><thead><tr></tr></thead><tbody></tbody></table>')
      tableElement.find('tr').append(tElement.children())
      tElement.replaceWith(tableElement)
    }

    return nGrid
  }

  function nColumn() {
    var nColumn = {
      restrict: 'E',
      priority: 10,
      require: '^ngrid'
    }

    nColumn.controller = function ($scope, $element, $attrs) {
      $element.controller('ngrid').addRenderer(function () {
        return this[$attrs.field].toString()
      })
    }

    nColumn.link = function (scope, iElement) {
      iElement.parent().append(angular.element('<th>').text(iElement.text()))
      iElement.remove()
    }

    return nColumn
  }

} (angular)