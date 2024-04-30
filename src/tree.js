// tree.js (binary search tree)

import Node from "./node";

export default class Tree {
    constructor(array = null){
        this.array = array;
        this.root = null;
        this.start = 0;
        this.end = array.length;
        this.buildTree();

    }

    // Write a buildTree(array) function that takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) 
    // and turns it into a balanced binary tree full of Node objects appropriately placed 
    // (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.

    buildTree(array = this.array, start = this.start, end = this.end) {
        // implement sort + remove duplicates - for now, expect sorted array

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

        // how to set root?.. And how does this initiate.. How to get root, with the constructor?





        // set root = initial node ..
    }
    
}