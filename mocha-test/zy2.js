var NAME = new Array(), degree = new Array(), year = new Array();
var attris = new Array();
var ID = 0, PID = 0;
var hell, branch2 = 0;
var teachernum = 0, studentnum = new Array(), degreenum = new Array();  //有几个老师、每个学位有几个学生、每个导师带几个年段
var help = new Array();

function cleartext() {
  location.reload();
}
function submittext() {             //解析输入 每个人赋予一个IDD和相应信息数组
    var Text = document.getElementById("inputtext").value;
    var Lines = Text.split("\n");
    var teacher = new Array(), nameLine = new Array();
    var name = new Array();
    // teacher标识是否是导师，degree标识学位，year标识年级，
    // nameLine存每行完整信息，nameString存：后内容，name存名字
    var branch = 0;
    for (var i = 0; i < Lines.length; i++) {
        if (Lines[i].length == 0) {             //跳过空行
            continue;
        }
        teacher[i] = Lines[i].substr(0, 2);  //分割前两个字，判断是否是“导师”
        if (teacher[i] == "导师") {          //导师处理
            ID++;                          //每个人独有ID
            degree[ID] = "导师";            //degree导师
            NAME[ID] = Lines[i].substring(3);
            degreenum[teachernum] = 0;
            teachernum++;
        }
        else if(/^\d+$/.test(teacher[i])) {                       //非导师处理
            var temp1 = Lines[i].substring(0, 4); //temp1为年级
            var temp2 = Lines[i].substr(5, 2); //temp2为学位等级
            var tempNameString = Lines[i].substring(Lines[i].search("：") + 1);
            name[i] = tempNameString.split("、");

            degreenum[teachernum - 1]++;
            for (var j = 0; j < name[i].length; j++) {      //每个人分配ID  并且存储相关信息
                ID++;
                year[ID] = temp1;
                degree[ID] = temp2;
                NAME[ID] = name[i][j];
                // studentnum[branch]++;
            }
            studentnum[branch] = name[i].length;
            branch++;
        }
        //技能树生成
        else {
            linestr = Lines[i];
            var posi = linestr.search("：");
            var stuName = linestr.substring(0, posi);
            var tempAttris = linestr.substring(posi+1).split("、");
            attris[stuName] = tempAttris;
            console.log(attris);
        }
    }
    // console.log("over");
    // console.log(teachernum);
    // console.log(studentnum);
    // console.log(degreenum)
    return year;
}
////////////////////////////////////////////////////////////////
function test() {                //创建json格式对象
    // for(var i=1;i<=ID;i++){
    //     console.log(year[i]);
    //     console.log(degree[i]);
    //     console.log(NAME[i]);
    //     console.log("ID="+i);
    //     console.log("-----------------");
    // }

    var IDD = 0; var kk = 0; var kkk = 0;
    for (var k = 0; k < teachernum; k++) {
        IDD++;
        // console.log("teacher="+teachernum);
        var test2 = { id: NAME[IDD], children: [] };           //对test2动态构建json
        for (var i = 1; i <= degreenum[kk]; i++) {
            // console.log(kk+" =="+degreenum[kk]);
            var xxx = new Object();
            xxx.id = year[IDD + 1] + degree[IDD + 1];
            xxx.children = new Array();
            for (var j = 1; j <= studentnum[kkk]; j++) {
                var yyy = new Object();
                IDD++;
                yyy.id = NAME[IDD];
                yyy.children = new Array();
                // 增加个人经历
                if(attris.hasOwnProperty(yyy.id)) {
                    console.log("has");
                    for(var k = 0; k < attris[yyy.id].length; k++) {
                        var yyychild = new Object();
                        yyychild.id = attris[yyy.id][k];
                        yyychild.children = new Array();
                        yyy.children.push(yyychild);
                    }
                }

                xxx.children.push(yyy);
            }
            test2.children.push(xxx);
            kkk++;
        }
        kk++;
        hell = JSON.stringify(test2);



        function pk(data) {
            // function test2(hell){
            // console.log("xxxx");
            // console.log("typeof data is "+typeof  data);
            // console.log(data);
            // console.log("yyyyy");
            // function pick (data=hell) {
            var graph = new G6.TreeGraph({
                container: 'mountNode',
                width: 1600,
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
                        fill: '#CCFF00',
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
                        fill: '#CCFF00',		//节点颜色
                        stroke: '#2BD54D'	//节点边框
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
        const help = JSON.parse(hell);
        console.log(hell);
        console.log(help);
        pk(help);

        console.log("ssssfffffffffddddddddddsssssswwwwwwwww");
        // // console.log("type is "+typeof help);
        // // console.log("zzzz12121212");
        // // console.log("ssssssssss this is k",+k);
        // // <button>hhss<button>
    }


  }

module.exports = submittext;
module.exports = test;