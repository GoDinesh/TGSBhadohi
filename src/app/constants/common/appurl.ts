export const appurl={
    //Prod
    baseurl: 'https://api.tgsbhadohi.com',

    //local
    //baseurl: 'http://localhost:8080',



    navmenu: '/navmenu',
        menuurl_auth: '/auth',
                auth_permissionGroup: '/permission-group',
                auth_user: '/user',
                auth_assignPermission: '/assign-permission',

        menuurl_sms: '/sms',
                send_sms: '/send-sms',

        menuurl_master: '/master',
                master_class: '/standard',
                master_academicyear: '/academicyear',
                master_feestype: '/feestype',
                master_discountreason: '/discountreason',
                master_feeStructure: '/fees-structure',
                master_bookAndDressFees: '/book-dress-fees',

        menuurl_student: '/student',
                student_registration: '/registration',
                student_details: '/view-details',
                student_list: '/studentList',
                upload_image: '/upload-image',
                get_rollnumber: '/get-rollnumber',
                get_max_registration_number:'/get-max-registration-number',
                filter_by_keyword: '/filter-by-keyword',
                student_fees_installment: '/student_fees_installment',
                student_fees_structure: '/student-fees-structure',
                promote_student: '/promote-student',
                update_status_as_inactive: '/update-status-as-inactive',
                update_fees_details: '/update-fees-details',
                update_book_fees_details: '/update-book-fees-details',
                update_student_details:'/update-student-details',

        menuurl_fees: '/fees',
                pay_fees: '/pay-fees',
                get_fees_by_date_class: '/get-fees-by-date-class',
                get_receipt_number: '/get-receipt-number',
                filter_by_receipt:'/filter-by-receipt',
                pending_fees: '/pending-fees',
                Pending_fees_class_wise: '/pending-fees-class-wise',
                today_fees_collection: "/today-fees-collection",

    endpoint_insert: '/insert',
    endpoint_findall:'/findall',
    endpoint_allActiveRecords:'/allActiveRecords',
    endpoint_findbyid: '/findbyid',
    endpoint_filter: '/filter',



    endpoint_findByAcademicYearCode: '/findbyacademicyearcode',

    //endpoint_update: '/update',
}
