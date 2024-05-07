/* eslint-disable no-param-reassign */
// tree.js (binary search tree)

import Node from "./node";

export default class Tree {
    constructor(array = null){
        // sort and initialize the array
        this.array = array ? array.sort((a, b) => a - b).filter((value, index, self) => self.indexOf(value) === index) : [];
        this.sortedUniqueArray = this.array.filter((value, index, self) => self.indexOf(value) === index);


        this.start = 0; // set the start index for building the tree
        this.end = this.array.length - 1;

        // immediately build the tree and set root node
        this.root = this.buildTree();

    }

    // Write a buildTree(array) function that takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) 
    // and turns it into a balanced binary tree full of Node objects appropriately placed 
    // (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.

    buildTree(array = this.array, start = this.start, end = this.end) {
        // base case
        if (start > end) {
            return null
        }
        // get the middle element and make it root - parseInt ensures whole number
        const mid = parseInt((start + end) / 2, 10);
        
        // create new node 
        const node = new Node(array[mid]);

        // recursively construct the left subtree and make it left child of root
        node.left = this.buildTree(array, start, mid - 1);

        // recursively construct the right subtree and make it right child of root
        node.right = this.buildTree(array, mid + 1, end);
        return node;

    }

    // Write insert(value) functions that insert the given value. 
    insert(value) {
            this.root = this.insertNode(this.root, value);
        }
    

