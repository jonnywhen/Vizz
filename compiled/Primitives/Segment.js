// Generated by CoffeeScript 1.3.3
(function() {
  var Geometry, Segment,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Geometry = this.Vizz.Primitive.Geometry;

  Segment = (function(_super) {

    __extends(Segment, _super);

    function Segment(begin, end) {
      this.p = begin;
      this.dir = end.sub(begin);
      this.len = this.dir.magnitude();
      this.pos = this.p.add(this.dir.mul(0.5));
    }

    Segment.prototype.dotted = function(radius, offset, color) {
      var i, p, pos, step, _i, _results;
      this.geometry = new THREE.Object3D();
      step = this.len / offset;
      _results = [];
      for (i = _i = 0; 0 <= step ? _i < step : _i > step; i = 0 <= step ? ++_i : --_i) {
        pos = this.p.add(this.dir.mul(i * offset / this.len));
        p = new THREE.Mesh(new THREE.SphereGeometry(radius, 30, 30), new THREE.MeshLambertMaterial({
          color: color
        }));
        p.position.set(pos.x, pos.y, pos.z);
        _results.push(this.geometry.add(p));
      }
      return _results;
    };

    Segment.prototype.solid = function(radius, color) {
      this.geometry = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, this.len, 50, 50, true), new THREE.MeshLambertMaterial({
        color: color
      }));
      this.setOrientation(this.dir);
      return this.setPosition(this.pos);
    };

    return Segment;

  })(Geometry);

  this.Vizz.Primitive.Segment = Segment;

}).call(this);