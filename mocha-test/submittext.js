var NAME = new Array(), degree = new Array(), year = new Array();
var attris = new Array();
var ID = 0, PID = 0;
var hell, branch2 = 0;
var teachernum = 0, studentnum = new Array(), degreenum = new Array();  //有几个老师、每个学位有几个学生、每个导师带几个年段
var help = new Array();

function submittext(Text) {             //解析输入 每个人赋予一个IDD和相应信息数组
    // var Text = document.getElementById("inputtext").value;
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

module.exports = submittext;