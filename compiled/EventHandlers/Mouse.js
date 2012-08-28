// Generated by CoffeeScript 1.3.3
(function() {
  var Mouse,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Mouse = (function() {

    function Mouse(renderer) {
      this.onMouseUp = __bind(this.onMouseUp, this);

      this.onMouseDown = __bind(this.onMouseDown, this);

      this.onMouseMove = __bind(this.onMouseMove, this);
      this.mouse = new THREE.Vector2();
      this.offset = new THREE.Vector3();
      this.SELECTED = null;
      this.INTERSECTED = null;
      this.projector = new THREE.Projector();
      this.plane = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000, 8, 8), new THREE.MeshBasicMaterial({
        color: 0x000000
      }));
      this.plane.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 2));
      this.plane.visible = false;
      renderer.scene.add(this.plane);
      this.renderer = renderer.renderer;
      this.camera = renderer.camera;
      this.controls = renderer.controls;
      this.objects = renderer.objects;
    }

    Mouse.prototype.onMouseMove = function(event) {
      var intersects, obj, objects, ray, vector;
      event.preventDefault();
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
      this.projector.unprojectVector(vector, this.camera);
      ray = new THREE.Ray(this.camera.position, vector.subSelf(this.camera.position).normalize());
      if (this.SELECTED) {
        intersects = ray.intersectObject(this.plane);
        this.SELECTED.position.copy(intersects[0].point.subSelf(this.offset));
        return;
      }
      objects = (function() {
        var _i, _len, _ref, _results;
        _ref = this.objects;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          obj = _ref[_i];
          _results.push(obj.getGeometry());
        }
        return _results;
      }).call(this);
      intersects = ray.intersectObjects(objects);
      if (intersects.length > 0) {
        if (this.INTERSECTED !== intersects[0].object) {
          this.INTERSECTED = intersects[0].object;
          this.plane.position.copy(this.INTERSECTED.position);
          this.plane.lookAt(this.camera.position);
        }
        return this.renderer.domElement.style.cursor = 'pointer';
      } else {
        if (this.INTERSECTED) {
          this.INTERSECTED = null;
          return this.renderer.domElement.style.cursor = 'auto';
        }
      }
    };

    Mouse.prototype.onMouseDown = function(event) {
      var intersects, obj, objects, ray, vector;
      event.preventDefault();
      vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
      this.projector.unprojectVector(vector, this.camera);
      ray = new THREE.Ray(this.camera.position, vector.subSelf(this.camera.position).normalize());
      objects = (function() {
        var _i, _len, _ref, _results;
        _ref = this.objects;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          obj = _ref[_i];
          _results.push(obj.getGeometry());
        }
        return _results;
      }).call(this);
      intersects = ray.intersectObjects(objects);
      if (intersects.length > 0) {
        this.controls.enabled = false;
        this.SELECTED = intersects[0].object;
        intersects = ray.intersectObject(this.plane);
        this.offset.copy(intersects[0].point).subSelf(this.plane.position);
        return this.renderer.domElement.style.cursor = 'move';
      }
    };

    Mouse.prototype.onMouseUp = function(event) {
      event.preventDefault();
      this.controls.enabled = true;
      if (this.INTERSECTED) {
        this.plane.position.copy(this.INTERSECTED.position);
        this.SELECTED = null;
      }
      return this.renderer.domElement.style.cursor = 'auto';
    };

    return Mouse;

  })();

  this.Vizz.EventHandler.Mouse = Mouse;

}).call(this);
