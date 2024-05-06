/* eslint-disable no-param-reassign */
// tree.js (binary search tree)

import Node from "./node";

export default class Tree {
    constructor(array = null){
        this.array = array.sort((a, b) => a - b); // sort and initialize the array
        this.sortedUniqueArray = this.array.filter((value, index, self) => self.indexOf(value) === index);
        this.start = 0; // set the start index for building the tree
        this.end = array.length - 1;

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
}