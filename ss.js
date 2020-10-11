var ID=0;//注意注意底下的编号是从1开始的
var ID1=0;//用来暂时存放一些值
var teacher_num=0;
var degree_num=new Array();//用来存储一个老师带几个年级的学生
var student_num=new Array();//用来存储一个年级有几个学生，注意本师门树每一个结点的id不一样，所以就是即使年级相同，老师不同，id也会不一样
var who=new Array();
//who表示身份，1是导师，2是年级，3是学生。
//name用来存储具体的内容，导师姓名，学生姓名，具体学位名称。
var namex=new Array();
//用来存储学生的具体姓名

function submittext() //解析输入 每个人赋予一个ID表示身份和相应信息数组
{
  var Text = document.getElementById("inputtext").value;
  var Lines = Text.split("\n"); //lines获取文本
  for (var i = 0; i < Lines.length; i++)
  {
    if(Lines[i].length==0)
    {             //跳过空行
      continue;
    }

    if(Lines[i].substr(0,2)=="导师") //导师处理
    {

      ID++;       //每个人拥有ID编号，ID对应的数组内容标识个人信息
      who[ID]=1; //这个人是导师
      teacher_num++;
      name[ID]= Lines[i].substring(3);//存储导师姓名
      ID1=ID;
      degree_num[ID1]=0;//每开始一棵师门树，则初始这个老师所带的年级数为0；
    }

    else{                       //非导师处理

      //学位年级结点
      var temp= Lines[i].substring(0,8);
      ID++;
      who[ID]=2;
      name[ID]=temp;
      degree_num[ID1]++;


      //分割后面的姓名
      var tempNameString  = Lines[i].substring(Lines[i].search("：")+1);
      namex[i] = tempNameString.split("、");

      for(var j=0;j<namex[i].length;j++)//每个人分配ID  并且存储相关信息
      {
        ID++;
        who[ID]=3;
        name[ID]=namex[i][j];
      }

    }

  }
////////////////////////////////////////////////////////////////
  function test()
  {

    <!--树形json格式的强行转换    -->
    for (var k = 0; k < teachernum; k++)//第一层树
    {
      ID++;//老师结点遍历
      if (who[ID] == 1)//如果是老师
      {
        var x1 = {id: name[ID], children: []};
        for (i = 1; i <= degree_num[ID]; i++)//第二层树
        {
          ID++;//学位结点遍历
          var x2 = new Object();
          x2.id = ID;
          x2.children = new Array();
          ID1 = ID;
          for (j = 1; j <= student_num[ID1]; j++) {
            ID++;
            var x3 = new Object();
            x3.id = name[ID];
            x2.children.push(x3);
          }
          x1.children.push(x2);
        }
      }

    }
    var y1 = JSON.stringify(x1);//生成json字符串
    var y2 = JSON.parse(y1);//将json字符串转成json对象

    function pk(data) {
      // function test2(hell){
      // console.log("xxxx");
      // console.log("typeof data is "+typeof  data);
      // console.log(data);
      // console.log("yyyyy");
      // function pick (data=hell) {
      var graph = new G6.TreeGraph({
        container: 'mountNode',
        width: 800,
        height: 1200,
        pixelRatio: 2,
        modes: {
          default: [{
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              var data = item.get('model').data;
              // console.log("type of this shit is",typeof data);
              // console.log(data);
              data.collapsed = collapsed;
              return true;
            }
          }, 'drag-canvas', 'zoom-canvas']
        },

        /******************美化****************/
        defaultNode: {
          size: 16,
          anchorPoints: [[0, 0.5], [1, 0.5]],
          style: {
            fill: '#59ff15',
            stroke: '#d91808'
          }
        },

        defaultEdge: {
          shape: 'cubic-horizontal',
          style: {
            stroke: '#000000'
          }
        },

        layout: {
          type: 'compactBox',
          direction: 'LR',
          // nodeSep:30,
          // rankSep:100,
          getId: function getId(d) {
            return d.id;
          },
          getHeight: function getHeight() {
            return 16;
          },
          getWidth: function getWidth() {
            return 16;
          },
          getVGap: function getVGap() {
            return 10;
          },
          getHGap: function getHGap() {
            return 100;
          }
        }
      });

      graph.node(function (node) {
        return {
          size: 26,
          style: {
            fill: '#171bff',		//节点颜色
            stroke: '#fff9f6'	//节点边框
          },
          label: node.id,
          labelCfg: {
            position: node.children && node.children.length > 0 ? 'left' : 'right'
          }
        };
      });

      graph.data(data);
      graph.render();
      graph.fitView();
      // graph.minZoom(2);
      // console.log("sssss");
    };



    // if(k==0){
    //     var help1 = JSON.parse(hell);
    //     pk(help1);
    //     console.log(help1);
    //     console.log("11111111111111111");
    // }
    // else{
    //     var help = JSON.parse(hell);
    //     pk(help);
    //     console.log(help);
    //     console.log("2222222222222222");
    // }
    console.log(y1);
    console.log(y2);
    pk(y2);

    console.log("ssssfffffffffddddddddddsssssswwwwwwwww");
    // // console.log("type is "+typeof help);
    // // console.log("zzzz12121212");
    // // console.log("ssssssssss this is k",+k);
    // // <button>hhss<button>
  }

}





