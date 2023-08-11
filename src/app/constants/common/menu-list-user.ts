import { INavbarData } from "src/app/model/menu";

var apiCollection: string = 'api-collection';
var payin: string = 'payin'
var payout: string = 'payout'

export const menuListUser: INavbarData[]=[
    {
    "text": "Payin",
    "icon": "fa fa-database",
    "routerLink": payin,
    "children": [
        {
            "text": "Introduction",
            "icon": "fa fa-id-badge",
            "routerLink": payin + "/introduction"
        },
        {
            "text": "Pre-Requisites",
            "icon": "fa fa-th-large",
            "routerLink": payin + "/pre-requisites"
        },
        {
            "text": "Generate Hash",
            "icon": "fa fa-slack",
            "routerLink": payin + "/generate-hash"
        },
        {
            "text": "Parameter Validations",
            "icon": "fa fa-modx",
            "routerLink": payin + "/parameter-validations"
        },
        {
            "text": "API Collection",
            "icon": "fa fa-list-ul",
            "routerLink": apiCollection,
            "children": [{
                            "text": "Create An Order",
                            "icon": "fa fa-circle",
                            "routerLink": payin + "/" + apiCollection + "/create-order"
                        },
                        
                        
                        {
                            "text": "Search By",
                            "icon": "fa fa-circle",
                            "routerLink": "apiCollection",
                            "children": [
                                {
                                    "text": "Request Id",
                                    "icon": "fa fa-circle",
                                    "routerLink": payin + "/" + apiCollection + "/search-by-request-id",
                                },
                                {
                                    "text": "Order Id",
                                    "icon": "fa fa-circle",
                                    "routerLink": payin + "/" + apiCollection + "/search-by-order-id"
                                },
                                {
                                    "text": "Transaction Token",
                                    "icon": "fa fa-circle",
                                    "routerLink": payin + "/" + apiCollection + "/search-by-transaction-token"
                                },
                                {
                                    "text": "Transaction Id",
                                    "icon": "fa fa-circle",
                                    "routerLink": payin + "/" + apiCollection + "/search-by-transaction-id"
                                },
    
                            ]
                        },
    
                        {
                            "text": "Active Currency",
                            "icon": "fa fa-circle",
                            "routerLink": payin + "/" + apiCollection + "/active-currency"
                        },
                        {
                            "text": "Active Payment Methods",
                            "icon": "fa fa-circle",
                            "routerLink": payin + "/" + apiCollection + "/active-payment-methods"
                        },
                        {
                            "text": "Active Mode Of Payments",
                            "icon": "fa fa-circle",
                            "routerLink": payin + "/" + apiCollection + "/active-mop"
                        },
                        {
                            "text": "Fetch Order List",
                            "icon": "fa fa-circle",
                            "routerLink": payin + "/" + apiCollection + "/order-list"
                        },
                        {
                            "text": "Fetch Transaction List",
                            "icon": "fa fa-circle",
                            "routerLink": payin + "/" + apiCollection + "/transaction-list"
                        },    
            ]
        },
        {
            "text": "Status & Responses",
            "icon": "fa fa-superpowers",
            "routerLink": payin + "/status_response"
        }
    ]},
    {
        "text": "Payout",
        "icon": "fa fa-database",
        "routerLink": payout,
        "children": [
            {
                "text": "Payout Methods",
                "icon": "fa fa-database",
                "routerLink": payout + "/payout-methods",
            },
            {
                "text": "Authentication",
                "icon": "fa fa-id-badge",
                "routerLink": payout + "/authentication",
                "children":[
                    {
                        "text": "Authorize",
                        "icon": "fa fa-circle",
                        "routerLink": payout + "/authentication/authorize",
                    },
                    {
                        "text": "Verify Token",
                        "icon": "fa fa-circle",
                        "routerLink": payout + "/authentication/verify-token",
                    }
                ]
            },
            {
                "text": "Account",
                "icon": "fa fa-database",
                "routerLink": payout + "/account",
                "children" :[
                    {
                        "text": "Get Balance",
                        "icon": "fa fa-circle",
                        "routerLink": payout + "/account/get-balance",
                    },
                ]
            },
            {
                "text": "Beneficiary",
                "icon": "fa fa-database",
                "routerLink": payout + "/beneficiary",
                "children":[
                    {
                        "text": "Add Beneficiary",
                        "icon": "fa fa-circle",
                        "routerLink": payout + "/beneficiary/add-beneficiary",
                    },
                    {
                        "text": "Get Beneficiary Details",
                        "icon": "fa fa-circle",
                        "routerLink": payout + "/beneficiary/get-beneficiary-details",
                    },
                    {
                        "text": "Get Beneficiary Id",
                        "icon": "fa fa-circle",
                        "routerLink": payout + "/beneficiary/get-beneficiary-id",
                    },
                    {
                        "text": "Remove Beneficiary",
                        "icon": "fa fa-circle",
                        "routerLink": payout + "/beneficiary/remove-beneficiary",
                    },
                ]
            },
            {
                "text": "Transfer",
                "icon": "fa fa-database",
                "routerLink": payout + "/transfer",
                "children": [
                    {
                        "text": "Async Transfer",
                        "icon": "fa fa-circle",
                        "routerLink": payout + "/transfer/async-transfer",
                    },
                    {
                        "text": "Transfer Status",
                        "icon": "fa fa-circle",
                        "routerLink": payout + "/transfer/transfer-status",
                    },
                    {
                        "text": "UPI Validation",
                        "icon": "fa fa-circle",
                        "routerLink": payout + "/transfer/upi-validation",
                    },
                ]
            },
            {
                "text": "API Error Response",
                "icon": "fa fa-id-badge",
                "routerLink": payout + "/api-error-response",
            }
        ]
    }
    ]