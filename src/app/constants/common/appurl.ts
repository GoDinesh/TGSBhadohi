export const appurl={
    baseurl: 'http://localhost:8000',
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
        
        menuurl_student: '/student',
                student_registration: '/registration',
                student_details: '/view-details',
                student_list: '/studentList',
                upload_image: '/upload-image',
                get_rollnumber: '/get-rollnumber',
                filter_by_keyword: '/filter-by-keyword',

    endpoint_insert: '/insert',
    endpoint_findall:'/findall',
    endpoint_findbyid: '/findbyid',
    endpoint_filter: '/filter'
    //endpoint_update: '/update',
}