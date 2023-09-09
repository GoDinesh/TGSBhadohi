import { INavbarData } from "src/app/model/menu";

var masters: string = 'masters';
var student: string = 'student';
export const menuListAdmin: INavbarData[]=[
//dashboard
{
    
    "text": "Dashboard",
    "icon": "fa fa-dashboard",
    "routerLink": 'dashboard',
},
//master
{
"text": "Master",
"icon": "fa fa-database",
"routerLink": masters,
"children": [
    {
        "text": "Class",
        "icon": "fa fa-user-circle-o",
        "routerLink": masters + "/class",
    },
    {
        "text": "Academic year",
        "icon": "fa fa-calendar-o",
        "routerLink": masters + "/academic-year",
    },
    {
        "text": "Fees Type",
        "icon": "fa fa-money",
        "routerLink": masters + "/fees-type",
    },
    {
        "text": "Discount Reason",
        "icon": "fa fa-gg-circle",
        "routerLink": masters + "/discount-reason",
    },
    {
        "text": "Fees Structure",
        "icon": "fa fa-reddit-alien",
        "routerLink": masters + "/fees-structure",
    },
    {
        "text": "Register User",
        "icon": "fa fa-user-circle",
        "routerLink": masters + "/register-user",
    },
]},
//student
{
    "text": "Student",
    "icon": "fa fa-graduation-cap",
    "routerLink": student,
    "children": [
        {
            "text": "Registration",
            "icon": "fa fa-user-circle-o",
            "routerLink": student + "/registration",
        },
        {
            "text": "Student List",
            "icon": "fa fa-user-circle-o",
            "routerLink": student + "/studentList",
        },
    ]},

]