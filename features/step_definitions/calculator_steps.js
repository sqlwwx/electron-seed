const { defineSupportCode } = require('cucumber')
require('should')

class Calculator {
  constructor () {
    this.expression = ''
    this.show = ''
  }
  click (val) {
    if (val === '=') {
      /* eslint-disable no-eval */
      this.show = eval(this.expression)
      /* eslint-enable no-eval */
      this.expression = ''
    } else {
      this.expression += val
      this.show = this.expression
    }
  }
}

let calc = new Calculator()
defineSupportCode(({ Given, When, Then }) => {
  Given('我已经在计算器里输入{arg1:int}', function (arg1) {
    calc.click(arg1)
  })
  Given('我按{arg1}按钮', function (arg1) {
    calc.click(arg1)
  })
  Then('我应该在屏幕上看到的结果是{arg1:int}', function (arg1) {
    arg1.should.be.eql(calc.show)
  })
})
