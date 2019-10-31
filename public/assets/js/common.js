// $(function() {
//     $('#logout').on('click',function() {
//         //confirm事件，判断是否退出
//         var isConfirm = confirm('您确定要退出吗');
//         //如果退出成功  发送ajax请求
//         if(isConfirm) {
//             $.ajax({
//                 url:'http://47.111.184.55:3000/logout',
//                 type:'post',
//                 success:function(data) {
//                     location.href = 'login.html'
//                 },
//                 error:function() {
//                     alert('退出失败')
//                 }
//             })
//         }
//      })
// })

$(function() {
    $('#logout').on('click',function() {
        var isConfirm = confirm('您确定要退出吗？');
        if(isConfirm) {
            $.ajax({
                url:'http://47.111.184.55:3000/logout',
                type:'post',
                success:function(data) {
                    location.href = 'login.html'
                },
                error:function() {
                    alert('退出失败')
                }
            })
        }
    })
})