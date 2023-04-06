//lấy thông tin nhân viên
var arrSinhVien = [];
document.querySelector('#btnThemNV').onclick = function (event) {
    //chặn sự kiện reload lại trang
    event.preventDefault();
    var sv = new SinhVien();
    sv.taiKhoan = document.querySelector('#tknv').value;
    sv.hoTen = document.querySelector('#name').value;
    sv.email = document.querySelector('#email').value;
    sv.matKhau = document.querySelector('#password').value;
    sv.ngayLam = document.querySelector('#datepicker').value;
    sv.luongCoBan = document.querySelector('#luongCB').value;
    sv.heSoLuong = document.querySelector('#chucvu').value;
    sv.soGioLam = document.querySelector('#gioLam').value;
    console.log('sinhVien', sv);
    arrSinhVien.push(sv);


    var slChucVu = document.querySelector('#chucvu');
    //.selectedIndex: lấy ra vị trí của option được chọn
    var viTriOption = slChucVu.selectedIndex;
    sv.chucVu = slChucVu[viTriOption].innerHTML;
    // var slChucVu = document.querySelector('#chucvu');
    // var viTriOption = slChucVu.selectedIndex;
    // sv.chucVu = slChucVu[viTriOption].innerHTML;

    renderSinhVien(arrSinhVien);
    //lưu vào localstorage
    saveStorage();
}

function renderSinhVien(arrSV) {
    let htmlContent = '';
    for (var index = 0; index < arrSV.length; index++) {
        var svNew = new SinhVien();
        /* svNew = {maSinhVien:'',tenSinhVien:'',..., tinhDiemTrungBinh: f{}} */
        var sv = arrSV[index]; /// {maSinhVien:1,tenSinhVien:'A',...}
        Object.assign(svNew, sv);
        htmlContent += `
         <tr>
            <td>${svNew.taiKhoan}</td>
            <td>${svNew.hoTen}</td>va
            <td>${svNew.email}</td>
            <td>${svNew.ngayLam}</td>
            <td>${svNew.chucVu}</td>
            <td>${svNew.tongLuong()}</td>
            <td>${svNew.xepLoai()}</td>
            <button class="btn btn-danger mx-2" onclick="xoaSinhVienTheoMa('${svNew.taiKhoan}')">Xoá</button>
            <button class="btn btn-primary" data-toggle="modal"data-target="#myModal" onclick="editSinhVien('${svNew.taiKhoan}')">Sửa</button>
         </tr>
         `;
    }
    document.querySelector('#tableDanhSach').innerHTML = htmlContent;
    return htmlContent;
}

