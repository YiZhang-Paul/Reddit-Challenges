﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace simpleCalculator {
    class Formatter {
        /// <summary>
        /// format number for proper display
        /// </summary>
        public string Format(decimal number, bool isDecimal) {

            decimal integer = Math.Truncate(number);
            decimal decimals = number - integer;
            string decimalString = decimals == 0 ? "" : decimals.ToString().Substring(2);

            return AddComma(integer.ToString()) + (isDecimal ? "." : "") + decimalString;
        }
        /// <summary>
        /// add comma to numbers
        /// </summary>
        public string AddComma(string number) {

            var result = new StringBuilder();

            for(int i = number.Length - 1; i >= 0; i--) {

                result.Append(number[i] + ((number.Length - i) % 3 == 0 && i != 0 ? "," : ""));
            }

            return string.Join("", result.ToString().Reverse());
        }
    }
}