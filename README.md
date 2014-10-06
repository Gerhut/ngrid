ngrid
=====

ngrid is a simple grid widget of angular and resource

Usage
-----

```html
<ngrid src="http://localhost:3000/v1/person">
  <column field="id">Id</column>
  <column field="name">Name</column>
  <column field="age">Age</column>
</ngrid>
```

renders

```html
<table>
  <thead>
    <tr><th>Id</th><th>Name</th><th>Age</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>John</td><td>13</td></tr>
    <tr><td>2</td><td>Anne</td><td>16</td></tr>
  </tbody>
</table>
```