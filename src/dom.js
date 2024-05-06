// src/dom.js

// this file contains the js logic for dom manipulation

import Tree from "./tree";

const array = [2, 319, 2, 6, 724, 65, 1, 6, 1, 42, 6, 7, 8, 12, 15, 18, 24, 55];

const newTree = new Tree(array);


console.log("where are you");
console.log(newTree.find(1));

console.log(newTree.find(8));

console.log(newTree.find(4));

console.log(newTree.find(15));

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

  prettyPrint(newTree.root);

//   newTree.insert(29);

//   prettyPrint(newTree.root);

//   newTree.delete(4);

console.log(newTree.levelOrderRecursive());

newTree.levelOrderRecursive(newTree.print.bind(newTree));

console.log("Let's go iterative");

console.log(newTree.levelOrderIterative());

console.log("Bind??");
newTree.levelOrderIterative(newTree.print.bind(newTree));


 