    insertNode(node, value) {
        // if the tree is empty, return a new node
        if (node === null) {
            return new Node(value);
        }
        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        }
        // return the (unchanged) pointer node
        return node;
        

    }


    // You’ll have to deal with several cases for delete, such as when a node has children or not. 
    delete(value) {
        this.root = this.deleteNode(this.root, value)
    }

    deleteNode(node, value){
        if (node === null) {
            return  node;
        } 
        // if value to be deleted is smaller, then it lies in the left subtree
        if (value < node.value) {
            node.left = this.deleteNode(node.left, value)

        // if value to be deleted is larger, then it lies in the right subtree
        } else  if (value > node.value) {
            node.right = this.deleteNode(node.right, value)
        
            // node with only one child or node child            
        } else {
            if (node.left === null)
                return node.right;
            if (node.right === null)
                return node.left;

            // node with two children: Get the inorder successor (smallest in the right subtree)    
            node.value = this.minValue(node.right);

            // delete the inorder successor
            node.right = this.deleteNode(node.right, node.value);
        }
        return node;
    }

    // eslint-disable-next-line class-methods-use-this
    minValue(node){
        let minValue = node.value;
        while (node.left !== null) {
            minValue = node.left.value;
            node = node.left
        }
        return minValue;
    }
    
    // Write a find(value) function that returns the node with the given value.

    find(value) {
        const node = this.findNode(this.root, value);
        return node;
    }
    
    findNode(node, value) {

        // Check if the node is null (base case)
        if (node === null) {
            return null;
        }
        // Check if the current node's value matches the search value
        if (value === node.value) {

            return node;
        }
        // If the search value is less than the current node's value, search in the left subtree
        if (value < node.value) {
            return this.findNode(node.left, value);
        }
        // If the search value is greater than the current node's value, search in the right subtree
        
            return this.findNode(node.right, value);
        
    }

    // Write a levelOrder(callback) function that accepts an optional callback function as its parameter.

    levelOrderRecursive(callback) {
        let array = [];
        const queue = [this.root];
        array = this.levelOrderRoutine(callback, array, queue);
        return array;
    };

    levelOrderRoutine(callback, array, queue) {
        if(queue.length === 0) {
            return array;
        }

        const currentNode = queue.shift();

        if (callback) {
            callback(currentNode.value);
        }

        array.push(currentNode.value);
        
        
        // add the child nodes to the queue
        if(currentNode.left !== null) {
            queue.push(currentNode.left)
        };

        if(currentNode.right !== null) {
            queue.push(currentNode.right)
        };

        this.levelOrderRoutine(callback, array, queue)

        return array;

    }

    print(value) {
        console.log(value);
    };


    levelOrderIterative(callback) {
        if(this.root === null) {
            return
        };        
        const array = [];
        const queue = [this.root];

        while(queue.length !== 0) {
            const currentNode = queue.shift();
            
            if(callback) {
                callback(currentNode.value);
            }

            array.push(currentNode.value);       

            if(currentNode.left !== null) {
                queue.push(currentNode.left)
            }

            if (currentNode.right !== null) {
                queue.push(currentNode.right)
            }
        }

        return array;

    }

    inOrder(callback) {
        const array = [];
        this.inOrderHelper(this.root, callback, array);
        // Return the array only if no callback is provided
        if (!callback) {
            return array;
        }
    }

    inOrderHelper(node, callback, array) {
        if (node === null) {
            return;
        }
        // Traverse left subtree
        this.inOrderHelper(node.left, callback, array);
        // Process the current node
        if (callback) {
            callback(node.value); // Call the callback if provided
        } else {
            array.push(node.value); // Otherwise, push the value into the array
        }
        // Traverse right subtree
        this.inOrderHelper(node.right, callback, array);
    }

    preOrder(callback) {
        const array = [];
        this.preOrderHelper(this.root, callback, array);
        // Return the array only if no callback is provided
        if (!callback) {
            return array;
        }
    }

    preOrderHelper(node, callback, array) {
        if (node === null) {
            return;
        }
        // Process the current node
        if (callback) {
            callback(node.value); // Call the callback if provided
        } else {
            array.push(node.value); // Otherwise, push the value into the array
        }
        
        // Traverse left subtree
        this.preOrderHelper(node.left, callback, array);

        // Traverse right subtree
        this.preOrderHelper(node.right, callback, array);
    }


    postOrder(callback) {
        const array = [];
        this.postOrderHelper(this.root, callback, array);
        // Return the array only if no callback is provided
        if (!callback) {
            return array;
        }
    }

    postOrderHelper(node, callback, array) {
        if (node === null) {
            return;
        }
        
        // Traverse left subtree
        this.postOrderHelper(node.left, callback, array);

        // Traverse right subtree
        this.postOrderHelper(node.right, callback, array);

        // Process the current node
        if (callback) {
            callback(node.value); // Call the callback if provided
        } else {
            array.push(node.value); // Otherwise, push the value into the array
        }
    }

    height(node){
        if(node === null) {
            return -1;
        }

        const leftTreeHeight = this.height(node.left);
        const rightTreeHeight = this.height(node.right);
        
        if (leftTreeHeight > rightTreeHeight) {
            return leftTreeHeight + 1
        } 
            return rightTreeHeight + 1
        
    }

    // Write a depth(node) function that returns the given node’s depth. Depth is defined as the number of edges in the path from a given node to the tree’s root node.

    depth(node) {
        if (node === null) {
            return -1 ;
        }

        let currentNode = this.root;
        let nodeDepth = 0;

        while(currentNode !== null) {
            if (currentNode.value === node.value) {
                return nodeDepth;
            }
            if (currentNode.value < node.value) {
                currentNode = currentNode.right;
                nodeDepth++;
            } else if (currentNode.value > node.value) {
                currentNode = currentNode.left;
                nodeDepth++;
            }
        }
        // value not found, return
        // eslint-disable-next-line no-useless-return
        return -1;
         
    }

    // isBalanced() {
    //     // traverse the tree using e.g. this.inOrder() - to get array of nodes
    //     let array = this.Inorder();

    //     // for each node in the array, get the height

    // }

    // isBalanced(){
    //     return this.isBalancedHelper(this.root);
    // }

    // isBalancedHelper(node) {

    //     if(node === null) {
    //         return;
    //     }

    //     const leftTreeHeight = this.isBalancedHelper(node.left);
    //     const rightTreeHeight = this.isBalancedHelper(node.right);

    //     if (leftTreeHeight > rightTreeHeight + 1) {
    //         return true;
    //     }

    //     if (leftTreeHeight + 1 < rightTreeHeight) {
    //         return true;
    //     }
        
    //     if (leftTreeHeight > rightTreeHeight) {
    //         return leftTreeHeight + 1
    //     } 
    //         return rightTreeHeight + 1
        
    // }

    isBalanced() {
        const result = this.isBalancedHelper(this.root);
        return result.isBalanced;
    }

    isBalancedHelper(node) {
        // Base case: An empty tree is balanced and has height -1
        if (node === null) {
            return { height: -1, isBalanced: true };
        }

        // Recursively find the heights of left and right subtrees
        const leftResult = this.isBalancedHelper(node.left);
        const rightResult = this.isBalancedHelper(node.right);

        // Check if the left or right subtree is unbalanced
        if (!leftResult.isBalanced || !rightResult.isBalanced) {
            return { height: 0, isBalanced: false };
        }

        // Check the height differences
        if (Math.abs(leftResult.height - rightResult.height) > 1) {
            return { height: 0, isBalanced: false };
        }

        // Calculate current node's height and return balance status
        return {
            height: Math.max(leftResult.height, rightResult.height) + 1,
            isBalanced: true
        };
    }

    rebalance() {
        const array = this.inOrder();
        this.root = this.buildTree(array, 0, array.length - 1);
    }
}