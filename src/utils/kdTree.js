function Node(location, axis, subnodes, compareX) {
  this.location = location
  this.axis = axis
  this.subnodes = subnodes
  this.compareX = compareX
}

Node.prototype.find = function(target) {
  let guess = this
  let bestDist = Infinity

  search(this)

  return {
    node: guess,
    distance: bestDist
  }

  function distance(p1, p2, compareX) {
    return compareX
      ? Math.sqrt(Math.pow(p1[0] - p2[0], 2))
      : Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2))
  }

  function search(node) {
    if (!node) {
      return
    }

    // If the current location is better than the best known location,
    // update the best known location
    let nodeDist = distance(node.location, target, node.compareX)

    if (nodeDist < bestDist) {
      bestDist = nodeDist
      guess = node
    }

    // Recursively search the half of the tree that contains the target
    let side = target[node.axis] < node.location[node.axis] ? "left" : "right"
    let otherNode

    if (side == "left") {
      search(node.subnodes[0])
      otherNode = node.subnodes[1]
    } else {
      search(node.subnodes[1])
      otherNode = node.subnodes[0]
    }

    // If the candidate hypersphere crosses this splitting plane, look on the
    // other side of the plane by examining the other subtree
    if (otherNode) {
      let i = node.axis
      let delta = Math.abs(node.location[i] - target[i])
      if (delta < bestDist) {
        search(otherNode)
      }
    }
  }
}

function KDTree(data, compareX) {
  // Build kd-tree
  function treeify(points, depth, dimensions) {
    if (!points[0]) {
      return
    }

    // Select axis based on depth so that axis cycles through all valid values
    let axis = depth % dimensions

    // Sort point list and choose median as pivot element
    points.sort((a, b) => a[axis] - b[axis])
    let median = Math.floor(points.length / 2)

    // Create node and construct subtrees
    let point = points[median]
    let left = points.slice(0, median)
    let right = points.slice(median + 1)

    return new Node(
      point,
      axis,
      [treeify(left, depth + 1, dimensions), treeify(right, depth + 1, dimensions)],
      compareX
    )
  }

  let points = data.map(d => [d.x, d.y])
  let dimensions = compareX ? 1 : 2
  return treeify(points, 0, dimensions)
}

export default KDTree
