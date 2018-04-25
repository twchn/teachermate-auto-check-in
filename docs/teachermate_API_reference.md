# 微助教API参考

## 签到

**POST https://www.teachermate.com.cn/wechat-api/v1/class-attendance/student-sign-in**

**Request**

参数 | 说明
--- | ---
openid | 每请求一次就会不同，原来的会失效
course_id | 课程id
lon | 经度
lat | 纬度
wx_csrf_name | 防止跨站请求伪造，定值`688f1b52953ca0c458e9b8624356ac1b`

**Response**
```json
{
    "1222203"<总签到次数>:["OK",1<签到名次>,1,0,5<今天签到次数>,"2018-04-13 20:03:19.059",0,-1,5,5],
    "1222204":["OK",1,1,0,5,"2018-04-13 20:03:19.062",0,-1,8,8]
}
```

## 课程列表

**GET https://www.teachermate.com.cn/wechat-api/v1/students/courses?openid=OPENID**

**Request**

| 参数   | 说明          |
| ------ | ------------- |
| openid | openid， 同上 |

**Response**

```json
[
    {
        "id": 课堂id,
        "name": 课堂名称,
        "cover":"../../images/default-class.png",
        "teacherName": 老师名,
        "avatar": 头像地址,
        "college": 学校,
        "code":课堂编码,
        "orgId":null,
        "department":null
    }
]
```

## 获取个人信息

**GET https://www.teachermate.com.cn/wechat-api/v2/students**

**Request**

header里加openid

**Response**

超级巨量级，把候选项一次传回来了

## 获取学生资料

**GET https://www.teachermate.com.cn/wechat2/student/archive/lists?openid=OPENID**

**Request**

header里加openid

**Response**

```json
[
    {
        "id": id,
        "student_id": 学生id,
        "college_id": 学校id,
        "department_id": ,
        "class_name": 班级名,
        "specialty":"",
        "student_number": 学号,
        "comment":null,
        "deleted":0,
        "org_id":null,
        "college_name": 学校名,
        "department_name": 学院名
    }
]
```

## 获取历史操作课程列表

**GET https://www.teachermate.com.cn/wechat/wechat/guide/his_answer?openid=OPENID**

## 获取课程操作详情

**GET https://www.teachermate.com.cn/wechat/wechat/v1/student/get_his_question?course_id=COURSE_ID&student_id=1403560&open_id=OPENID**