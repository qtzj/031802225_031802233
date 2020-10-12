// var add = require('../zy2.js');
// var expect = require('chai').expect;

var submittext = require('../attritest.js');
var expect = require('chai').expect;

describe('技能树测试', function() {
  it('刘六：JAVA、数学建模', function() {
    expect(submittext("刘六：JAVA、数学建模")['刘六']).to.include('JAVA');
  });
  it('李二：字节跳动、京东云', function() {
    expect(submittext("李二：字节跳动、京东云")['李二']).to.include('京东云');
  });
});
