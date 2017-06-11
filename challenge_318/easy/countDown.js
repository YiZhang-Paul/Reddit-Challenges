/* jslint esversion: 6 */
(() => {
	document.addEventListener("DOMContentLoaded", () => {
		/**
		 * count down class
		 * @param array [], array []
		 *
		 * numList      : list of all number inputs and target result
		 * operatorList : list of all available operators
		 */
		class CountDown {
			constructor(numList, operatorList) {
				this.numList = numList.splice(" ");
				this.operatorList = operatorList; 
				this.totalOperators = this.numList.length - 2;
				this.operatorPattern = this.permuteOperator();
			}
			/**
			 * generate all possible permutation of operators
			 * @param String
			 *
			 * curPattern : current operator pattern
			 *
			 * returns array []
			 */
			permuteOperator(curPattern = "") {
				if(curPattern.length == this.totalOperators) {
					return curPattern;
				}
				let permutation = [];
				for(let i = 0; i < this.operatorList.length; i++) {
					let result = this.permuteOperator(curPattern + this.operatorList[i]);
					if(Array.isArray(result)) {
						permutation.push(...result);
					} else {
						permutation.push(result);
					}
				}
				return permutation;
			} 
			/**
			 * calculate result base on operator
			 * @param float, float, String
			 *
			 * num1     : first number  
			 * num2     : second number
			 * operator : operator to be used
			 *
			 * returns float 
			 */
			calculateResult(num1, num2, operator) {
				let result = 0;
				switch(operator) {
					case "+" :
						result = num1 + num2;
						break;
					case "-" :
						result = num1 - num2;
						break;
					case "*" :
						result = num1 * num2;
						break;
					case "/" :
						result = num1 / num2;
						break;
				}
				return result;
			} 
			/**
			 * calculate result for entire list
			 * @param String
			 *
			 * operatorPattern : operator patterns to be applied
			 *
			 * returns float
			 */
			getListResult(operatorPattern) {
				return this.numList.slice(0, this.numList.length - 1).reduce((acc, val, index) =>
					this.calculateResult(acc, val, operatorPattern[index - 1]));
			} 
			/**
			 * get all valid count down
			 *
			 * returns array []
			 */
			getCountDown() {
				return this.operatorPattern.slice().filter(pattern =>
					this.getListResult(pattern) == this.numList[this.numList.length - 1]);
			}
		} 
		//default input
		let operatorList = ["+", "-", "*", "/"];
		let numList = [1, 3, 7, 6, 8, 3, 250];
		let countDown = new CountDown(numList, operatorList);
		let result = countDown.getCountDown();
		console.log(result);
	});
})();