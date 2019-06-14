window.addEventListener('load',function () {
    let tab=document.querySelectorAll('.tab>li')
    let type='all'
    let todolist=[{
        id:1,content:'端午节要交作业',ctime:'2019/06/05',status:false
    },
        {
            id:2,content:'端午节不要交作业',ctime:'2019/06/05',status:false
        },
        {
            id:3,content:'企业网站',ctime:'2019/05/31',status:true
        },
        {
            id:4,content:'需求',ctime:'2019/06/10',status:false
        }
    ];

    let content=document.querySelector('.content')
    let prev=0;
    tab.forEach(function (ele,index) {
        ele.onclick=function () {
            tab[prev].classList.remove('hot')
            this.classList.add('hot')
            prev=index;
            type=this.getAttribute('type')

            render(filterData(type))
        }
    })

    tab[0].onclick()

//    用一个函数来筛选
    function filterData(type) {
        let arr=[];
        switch (type) {
            case 'all':
                arr=todolist;
                break;
            case 'done':
                arr=  todolist.filter(ele=>ele.status)
                break;
            case 'doing':
                arr=todolist.filter(ele=>!ele.status)
                break;
        }
        return arr
    }

    let forms=document.forms[0];
    let textBtn=forms.elements['content']
    console.log(textBtn);
    let submitBut=forms.elements[1];

    submitBut.onclick=function (e) {
        e.preventDefault();
        let obj=createObj();
        todolist.push(obj)
        render(filterData(type))
    };

    function createObj() {
        let id=todolist[todolist.length-1].id+1;
        let content=textBtn.value;
        let ctime=Array.of(new Date().toLocaleDateString())
        let status=false;
        return{id,content,ctime,status}
    }




    //渲染函数

    function render(arr) {
        let html='';
        arr.forEach(function (elem,index) {
            if (elem.status) {
                html += ` <li id="${elem.id}"><input type="checkbox" checked> <p>${elem.content}</p><del>X</del> <time>${elem.ctime}</time> </li>`;
            }else if(!elem.status){
                html += ` <li id="${elem.id}"><input type="checkbox" > <p>${elem.content}</p> <del>X</del><time>${elem.ctime}</time> </li>`;
            }

        })
        content.innerHTML=html;
    }

//      删除与单选按钮
    content.onclick=function(e){
        let target=e.target
        let id=target.parentNode.id

        if (target.tagName=='DEL'){
            todolist=todolist.filter(ele=>ele.id!=id)
             render(filterData(type))
        }else if(target.tagName=='INPUT'){
            let arr=todolist.filter(ele=>ele.id==id)[0];
            if(!arr.status) {
                arr.status = true;
            }
            else if(arr.status){
                arr.status =false;
            }


        }

    }


});
