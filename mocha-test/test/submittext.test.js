// var add = require('../zy2.js');
// var expect = require('chai').expect;

var submittext = require('../submittext.js');
var expect = require('chai').expect;

describe('简单输入字符的测试', function() {
  it('2016级博士生：天一、王二、吴五', function() {
    expect(submittext("2016级博士生：天一、王二、吴五")).to.include('2016');
  });
  it('2015级硕士生：李四、王五、许六', function() {
    expect(submittext("2015级硕士生：李四、王五、许六")).to.include('2015');
  });
  it('2018级硕士生：刘一、李二、李三', function() {
    expect(submittext("2018级硕士生：刘一、李二、李三")).to.include('2018');
  });
  it('2017级本科生：刘六、琪七、司四', function() {
    expect(submittext("2017级本科生：刘六、琪七、司四")).to.include('2017');
  });
});
