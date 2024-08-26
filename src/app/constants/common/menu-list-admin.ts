import { INavbarData } from "src/app/model/menu";
import { msgTypes } from "./msgType";

var masters: string = 'masters';
var student: string = 'student';
var authorization: string = 'auth';
var fees: string = "fees";
var reports: string = "reports";
var notification: string = "notification";

export const menuListAdmin: INavbarData[]=[
//dashboard
{
    
    "text": "Dashboard",
    "icon": "fa fa-dashboard",
    "routerLink": 'dashboard',
    "active": true,
    "children": [
        {
            "text": msgTypes.DASHBOARD_CONTENT.TOTAL_BOYS_GIRLS_TAB,
            "icon": "fa fa-user-circle",
            "routerLink": "dashboard",
            "active": true,
        },
        {
            "text": msgTypes.DASHBOARD_CONTENT.TODAY_FEES_COLLECTION_TAB,
            "icon": "fa fa-user-circle",
            "routerLink": "dashboard",
            "active": true,
        },
        {
            "text": msgTypes.DASHBOARD_CONTENT.AADHAR_NOT_SUBMITTED_TAB,
            "icon": "fa fa-user-circle",
            "routerLink": "dashboard",
            "active": true,
        },
        {
            "text": msgTypes.DASHBOARD_CONTENT.ADMISSION_STATISTICS_GRAPH,
            "icon": "fa fa-user-circle",
            "routerLink": "dashboard",
            "active": true,
        },
        {
            "text": msgTypes.DASHBOARD_CONTENT.BITRH_CERTIFICATE,
            "icon": "fa fa-user-circle",
            "routerLink": "dashboard",
            "active": true,
        },
        {
            "text": msgTypes.DASHBOARD_CONTENT.PENDING_FEES_GRAPH,
            "icon": "fa fa-user-circle",
            "routerLink": "dashboard",
            "active": true,
        },
        {
            "text": msgTypes.DASHBOARD_CONTENT.TODAY_FEES_COLLECTION_GRAPH,
            "icon": "fa fa-user-circle",
            "routerLink": "dashboard",
            "active": true,
        },
        {
            "text": msgTypes.DASHBOARD_CONTENT.TODAY_BIRTHDAY,
            "icon": "fa fa-user-circle",
            "routerLink": "dashboard",
            "active": true,
        },
    ]
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
    // {
    //     "text": "Fees Type",
    //     "icon": "fa fa-money",
    //     "routerLink": masters + "/fees-type",
    //     "active": true,
    // },
    // {
    //     "text": "Discount Reason",
    //     "icon": "fa fa-gg-circle",
    //     "routerLink": masters + "/discount-reason",
    //     "active": true,
    // },
    {
        "text": "SSM Fees",
        "icon": "fa fa-book",
        "routerLink": masters + "/book-dress-fees",
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
                    "text": "Pending SSM Fees",
                    "icon": "fa fa-slideshare",
                    "routerLink": reports + "/pending-book-fees",
                    "active": true,
                },
                {
                    "text": "Aadhar Not Given",
                    "icon": "fa fa-id-card",
                    "routerLink": reports + "/aadhar-details",
                    "active": true,
                },
                {
                    "text": "Birth Cretificate Not Given",
                    "icon": "fa fa-certificate",
                    "routerLink": reports + "/birth-certificate",
                    "active": true,
                },
                {
                    "text": "Fees Collections",
                    "icon": "fa fa-id-card",
                    "routerLink": reports + "/fees-collection",
                    "active": true,
                },
                
        ]},

        {
            "text": "Notification",
            "icon": "fa fa-commenting-o",
            "routerLink": notification,
            "active": true,
            
           },
]