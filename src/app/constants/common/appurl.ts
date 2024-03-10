export const appurl={
    //Prod    
    //baseurl: 'http://13.48.143.218:8080',

    //local
    baseurl: 'http://localhost:8000',


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

        menuurl_fees: '/fees',
                pay_fees: '/pay-fees',

    endpoint_insert: '/insert',
    endpoint_findall:'/findall',
    endpoint_allActiveRecords:'/allActiveRecords',
    endpoint_findbyid: '/findbyid',
    endpoint_filter: '/filter'
    //endpoint_update: '/update',
}