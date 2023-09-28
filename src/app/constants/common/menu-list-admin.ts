import { INavbarData } from "src/app/model/menu";

var masters: string = 'masters';
var student: string = 'student';
var authorization: string = 'auth'
export const menuListAdmin: INavbarData[]=[
//dashboard
{
    
    "text": "Dashboard",
    "icon": "fa fa-dashboard",
    "routerLink": 'dashboard',
    "active": true,
},
//authorisation
{
    "text": "Authorization",
    "icon": "fa fa-user-secret",
    "routerLink": authorization,
    "active": true,
    "children": [
        {
            "text": "Register User",
            "icon": "fa fa-user-circle",
            "routerLink": authorization + "/register-user",
            "active": true,
        },
        {
            "text": "Permission Group",
            "icon": "fa fa-group",
            "routerLink": authorization + "/permission-group",
            "active": true,
        },
        {
            "text": "Assign Permission To Group",
            "icon": "fa fa-lock",
            "routerLink": authorization + "/assign-permission-to-group",
            "active": true,
        },
    ]},
//master
{
"text": "Master",
"icon": "fa fa-database",
"routerLink": masters,
"active": true,
"children": [
    {
        "text": "Class",
        "icon": "fa fa-user-circle-o",
        "routerLink": masters + "/class",
        "active": true,
    },
    {
        "text": "Academic year",
        "icon": "fa fa-calendar-o",
        "routerLink": masters + "/academic-year",
        "active": true,
    },
    {
        "text": "Fees Type",
        "icon": "fa fa-money",
        "routerLink": masters + "/fees-type",
        "active": true,
    },
    {
        "text": "Discount Reason",
        "icon": "fa fa-gg-circle",
        "routerLink": masters + "/discount-reason",
        "active": true,
    },
    {
        "text": "Fees Structure",
        "icon": "fa fa-reddit-alien",
        "routerLink": masters + "/fees-structure",
        "active": true,
    },
]},
//student
{
    "text": "Student",
    "icon": "fa fa-graduation-cap",
    "routerLink": student,
    "active": true,
    "children": [
        {
            "text": "Registration",
            "icon": "fa fa-user-circle-o",
            "routerLink": student + "/registration",
            "active": true,
        },
        {
            "text": "Student List",
            "icon": "fa fa-user-circle-o",
            "routerLink": student + "/studentList",
            "active": true,
        },
    ]},

]