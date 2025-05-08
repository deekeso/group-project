import { select, pie as _pie, arc as _arc, interpolate } from 'd3'

const items = [1, 2, 3, 4, 5, 6]

//=============== Cubic Bezier calculation
var NEWTON_ITERATIONS = 4
var NEWTON_MIN_SLOPE = 0.001
var SUBDIVISION_PRECISION = 0.0000001
var SUBDIVISION_MAX_ITERATIONS = 10

var kSplineTableSize = 11
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0)

var float32ArraySupported = typeof Float32Array === 'function'

function A(aA1, aA2) {
  return 1.0 - 3.0 * aA2 + 3.0 * aA1
}

function B(aA1, aA2) {
  return 3.0 * aA2 - 6.0 * aA1
}

function C(aA1) {
  return 3.0 * aA1
}

function calcBezier(aT, aA1, aA2) {
  return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT
}

function getSlope(aT, aA1, aA2) {
  return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1)
}

function binarySubdivide(aX, aA, aB, mX1, mX2) {
  var currentX,
    currentT,
    i = 0
  do {
    currentT = aA + (aB - aA) / 2.0
    currentX = calcBezier(currentT, mX1, mX2) - aX
    if (currentX > 0.0) {
      aB = currentT
    } else {
      aA = currentT
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS)
  return currentT
}

function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
  for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
    var currentSlope = getSlope(aGuessT, mX1, mX2)
    if (currentSlope === 0.0) {
      return aGuessT
    }
    var currentX = calcBezier(aGuessT, mX1, mX2) - aX
    aGuessT -= currentX / currentSlope
  }
  return aGuessT
}

function LinearEasing(x) {
  return x
}

function getTForX(aX, mX1, mX2) {
  var intervalStart = 0.0
  var currentSample = 1
  var lastSample = kSplineTableSize - 1

  // Declare sampleValues here
  var sampleValues = float32ArraySupported
    ? new Float32Array(kSplineTableSize)
    : new Array(kSplineTableSize)
  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2)
  }

  for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
    intervalStart += kSampleStepSize
  }
  --currentSample

  var dist =
    (aX - sampleValues[currentSample]) /
    (sampleValues[currentSample + 1] - sampleValues[currentSample])
  var guessForT = intervalStart + dist * kSampleStepSize

  var initialSlope = getSlope(guessForT, mX1, mX2)
  if (initialSlope >= NEWTON_MIN_SLOPE) {
    return newtonRaphsonIterate(aX, guessForT, mX1, mX2)
  } else if (initialSlope === 0.0) {
    return guessForT
  } else {
    return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2)
  }
}

function BezierEasing(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2) {
    return LinearEasing
  }

  var sampleValues = float32ArraySupported
    ? new Float32Array(kSplineTableSize)
    : new Array(kSplineTableSize)
  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2)
  }

  return function (x) {
    if (x === 0 || x === 1) {
      return x
    }
    return calcBezier(getTForX(x, mX1, mX2), mY1, mY2)
  }
}

let padding = { top: 20, right: 60, bottom: 20, left: 60 }
let w = 600 - padding.left - padding.right
let h = 600 - padding.top - padding.bottom
let r = Math.min(w, h) / 2
let rotation = 0
let oldrotation = 0
let picked = 100000
let oldpick = []

let spinDuration = 10
let minSpinCount = 10

let duration = 1000 * spinDuration
let minimumSpins = minSpinCount

let noConsecutivePick = false
let longEntryAdjustment = 'wrap'
let alignmentMargin = 0
let maxTextWidth = 20
let itemTextJustify = 'middle'

let svg = select('#chart')
  .append('svg')
  .datum(items)
  .style('transform', 'rotate(-90deg)')
  .attr('width', w + padding.left + padding.right)
  .attr('height', h + padding.top + padding.bottom)

let container = svg
  .append('g')
  .attr('class', 'chartholder')
  .attr('transform', `translate(${w / 2 + padding.left},${h / 2 + padding.top})`)

container
  .insert('circle')
  .attr('cx', 0)
  .attr('cy', 0)
  .attr('r', r + 21)
  .attr('fill', 'black')
  .attr('stroke', 'black')
  .attr('stroke-width', '4px')

container
  .insert('circle')
  .attr('cx', 0)
  .attr('cy', 0)
  .attr('r', r + 2)
  .attr('fill', 'white')
  .attr('stroke', 'white')
  .attr('stroke-width', '4px')

let vis = container.append('g')

let pie = _pie()
  .sort(null)
  .value(() => 1)
let arc = _arc().outerRadius(r).innerRadius(0)

let arcs = vis.selectAll('g.slice').data(pie(items)).enter().append('g').attr('class', 'slice')

arcs
  .append('path')
  .attr('fill', (d, i) => {
    //if (items.length % 2 === 0)
    return i % 2 === 0 ? 'red' : 'yellow'
    //return i % 3 === 0 ? "#cab6fa" : i % 3 === 1 ? "#{primaryColor}" : "#b1a4ec";
  })
  .attr('d', arc)

