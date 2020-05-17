// https://observablehq.com/@mbostock/geodesic-rainbow@217
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function (md) {
    return md`
# Geodesic Rainbow`;
  });
  main
    .variable(observer("subdivision"))
    .define("subdivision", 1);
  main
    .variable(observer("canvas"))
    .define(
      "canvas",
      [
        "DOM",
        "width",
        "height",
        "geodesic",
        "subdivision",
        "mutable projection",
        "d3",
      ],
      function* (DOM, width, height, geodesic, subdivision, $0, d3) {
        const context = DOM.context2d(width, height);
        const faces = geodesic(subdivision);

        function drawTriangle([p0, p1, p2]) {
          context.moveTo(p0[0] - 200, p0[1]);
          context.lineTo(p1[0] - 200, p1[1]);
          context.lineTo(p2[0] - 200, p2[1]);
          context.closePath();
        }

        while (true) {
          $0.value = $0.value.rotate([Date.now() / 200, -40]);

          const triangles = faces
            .map((d, i) => ((d = d.map($0.value)), (d.index = i), d))
            .filter((d) => d3.polygonArea(d) < 0);

          context.clearRect(0, 0, width, height);
          for (const t of triangles) {
              
            context.beginPath();
            drawTriangle(t);
            context.fillStyle = d3.interpolateHslLong("black", "black")(faces[t.index][0][0] / 100);
            context.strokeStyle = d3.interpolateHslLong("#70deda", "#70deda")(faces[t.index][0][0] / 100);
            context.fill();
          }

          context.beginPath();
          for (const t of triangles) {
            drawTriangle(t);
          }
          context.stroke();

          yield context.canvas;
        }
      }
    );
  main.define(
    "initial projection",
    ["d3", "width", "height", "sphere"],
    function (d3, width, height, sphere) {
      return d3
        .geoOrthographic()
        .rotate([0, -40])
        .translate([width / 5, height / 6])
        .fitExtent(
          [
            [2, 2],
            [width - 2, height - 2],
          ],
          sphere
        );
    }
  );
  main
    .variable(observer("mutable projection"))
    .define(
      "mutable projection",
      ["Mutable", "initial projection"],
      (M, _) => new M(_)
    );
  main
    .variable(observer("projection"))
    .define("projection", ["mutable projection"], (_) => _.generator);
  main
    .variable(observer("height"))
    .define("height", ["width"], function (width) {
      return Math.min(width, 420);
    });
  main.variable(observer("sphere")).define("sphere", function () {
    return { type: "Sphere" };
  });
  main.variable(observer("geodesic")).define("geodesic", function () {
    const φ = 1.618033988749895;
    const ρ = 180 / Math.PI;

    const vertices = [
      [1, φ, 0],
      [-1, φ, 0],
      [1, -φ, 0],
      [-1, -φ, 0],
      [0, 1, φ],
      [0, -1, φ],
      [0, 1, -φ],
      [0, -1, -φ],
      [φ, 0, 1],
      [-φ, 0, 1],
      [φ, 0, -1],
      [-φ, 0, -1],
    ];

    const faces = [
      [0, 1, 4],
      [1, 9, 4],
      [4, 9, 5],
      [5, 9, 3],
      [2, 3, 7],
      [3, 2, 5],
      [7, 10, 2],
      [0, 8, 10],
      [0, 4, 8],
      [8, 2, 10],
      [8, 4, 5],
      [8, 5, 2],
      [1, 0, 6],
      [11, 1, 6],
      [3, 9, 11],
      [6, 10, 7],
      [3, 11, 7],
      [11, 6, 7],
      [6, 0, 10],
      [9, 1, 11],
    ].map((face) => face.map((i) => vertices[i]));

    function interpolate([x0, y0, z0], [x1, y1, z1], t) {
      return [x0 + t * (x1 - x0), y0 + t * (y1 - y0), z0 + t * (z1 - z0)];
    }

    function project([x, y, z]) {
      return [
        Math.atan2(y, x) * ρ,
        Math.acos(z / Math.sqrt(x * x + y * y + z * z)) * ρ - 90,
      ];
    }

    return function (n) {
      n = n | 0;
      const subfaces = [];
      for (const [f0, f1, f2] of faces) {
        let f10,
          f20 = interpolate(f0, f1, 1 / n);
        let f11,
          f21 = interpolate(f0, f2, 1 / n);
        subfaces.push([f0, f20, f21]);
        for (let i = 1; i < n; ++i) {
          (f10 = f20), (f20 = interpolate(f0, f1, (i + 1) / n));
          (f11 = f21), (f21 = interpolate(f0, f2, (i + 1) / n));
          for (let j = 0; j <= i; ++j) {
            subfaces.push([
              interpolate(f10, f11, j / i),
              interpolate(f20, f21, j / (i + 1)),
              interpolate(f20, f21, (j + 1) / (i + 1)),
            ]);
          }
          for (let j = 0; j < i; ++j) {
            subfaces.push([
              interpolate(f10, f11, j / i),
              interpolate(f20, f21, (j + 1) / (i + 1)),
              interpolate(f10, f11, (j + 1) / i),
            ]);
          }
        }
      }
      return subfaces.map((f) => f.map(project));
    };
  });
  main.variable(observer("d3")).define("d3", ["require"], function (require) {
    return require("d3@5");
  });
  return main;
}