function xoaSinhVienTheoMa(taiKhoanClick) {
    var indexDel = -1;
    for (var index = 0; index < arrSinhVien.length; index++) {
        if (arrSinhVien[index].taiKhoan === taiKhoanClick) {
            indexDel = index;
            break;
        }
    }
    if (indexDel !== -1) {
        arrSinhVien.splice(indexDel, 1);
        renderSinhVien(arrSinhVien);
    }
}
//EDIT
function editSinhVien(taiKhoanClick) {
    var indexEdit = -1;
    for (var index = 0; index < arrSinhVien.length; index++) {
        if (arrSinhVien[index].taiKhoan === taiKhoanClick) {
            indexEdit = index;
            break;
        }
    }
    if (indexEdit !== -1) {
        document.querySelector('#tknv').value = arrSinhVien[indexEdit].taiKhoan;
        document.querySelector('#name').value = arrSinhVien[indexEdit].hoTen;
        document.querySelector('#email').value = arrSinhVien[indexEdit].email;
        document.querySelector('#password').value = arrSinhVien[indexEdit].matKhau;
        document.querySelector('#datepicker').value = arrSinhVien[indexEdit].ngayLam;
        document.querySelector('#luongCB').value = arrSinhVien[indexEdit].luongCoBan;
        document.querySelector('#chucvu').value = arrSinhVien[indexEdit].heSoLuong;
        document.querySelector('#gioLam').value = arrSinhVien[indexEdit].soGioLam;

        document.querySelector('#tknv').disabled = true;
        document.querySelector('#btnThemNV').disabled = true;
    }
}
//Cập nhật(lưu)
document.querySelector('#btnCapNhat').onclick = function () {
    var svEdit = new SinhVien();
    svEdit.taiKhoan = document.querySelector('#tknv').value;
    svEdit.hoTen = document.querySelector('#name').value;
    svEdit.email = document.querySelector('#email').value;
    svEdit.matKhau = document.querySelector('#password').value;
    svEdit.ngayLam = document.querySelector('#datepicker').value;
    svEdit.luongCoBan = document.querySelector('#luongCB').value;
    svEdit.heSoLuong = document.querySelector('#chucvu').value;
    svEdit.soGioLam = document.querySelector('#gioLam').value;
    console.log('sinhviendit', svEdit);

    for (var index = 0; index < arrSinhVien.length; index++) {
       if(arrSinhVien[index].taiKhoan===svEdit.taiKhoan){
        var svMang = arrSinhVien[index];
        svMang.taiKhoan = svEdit.taiKhoan;
        svMang.hoTen = svEdit.hoTen;
        svMang.email = svEdit.email;
        svMang.matKhau = svEdit.matKhau;
        svMang.ngayLam = svEdit.ngayLam;
        svMang.luongCoBan = svEdit.luongCoBan;
        svMang.heSoLuong = svEdit.heSoLuong;
        break;
       }
    }
    saveStorage();
    renderSinhVien(arrSinhVien);
    document.querySelector('#tknv').disabled = false;
    document.querySelector('#btnThemNV').disabled = false;
    document.querySelector('form').reset();


}

function saveStorage() {
    //nhận dạng dữ liệu đưa vào là kiểu gì 
    //đưa về dạng chuỗi
    var sArrSinhVien = JSON.stringify(arrSinhVien);
    //biến đổi arrSinhVien => chuỗi
    console.log(sArrSinhVien);
    // đưa thông tin vào localstorage
    localStorage.setItem('arrSinhVien', sArrSinhVien);
}
//sau khi lưu thì chuyển đổi thành lại object
function getStorage() {
    if (localStorage.getItem('arrSinhVien')) {
        var stringArrSinhVien = localStorage.getItem('arrSinhVien');
        arrSinhVien = JSON.parse(stringArrSinhVien);
        console.log('arrSinhVien', arrSinhVien);
    }
}
getStorage();
//gọi lại renderSinhVien từ mảng đã load
renderSinhVien(arrSinhVien);

// document.querySelector('#searchName').oninput= function(){
//     var tuKhoa = document.querySelector('#searchName').value.trim();
//     tuKhoa=stringToSlug(tuKhoa);
//     console.log('tu khoa',tuKhoa);
//     var arrNhanVienTuKhoa=[];
//     for (var index=0; index<arrSinhVien.length;index++){
//         var nv= arrSinhVien[index];
//         if(stringToSlug(sv.chucVu.trim()).search(tuKhoa) !== -1){
//             //Tìm ra tenSinhVien nào chứa từ khoá thì đưa object sinh vien đó vào mảng tìm kiếm
//             arrNhanVienTuKhoa.push(nv);
//         }
//     }
//     renderSinhVien(arrNhanVienTuKhoa);
// }


document.querySelector('#searchName').oninput = function () {
    var tuKhoa = document.querySelector('#searchName').value.trim();

    tuKhoa = stringToSlug(tuKhoa); //Nguyễn Văn A => nguyen-van-a
    console.log('Từ khoá',tuKhoa);
    var arrNhanVienTuKhoa = [];
    for (var index = 0; index < arrSinhVien.length; index++) {
        //Mỗi lần duyệt lấy ra 1 sinh viên
        var nv = arrSinhVien[index];

        if(stringToSlug(nv.chucVu.trim()).search(tuKhoa) !== -1){
            //Tìm ra tenSinhVien nào chứa từ khoá thì đưa object sinh vien đó vào mảng tìm kiếm
            arrNhanVienTuKhoa.push(nv);
        }
    }
    renderSinhVien(arrNhanVienTuKhoa);
}