arcs
  .append('text')
  .attr('transform', (d) => {
    d.innerRadius = 0
    d.outerRadius = r
    d.angle = (d.startAngle + d.endAngle) / 2
    if (itemTextJustify === 'middle') {
      return `rotate(${(d.angle * 180) / Math.PI - 90})translate(${(r + 65) / 2})`
    } else if (itemTextJustify === 'start') {
      return `rotate(${(d.angle * 180) / Math.PI - 90})translate(${65 + alignmentMargin})`
    } else if (itemTextJustify === 'end') {
      return `rotate(${(d.angle * 180) / Math.PI - 90})translate(${r - alignmentMargin})`
    }
  })
  .style('fill', 'blac')
  .attr('class', 'item-text')
  .attr('width', maxTextWidth)
  //.attr("text-anchor", "start") // for when items are aligned from the center
  .attr('text-anchor', itemTextJustify)
  .attr('dy', '0.2em')
  .text((d, i) => items[i])
// .call(ellip)

svg
  .append('g')
  .attr('transform', `translate(${w + padding.left + padding.right},${h / 2 + padding.top})`)
  .append('path')
  .attr('d', `M-${r * 0.15},0L0,${r * 0.05}L0,-${r * 0.05}Z`)
  .style('fill', 'black')

container
  .append('circle')
  .attr('cx', 0)
  .attr('cy', 0)
  .attr('r', 65)
  .attr('fill', 'gray')
  .attr('stroke', 'green')
  .attr('stroke-width', '4px')

container
  .append('circle')
  .attr('cx', 0)
  .attr('cy', 0)
  .attr('r', 36)
  .attr('fill', 'red')
  .attr('stroke', 'yellow')
  .attr('stroke-width', '4px')

function rotTween(to) {
  let i = interpolate(oldrotation % 360, rotation)
  return function (t) {
    return `rotate(${i(t)})`
  }
}
let spin = function () {
  let prevPick = oldpick[0]
  oldpick = []
  //container.on("click", null);

  if (oldpick.length == items.length) {
    console.log('done')
    //container.on("click", null);
    return
  }

  let ps = 360 / items.length

  do {
    var rng = Math.floor(Math.random() * 1440 + 360 * minimumSpins)

    rotation = Math.round(rng / ps) * ps

    picked = Math.round(items.length - (rotation % 360) / ps)
    picked = picked >= items.length ? picked % items.length : picked

    console.log(items[picked])
  } while (picked === prevPick && noConsecutivePick)

  if (oldpick.indexOf(picked) !== -1) {
    select(this).call(spin)
    return
  } else {
    oldpick.push(picked)
  }

  rotation += 90 - Math.round(ps / 2)

  var easing = BezierEasing(0.16, -0.2, 0, 1)
  vis
    .transition()
    .duration(duration)
    // .ease(d3.easeBack.overshoot(1))
    .ease(function (t) {
      return easing(t)
    })
    .attrTween('transform', rotTween)
    .on('end', function () {
      select('.slice:nth-child(' + (picked + 1) + ') path')
      oldrotation = rotation
      //container.on("click", spin);
      var triangle = confetti.shapeFromPath({ path: 'M0 10 L5 0 L10 10z' })
      var duration = 2 * 1000
      var end = Date.now() + duration
      ;(function frame() {
        confetti({
          particleCount: 5,
          shapes: [triangle],
          origin: { x: 0, y: 0 },
          angle: -45,
        })
        confetti({
          particleCount: 5,
          shapes: [triangle],
          origin: { x: 1, y: 0 },
          angle: -135,
        })

        // keep going until we are out of time
        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      })()
    })
}

// function ellipsis(text) {
//   text.each(function () {
//     var text = d3.select(this);
//     var words = text.text().split(/\s+/);

//     var ellipsis = text.text('').append('tspan').attr('class', 'elip').text('...');
//     var width = parseFloat(text.attr('width')) - ellipsis.node().getComputedTextLength();
//     var numWords = words.length;

//     var tspan = text.insert('tspan', ':first-child').text(words.join(' '));

//     // Try the whole line
//     // While it's too long, and we have words left, keep removing words

//     while (tspan.node().getComputedTextLength() > width && words.length) {
//       words.pop();
//       tspan.text(words.join(' '));
//     }

//     if (words.length === numWords) {
//       ellipsis.remove();
//     }
//   });
// }

// function wrap(text) {
//   text.each(function () {
//     var text = d3.select(this),
//       words = text.text().split(/\s+/).reverse(),
//       word,
//       line = [],
//       lineNumber = 0,
//       lineHeight = 1.1, // ems
//       y = text.attr("y"),
//       dy = parseFloat(text.attr("dy")),
//       initialDy = dy, // Store the initial dy value
//       tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em"),
//       wrappedLines = 1; // Variable to track the number of wrapped lines

//     while (word = words.pop()) {
//       line.push(word);
//       tspan.text(line.join(" "));
//       if (tspan.node().getComputedTextLength() > text.attr('width')) {
//         wrappedLines++
//         line.pop();
//         tspan.text(line.join(" "));
//         line = [word];
//         tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", lineHeight + "em").text(word);
//       }
//     }
//     // Adjust the dy attribute to center the text vertically
//     if (wrappedLines > 1) {
//       //text.attr("dy", -0.2 * lineHeight * wrappedLines + "em");
//     }
//   });
// }

// function shrink(text) {
//   text.each(function () {
//     var text = d3.select(this);

//     var width = parseFloat(text.attr('width'));

//     if (text.node().getComputedTextLength() > width) {
//       text.node().setAttribute("textLength", "{maxTextWidth}")
//       text.node().setAttribute("lengthAdjust", "spacingAndGlyphs")
//     }
//   });
// }
