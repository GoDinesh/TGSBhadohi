import { INavbarData } from "src/app/model/menu";

var masters: string = 'masters';
var student: string = 'student';
var authorization: string = 'auth';
var fees: string = "fees";
var reports: string = "reports"

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
            "icon": "fa fa-user-plus",
            "routerLink": student + "/registration",
            "active": true,
        },
        {
            "text": "Student List",
            "icon": "fa fa-list",
            "routerLink": student + "/studentList",
            "active": true,
        },
        {
            "text": "Promote Student",
            "icon": "fa fa-line-chart",
            "routerLink": student + "/promote-student",
            "active": true,
        },
        
    ]},

    {
        "text": "Fees",
        "icon": "fa fa-inr",
        "routerLink": fees,
        "active": true,
        "children": [
            {
                "text": "Pay Fees",
                "icon": "fa fa-money",
                "routerLink": fees + "/pay-fees",
                "active": true,
            }
        ]},
        {
            "text": "Reports",
            "icon": "fa fa-file",
            "routerLink": reports,
            "active": true,
            "children": [
                {
                    "text": "Pending Fees",
                    "icon": "fa fa-money",
                    "routerLink": reports + "/pending-fees",
                    "active": true,
                },
                {
                    "text": "Aadhar Not Available",
                    "icon": "fa fa-id-card",
                    "routerLink": reports + "/aadhar-details",
                    "active": true,
                }
        ]},
]