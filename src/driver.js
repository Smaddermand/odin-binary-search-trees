// driver.js - script to drive/test the bst

import { random } from "lodash";
import Tree from "./tree";

function randomArray(n){
    const sizeOfRandomNumber = 100;
    const array = [];
    for (let i = 0; i < n; i++) {
        array.push(random(sizeOfRandomNumber));
    }
    return array;
}


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

const sizeOfArray = 100;
const array = randomArray(sizeOfArray);

const newTree = new Tree(array);

prettyPrint(newTree.root)

console.log(`Is the tree balanced? ${newTree.isBalanced()}`);

console.log(`level order: ${newTree.levelOrderIterative()}`);
console.log(`preorder: ${newTree.preOrder()}`);
console.log(`postorder: ${newTree.postOrder()}`);
console.log(`inorder: ${newTree.inOrder()}`);

newTree.insert(101);
newTree.insert(103);
newTree.insert(108);
newTree.insert(112);
newTree.insert(121);

prettyPrint(newTree.root)

console.log(`Is the tree balanced? ${newTree.isBalanced()}`);

newTree.rebalance();

console.log(`Is the tree balanced? ${newTree.isBalanced()}`);


console.log(`level order: ${newTree.levelOrderIterative()}`);
console.log(`preorder: ${newTree.preOrder()}`);
console.log(`postorder: ${newTree.postOrder()}`);
console.log(`inorder: ${newTree.inOrder()}`);