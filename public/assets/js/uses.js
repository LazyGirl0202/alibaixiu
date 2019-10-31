$(function () {
    //当表单提交行为的时候
    $('#userForm').on('submit', function () {
        // 获取到用户在表单中输入的内容并将内容格式化成参数字符串
        var formData = $(this).serialize();
        $.ajax({
            url: 'http://47.111.184.55:3000/users',
            type: 'post',
            data: formData,
            success: function (data) {
                console.log(data)
                //添加成功刷新页面
                location.reload()
            },
            error: function () {
                alert('添加用户失败')
            }
        })
        // console.log(formData)
        //阻止表单默认事件
        return false;
    })

       //上传用户头像
    $('#modifyBox').on('change', '#avatar',function () {
        //用户选择到的文件
        // this.files[0]
        var formData = new FormData();
        formData.append('avatar', this.files[0]);

        $.ajax({
            url: 'http://47.111.184.55:3000/upload',
            type: 'post',
            data: formData,
            // 告诉$.ajax方法不要解析请求参数
            processData: false,
            // 告诉$.ajax方法不要设置请求参数的类型
            contentType: false,
            success: function (data) {
                var imgData = 'http://47.111.184.55:3000' + data[0].avatar
                // console.log(data[0], avatar)
                $('#preview').attr('src', imgData)
                $('#hiddenAvatar').val(imgData)
            },
            error: function () {
                alert('图片上传失败')
            }
        })
    })
    //获取表单用户信息
    $.ajax({
        url: 'http://47.111.184.55:3000/users',
        type: 'get',
        success: function (data) {
            // console.log(data);
            var html = template('userTpl', { data: data });
            console.log(html);
            $('#userBody').html(html);
        }
    })

    $('#userBody').on('click', '.edit', function () {
        var id = $(this).attr('data-id')

        $.ajax({
            url: `http://47.111.184.55:3000/users/${id}`,
            type: 'put',
            success: function (data) {
                var html = template('modifyTpl', data)
                $('#modifyBox').html(html)
            }
        })
    })

    //为修改按钮添加表单提交事件
    $('#modifyBox').on('submit', '#modifyForm', function () {
        //获取表单中输入的内容
        var formData = $(this).serialize()
        //获取要修改的用户的信息
        var id = $(this).attr('data-id')
        //发送ajax请求
        $.ajax({
            url: `http://47.111.184.55:3000/users/${id}`,
            type: 'put',
            data: formData,
            success: function (data) {
                //修改用户信息成功后重新加载页面
                location.reload()
            }
        })
        //阻止表单默认提交
        return false
    })

    //删除用户
    $('#userBody').on('click','.delete',function() {
        var id = $(this).attr('data-id')
        if(confirm("您确定要删除吗？")) {
            $.ajax({
                url:`http://47.111.184.55:3000/users/${id}`,
                type:'delete',
                success:function(data) {
                    location.reload()
                }
            })
        }
    })

    //全选反选
    var checkedAll = $('#checkedAll')
    //批量删除
    var deleteMany = $('#deleteMany')
    //1.点击全选按钮，小复选框的状态
    checkedAll.on('change',function() {
        //获取大的复选框的状态
        var status = $(this).prop('checked')
        if(status) {
            deleteMany.show()
        }else{
            deleteMany.hide()
        }
        //3.把大复选框的状态给小复选框
        $('#userBody').find('.findOne').prop('checked',status)
    })

    //2.点击小复选框决定大复选框的状态
    $('.userBody').on('change','.findOne',function() {
        var inputs = $('#userBody').find('.findOne')
        if( inputs.length === inputs.filter(':checked').length ) {
            checkedAll.prop('checked',true)
        }else {
            checkedAll.prop('checked',false)
        }

        //如果小复选框数量大于1，显示批量删除
        if(inputs.filter(':checked').length > 0) {
            deleteMany.show()
        }else {
            deleteMany.hide()
        }
    })

    //点击批量删除的时候添加删除事件
    deleteMany.on('click',function() {
        var ids = []
        //获取被选中的小复选框
        var checkedUser = $('#userBody').find('.findOne').filter(':checked')
        //循环小复选框  取出id值
        checkedUser.each(function(index,el) {
            ids.push($(el).attr('data-id'))
            console.log(ids)
        }) 
        //发送ajax请求
        $.ajax({
            url:`http://47.111.184.55:3000/users/${ids.join('-')}`,
            type:'delete',
            success:function(data) {
                location.reload()
            }
        })
    })
})

