const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.mainRoot = null
  }

  root() {
    return this.mainRoot
  }

  add(data) {
    let newNode = new Node(data)
    if (this.mainRoot === null) {
      this.mainRoot = newNode
    } else {
      this.insertNode(this.mainRoot, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  has(data) {
    if (this.mainRoot.data === data) {
      return true
    } else if (this.find(data) === null) {
      return false
    } else {
      return true
    }
  }


  find(data) {
    if (this.mainRoot.data === data) {
      return this.mainRoot
    } else if (data < this.min()) {
      return null
    } else if (data > this.max()) {
      return null
    } else {
      return this.findNode(this.mainRoot, data)
    }
  }

  findNode(node, data) {
    if (data === node.data) {
      return node
    } else if (data < node.data) {
      if (node.left && node.left.data === data) {
        return node.left
      } else if (node.left) {
        return this.findNode(node.left, data)
      } else {
        return null
      }
    } else {
      if (node.right && node.right.data === data) {
        return node.right
      } else if (node.right) {
        return this.findNode(node.right, data)
      } else {
        return null
      }
    }
  }


  remove(data) {
    const removeNode = (node, data) => {
      if (!node) {
        return null;
      }

      if (data === node.data) {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          return node.right;
        }

        if (!node.right) {
          return node.left;
        }

        let tempNode = node.right;
        while (tempNode.left) {
          tempNode = tempNode.left;
        }

        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    }

    this.mainRoot = removeNode(this.mainRoot, data);
  }

  min() {
    return this.findMin(this.mainRoot)
  }
  findMin(node) {
    if (node.left === null) {
      return node.data
    } else {
      return this.findMin(node.left)
    }
  }

  max() {
    return this.findMax(this.mainRoot)
  }
  findMax(node) {
    if (node.right === null) {
      return node.data
    } else {
      return this.findMax(node.right)
    }
  }
}


module.exports = {
  BinarySearchTree
};